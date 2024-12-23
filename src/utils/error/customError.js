import configs from '../../configs/serverConfig.js'

class CustomError extends Error{
  constructor(
    statusCode,
    errorCode='ERR_GENERIC',
    message='Something went wrong',
    details=null,
    data={}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.details = details;
    this.data =data;

    Error.captureStackTrace(this,this.constructor);
  }

  toJSON(){
    return {
      success: false,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      message: this.message,
      details: this.details,
      data: this.data,
      stackTrace: configs.NODE_ENV === 'development' ? this.stack : null
    }
  }
}

export default CustomError;