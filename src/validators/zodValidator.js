import { StatusCodes } from 'http-status-codes';

import { deleteImage } from '../utils/common/cloudinary.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (req.file) {
        const { result } = await deleteImage(req.file.filename);
        if (result === 'ok') {
          console.log('Image deleted successfully');
        } else {
          console.log('Error deleting image');
        }
      }
      if (err.errors?.[0].code === 'invalid_type') {
        next(
          new CustomError(
            StatusCodes.BAD_REQUEST,
            ErrorCodes.INVALID_INPUT,
            err.errors[0].path + ': ' + err.errors[0].message,
            err.errors[0].path + ' is missing or invalid',
            { inputData: req.body }
          )
        );
      }

      if (err.errors?.[0].code === 'too_small') {
        next(
          new CustomError(
            StatusCodes.BAD_REQUEST,
            ErrorCodes.INVALID_INPUT,
            err.errors[0].path + ': ' + err.errors[0].message,
            err.errors[0].path + ' is too small',
            { inputData: req.body }
          )
        );
      }

      next(
        new CustomError(
          StatusCodes.BAD_REQUEST,
          err.errors[0].code,
          err.errors[0].message
        )
      );
    }
  };
};
