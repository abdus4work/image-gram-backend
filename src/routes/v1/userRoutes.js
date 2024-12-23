import express from 'express';

import UserController from '../../controller/userController.js';

const userRouter = express.Router();
const userController = new UserController();
userRouter.get('/:username', userController.getProfile);

export default userRouter;
