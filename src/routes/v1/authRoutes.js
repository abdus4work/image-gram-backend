import express from 'express';

import {
  generateNewToken,
  login,
  logout,
  signup
} from '../../controller/authController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';
import { zodSignInSchema, zodSignUpSchema } from '../../validators/zodAuthSchema.js';
import { validate } from '../../validators/zodValidator.js';

const authRouter = express.Router();

authRouter.post('/signup', validate(zodSignUpSchema), signup);
authRouter.post('/login', validate(zodSignInSchema), login);
authRouter.post('/logout', isAuthenticated, logout);
authRouter.post('/refresh-token', generateNewToken);

export default authRouter;
