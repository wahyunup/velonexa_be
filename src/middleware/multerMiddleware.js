import multer from "multer";

const storage = multer.memoryStorage();

// Allowed image MIME types
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    const error = new Error(
      `Invalid file type. Only JPEG, PNG, and WebP are allowed. Received: ${file.mimetype}`
    );
    error.code = "INVALID_FILE_TYPE";
    return cb(error);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});