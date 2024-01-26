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
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

//create
router.post("/create", verifyToken, createPostController);

//update
router.put("/update/:id", verifyToken, updatePostController);

//delete
router.delete("/:id", deletePostController);

//get user posts
router.get("/user/:userId", verifyToken, getUserPostsController);

//get all posts
router.get("/", getAllPostsController);

//get post details
router.get("/:postId", getPostDetailsController);

//search posts
router.get("/search/:keyword", searchPostController);

export default router;
