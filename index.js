import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express()

dotenv.config()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());
app.use(router)


const port = 3001
app.listen(port, () => {
  console.log("welcome to velonexa 🤠");
  console.log(`velonexa is running on port ${port} 🚀`);
})

export default app