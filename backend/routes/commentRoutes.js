import express from "express";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  updateCommentController,
} from "../controllers/commentController.js";

const router = express.Router();

//create
router.post("/create", createCommentController);

//get post comments
router.get("/comments/:postId", getAllCommentsController);

//update comment
router.put("/update/:cId", updateCommentController);

//delete comment
router.delete("/delete/:cId", deleteCommentController);

export default router;
