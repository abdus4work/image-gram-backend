import { StatusCodes } from 'http-status-codes';

import { getUserByEmailOrUsernameService } from '../service/userService.js';
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
    const user = await getUserByEmailOrUsernameService(username);

    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'success', {
        user: {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }).sendResponse()
    );
  } catch (error) {
    next(error);
  }
};
