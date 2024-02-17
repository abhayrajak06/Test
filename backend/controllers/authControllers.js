import User from "../models/User.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import dotenv from "dotenv";

dotenv.config("../.env");

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
    const token = JWT.sign(
      { _id: user?._id, username: user?.username },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );
    const { password, ...info } = user?._doc;
    // Store token in localStorage
    localStorage.setItem("token", token);
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logoutController = async (req, res) => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("token");
    res.status(200).json("Logged out successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const refetchUserController = async (req, res) => {
  try {
    const token = localStorage.getItem("token");

    JWT.verify(token, process.env.SECRET, {}, async (err, data) => {
      if (err) {
        return res.status(404).json(err);
      }
      res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};
