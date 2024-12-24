import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repository/userRepository.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const userRepository = new UserRepository();

class UserService {
  async createUser(data) {
    try {
      const user = await userRepository.create(data);
      if (!user) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          ErrorCodes.USER_NOT_CREATED,
          'User not created',
          { inputData: data }
        );
      }
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new CustomError(
          StatusCodes.CONFLICT,
          ErrorCodes.DUPLICATE_KEY,
          'User with this email or username already exists',
          err.message,
          { inputData: data }
        );
      }
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        'Internal server error',
        err.message,
        { inputData: data }
      );
    }
  }

  async updateUser(id, data) {
    try {
      const user = await userRepository.update(
        id,
        data,
        null,
        '-password -__v -refreshToken'
      );
      if (!user) {
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          ErrorCodes.USER_NOT_FOUND,
          'User not found',
          { inputData: data }
        );
      }
      return user;
    } catch (err) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        'Internal server error',
        err.message,
        { inputData: data }
      );
    }
  }

  async getByEmailOrUsername(identifier) {
    const user =await userRepository.getByEmailOrUsername(identifier);
    if(!user){
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.USER_NOT_FOUND,
        `user not found with this ${identifier} identifier`
      )
    }

    return user;
  }
}

export default UserService;
