import { StatusCodes } from 'http-status-codes';

import {
  createCommentService,
  deleteCommentService
} from '../service/commentService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const createComment = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user.id;
    const comment = await createCommentService({ ...data, user });
    res.status(StatusCodes.CREATED).json(
      new SuccessResponse(StatusCodes.CREATED, 'Comment created successfully', {
        comment: comment
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};



export const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.commentId;
    const userId = req.user.id;
    if (!id) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        'Comment id is required',
        {},
        {
          inputData: req.params
        }
      );
    }
    const comment = await deleteCommentService(id, userId);
    res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Comment deleted successfully', {
        comment: comment
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};
