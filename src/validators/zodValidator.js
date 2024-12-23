import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const validate= (schema)=>{
  return async (req,res,next)=>{
    try{
      const validatedBody=await schema.parseAsync(req.body);
      req.body=validatedBody;
      next();
    }catch (err){
      if(err.errors?.[0].code==='invalid_type'){
        return res.status(StatusCodes.BAD_REQUEST).json(
          new CustomError(
            StatusCodes.BAD_REQUEST,
            ErrorCodes.INVALID_INPUT,
            err.errors[0].path+": "+err.errors[0].message,
            err.errors[0].path+" is missing or invalid",
            {inputData:req.body}
            )
        );
      }

      if(err.errors?.[0].code==='too_small'){
        return res.status(StatusCodes.BAD_REQUEST).json(
          new CustomError(
            StatusCodes.BAD_REQUEST,
            ErrorCodes.INVALID_INPUT,
            err.errors[0].path+": "+err.errors[0].message,
            err.errors[0].path+" is too small",
            {inputData:req.body}
            )
        );
      }

      return res.status(StatusCodes.BAD_REQUEST).json(
        new CustomError(StatusCodes.BAD_REQUEST,err.errors[0].code,err.errors[0].message)
      );
    }
  }
}