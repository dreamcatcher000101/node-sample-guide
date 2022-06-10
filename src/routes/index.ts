// node_modules
import express from "express";

// routes
import userRouter from "./user.route";

// get router instance
const router = express.Router();

router.use("/users", userRouter);

export default router;
