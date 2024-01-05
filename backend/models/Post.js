import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    username: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
