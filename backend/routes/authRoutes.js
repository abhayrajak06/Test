import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authControllers.js";

const router = express.Router();

//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Logout
router.get("/logout", logoutController);

export default router;
