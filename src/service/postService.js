import { StatusCodes } from 'http-status-codes';

import cloudinaryConfig from '../configs/cloudinaryConfig.js';
import configs from '../configs/serverConfig.js';
import postRepository from '../repository/postRepository.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const createPostService = async (data) => {
  return await postRepository.create(data);
};

export const getAllPostsService = async (page, limit) => {
  const posts = await postRepository.getAll(
    {},
    [
      { path: 'user', select: 'fullName username avatar' },
      {
        path: 'likes',
        select: 'user onModel',
        populate: { path: 'user', select: 'fullName username avatar' }
      }
    ],
    '-__v',
    page,
    limit
  );
  const totalPosts = await postRepository.countAllPosts();
  const totalPages = Math.ceil(totalPosts / limit);
  const meta = { totalPosts, totalPages, page, limit };
  return { data: posts, meta };
};

export const getAllPostsByUserService = async (
  userId,
  page,
  limit,
  sortOption = { updatedAt: -1 }
) => {
  const posts = await postRepository.getAllPostsByUserId(
    userId,
    page,
    limit,
    sortOption
  );
  const totalPosts = await postRepository.countAllPosts({ user: userId });
  const totalPages = Math.ceil(totalPosts / limit);
  const meta = { totalPosts, totalPages, page, limit };
  return { data: posts, meta };
};

export const getPostByIdService = async (postId) => {
  return await postRepository.getById(postId);
};

export const updatePostService = async (postId, data) => {
  return await postRepository.update(postId, data);
};

export const deletePostService = async (postId, userId) => {
  const post = await postRepository.getById(postId);
  if (!post) {
    return null;
  }
  if (post.user.toString() !== userId) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      ErrorCodes.UNAUTHORIZED,
      'Unauthorized to delete post',
      {},
      {
        inputData: { postId, userId }
      }
    );
  }
  // TODO: Delete post image from cloudinary
  // TODO: delete all comments and likes of the post

  return await postRepository.delete(postId);
};

export const generateSignedUrlService = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000 + 60);
  const signature = cloudinaryConfig.utils.api_sign_request(
    { timestamp },
    configs.CLOUDINARY_API_SECRET
  );
  return { signature, timestamp };
};
