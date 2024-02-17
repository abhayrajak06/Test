import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authControllers.js";

const router = express.Router();

// Register a new user
router.post("/register", registerController);

// Login user
router.post("/login", loginController);

// Logout user
router.get("/logout", logoutController);

export default router;
