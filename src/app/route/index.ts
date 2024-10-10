import { Router } from "express";
import AuthRouter from "../modules/Auth/auth.route";
import UserRouter from "../modules/User/user.route";



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

];

modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;