import express from 'express';

import { createPost, generateSignedUrl, getAllPosts } from '../../controller/postController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { validate } from '../../validators/zodValidator.js';

const postRouter = express.Router();

postRouter.post('/', isAuthenticated, validate(zodPostSchema), createPost);
postRouter.get('/', isAuthenticated, getAllPosts);
postRouter.get('/generate-signed-url', isAuthenticated, generateSignedUrl);

export default postRouter;
