import commentModel from '../models/commentModel.js';
import crudRepository from './crudRepository.js';

const commentRepository = {
  ...crudRepository(commentModel),

  async getAllCommentByPostId(postId,sortOption={createdAt:1},page=1,limit=10){
    const query = commentModel.find({onModel:'Post',commentableId: postId});

    // Handle populate
    query.populate('replies','content user createdAt')
      .populate('likes','user createdAt')

    // Handle sort
    query.sort(sortOption);

    // Handle pagination
    query.skip((page-1)*limit).limit(limit);

    return query;
  },

  async countComment(filter){
    return commentModel.countDocuments(filter);
  }
};

export default commentRepository;
