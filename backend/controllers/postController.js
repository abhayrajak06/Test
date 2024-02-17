import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPostController = async (req, res) => {
  try {
    // Check if the user is authenticated (token stored in localStorage)
    const token = localStorage.getItem("token");
    if (!token) {
      return res.status(401).json("Unauthorized");
    }
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePostController = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePostController = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//uploadImage
export const uploadImage = async (req, res) => {
  try {
    const result = await uploadOnCloudinary(req.files.image.path);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
