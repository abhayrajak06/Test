import User from "../models/User.js";
import { hashPassword } from "../helpers/authHelper.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const updateUserController = async (req, res) => {
  try {
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
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user?._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};
