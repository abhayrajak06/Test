import express from "express";
import {
  loginController,
  logoutController,
  refetchUserController,
  registerController,
} from "../controllers/authControllers.js";

const router = express.Router();

// Register a new user
router.post("/register", registerController);

// Login user
router.post("/login", loginController);

// Logout user
router.get("/logout", logoutController);

// Refetch user data
router.get("/user", refetchUserController);

export default router;
