import { Router } from "express";
import { AuthController } from './auth.controller';



const AuthRouter = Router();


AuthRouter.post("/signup", AuthController.registerUser);
AuthRouter.post("/signin", AuthController.loginUser);
AuthRouter.post("/forget_password", AuthController.userForgetPassword);
AuthRouter.post("/reset_password", AuthController.userResetPassword);


export default AuthRouter;