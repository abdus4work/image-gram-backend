import { StatusCodes } from 'http-status-codes';

import UserService from '../service/userService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const userService = new UserService();

class UserController {
  async getProfile(req, res, next) {
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
      const user = await userService.getByEmailOrUsername(username);

      return res
        .status(StatusCodes.OK)
        .json(new SuccessResponse(StatusCodes.OK, 'success', user).sendResponse());
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
