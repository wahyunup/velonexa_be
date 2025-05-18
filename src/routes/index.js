import express from "express"
import feedRoutes from "../routes/feedRoutes.js"

const router = express.Router()

router.use(feedRoutes)

export default router