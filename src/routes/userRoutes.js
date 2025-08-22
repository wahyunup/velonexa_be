import {
  getAllUser,
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

const router = express.Router();

router.get("/users", authToken, getAllUser);
router.get("/user", authToken, getSingleUser);
router.patch("/user/upload-image", authToken, upload.single("file"), createProfileImage);
router.get("/user-detail/:id", getUserDetail);
router.post("/users", registerUser);
router.post("/users/login", login);
router.patch("/user/edit", authToken, setEditUser);
router.patch("/users/logout", logout);

export default router;
