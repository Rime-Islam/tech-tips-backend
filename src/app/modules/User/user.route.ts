
import { Router } from 'express';
import { UserCrontroller } from './user.controller';
import auth from '../../middleware/Auth';
import { user_role } from './user.constant';




const UserRouter = Router();


UserRouter.get("/", UserCrontroller.getAllUser);
UserRouter.get("/:userId", UserCrontroller.getSingleuser);
UserRouter.patch("/:userId", UserCrontroller.userUpdate);
UserRouter.patch("/follow/:userId", auth(user_role.user), UserCrontroller.follow);
UserRouter.get("/follower/:userId", UserCrontroller.getFollowerDB);


export default UserRouter;
