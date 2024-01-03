import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostDetailsController,
  getUserPostsController,
  updatePostController,
} from "../controllers/postController.js";
const router = express.Router();

//create
router.post("/create", createPostController);

//update
router.put("/:id", updatePostController);

//delete
router.delete("/:id", deletePostController);

//get user posts
router.get("/:userId", getUserPostsController);

//get all posts
router.get("/", getAllPostsController);

//get post details
router.get("/:postId", getPostDetailsController);

export default router;
