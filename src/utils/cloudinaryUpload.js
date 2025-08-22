import { cloudinary } from "../config/cloudinary.js";
import { Readable } from "stream";

export const cloudinaryUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "velonexa/feed_image",
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          console.log("Cloudinary upload success:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    Readable.from(fileBuffer).pipe(stream);
  });
};

export const cloudinaryUploadProfile = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "velonexa/profile_image",
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          console.log("Cloudinary upload success:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    Readable.from(fileBuffer).pipe(stream);
  });
};
