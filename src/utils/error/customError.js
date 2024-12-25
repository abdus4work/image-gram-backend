class CustomError extends Error {
  constructor(
    statusCode,
    errorCode = 'ERR_GENERIC',
    message = 'Something went wrong',
    details = null,
    data = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.details = details;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
