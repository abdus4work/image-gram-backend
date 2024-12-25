import { StatusCodes } from 'http-status-codes';

import UserRepository from '../repository/userRepository.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

const userRepository = new UserRepository();

class UserService {
  async createUser(data) {
    try {
      return await userRepository.create(data);
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
      throw err;
    }
  }

  async updateUser(id, data) {
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
  }

  async getByEmailOrUsername(identifier) {
    const user = await userRepository.getByEmailOrUsername(identifier);
    if (!user) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.USER_NOT_FOUND,
        `user not found with this ${identifier} identifier`
      );
    }

    return user;
  }

  async getUserById(id) {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.USER_NOT_FOUND,
        `user not found with this ${id} identifier`
      );
    }
    return user;
  }
}

export default UserService;
