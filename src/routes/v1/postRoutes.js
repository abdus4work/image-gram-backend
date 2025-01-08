import express from 'express';

import {
  createPost,
  deletePost,
  generateSignedUrl,
  getAllCommentsByPostId,
  getAllPosts,
  getPost
} from '../../controller/postController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { validate } from '../../validators/zodValidator.js';

const postRouter = express.Router();

postRouter.post('/', isAuthenticated, validate(zodPostSchema), createPost);
postRouter.get('/', isAuthenticated, getAllPosts);
postRouter.get('/:postId', isAuthenticated, getPost);
postRouter.get('/generate-signed-url', isAuthenticated, generateSignedUrl);
postRouter.delete('/:postId', isAuthenticated, deletePost);
postRouter.get('/:postId/comments', isAuthenticated, getAllCommentsByPostId);
export default postRouter;
