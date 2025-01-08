import express from 'express';

import {
  createComment,
  deleteComment
} from '../../controller/commentController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodCommentSchema } from '../../validators/zodCommentSchema.js';
import { validate } from '../../validators/zodValidator.js';

const commentRouter = express.Router();

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comment]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CommentCreate'
 *     responses:
 *        201:
 *          description: Comment created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CommentResponse'
 */
commentRouter.post(
  '/',
  validate(zodCommentSchema),
  isAuthenticated,
  createComment
);

/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *  delete:
 *    summary: Delete a comment
 *    tags: [Comment]
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *        type: string
 *        description: Comment ID
 *        example: 60f8b0c2d3b3fe0015f9d6c2
 *    responses:
 *      200:
 *        description: Comment deleted successfully
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Comment not found
 */
commentRouter.delete('/:commentId', isAuthenticated, deleteComment);

export default commentRouter;
