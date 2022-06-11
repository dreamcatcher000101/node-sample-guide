import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";

import { APIError, ResponseHandler } from "../utils";

const errorHandlerMiddleware = (err: any, req: Request, res: Response) => {
  let error = err;
  if (!(error instanceof APIError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new APIError(statusCode, message as string, err.stack);
  }
  ResponseHandler.failure(res, error);
};

export default errorHandlerMiddleware;
