class SuccessResponse {
  constructor(statusCode = 200, message = 'Success', data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  sendResponse() {
    return {
      success: true,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp
    };
  }
}

export default SuccessResponse;
