import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

import { errorHandlerWrapper } from "utils";

// type Params = unknown;
// type ResBody = unknown;
// type ReqBody = {
//   fullname: string;
//   email: string;
//   password: string;
// };
// type ReqQuery = unknown;

export const createUserValidator = () => {
  return [
    body("fullname").notEmpty().withMessage("User full name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const createUserHandler = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;

  res.status(httpStatus.OK).json({ fullname, email, password });
};

export const createUser = errorHandlerWrapper(createUserHandler);
