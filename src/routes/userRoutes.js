import { getAllUser, registerUser, login ,logout} from "../controllers/userController.js";
import express from "express"
import { authToken } from "../middleware/authMIddleware.js";

const router = express.Router()

router.get("/users",authToken, getAllUser)
router.post("/users", registerUser)
router.post("/users/login", login)
router.patch("/users/logout", logout)

export default router