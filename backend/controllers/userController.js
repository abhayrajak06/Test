import User from "../models/User.js";
import { hashPassword } from "../helpers/authHelper.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const updateUserController = async (req, res) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return res.status(401).json("Unauthorized");
    }
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUserController = async (req, res) => {
  try {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    // Your authentication logic here

    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });

    localStorage.removeItem("token");

    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserController = async (req, res) => {
  try {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      return res.status(401).json("Unauthorized");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { password, ...info } = user?._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};
