import express from "express";
import { getByUser, create, readNotification } from "../controllers/notificationController.js";

import { authToken } from "../middleware/authMIddleware.js";
const router = express.Router();

router.post("/notification", authToken ,create);
router.get("/notifications", authToken ,getByUser);
router.patch("/notification/:notif_id/read-notif", authToken ,readNotification);

export default router;
