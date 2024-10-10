import { Router } from "express";
import AuthRouter from "../modules/Auth/auth.route";



const router = Router();
const modulesRoute = [
    {
        path: "/auth",
        route: AuthRouter
    },

];

modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;