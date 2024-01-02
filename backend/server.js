import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

//config env
dotenv.config();

//config database
connectDB();

//middlewares
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
