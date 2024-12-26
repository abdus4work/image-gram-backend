import express from 'express';

import AuthController from '../../controller/authController.js';
import ZodAuthSchema from '../../validators/zodAuthSchema.js';
import { validate } from '../../validators/zodValidator.js';

const authRouter = express.Router();
const authController = new AuthController();
const zodAuthSchema = new ZodAuthSchema();

authRouter.post('/signup', validate(zodAuthSchema.zodSignUpSchema), authController.signup);
authRouter.post('/signin',validate(zodAuthSchema.zodSignInSchema),authController.signIn);
authRouter.get('/generate-new-token',authController.generateNewToken);

export default authRouter;
