import multer from "multer";
//image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Specify the filename
  },
});

export const upload = multer({ storage });
