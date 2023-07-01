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

export const updateUserValidator = () => {
  return [param("id").notEmpty().withMessage("User id is required")];
};

const updateUserHandler = async (
  req: Request,
  // req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { id } = req.params;

  res.status(httpStatus.OK).json({ id });
};

export const updateUser = errorHandlerWrapper(updateUserHandler);
