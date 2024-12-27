import express from 'express';

import { deleteUser, getUser } from '../../controller/userController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/:username', isAuthenticated, getUser);
userRouter.delete('/:username', isAuthenticated, deleteUser);
export default userRouter;
