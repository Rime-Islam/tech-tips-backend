import { Schema } from "mongoose"
import { TPost } from "./post.interfase";
import { Post } from "./post.model";
import { User } from "../User/user.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";



export type IProps = {
    postId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
};

const CreatePost = async (payload: TPost) => {
    const result = (await Post.create(payload)).populate("user");
    return result;
};

const getAllPostDB = async () => {
    const result = await Post.find()
    .populate("user")
    .populate("comments.user")
    .sort({ createdAt: -1, updatedAt: -1, upvotesCount: -1 });
    return result;
};

const getSinglePostDB = async (id: string) => {
    const result = await Post.findById(id).populate("user").populate("comments.user");
    return result;
};

const getMyPostDB = async (email: string) => {
    const filterUser = await User.findOne({ email });
    const findUser = filterUser?._id;
    const result = await Post.find({
        user: findUser,
    }).populate("user")
    .populate("comments.user")
    .sort({ createdAt: -1, updatedAt: -1 });
    return result;
};

const updateMyPostDB = async ( id: string, email: string, payload: TPost) => {
    const findPost = await User.findById(id);
    const findUser = await User.findOne({ email });

    if (!findUser) {
        throw new AppError(httpStatus.NOT_EXTENDED, "User not found");
    }

    if (findPost && findUser) {
        if (findPost.user.toString() !== findUser._id!.toString()) {
            throw new AppError(httpStatus.CONFLICT, "This post is not yours");
        }
    }

    const result = await Post.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate("user")
    return result;
};

const getPostByCategory = async (id: unknown) => {
    const result = await Post.find({ category: id })
    .populate("user")
    .populate("comments.user")
    return result;
};

const deleteMyPostDB = async ( id: string, email: string, payload: TPost) => {
    const findPost = await Post.findById(id);
    const findUser = await User.findOne({ email });

    if (!findUser) {
        throw new AppError(httpStatus.NOT_EXTENDED, "User not found");
    }
    if (findPost && findUser) {
        if (findPost.user.toString() !== findUser._id!.toString()) {
            throw new AppError(httpStatus.CONFLICT, "This post is not yours");
        }
    }
    const result = await Post.findByIdAndDelete(id)
    return result;
};


export const PostService = {
    CreatePost,
    getAllPostDB,
    getSinglePostDB,
    getMyPostDB,
    getPostByCategory,
    updateMyPostDB,
    deleteMyPostDB,
};