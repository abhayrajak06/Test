import mongoose from "mongoose";

const defaultPhotos = [
  "https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg?w=996&t=st=1707809935~exp=1707810535~hmac=c147a4356dd562f19a7ddf3eb01822093c5ef21097767a16edace1917ec807ca",
  "https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955259.jpg?w=740&t=st=1707809973~exp=1707810573~hmac=267ca4e2259402b217559d807744f8eb9862bee57b8b3b483088aacd78621ed2",
  "https://img.freepik.com/free-vector/organic-flat-creativity-illustration-with-people_23-2148955257.jpg?w=740&t=st=1707810060~exp=1707810660~hmac=699aada12661f58ad4c310d28ee796bb67694898cbbc65ecb0065bf9880f6623",
  "https://img.freepik.com/premium-vector/organic-flat-online-marketing-illustration_23-2148955254.jpg?w=740",
  "https://img.freepik.com/free-photo/notepad-laptop-concept_23-2147982614.jpg?w=996&t=st=1707810204~exp=1707810804~hmac=1a83f7a36b5f94823f8c3163ff7659f0af08520e62d541e8fb8681f97817fe9b",
];

const getRandomPhoto = () => {
  const randomIndex = Math.floor(Math.random() * defaultPhotos.length);
  return defaultPhotos[randomIndex];
};

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: getRandomPhoto,
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
