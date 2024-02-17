import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostDetailsController,
  getUserPostsController,
  searchPostController,
  updatePostController,
  uploadImage,
} from "../controllers/postController.js";
import verifyToken from "../middlewares/verifyToken.js";
import formidable from "express-formidable";

const router = express.Router();

// Create a new post
router.post("/", verifyToken, createPostController);

// Update a post
router.put("/update/:id", verifyToken, updatePostController);

// Delete a post
router.delete("/:id", deletePostController);

// Get posts created by a specific user
router.get("/user/:userId", verifyToken, getUserPostsController);

// Get all posts
router.get("/", getAllPostsController);

// Get details of a specific post
router.get("/:postId", getPostDetailsController);

// Search posts by keyword
router.get("/search/:keyword", searchPostController);

// Upload an image for a post
router.post(
  "/upload-image",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);

export default router;
