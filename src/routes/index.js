import express from "express";
import feedRoutes from "../routes/feedRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import commentRoutes from "../routes/commentRoutes.js";
import RefreshToken from "../routes/refreshTokenRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import followRoutes from "../routes/followRoutes.js";
import chatRoutes from "../routes/chatRoutes.js";
import feedSavedRoutes from "../routes/feedSavedRoutes.js"
import keepaliveRoute from "../routes/keepaliveRoute.js";

const router = express.Router();

router.use(
  feedRoutes,
  userRoutes,
  RefreshToken,
  commentRoutes,
  notificationRoutes,
  followRoutes,
  chatRoutes,
  feedSavedRoutes,
  keepaliveRoute
);

export default router;
