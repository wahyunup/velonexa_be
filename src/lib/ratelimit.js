import { rateLimit } from "express-rate-limit";

export const ratelimit = (time, limits) => {
  return rateLimit({
    windowMs: time,
    limit: limits,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });
};
