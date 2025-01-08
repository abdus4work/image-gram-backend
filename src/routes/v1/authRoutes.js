import express from 'express';

import {
  generateNewToken,
  login,
  logout,
  signup
} from '../../controller/authController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import {
  zodSignInSchema,
  zodSignUpSchema
} from '../../validators/zodAuthSchema.js';
import { validate } from '../../validators/zodValidator.js';

const authRouter = express.Router();

/**
 * @swagger
 * {
 *   "paths": {
 *     "/api/v1/auth/signup": {
 *       "post": {
 *         "summary": "Signup a user",
 *         "tags": ["Auth"],
 *         "requestBody": {
 *           "required": true,
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/UserCreate"
 *               }
 *             }
 *           }
 *         },
 *         "responses": {
 *           "201": {
 *             "description": "User signed up successfully",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "$ref": "#/components/schemas/UserResponse"
 *                 }
 *               }
 *             }
 *           },
 *           "400": {
 *             "description": "Bad request"
 *           },
 *           "409": {
 *             "description": "User already exists"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
authRouter.post('/signup', validate(zodSignUpSchema), signup);

/**
 * @swagger
 * {
 *   "paths": {
 *     "/api/v1/auth/login": {
 *       "post": {
 *         "summary": "Login a user",
 *         "tags": ["Auth"],
 *         "requestBody": {
 *           "required": true,
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Login"
 *               }
 *             }
 *           }
 *         },
 *         "responses": {
 *           "200": {
 *             "description": "User logged in successfully",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "$ref": "#/components/schemas/UserResponse"
 *                 }
 *               }
 *             }
 *           },
 *           "401": {
 *             "description": "Invalid credentials"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

authRouter.post('/login', validate(zodSignInSchema), login);
authRouter.post('/logout', isAuthenticated, logout);
authRouter.post('/refresh-token', generateNewToken);

export default authRouter;


