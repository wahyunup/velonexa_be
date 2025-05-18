import {
  getAllFeed,
  createUserFeed,
  deletedUserFeed,
  editUserFeed,
} from "../controllers/feedController.js";
import express from "express";

const router = express();

router.get("/feeds", getAllFeed);
router.post("/feed", createUserFeed);
router.patch("/feed/:id", editUserFeed);
router.delete("/feed/:id", deletedUserFeed);

export default router;
