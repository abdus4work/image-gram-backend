import userModel from '../models/userModel.js';
import CrudRepository from './crudRepository.js';

class UserRepository extends CrudRepository {
  constructor() {
    super(userModel);
  }

  async getByEmailOrUsername(
    identifier,
    selectOption = '-password -__v -refreshToken'
  ) {
    return this.model
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .select(selectOption);
  }
}

export default UserRepository;
