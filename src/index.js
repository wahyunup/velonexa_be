import "dotenv/config";
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://velonexa.vercel.app",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(router);
app.use(notFound);
app.use(errorHandler);

export default app;
