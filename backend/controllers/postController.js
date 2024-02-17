import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPostController = async (req, res) => {
  try {
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

//get post details
export const getPostDetailsController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all posts
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user posts
export const getUserPostsController = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Search a post
export const searchPostController = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword) {
      return res
        .status(400)
        .json({ error: "Please provide a keyword for searching." });
    }

    const searchPosts = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(searchPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
