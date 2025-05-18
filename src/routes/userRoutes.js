import { getAllUser, registerUser } from "../controllers/userController.js";
import express from "express"

const router = express.Router()

router.get("/users", getAllUser)
router.post("/users", registerUser)

export default router