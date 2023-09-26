import { config } from "dotenv";
import { getEnv } from "../utils";
config();

export const configs = {
  PORT: getEnv("PORT"),
  MONGO_URI: getEnv("MONGO_URI"),
};