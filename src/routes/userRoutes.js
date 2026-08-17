import {
  getAllUser,
  searchUsers,
  registerUser,
  login,
  logout,
  getSingleUser,
  setEditUser,
  getUserDetail,
  createProfileImage,
} from "../controllers/userController.js";
import express from "express";
import { authToken } from "../middleware/authMIddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
import { rl } from "../middleware/rateLimit.js";

const router = express.Router();

// Error handler for multer
const handleUploadError = (err, req, res, next) => {
  if (err && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ msg: "file size exceeds 5MB limit" });
  }
  if (err && err.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({ msg: err.message });
  }
  if (err) {
    return res
      .status(400)
      .json({ msg: "file upload error", error: err.message });
  }
  next();
};

router.get("/users", authToken, getAllUser);
router.get("/users/search", authToken, searchUsers);
router.get("/user", authToken, getSingleUser);
router.patch(
  "/user/upload-image",
  authToken,
  upload.single("file"),
  handleUploadError,
  createProfileImage,
);
router.get("/user-detail/:id", getUserDetail);
router.post("/users", rl.auth, registerUser);
router.post("/users/login", rl.auth, login);
router.patch("/user/edit", authToken, setEditUser);
router.patch("/users/logout", logout);

export default router;
