import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostDetailsController,
  getUserPostsController,
  searchPostController,
  updatePostController,
} from "../controllers/postController.js";
const router = express.Router();

//create
router.post("/create", createPostController);

//update
router.put("/update/:id", updatePostController);

//delete
router.delete("/:id", deletePostController);

//get user posts
router.get("/user/:userId", getUserPostsController);

//get all posts
router.get("/", getAllPostsController);

//get post details
router.get("/:postId", getPostDetailsController);

//search posts
router.get("/search/:keyword", searchPostController);

export default router;
