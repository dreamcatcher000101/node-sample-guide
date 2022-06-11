import { Request, Response } from "express";
import { Types } from "mongoose";

import { userService } from "../../services";

import { IUser } from "../../models";

import { ResponseHandler } from "../../utils";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;
    const userData: IUser = { fullname, email, password };

    const users = await userService.readUsers({ email });
    if (users.length) {
      ResponseHandler.failure(res, {
        status: 403,
        description: "User email is existed! Please sign in!",
      });
      return;
    }

    const newUser = await userService.createUser(userData);
    ResponseHandler.success(res, { user: newUser });
  } catch (error) {
    ResponseHandler.failure(res, {
      status: 403,
      description: "code",
    });
  }
};

export const readUsers = async (req: Request, res: Response) => {
  try {
    const { fullname, email } = req.query;

    let searchData: any = {};
    if (fullname) searchData.fullname = new RegExp(String(fullname));
    if (email) searchData.email = new RegExp(String(email));

    const filteredUsers = await userService.readUsers(searchData);
    ResponseHandler.success(res, {
      users: filteredUsers,
    });
  } catch (error) {
    ResponseHandler.failure(res, {
      status: 403,
      description: "code",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const { fullname, email, password } = req.body;

    let userData: IUser = {};
    if (fullname) userData.fullname = fullname;
    if (email) userData.email = email;
    if (password) userData.password = password;

    const updatedUser = await userService.updateUser(userId, userData);
    ResponseHandler.success(res, { user: updatedUser });
  } catch (error) {
    ResponseHandler.failure(res, {
      status: 403,
      description: "code",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id);

    await userService.deleteUser(userId);
    ResponseHandler.success(res, {});
  } catch (error) {
    ResponseHandler.failure(res, {
      status: 403,
      description: "code",
    });
  }
};

export const readCertainUser = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id);

    const user = await userService.readCertainUser(userId);
    if (!user) {
      ResponseHandler.failure(res, {
        status: 403,
        description: "code",
      });
      return;
    }

    ResponseHandler.success(res, { user });
  } catch (error) {
    ResponseHandler.failure(res, {
      status: 403,
      description: "code",
    });
  }
};
