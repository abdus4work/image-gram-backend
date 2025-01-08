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
      .populate({
        path: 'comments',
        select: 'content replies likes createdAt',
        populate: [
          {
            path: 'user',
            select: 'fullName username avatar'
          },
          {
            path: 'replies',
            select: 'content user likes createdAt',
            populate: {
              path: 'user',
              select: 'fullName username avatar'
            }
          },
          {
            path: 'likes',
            select: 'user',
            populate: {
              path: 'user',
              select: 'fullName username avatar'
            }
          }
        ]
      })
      .populate({
        path: 'likes',
        select: 'user onModel',
        populate: {
          path: 'user',
          select: 'fullName username avatar'
        }
      });

    // Handle sorting
    query.sort(sortOption);

    // Handle pagination
    query.skip((page - 1) * limit).limit(limit);
    return query;
  }
};

export default postRepository;
