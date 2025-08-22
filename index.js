import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket/index.js";

dotenv.config();

const app = express();

// ✅ Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api", router);

// ✅ Setup socket.io (hanya jalan kalau bukan di Vercel serverless)
let server;
if (process.env.NODE_ENV !== "production") {
  server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  socketHandler(io);

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("welcome to velonexa 🤠");
    console.log(`velonexa is running on port ${port} 🚀`);
  });
}

// ✅ Export ke Vercel
export default app;
