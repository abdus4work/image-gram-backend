import userModel from '../models/userModel.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(userModel),
  async getByEmailOrUsername(
    identifier,
    selectOption = '-password -__v -refreshToken'
  ) {
    return userModel
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .select(selectOption);
  }
};

export default userRepository;
