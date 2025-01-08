import { StatusCodes } from 'http-status-codes';

import likeRepository from '../repository/likeRepository.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';
import { getCommentByIdService, updateCommentService } from './commentService.js';
import { getPostByIdService, updatePostService } from './postService.js';

export const createLikeService = async (data) => {
  const likeable = await fetchLikeable(data.onModel, data.likeableId);
  if (!likeable) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Likeable not found',
      {},
      { inputData: data }
    );
  }
  const existingLike = await likeRepository.getAll({
    user: data.user,
    likeableId: data.likeableId
  });
  if (existingLike.length > 0) {
    throw new CustomError(
      StatusCodes.CONFLICT,
      ErrorCodes.DUPLICATE_KEY,
      'Like already exists',
      {},
      { inputData: data }
    );
  }

  const like = await likeRepository.create(data);
  await addLikeToLikeable(like,likeable);
  return like;
};

export const deleteLikeService = async (id, userId) => {
  const like = await likeRepository.getById(id);
  if (!like) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Like not found',
      {},
      { inputData: id }
    );
  }

  if (like.user.toString() !== userId) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      ErrorCodes.UNAUTHORIZED,
      'You are not authorized to delete this like',
      {},
      { inputData: id }
    );
  }

  return await likeRepository.delete(id);
};

const addLikeToLikeable = async (like,likeable) => {
  likeable.likes.push(like._id);
  await likeable.save();
};


export const fetchLikeable = async (onModel, likeableId) => {
  if(onModel === 'Post') {
    return await getPostByIdService(likeableId);
  }
  else if (onModel === 'Comment') {
    return await getCommentByIdService(likeableId);
  }
}