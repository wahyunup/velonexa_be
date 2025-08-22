import express from "express"
import { authToken } from "../middleware/authMIddleware.js"
import { createChats, getAllChatCurentUser, getChats } from "../controllers/chatController.js"
const router = express()

router.get("/chat/:target_id", authToken ,getChats)
router.get("/chats", authToken ,getAllChatCurentUser)
router.post("/chat/:target_id", authToken ,createChats)

export default router