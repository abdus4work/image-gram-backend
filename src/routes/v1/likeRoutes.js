import express from 'express';

import { createLike, deleteLike } from '../../controller/likeController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodLikeSchema } from '../../validators/zodLikeSchema.js';
import { validate } from '../../validators/zodValidator.js';

const likeRouter = express.Router();

/**
 * @swagger
 * /api/v1/likes:
 *   post:
 *     summary: Create a like
 *     tags: [Like]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LikeCreate'
 *     responses:
 *        201:
 *          description: Like created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LikeResponse'
 */
likeRouter.post('/', validate(zodLikeSchema), isAuthenticated, createLike);

/**
 * @swagger
 * /api/v1/likes/{likeId}:
 *  delete:
 *    summary: Delete a like
 *    tags: [Like]
 *    parameters:
 *     - name: likeId
 *       in: path
 *       required: true
 *       schema:
 *       type: string
 *       description: Like ID
 *       example: 60f8b0c2d3b3fe0015f9d6c1
 *    responses:
 *      200:
 *        description: Like deleted successfully
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Like not found
 */
likeRouter.delete('/:likeId', isAuthenticated, deleteLike);

export default likeRouter;
