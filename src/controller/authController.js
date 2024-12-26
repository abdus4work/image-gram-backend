import { StatusCodes } from 'http-status-codes';

import configs from '../configs/serverConfig.js';
import AuthService from '../service/authService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const authService = new AuthService();

class AuthController {
  async signup(req, res, next) {
    try {
      const data = await authService.signup(req.body);

      // set refresh token in cookie
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: configs.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res
        .status(StatusCodes.CREATED)
        .json(
          new SuccessResponse(
            StatusCodes.CREATED,
            'user created successfully',
            data
          ).sendResponse()
        );
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //TODO Implement login method
  async signIn(req, res, next) {
    try{
      const data = await authService.signIn(req.body)
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: configs.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      return res
        .status(StatusCodes.OK)
        .json(
          new SuccessResponse(
            StatusCodes.OK,
            'User logged in successfully',
            data
          ).sendResponse()
        );
    }catch (err){
      next(err);
    }
  }

  async generateNewToken(req, res, next) {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return next(
          new CustomError(
            StatusCodes.BAD_REQUEST,
            ErrorCodes.MISSING_FIELD,
            'Refresh token is missing'
          )
        );
      }
      const data = await authService.generateNewAccessToken(token);

      // set refresh token in cookie
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: configs.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res
        .status(StatusCodes.OK)
        .json(
          new SuccessResponse(
            StatusCodes.OK,
            'Token generated successfully',
            {
              accessToken: data.accessToken
            }
          ).sendResponse()
        );
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
