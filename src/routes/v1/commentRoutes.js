import express from 'express';

import {
  createComment,
  deleteComment
} from '../../controller/commentController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodCommentSchema } from '../../validators/zodCommentSchema.js';
import { validate } from '../../validators/zodValidator.js';

const commentRouter = express.Router();

commentRouter.post(
  '/',
  validate(zodCommentSchema),
  isAuthenticated,
  createComment
);
commentRouter.delete('/:commentId', isAuthenticated, deleteComment);

export default commentRouter;
