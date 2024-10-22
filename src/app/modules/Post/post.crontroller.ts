import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { PostService } from "./post.service";
import catchAsync from "../../utils/catchAsync";



const newPost = catchAsync(async (req, res) => {
    const result = await PostService.CreatePost(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post Created successfully!",
        data: result,
    })
});

const getAllPost = catchAsync(async (req, res) => {
    const result = await PostService.getAllPostDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All posts are retrived successfully!",
        data: result,
    })
});

const getMyPost = catchAsync(async (req, res) => {
    const result = await PostService.getMyPostDB(req.user.email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My posts are retrived successfully!",
        data: result,
    })
});

const getSinglePost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const result = await PostService.getSinglePostDB(postId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post retrived successfully!",
        data: result,
    })
});

const updatePost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { email } = req.user;
    if (postId) {
        const result =  await PostService.updateMyPostDB(postId, email, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Post updated successfully!",
            data: result,
        })
    } 
});

const deletePost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { email } = req.user;
    if (postId) {
        const result =  await PostService.updateMyPostDB(postId, email, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Post deleted successfully!",
            data: result,
        })
    } 
});

const categoryPost = catchAsync(async (req, res) => {
    const { category } = req.body;
        const result =  await PostService.getPostByCategory(category);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Posts retrived successfully!",
            data: result,
        })
});

const commentPost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { email } = req.user;
        const result =  await PostService.commentDB(postId, email, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Thanks for your comment!",
            data: result,
        })
});

const updateCommentPost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { email } = req.user;
        const result =  await PostService.updateCommentDB(postId, email, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Comment updated successfully!",
            data: result,
        })
});

const upvotePost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { email } = req.user;
        const result =  await PostService.upvotePostDB(postId, email);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Upvote successfully!",
            data: result,
        })
});


export const PostController = {
    newPost,
    getAllPost,
    getMyPost,
    getSinglePost,
    updatePost,
    deletePost,
    categoryPost,
    commentPost,
    updateCommentPost,
    upvotePost,


};