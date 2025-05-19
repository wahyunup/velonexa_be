import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv"
import cors from "cors"

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express()

dotenv.config()
app.use(express.json());
app.use(router)
app.use(cors(corsOptions))


const port = 3001
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})

export default app