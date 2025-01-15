import { StatusCodes } from 'http-status-codes';

import {
  createPostService,
  deletePostService,
  generateSignedUrlService,
  getAllPostsService,
  getPostByIdService
} from '../service/postService.js';
import SuccessResponse from '../utils/common/successResponse.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';
import { getAllCommentsByCommentableService } from '../service/commentService.js';
import { getAllLikesByLikeableService } from '../service/likeService.js';

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
    const { data, meta } = await getAllPostsService(page, limit);
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

export const getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await getPostByIdService(postId);
    if (!post) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        ErrorCodes.RESOURCE_NOT_FOUND,
        'Post not found',
        {},
        {
          inputData: req.params
        }
      );
    }
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'success', {
        post: post
      }).sendResponse()
    );
  } catch (err) {
    next(err);
  }
};

export const getAllCommentsByPostId = async (req,res,next)=>{
  try{
    const postId = req.params.postId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if(!postId){
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        'Post id is required',
        {},
        {
          inputData: req.params
        }
      );
    }
    const {comments,meta} = await getAllCommentsByCommentableService('Post',postId,page,limit);

    res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Comments fetched successfully', {
        comments,
        meta
      }).sendResponse()
    );
  }catch(err){
    next(err);
  }
}

export const getAllLikesByPostId = async (req,res,next)=>{
  try{
    const postId = req.params.postId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if(!postId){
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        ErrorCodes.INVALID_INPUT,
        'Post id is required',
        {},
        {
          inputData: req.params
        }
      );
    }
    const data = await getAllLikesByLikeableService('Post',postId,page,limit);

    res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Likes fetched successfully', {
        data
      }).sendResponse()
    );
  }catch(err){
    next(err);
  }
}


export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await deletePostService(postId, req.user.id);
    if (!post) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        ErrorCodes.RESOURCE_NOT_FOUND,
        'Post not found',
        {},
        {
          inputData: req.params
        }
      );
    }
    return res.status(StatusCodes.OK).json(
      new SuccessResponse(StatusCodes.OK, 'Post deleted successfully', {
        post: post
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
    console.log(err);
    next(err);
  }
};
