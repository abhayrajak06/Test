import express from "express";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  updateCommentController,
} from "../controllers/commentController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Create a new comment
router.post("/create", verifyToken, createCommentController);

// Get comments for a specific post
router.get("/comments/:postId", getAllCommentsController);

// Update a comment
router.put("/update/:cId", verifyToken, updateCommentController);

// Delete a comment
router.delete("/delete/:cId", verifyToken, deleteCommentController);

export default router;
