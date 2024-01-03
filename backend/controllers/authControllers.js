import User from "../models/User.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const match = await comparePassword(req.body.password, user?.password);
    if (!match) {
      return res.status(401).json("Wrong email or password");
    }
    const token = JWT.sign({ id: user?._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    const { password, ...info } = user?._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logoutController = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("Logged out successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};
