import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import {
  ArgumentValidationError,
  CustomError,
  UnauthorizedError,
} from "errors";
import { Logger } from "utils";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(error);

  if (error instanceof CustomError) {
    if (error instanceof ArgumentValidationError) {
      return res.status(error.errorCode).json({
        message: error.messages,
        reason: error.reasonCode,
      });
    }
    if (error instanceof UnauthorizedError) {
      return res.status(error.errorCode).json({
        message: error.message,
        reason: error.reasonCode,
      });
    }
    return res.status(error.errorCode).json({
      message: error.message,
      reason: error.reasonCode,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: (error as Error).message,
  });
};
