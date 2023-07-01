import express from "express";

import { userController } from "controllers";

const userRouter = express.Router();

userRouter.post("/user", userController.createUser);
userRouter.get("/user", userController.readUsers);
userRouter.put("/user:id", userController.updateUser);
userRouter.delete("/user:id", userController.deleteUser);
userRouter.get("/user/:id", userController.readCertainUser);

export { userRouter };
