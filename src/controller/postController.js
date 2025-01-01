import { StatusCodes } from 'http-status-codes';

import {
  createPostService,
  generateSignedUrlService,
  getAllPostsService
} from '../service/postService.js';
import SuccessResponse from '../utils/common/successResponse.js';

export const createPost = async (req, res, next) => {
  try {
    const post = await createPostService({
      caption: req.body.caption,
      image: req.body.image,
      user: req.user.id
    });

    return res.status(StatusCodes.CREATED).json(
      new SuccessResponse(StatusCodes.CREATED, 'Post created successfully', {
        post: post
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { data,meta } = await getAllPostsService(page, limit);
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'success', {
        posts: data,
        meta
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};

export const generateSignedUrl = async (req, res, next) => {
  try {
    const data = await generateSignedUrlService();
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Signed url generated successfully', {
        signature: data.signature,
        timestamp: data.timestamp
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};
