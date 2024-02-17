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
router.post("/", verifyToken, createCommentController);

// Get comments for a specific post
router.get("/:postId", getAllCommentsController);

// Update a comment
router.put("/:cId", verifyToken, updateCommentController);

// Delete a comment
router.delete("/:cId", verifyToken, deleteCommentController);

export default router;
