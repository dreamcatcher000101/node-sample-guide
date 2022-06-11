import express from "express";

import userRouter from "./user.route";

const router = express.Router();

router.use("/users", userRouter);

export default router;
