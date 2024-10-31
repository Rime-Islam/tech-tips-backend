import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TUserDocument } from "./user.interfase";
import { User } from "./user.model";


const getAllUser = async () => {
    const result = await User.find();
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await User.findById(id);

    return result;
};

const updateUser = async(
    payload: Record<string, unknown>,
    id: string
) => {
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    
    return result;
};

const followUserDB = async ( userId: string, email: string) => {
    const follow: any = await User.findById(userId);
  
    if (!follow) {
        throw new AppError(httpStatus.NOT_EXTENDED, "This user not found");
    };

    const followerUser: any = await User.findOne({ email });
    
    if (!followerUser) {
        throw new AppError(httpStatus.NOT_EXTENDED, "Your data not found");
    };

    const followUserId = follow._id;  
    const followerUserId = followerUser._id;

    if (followUserId.equals(followerUserId)) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot follow yourself");
    }

    const isAlreadyFollowed = follow.followers.some((followerId: any) =>
    followerId.equals(followerUserId));

    if (isAlreadyFollowed) {
            follow.followers = follow.followers.filter(
                (followerId: any) => !followerId.equals(followerUserId)
        );

        followerUser.following = followerUser.following.filter(
            (followingId: any) => !followingId.equals(followUserId)
        );

        await follow.save();
        await followerUser.save();
   
    return {
        message: "User unfollowed successfully",
        follow,
    }
    } else {
        follow.followers.push(followerUserId);
        followerUser.following.push(followUserId);

        await follow.save();
        await followerUser.save();

        return {
            message: "User followed successfully",
            follow,
        }
    }
};

const getFollower = async (id: string) => {
    const result = await User.findById(id)
    .populate('followers', 'id name email profilePicture premium')
    .populate('following', 'id name email profilePicture premium');

    return result;
};

export const UserService = {
    updateUser,
    getAllUser,
    getSingleUser,
    followUserDB,
    getFollower,

};