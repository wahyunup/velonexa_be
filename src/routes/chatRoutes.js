import express from "express"
import { authToken } from "../middleware/authMIddleware.js"
import { createChat, getChats } from "../controllers/chatController.js"
const router = express()

router.get("/chat", authToken ,getChats)
router.post("/chat", authToken ,createChat)

export default router