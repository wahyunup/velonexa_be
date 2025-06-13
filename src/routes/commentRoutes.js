import { createComment, getFeedComments } from "../controllers/commentController.js";
import { authToken } from "../middleware/authMIddleware.js";

import express from "express";

const router = express();

router.get("/comments/feed/:feedId", authToken, getFeedComments);
router.post("/comments/feed/:feedId", authToken, createComment);

export default router;