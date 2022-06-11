class APIError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string, stack: any = "") {
    super(message);

    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this);
    }
  }
}

export default APIError;
