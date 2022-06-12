import express from "express";

import { authController } from "../controllers";

const router = express.Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

export default router;
