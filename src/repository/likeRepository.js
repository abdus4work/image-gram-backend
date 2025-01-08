import likeModel from '../models/likeModel.js';
import crudRepository from './crudRepository.js';

const likeRepository = {
  ...crudRepository(likeModel),

  async countLikes(filter) {
    return likeModel.countDocuments(filter);
  }
};

export default likeRepository;
