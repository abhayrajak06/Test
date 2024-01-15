import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import multer from "multer";

const app = express();

//config env
dotenv.config();

//config database
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);

//image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Specify the filename
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    // Additional logic for successful file upload

    res.status(200).json("Image has been uploaded successfully");
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Failed to upload image" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
