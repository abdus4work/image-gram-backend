import { StatusCodes } from 'http-status-codes';

import {
  createLikeService,
  deleteLikeService
} from '../service/likeService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const createLike = async (req, res, next) => {
  try {
    const { onModel, likeableId } = req.body;
    const user = req.user.id;
    if (!onModel || !likeableId) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        'onModel and likeableId are required',
        {},
        {
          inputData: req.body
        }
      );
    }
    const data = {
      user,
      onModel,
      likeableId
    };
    const like = await createLikeService(data);
    res.status(StatusCodes.CREATED).json(
      new SuccessResponse(StatusCodes.CREATED, 'Like created successfully', {
        like: like
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};

export const deleteLike = async (req, res, next) => {
  try {
    const id = req.params.likeId;
    const userId = req.user.id;
    if (!id) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        'Like id is required',
        {},
        {
          inputData: req.params
        }
      );
    }
    const like = await deleteLikeService(id, userId);
    res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Like deleted successfully', {
        like: like
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};
