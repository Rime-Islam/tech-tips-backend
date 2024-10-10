import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";



const registerUser = catchAsync(async (req, res) => {
    const result = await AuthService.register(req.body);
    sendResponse(res, {
        statusCode: 201,
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
















export const AuthController = {
    registerUser,
    loginUser,
    
};