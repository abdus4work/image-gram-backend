import express from 'express';

import {
  deleteUser,
  getUser,
  getUserPosts
} from '../../controller/userController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const userRouter = express.Router();

/**
 * @swagger
 * {
 *   "paths": {
 *     "/api/v1/users/{username}": {
 *       "get": {
 *         "summary": "Get a user",
 *         "tags": ["User"],
 *         "parameters": [
 *           {
 *             "name": "username",
 *             "in": "path",
 *             "required": true,
 *             "schema": {
 *               "type": "string"
 *             },
 *             "example": "john123"
 *           }
 *         ],
 *         "responses": {
 *           "200": {
 *             "description": "User retrieved successfully",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "$ref": "#/components/schemas/User"
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
userRouter.get('/:username', isAuthenticated, getUser);

/**
 * @swagger
 * {
 *   "paths": {
 *     "/api/v1/users/{username}": {
 *       "delete": {
 *         "summary": "Delete a user",
 *         "tags": ["User"],
 *         "parameters": [
 *           {
 *             "name": "username",
 *             "in": "path",
 *             "required": true,
 *             "schema": {
 *               "type": "string"
 *             },
 *             "example": "john123"
 *           }
 *         ],
 *         "responses": {
 *           "200": {
 *             "description": "User deleted successfully"
 *           },
 *           "401": {
 *             "description": "Unauthorized"
 *           },
 *           "404": {
 *           "description": "User not found"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 *
 */
userRouter.delete('/:username', isAuthenticated, deleteUser);

/**
 * @swagger
 * {
 *   "paths": {
 *     "/api/v1/users/{username}/posts": {
 *       "get": {
 *         "summary": "Get user posts",
 *         "tags": ["User"],
 *         "parameters": [
 *           {
 *             "name": "username",
 *             "in": "path",
 *             "required": true,
 *             "schema": {
 *               "type": "string"
 *             },
 *             "example": "john123"
 *           }
 *         ],
 *         "responses": {
 *           "200": {
 *             "description": "User posts retrieved successfully",
 *              "content": {
 *                "application/json": {
 *                  "schema": {
 *                    "$ref": "#/components/schemas/Post"
 *                  }
 *                }
 *              }
 *           },
 *           "401": {
 *             "description": "Unauthorized"
 *           },
 *           "404": {
 *             "description": "User not found"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 *
 */
userRouter.get('/:username/posts', isAuthenticated, getUserPosts);

export default userRouter;
