import { Router } from "express";
import { PostController } from "./post.crontroller";
import auth from "../../middleware/Auth";
import { user_role } from './../User/user.constant';




const PostRouter = Router();


PostRouter.post("/create", PostController.newPost);
PostRouter.get("/", PostController.getAllPost);
PostRouter.get("/my-post" , auth("user", "admin"), PostController.getMyPost);
PostRouter.get("/:postId", PostController.getSinglePost);
PostRouter.get("/category", PostController.categoryPost);
PostRouter.patch("/update-post/:postId", auth(user_role.user), PostController.updatePost);
PostRouter.delete("/delete/:postId", auth(user_role.user), PostController.deletePost);
PostRouter.post("/comments/:postId", auth("user", "admin"), PostController.commentPost);
PostRouter.patch("/update-comments/:postId", auth("user", "admin"), PostController.updateCommentPost);
PostRouter.delete("/comment-delete/:postId", auth("user", "admin"), PostController.deleteCommentPost);
PostRouter.patch("/vote/:postId", auth("user", "admin"), PostController.upvotePost);
PostRouter.post("/payment/:userId", PostController.payment);


export default PostRouter;