import {getToken } from "../controllers/refreshToken.js";
import express from "express"

const router = express.Router()

router.get("/token", getToken)

export default router