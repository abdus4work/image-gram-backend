import express from 'express';

import { getUser } from '../../controller/userController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/:username', isAuthenticated, getUser);

export default userRouter;
