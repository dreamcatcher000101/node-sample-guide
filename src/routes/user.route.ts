import express from "express";

import { userController } from "controllers";

const userRouter = express.Router();

userRouter.post(
  "/user",
  userController.createUserValidator(),
  userController.createUser
);

export { userRouter };
