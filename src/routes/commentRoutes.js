import { getCommentLikes, getComments, handleLikeComment, createFeedComment } from "../controllers/commentController.js";
import { authToken } from "../middleware/authMIddleware.js";

import express from "express";

const router = express();

router.get("/comments/feed/:feedId", authToken, getComments);
router.get("/comments/like/:commentId", authToken, getCommentLikes);
router.post("/comments/feed/:feedId", authToken, createFeedComment);
router.post("/comments/feed/:feedId/like/:commentId", authToken, handleLikeComment);

export default router;