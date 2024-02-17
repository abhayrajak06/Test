import express from "express";
import {
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Update user details
router.put("/:id", verifyToken, updateUserController);

// Delete user account
router.delete("/:id", verifyToken, deleteUserController);

// Get user details
router.get("/:id", getUserController);

export default router;
