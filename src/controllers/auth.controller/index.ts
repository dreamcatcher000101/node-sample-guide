import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import httpStatus from "http-status";

import { userService } from "../../services";

import { IUser } from "../../models";

import { MESSAGES } from "../../consts";

import { APIError, ResponseHandler } from "../../utils";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, password } = req.body;
    const userData: IUser = { fullname, email, password };

    const users = await userService.readUsers({ email });
    if (users.length) {
      throw new APIError(httpStatus.BAD_REQUEST, MESSAGES.USER.EMAIL_EXISTS);
    }

    const newUser = await userService.createUser(userData);
    ResponseHandler.success(res, { user: newUser });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const emailUser = await userService.readEmailUserWithPassword(email);
    if (!emailUser) {
      throw new APIError(
        httpStatus.BAD_REQUEST,
        MESSAGES.USER.EMAIL_NOT_EXISTS
      );
    }

    if (!emailUser.validatePassword(password)) {
      throw new APIError(
        httpStatus.BAD_REQUEST,
        MESSAGES.USER.PASSWORD_INCORRECT
      );
    }

    const { user, token } = emailUser.toAuthJSON();

    ResponseHandler.success(res, { user, token });
  } catch (error) {
    next(error);
  }
};
