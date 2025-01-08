import likeModel from '../models/likeModel.js';
import crudRepository from './crudRepository.js';

const likeRepository = {
  ...crudRepository(likeModel)
};

export default likeRepository;
