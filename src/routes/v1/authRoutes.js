import express from 'express';

import AuthController from '../../controller/authController.js';
import zodUserSchema from '../../validators/zodUserSchema.js';
import { validate } from '../../validators/zodValidator.js';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/signup',validate(zodUserSchema),authController.signup);

export default authRouter;
