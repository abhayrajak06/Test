import express from "express";
import {
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/userController.js";
const router = express.Router();

//update
router.put("/:id", updateUserController);

//delete
router.delete("/:id", deleteUserController);

//get user
router.get("/:id", getUserController);

export default router;
