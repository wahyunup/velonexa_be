import { ratelimit } from "../lib/ratelimit.js";

export const rl = {
  auth: ratelimit(5 * 60 * 1000, 8),
  feeds: ratelimit(1 * 60 * 1000, 60),
};
