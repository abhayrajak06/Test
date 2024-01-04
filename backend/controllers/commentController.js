import Comment from "../models/Comment.js";

export const createCommentController = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllCommentsController = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCommentController = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.cId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.cId);
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
