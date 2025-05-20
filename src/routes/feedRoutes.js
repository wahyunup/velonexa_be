import {
  getAllFeed,
  createUserFeed,
  deletedUserFeed,
  editUserFeed,
} from "../controllers/feedController.js";
import {authToken} from "../middleware/authMIddleware.js"

import express from "express";

const router = express();

router.get("/feeds", getAllFeed);
router.post("/feed", authToken, createUserFeed);
router.patch("/feed/:id", editUserFeed);
router.delete("/feed/:id", deletedUserFeed);

export default router;
