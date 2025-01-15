import postModel from '../models/postModel.js';
import crudRepository from './crudRepository.js';

const postRepository = {
  ...crudRepository(postModel),

  async countAllPosts(filter = {}) {
    return postModel.countDocuments(filter);
  },

  async getAllPostsByUserId(userIds, page, limit, sortOption) {
    const query = postModel.find({ user: { $in: userIds } });

    // Handle population of user, comments, and likes
    query
      .populate('user', 'fullName username avatar')

    // Handle sorting
    query.sort(sortOption);

    // Handle pagination
    query.skip((page - 1) * limit).limit(limit);
    return query;
  }
};

export default postRepository;
