import userModel from '../models/user.model.js';
import CrudRepository from './crud.repository.js';

class UserRepository extends CrudRepository {
  constructor() {
    super(userModel);
  }

  async getByEmailOrUsername(identifier) {
    return this.model
      .findOne({ $or: [{ email: identifier }, { username: identifier }] })
      .select('-password -__V, -refreshToken');
  }
}

export default UserRepository;