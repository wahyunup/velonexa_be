import {
  getAllFeed,
  createUserFeed,
  deletedUserFeed,
  editUserFeed,
  likeFeed,
  getLike

} from "../controllers/feedController.js";
import {authToken} from "../middleware/authMIddleware.js"

import express from "express";

const router = express();

router.get("/feeds", getAllFeed);
router.post("/feed", authToken, createUserFeed);
router.post("/feed/like/:feed_id", authToken, likeFeed);
router.get("/feed/likes/:feed_id",authToken, getLike);
router.patch("/feed/:id", editUserFeed);
router.delete("/feed/:id", deletedUserFeed);

export default router;
