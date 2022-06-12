import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import httpStatus from "http-status";

import { userService } from "../../services";

import { IUser } from "../../models";

import { MESSAGES } from "../../consts";

import { APIError, ResponseHandler } from "../../utils";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, password } = req.body;
    const userData: IUser = { fullname, email, password };

    const users = await userService.readUsers({ email });
    if (users.length) {
      throw new APIError(httpStatus.BAD_REQUEST, MESSAGES.USER.EMAIL_EXIST);
    }

    const newUser = await userService.createUser(userData);
    ResponseHandler.success(res, { user: newUser });
  } catch (error) {
    next(error);
  }
};

export const readUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname } = req.query;

    if (fullname && (fullname as string).length > 30) {
      throw new APIError(
        httpStatus.BAD_REQUEST,
        MESSAGES.USER.LONG_SEARCH_FULLNAME
      );
    }

    let searchData: any = {};
    if (fullname) searchData.fullname = new RegExp(String(fullname));

    const filteredUsers = await userService.readUsers(searchData);
    ResponseHandler.success(res, {
      users: filteredUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      throw new APIError(httpStatus.BAD_REQUEST, MESSAGES.USER.INVALID_ID);
    }

    const userId = new Types.ObjectId(req.params.id);
    const { fullname, email, password } = req.body;

    const user = await userService.readCertainUser(userId);
    if (!user) {
      throw new APIError(httpStatus.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
    }

    let userData: IUser = {};
    if (fullname) userData.fullname = fullname;
    if (email) userData.email = email;
    if (password) userData.password = password;

    const updatedUser = await userService.updateUser(userId, userData);
    ResponseHandler.success(res, { user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      throw new APIError(httpStatus.BAD_REQUEST, MESSAGES.USER.INVALID_ID);
    }

    const userId = new Types.ObjectId(req.params.id);

    const user = await userService.readCertainUser(userId);
    if (!user) {
      throw new APIError(httpStatus.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
    }

    await userService.deleteUser(userId);
    ResponseHandler.success(res, {});
  } catch (error) {
    next(error);
  }
};

export const readCertainUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      throw new APIError(httpStatus.BAD_REQUEST, MESSAGES.USER.INVALID_ID);
    }

    const userId = new Types.ObjectId(req.params.id);

    const user = await userService.readCertainUser(userId);
    if (!user) {
      throw new APIError(httpStatus.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
    }

    ResponseHandler.success(res, { user });
  } catch (error) {
    next(error);
  }
};
