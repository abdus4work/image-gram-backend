import express from 'express';

import { createLike, deleteLike } from '../../controller/likeController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodLikeSchema } from '../../validators/zodLikeSchema.js';
import { validate } from '../../validators/zodValidator.js';

const likeRouter = express.Router();

likeRouter.post('/', validate(zodLikeSchema), isAuthenticated, createLike);
likeRouter.delete('/:likeId', isAuthenticated, deleteLike);

export default likeRouter;
