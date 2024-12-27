import express from 'express';

import {
  generateNewToken,
  login,
  logout,
  signup
} from '../../controller/authController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import ZodAuthSchema from '../../validators/zodAuthSchema.js';
import { validate } from '../../validators/zodValidator.js';

const authRouter = express.Router();
const zodAuthSchema = new ZodAuthSchema();

authRouter.post('/signup', validate(zodAuthSchema.zodSignUpSchema), signup);
authRouter.post('/login', validate(zodAuthSchema.zodSignInSchema), login);
authRouter.post('/logout', isAuthenticated, logout);
authRouter.post('/refresh-token', generateNewToken);

export default authRouter;
