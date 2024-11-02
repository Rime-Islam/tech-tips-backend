import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { IUser } from "../User/user.interfase";
import { User } from "../User/user.model";
import { TUserSignin } from "./auth.interfase";
import config from "../../config";
import { accesstoken } from "./auth.utlis";
import { resetPasswordEmail } from "../../utils/sendEmail";
import jwt from 'jsonwebtoken';


const register = async (payload: IUser) => {
    const user = await User.findOne({ email: payload.email });

    if(user) {
        throw new AppError(httpStatus.CONFLICT, "User already exists!");
    }
    const newuser = await User.create(payload);
    return newuser;
};

const loginUser = async (payload: TUserSignin) => {
    const user = await User.isUserExistByCustomerId(payload.email);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_EXTENDED, "This User not found");
    }
    const status = user?.status;
    if (status === "block") {
      throw new AppError(httpStatus.NOT_EXTENDED, "This User is Blocked");
    }

    if (user?.isDelete) {
      throw new AppError(httpStatus.NOT_EXTENDED, "This User account is deleted");
    }


    if (!(await User.isPasswordMatched(payload.password, user.password))) {
      throw new AppError(httpStatus.FORBIDDEN, "wrong password!");
    }
  
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    const accessToken = accesstoken(
        jwtPayload,
        config.jwt_access_token as string,
        "7d"
    );
    const token = `${accessToken}`;

    const accessRefreshToken = accesstoken(
        jwtPayload,
        config.jwt_refresh_token as string,
        "1y"
    );

    return {
        token,
        accessRefreshToken,
        user
    };
};

const forgetPassword = async (payload: TUserSignin) => {
    const user = await User.findOne({ email: payload.email });
    if(!user) {
        throw new AppError(httpStatus.CONFLICT, "User not exists!");
    }
    const id = user._id;
    const name = user.name;
    const email = user.email;

    const jwtPayload = {
        email: user.email,
        role: user.role,
      };
  
      const accessToken = accesstoken(
          jwtPayload,
          config.jwt_access_token as string,
          "7d"
      );
      const token = `${accessToken}`;

      const url = config.URL;
      const URL = `${url}/auth/forget-password/${id}/${token}`;

       resetPasswordEmail(email, URL, name );


    return {
        name, email
    };
};

const userPasswordReset = async (payload: { id: string; token: string; password: string; }) => { 
    const user = await User.findOne({ _id: payload.id });

    if(!user) {
        throw new AppError(httpStatus.CONFLICT, "User not exists!");
    }

    const token = payload?.token;
    const id = payload?.id;
    const password = payload?.password ;
    const secretKey = config.jwt_access_token as string;

    jwt.verify(token, secretKey, async(error: any, decoded: any) => {
        if (error) {
            throw new AppError(httpStatus.CONFLICT, "Invalid access token!");
        } else {
            const result = await User.updatePassword(id, password);
           return result;
        }
    })

};

export const AuthService = {
    register,
    loginUser,
    forgetPassword,
    userPasswordReset,

};