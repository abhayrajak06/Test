import express from "express";
import {
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

//update
router.put("/:id", verifyToken, updateUserController);

//delete
router.delete("/:id", verifyToken, deleteUserController);

//get user
router.get("/:id", getUserController);

export default router;
