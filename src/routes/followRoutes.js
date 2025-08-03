import { getfollows, follow, unfollow, getfollowsUser, getfollowerUser} from "../controllers/followController.js";
import { authToken } from "../middleware/authMIddleware.js";

import express from "express";

const router = express();

router.get("/follows/", authToken, getfollows);
router.get("/follows/:target_id", authToken, getfollowsUser);
router.get("/follower/:target_id", authToken, getfollowerUser);
router.post("/follow/:target_id", authToken, follow);
router.delete("/unfollow/:target_id", authToken, unfollow);


export default router;