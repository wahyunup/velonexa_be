import express from "express"
import feedRoutes from "../routes/feedRoutes.js"
import userRoutes from "../routes/userRoutes.js"
import RefreshToken  from "../routes/refreshTokenRoutes.js"

const router = express.Router()

router.use(feedRoutes, userRoutes, RefreshToken)

export default router