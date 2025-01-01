import postModel from '../models/postModel.js';
import crudRepository from './crudRepository.js';

const postRepository = {
  ...crudRepository(postModel),

  async countAllPosts(){
    return postModel.countDocuments();
  },

  async getAllPostsByUserIds(userIds, page, limit) {
    const query = postModel.find({ user: { $in: userIds } });

    // Handle population of user, comments, and likes
    query.populate('user');

    // Handle pagination
    query.skip((page - 1) * limit).limit(limit);


  }
}

export default postRepository;