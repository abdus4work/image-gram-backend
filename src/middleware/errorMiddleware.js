import { StatusCodes } from 'http-status-codes';
/* eslint-disable-next-line no-unused-vars */
export default function errorHandlingMiddleware(err, req, res, next) {
  console.error(err.message);
  return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errorCode: err.errorCode || 'ERR_GENERIC',
    message: err.message || 'Something went wrong',
    details: err.details,
    data: err.data,
    stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null
  });
}
