import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { NotFoundError, UnauthorizedError } from "errors";

import { IUser } from "models";

import { userService } from "services";

import { Env } from "utils";

export const authenticationMiddleware = async (
  req: Request & {
    user?: IUser;
  },
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "") ?? "";
    console.log(token);
    const data = jwt.verify(token, Env.getEnvironmentVariable("JWT_TOKEN"));
    console.log(data);

    const user = await userService.readUser({
      id: (data as { id: string }).id,
    });

    if (!user) {
      throw new NotFoundError("User is not exist!");
    }
    req.user = user;

    next();
  } catch (error) {
    next(new UnauthorizedError("Unauthorized"));
  }
};
