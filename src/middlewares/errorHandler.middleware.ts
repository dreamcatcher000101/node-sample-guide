import { Request, Response } from "express";
import httpStatus from "http-status";

import { ArgumentValidationError, CustomError } from "errors";
import { Logger } from "utils";

export const errorHandlerMiddleware = (
  error: unknown,
  _req: Request,
  res: Response
) => {
  Logger.error(error);

  if (error instanceof CustomError) {
    if (error instanceof ArgumentValidationError) {
      res.status(error.errorCode).json({
        message: error.messages,
        reason: error.reasonCode,
      });
    } else {
      res.status(error.errorCode).json({
        message: error.message,
        reason: error.reasonCode,
      });
    }
    return;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: (error as Error).message,
  });
};
