import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import http from "http";
import { Server } from "socket.io";
import { notificationSocket } from "./socket/notificationSocket.js";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

notificationSocket(io);

dotenv.config();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {
  console.log("socket konekkk ----------> ", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket diskonekk --------->", socket.id);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log("welcome to velonexa 🤠");
  console.log(`velonexa is running on port ${port} 🚀`);
});

// export default app;
