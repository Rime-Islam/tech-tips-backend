import { Router } from "express";
import { AuthController } from './auth.controller';



const AuthRouter = Router();


AuthRouter.post("/signup", AuthController.registerUser);
AuthRouter.post("/signin", AuthController.loginUser);


export default AuthRouter;