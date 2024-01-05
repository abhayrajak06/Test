import express from "express";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  updateCommentController,
} from "../controllers/commentController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

//create
router.post("/create", verifyToken, createCommentController);

//get post comments
router.get("/comments/:postId", getAllCommentsController);

//update comment
router.put("/update/:cId", verifyToken, updateCommentController);

//delete comment
router.delete("/delete/:cId", verifyToken, deleteCommentController);

export default router;
