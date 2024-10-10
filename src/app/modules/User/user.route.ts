
import { Router } from 'express';
import { UserCrontroller } from './user.controller';




const UserRouter = Router();



UserRouter.put("/update/:userId", UserCrontroller.userUpdate);


export default UserRouter;
