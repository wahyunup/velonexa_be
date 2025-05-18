import express from "express"
import feedRoutes from "../routes/feedRoutes.js"
import userRoutes from "../routes/userRoutes.js"

const router = express.Router()

router.use(feedRoutes, userRoutes)

export default router