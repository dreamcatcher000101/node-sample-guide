// node_modules
import express from "express";

// controllers
import { userController } from "../controllers";

// get router instance
const router = express.Router();

router.post("/user", userController.createUser);
router.get("/user", userController.readUsers);
router.put("/user:id", userController.updateUser);
router.delete("/user:id", userController.deleteUser);
router.get("/user/:id", userController.readCertainUser);

export default router;
