import { StatusCodes } from 'http-status-codes';

import configs from '../configs/serverConfig.js';
import { verifyTokenService } from '../service/authService.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(
        new CustomError(
          StatusCodes.UNAUTHORIZED,
          ErrorCodes.UNAUTHORIZED,
          'Authorization header not provided'
        )
      );
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return next(
        new CustomError(
          StatusCodes.UNAUTHORIZED,
          ErrorCodes.UNAUTHORIZED,
          'Token not provided'
        )
      );
    }

    const decoded = await verifyTokenService(token, configs.JWT_ACCESS_SECRET);
    if (!decoded) {
      return next(
        new CustomError(
          StatusCodes.UNAUTHORIZED,
          ErrorCodes.UNAUTHORIZED,
          'Invalid token'
        )
      );
    }

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(
        new CustomError(
          StatusCodes.UNAUTHORIZED,
          ErrorCodes.UNAUTHORIZED,
          'Invalid token'
        )
      );
    }
    if (err.name === 'TokenExpiredError') {
      next(
        new CustomError(
          StatusCodes.UNAUTHORIZED,
          ErrorCodes.UNAUTHORIZED,
          'Token expired'
        )
      );
    }
    next(err);
  }
};
