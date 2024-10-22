import { Router } from "express";
import AuthRouter from "../modules/Auth/auth.route";
import UserRouter from "../modules/User/user.route";
import PostRouter from "../modules/Post/post.route";
import { paymentRoute } from "../modules/Payment/payment.route";



const router = Router();
const modulesRoute = [
    {
        path: "/auth",
        route: AuthRouter
    },
    {
        path: "/user",
        route: UserRouter
    },
    {
        path: "/post",
        route: PostRouter
    },
    {
        path: "/payment",
        route: paymentRoute
    }
  

];

modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;