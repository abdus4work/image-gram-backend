import express from 'express';

import UserController from '../../controller/userController.js';
import AuthMiddleware from '../../middleware/authMiddleware.js';

const userRouter = express.Router();
const userController = new UserController();
const authMiddleware = new AuthMiddleware();

userRouter.get(
  '/:username',
  authMiddleware.isAuthenticated,
  userController.getProfile
);

export default userRouter;
