import express from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { registerController } from "../controllers/authControllers.js";

const router = express.Router();

//Register
router.post("/register", registerController);

//Login

//Logout

export default router;
