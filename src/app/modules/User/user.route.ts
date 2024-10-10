
import { Router } from 'express';
import { UserCrontroller } from './user.controller';
import auth from '../../middleware/Auth';
import { user_role } from './user.constant';




const UserRouter = Router();


UserRouter.get("/", auth(user_role.admin), UserCrontroller.getAllUser);
UserRouter.get("/:userId", UserCrontroller.getSingleuser);
UserRouter.patch("/update/:userId", auth(user_role.user), UserCrontroller.userUpdate);


export default UserRouter;
