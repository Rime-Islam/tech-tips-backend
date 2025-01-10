import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";



const getAllUser = catchAsync(async (req, res) => {
    const result = await UserService.getAllUser();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All user retrived successfully!',
        data: result,
    });
});

const getSingleuser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await UserService.getSingleUser(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User data retrived successfully!',
        data: result,
    });
});

const userUpdate = catchAsync(async (req, res) => {
    const { userId } = req.params;
    
    const result = await UserService.updateUser(req.body, userId);
   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully!",
        data: result,
    })
});

const follow = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const { email } = req.user;

        const result =  await UserService.followUserDB(userId, email);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Follow successfully!",
            data: result,
        })
});

const getFollowerDB = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await UserService.getFollower(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Follower data retrived successfully!',
        data: result,
    });
});


export const UserCrontroller = {
    userUpdate,
    getAllUser,
    getSingleuser,
    follow,
    getFollowerDB,

};