
import { Router } from 'express';
import { UserCrontroller } from './user.controller';
import auth from '../../middleware/Auth';
import { user_role } from './user.constant';




const UserRouter = Router();


UserRouter.get("/", UserCrontroller.getAllUser);
UserRouter.get("/:userId", UserCrontroller.getSingleuser);
UserRouter.patch("/:userId", auth(user_role.user), UserCrontroller.userUpdate);
UserRouter.patch("/follow/:userId", auth(user_role.user), UserCrontroller.follow);

export default UserRouter;
