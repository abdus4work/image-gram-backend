import commentModel from '../models/commentModel.js';
import crudRepository from './crudRepository.js';

const commentRepository = {
  ...crudRepository(commentModel),

  async countComment(filter){
    return commentModel.countDocuments(filter);
  }
};

export default commentRepository;
