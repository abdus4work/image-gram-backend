import { StatusCodes } from 'http-status-codes';

import configs from '../configs/serverConfig.js';
import AuthService from '../service/authService.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const authService = new AuthService();

class AuthMiddleware {
  isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new CustomError(
              StatusCodes.UNAUTHORIZED,
              ErrorCodes.UNAUTHORIZED,
              'Token not provided'
            )
          );
      }

      const decoded = authService.verifyToken(token, configs.JWT_ACCESS_SECRET);
      if (!decoded) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
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
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new CustomError(
              StatusCodes.UNAUTHORIZED,
              ErrorCodes.UNAUTHORIZED,
              'Invalid token'
            )
          );
      }
      if (err.name === 'TokenExpiredError') {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new CustomError(
              StatusCodes.UNAUTHORIZED,
              ErrorCodes.UNAUTHORIZED,
              err.message
            )
          );
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          new CustomError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ErrorCodes.INTERNAL_SERVER_ERROR,
            'Internal server error'
          )
        );
    }
  }
}

export default AuthMiddleware;
