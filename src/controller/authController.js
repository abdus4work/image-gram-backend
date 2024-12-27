import { StatusCodes } from 'http-status-codes';

import configs from '../configs/serverConfig.js';
import {
  generateNewAccessTokenService,
  loginService,
  logoutService,
  signUpService
} from '../service/authService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const signup = async (req, res, next) => {
  try {
    const data = await signUpService(req.body);

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
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
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
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        ErrorCodes.UNAUTHORIZED,
        'Refresh token is missing'
      );
    }

    await logoutService(token);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: configs.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          StatusCodes.OK,
          'User logged out successfully'
        ).sendResponse()
      );
  } catch (err) {
    next(err);
  }
};

export const generateNewToken = async (req, res, next) => {
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
    const data = await generateNewAccessTokenService(token);

    // set refresh token in cookie
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: configs.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Token generated successfully', {
        accessToken: data.accessToken
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};
