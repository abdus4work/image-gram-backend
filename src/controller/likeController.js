import ErrorCodes from '../utils/error/errorCodes.js';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/error/customError.js';
import { createLikeService } from '../service/likeService.js';
import SuccessResponse from '../utils/common/successResponse.js';


export const createLike = async (req,res,next) =>{
  try{
    const {onModel, likeableId} = req.body;
    const user = req.user.id;
    if(!onModel || !likeableId){
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
    }
    const like = await createLikeService(data);
    res.status(StatusCodes.CREATED).json(
      new SuccessResponse(
        StatusCodes.CREATED,
        'Like created successfully',
        {
          like: like
        }
      ).sendResponse()
    )

  }catch (err){
    next(err);
  }
}