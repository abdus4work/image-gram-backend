import express from 'express';

import { createLike } from '../../controller/likeController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { validate } from '../../validators/zodValidator.js';
import { zodLikeSchema } from '../../validators/zodLikeSchema.js';

const likeRouter = express.Router();

likeRouter.post('/',validate(zodLikeSchema), isAuthenticated, createLike);

export default likeRouter;
