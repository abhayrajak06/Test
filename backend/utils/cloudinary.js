import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config("../.env");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    //file has been uploaded successfully
    // console.log("File is uploaded on cloudinary", res.url);
    return res;
  } catch (error) {
    // fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
    // return null;
    console.log(error);
  }
};
