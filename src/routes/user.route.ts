import express from "express";

import { userController } from "controllers";

const userRouter = express.Router();

userRouter.post(
  "/user",
  userController.createUserValidator(),
  userController.createUser
);
userRouter.get(
  "/user",
  userController.readUsersValidator(),
  userController.readUsers
);
userRouter.put(
  "/user:id",
  userController.updateUserValidator(),
  userController.updateUser
);
userRouter.delete(
  "/user:id",
  userController.deleteUserValidator(),
  userController.deleteUser
);
userRouter.get(
  "/user/:id",
  userController.readUserValidator(),
  userController.readUser
);

export { userRouter };
