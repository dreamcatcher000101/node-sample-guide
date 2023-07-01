import { Request, Response } from "express";
import { param } from "express-validator";
import httpStatus from "http-status";

import { AuthRequest } from "types";

import { errorHandlerWrapper } from "utils";

// type Params = {
//   id: string;
// };
// type ResBody = unknown;
// type ReqBody = unknown;
// type ReqQuery = unknown;

export const readUserValidator = () => {
  return [param("id").notEmpty().withMessage("User id is required")];
};

const readUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(httpStatus.OK).json({ id });
};

export const readUser = errorHandlerWrapper(readUserHandler);
