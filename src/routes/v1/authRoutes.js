import express from 'express';

import AuthController from '../../controller/authController.js';
import AuthMiddleware from '../../middleware/authMiddleware.js';
import ZodAuthSchema from '../../validators/zodAuthSchema.js';
import { validate } from '../../validators/zodValidator.js';

const authRouter = express.Router();
const authController = new AuthController();
const zodAuthSchema = new ZodAuthSchema();
const authMiddleware = new AuthMiddleware();

authRouter.post('/signup', validate(zodAuthSchema.zodSignUpSchema), authController.signup);
authRouter.post('/login',validate(zodAuthSchema.zodSignInSchema),authController.signIn);
authRouter.post('/logout',authMiddleware.isAuthenticated,authController.signOut);
authRouter.post('/refresh-token',authController.generateNewToken);

export default authRouter;
