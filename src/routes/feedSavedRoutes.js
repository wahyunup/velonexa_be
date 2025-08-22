import express from "express";
import { authToken } from "../middleware/authMIddleware.js";
import { getAllFeedSaved, getFeedSavedlogin, savedFeed } from "../controllers/saveFeedController.js";

const router = express();

router.get("/bookmark/:actor_id", authToken, getAllFeedSaved);
router.get("/bookmarks", authToken, getFeedSavedlogin);
router.post("/bookmark-feed/:feed_id", authToken, savedFeed);

export default router