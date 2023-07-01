import { Request, Response } from "express";
import { query } from "express-validator";
import httpStatus from "http-status";

// import { AuthRequest } from "types";

import { errorHandlerWrapper } from "utils";

// type Params = unknown;
// type ResBody = unknown;
// type ReqBody = unknown;
// type ReqQuery = {
//   fullname: string;
// };

export const readUsersValidator = () => {
  return [
    query("fullname").notEmpty().withMessage("User full name is required"),
  ];
};

const readUsersHandler = async (
  req: Request,
  // req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { fullname } = req.query;

  res.status(httpStatus.OK).json({ fullname });
};

export const readUsers = errorHandlerWrapper(readUsersHandler);
