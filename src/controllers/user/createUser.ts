import Express, { Response } from "express";
import httpStatus from "http-status";

import { errorHandlerWrapper } from "utils";

export const createUserValidator = () => {
  return [];
};

export interface Request extends Express.Request {
  session: any;
}

let count = 0;

const createUserHandler = async (req: Request, res: Response) => {
  console.log("session:", req.session);

  req.session.userId = ++count;

  console.log("session:", req.session);

  res.status(httpStatus.OK).json({});
};

export const createUser = errorHandlerWrapper(createUserHandler);
