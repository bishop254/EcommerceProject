import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./../config/config.env" });

export const upload_file = (file, folder) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,

      {
        resource_type: "auto",
        folder,
      },
      (err, result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      }
    );
  });
};

export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);

  if (res?.result === "ok") return true;
};
