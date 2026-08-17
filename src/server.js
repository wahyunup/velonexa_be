import http from "http";
import { Server } from "socket.io";
import app from "./index.js";
import { socketHandler } from "../socket/index.js";

const port = Number(process.env.PORT) || 3001;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://velonexa.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  transports: ["websocket", "polling"],
});

socketHandler(io);

httpServer.listen(port, () => {
  console.log(`Velonexa API is running on port ${port}`);
});
