import { StatusCodes } from 'http-status-codes';

import commentRepository from '../repository/commentRepository.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';
import { getPostByIdService, updatePostService } from './postService.js';

export const createCommentService = async (data) => {
  const commentable = await fetchCommentable(data.onModel, data.commentableId);
  if (!commentable) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Commentable not found',
      {},
      { inputData: data }
    );
  }

  const comment = await commentRepository.create(data);
  if (!comment) {
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ErrorCodes.INTERNAL_SERVER_ERROR,
      'Comment not created'
    );
  }

  await addCommentToCommentable(comment, commentable);
  return comment;
};

export const deleteCommentService = async (id, userId) => {
  const comment = await commentRepository.getById(id);
  if (!comment) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Comment not found',
      {},
      { inputData: id }
    );
  }

  if (comment.user.toString() !== userId) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      ErrorCodes.UNAUTHORIZED,
      'You are not authorized to delete this comment',
      {},
      { inputData: id }
    );
  }

  await commentRepository.delete(id);
};

export const updateCommentService = async (id, data) => {
  const comment = await commentRepository.update(id, data);
  if (!comment) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Comment not found',
      {},
      { inputData: id }
    );
  }
  return comment;
};

export const getCommentByIdService = async (id) => {
  const comment = await commentRepository.getById(id);
  if (!comment) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Comment not found',
      {},
      { inputData: id }
    );
  }
  return comment;
};

export const getAllCommentsByPostService = async (postId,page,limit)=>{
  const comments = await commentRepository.getAllCommentByPostId(postId,{createdAt: -1},page,limit);
  if (!comments) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.RESOURCE_NOT_FOUND,
      'Comments not found',
      {},
      { inputData: postId }
    );
  }

  const totalComments = await commentRepository.countComment({onModel:'Post',commentableId: postId});
  const totalPages = Math.ceil(totalComments / limit);
  const meta = { totalComments, totalPages, page, limit };

  return { data: comments, meta };
}

const addCommentToCommentable = async (comment, commentable) => {
  if (comment.onModel === 'Post') {
    commentable.comments.push(comment._id);
  } else if (comment.onModel === 'Comment') {
    commentable.replies.push(comment._id);
  }
  await commentable.save();
};

export const fetchCommentable = async (onModel, commentableId) => {
  if (onModel === 'Post') {
    return await getPostByIdService(commentableId);
  } else if (onModel === 'Comment') {
    return await getCommentByIdService(commentableId);
  }
};
