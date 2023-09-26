import { config } from "dotenv";
import { NODE_ENVS } from "../constants";
import { getEnv } from "../utils";

const NODE_ENV = process.env.NODE_ENV ?? NODE_ENVS.DEVELOPMENT;
config({
  path: `.env.${NODE_ENV}`,
});

export const configs = {
  PORT: +getEnv("PORT"),
  MONGO_URI: getEnv("MONGO_URI"),
  CORS: {
    ORIGIN: "*",
    CREDENTIALS: true,
  },
  NODE_ENV,
  SALT_ROUND: 10,
};
