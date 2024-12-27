import { StatusCodes } from 'http-status-codes';

import {
  deleteUserService,
  getUserByEmailOrUsernameService
} from '../service/userService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const getUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    if (!username) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        'Username is required',
        {},
        {
          inputData: req.params
        }
      );
    }
    const user = await getUserByEmailOrUsernameService(username, '-password -__v -refreshToken');

    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'success', {
        user: user
      }).sendResponse()
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    const username = req.params.username;
    if (!user || user.username !== username) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        ErrorCodes.UNAUTHORIZED,
        'Unauthorized to delete user',
        {},
        {
          inputData: username
        }
      );
    }


    const deletedUser = await deleteUserService(user.id);
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'User deleted successfully', {
        user: {
          id: deletedUser._id,
          fullName: deletedUser.fullName,
          username: deletedUser.username,
          email: deletedUser.email,
          avatar: deletedUser.avatar,
          createdAt: deletedUser.createdAt,
          updatedAt: deletedUser.updatedAt
        }
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};
