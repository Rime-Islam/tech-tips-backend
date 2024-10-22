import { Schema, Types } from "mongoose"
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
    const findPost: any = await User.findById(id);
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

const getPostByCategory = async (category: string) => {
    const result = await Post.find({ category })
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

const commentDB = async ( id: string, email: string, payload: Record<string, undefined>) => {
   const { commentText } = payload;
    const findPost = await Post.findById(id);
    if (!findPost) {
        throw new AppError(httpStatus.NOT_EXTENDED, "Post not found");
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
        throw new AppError(httpStatus.NOT_EXTENDED, "User not found");
    }

    const result = await Post.findByIdAndUpdate(
        id,
    {
        $push: {
            comments: {
                user: findUser._id,
                comment: commentText,
            },
        },
    },
    { new: true }
    ).populate("user")
    .populate("comments.user");

    return result;
};

const updateCommentDB = async ( id: string, email: string, payload: Record<string, undefined>) => {
   const { commentText, commentId } = payload;
    const findPost = await Post.findById(id);
    if (!findPost) {
        throw new AppError(httpStatus.NOT_EXTENDED, "Post not found");
    };
    const filterCommentWithPostID = findPost?.comments;

    const commentExists = filterCommentWithPostID!.find(
        (comment) => comment._id.toString() === commentId
    );
    if (!commentExists) {
        throw new AppError(httpStatus.NOT_EXTENDED, "Comment not found");
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
        throw new AppError(httpStatus.NOT_EXTENDED, "User not found");
    }

    if (!commentExists.user.equals(findUser._id)) {
        throw new AppError(httpStatus.NOT_EXTENDED, "Comment is not yours");
    }

    const result = await Post.findOneAndUpdate(
        { _id: id, "comments._id": commentId},
    {
        $set: {
            "comments.$.comment": commentText,
        },
    },
    { new: true }
    );

    return result;
};

const upvotePostDB = async ( postId: string, email: string) => {
    const post: any = await Post.findById(postId);
    if (!post) {
        throw new AppError(httpStatus.NOT_EXTENDED, "Post not found");
    }

    const postUser = post.user;   
    const findUser = await User.findOne({ email });
    if (!findUser) {
        throw new AppError(httpStatus.NOT_EXTENDED, "User not found");
    }

    const user = findUser._id;
    if (post.user.equals(user)) {
        throw new AppError(httpStatus.NOT_EXTENDED, "You can't upvote your own post");
    };

    const upvoted = post.upvotedUsers!.includes(user);
    if (upvoted) {
        post.upvotedUsers = post.upvotedUsers!.filter(
            (userId: any) => !userId.equals(user)
        );
        post.upvotesCount = (post.upvotesCount || 1) - 1;
    } else {
        post.upvotedUsers!.push(user);
        post.upvotesCount = (post.upvotesCount || 0) + 1;

        if (post.upvotesCount >= 1) {
            await User.updateOne({ _id: postUser }, { premium: true });
        }
    }

    const upvotedPost = await post.save();
    await upvotedPost.populate("user");

    return upvotedPost;
};



export const PostService = {
    CreatePost,
    getAllPostDB,
    getSinglePostDB,
    getMyPostDB,
    getPostByCategory,
    updateMyPostDB,
    deleteMyPostDB,
    commentDB,
    updateCommentDB,
    upvotePostDB,

};