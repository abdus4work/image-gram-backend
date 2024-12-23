import { StatusCodes } from 'http-status-codes';

import UserService from '../service/userService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const userService = new UserService();

class UserController {
  async getProfile(req, res) {
    try {
      const username = req.params.username;
      console.log(username)
      if (!username) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          ErrorCodes.INVALID_INPUT,
          'Invalid username is provided',
          null,
          {
            inputData: req.params
          }
        );
      }
      const user = await userService.getByEmailOrUsername(username);
      
      return res.status(StatusCodes.OK).json(
        new SuccessResponse(
          StatusCodes.OK,
          "success",
          user
        )
      );
    } catch (error) {
      if(error instanceof CustomError){
        return res.status(error.statusCode).json(error.toJSON());
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        new CustomError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          ErrorCodes.INTERNAL_SERVER_ERROR,
          error.message
        )
      )
    }
  }
}


export default UserController;