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

const router = express();

router.get("/feeds",authToken, getAllFeed);
router.get("/feeds-explore", getAllFeedExplore);
router.post("/feed", authToken, upload.single("file"), createUserFeed);
router.post("/feed/like/:feed_id", authToken, likeFeed);
router.get("/feed/likes/:feed_id", authToken, getLike);
router.patch("/feed/:id", editUserFeed);
router.delete("/feed/:id", deletedUserFeed);

export default router;
