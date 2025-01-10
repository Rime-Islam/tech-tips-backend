import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";



const registerUser = catchAsync(async (req, res) => {
    const result = await AuthService.register(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully!",
        data: result,
    })
});

const loginUser = catchAsync(async (req, res) => {
    const { accessRefreshToken, token, user } = await AuthService.loginUser(
        req.body
    );

    res.cookie("refreshToken", accessRefreshToken, {
        httpOnly: true,
        secure: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: { user, token },
    });
});

const userForgetPassword = catchAsync(async (req, res) => {
    const {name, email} = await AuthService.forgetPassword( req.body );
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Hello ${name}, a password reset link has been sent to your email address. Please check your ${email} to reset your password.`,
        data: {} ,
    });
});

const userResetPassword = catchAsync(async (req, res) => {
    const result = await AuthService.userPasswordReset(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset successfully!',
        data: result,
    });
});

export const AuthController = {
    registerUser,
    loginUser,
    userForgetPassword,
    userResetPassword,
};