import { createKeepAliveController, selectKeepAlive } from "../controllers/keepaliveController.js";

import express from "express";

const router = express();

router.get("/keepalive/:id", selectKeepAlive);
router.post("/keepalive", createKeepAliveController);

export default router;
