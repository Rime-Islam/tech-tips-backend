import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { IUser } from "../User/user.interfase";
import { User } from "../User/user.model";
import { TUserSignin } from "./auth.interfase";
import config from "../../config";
import { accesstoken } from "./auth.utlis";



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





export const AuthService = {
    register,
    loginUser,
};