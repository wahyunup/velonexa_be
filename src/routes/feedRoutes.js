import {
  getAllFeed,
  createUserFeed,
  deletedUserFeed,
  editUserFeed,
  likeFeed,
  getLike,
  getAllFeedExplore,
} from "../controllers/feedController.js";
import { authToken } from "../middleware/authMIddleware.js";

import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { rl } from "../middleware/rateLimit.js";

const router = express();

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

router.get("/feeds", rl.feeds, authToken, getAllFeed);
router.get("/feeds-explore", getAllFeedExplore);
router.post(
  "/feed",
  authToken,
  upload.single("file"),
  handleUploadError,
  createUserFeed,
);
router.post("/feed/like/:feed_id", authToken, likeFeed);
router.get("/feed/likes/:feed_id", authToken, getLike);
router.patch("/feed/:id", authToken, editUserFeed);
router.delete("/feed/:id", authToken, deletedUserFeed);

export default router;
