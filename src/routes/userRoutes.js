import { getAllUser, registerUser, login } from "../controllers/userController.js";
import express from "express"

const router = express.Router()

router.get("/users", getAllUser)
router.post("/users", registerUser)
router.post("/users/login", login)

export default router