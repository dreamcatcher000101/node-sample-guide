import httpStatus from "http-status";

export class CustomError extends Error {
  errorCode: number;
  reasonCode?: string;

  constructor(
    message: string,
    errorCode: number = httpStatus.BAD_REQUEST,
    reasonCode?: string
  ) {
    super();

    this.message = message;

    this.errorCode = errorCode;

    this.errorCode = errorCode;
    this.reasonCode = reasonCode;
  }
}
