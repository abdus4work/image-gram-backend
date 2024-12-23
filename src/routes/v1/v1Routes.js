import express from 'express';

import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/users',userRouter)

export default v1Router;