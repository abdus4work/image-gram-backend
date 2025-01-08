import crudRepository from './crudRepository.js';
import likeModel from '../models/likeModel.js';

const likeRepository = {
  ...crudRepository(likeModel),

}

export default likeRepository;