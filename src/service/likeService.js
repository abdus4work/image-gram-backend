import { StatusCodes } from 'http-status-codes';

import likeRepository from '../repository/likeRepository.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';
import { updatePostService } from './postService.js';

export const createLikeService = async (data) => {
  const existingLike = await likeRepository.getAll({
    user: data.userId,
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
  await addLikeToLikeable(like);
  return like;
};

const addLikeToLikeable = async (like) =>{
  if(like.onModel === 'Post'){
    await updatePostService(like.likeableId,{$push:{likes:like._id}});
  }
  else if (like.onModel === 'Comment'){
    // TODO add like to comment
  }
}