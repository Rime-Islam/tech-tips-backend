import { Schema } from "mongoose"
import { TPost } from "./post.interfase";
import { Post } from "./post.model";



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
    .populate("comment.user")
    .sort({ createdAt: -1, updatedAt: -1, upvotesCount: -1 });
    return result;
};








export const PostService = {
    CreatePost,
    getAllPostDB,
};