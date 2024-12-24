import userModel from '../models/userModel.js';
import CrudRepository from './crudRepository.js';

class UserRepository extends CrudRepository {
  constructor() {
    super(userModel);
  }

  async getByEmailOrUsername(identifier) {
    return this.model
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .select('-password -__v -refreshToken');
  }
}

export default UserRepository;