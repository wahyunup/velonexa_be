import express from "express";
import { getByUser, create } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/notification", create);
router.get("/notification/:userId", getByUser);

export default router;
