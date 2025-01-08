import express from 'express';

import authRouter from './authRoutes.js';
import postRouter from './postRoutes.js';
import userRouter from './userRoutes.js';
import likeRouter from './likeRoutes.js';
import commentRouter from './commentRoutes.js';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);
v1Router.use('/posts', postRouter);
v1Router.use('/like', likeRouter);
v1Router.use('/comment',commentRouter);
export default v1Router;
