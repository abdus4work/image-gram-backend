import express from 'express';

import authRouter from './authRoutes.js';
import commentRouter from './commentRoutes.js';
import likeRouter from './likeRoutes.js';
import postRouter from './postRoutes.js';
import userRouter from './userRoutes.js';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);
v1Router.use('/posts', postRouter);
v1Router.use('/likes', likeRouter);
v1Router.use('/comments', commentRouter);
export default v1Router;
