import { StatusCodes } from 'http-status-codes';

import configs from '../configs/serverConfig.js';
import AuthService from '../service/authService.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const authService = new AuthService();

class AuthMiddleware {
  isAuthenticated(req, res, next) {
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
      const token = req.headers?.authorization?.split(' ')[1];
      if (!token) {
        return next(
          new CustomError(
            StatusCodes.UNAUTHORIZED,
            ErrorCodes.UNAUTHORIZED,
            'Token not provided'
          )
        );
      }

      const decoded = authService.verifyToken(token, configs.JWT_ACCESS_SECRET);
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
        )
      }
      next(err);
    }
  }
}

export default AuthMiddleware;
