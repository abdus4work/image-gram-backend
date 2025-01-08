import commentModel from '../models/commentModel.js';
import crudRepository from './crudRepository.js';

const commentRepository = {
  ...crudRepository(commentModel)
};

export default commentRepository;
