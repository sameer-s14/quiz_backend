import { MONGOOSE_EVENTS, MONGOOSE_EVENTS_LOGS_MESSAGES } from "../constants";
import { logs } from "../helpers";

export const getEnv = (key: string) => {
  const envValue = process.env[key];
  if (!envValue) {
    throw new Error(`${key} is not defined in env`);
  }
  return envValue;
};

export const handleMongooseLogs = (event: MONGOOSE_EVENTS): void => {
  if (event === MONGOOSE_EVENTS.CLOSED)
    logs.green(MONGOOSE_EVENTS_LOGS_MESSAGES.CLOSED);
  if (event === MONGOOSE_EVENTS.CONNECTED)
    logs.green(MONGOOSE_EVENTS_LOGS_MESSAGES.CONNECTED);
  if (event === MONGOOSE_EVENTS.CONNECTING)
    logs.green(MONGOOSE_EVENTS_LOGS_MESSAGES.CONNECTING);
  if (event === MONGOOSE_EVENTS.DISCONNECTED)
    logs.red(MONGOOSE_EVENTS_LOGS_MESSAGES.DISCONNECTED);
  if (event === MONGOOSE_EVENTS.DISCONNECTING)
    logs.red(MONGOOSE_EVENTS_LOGS_MESSAGES.DISCONNECTING);
  if (event === MONGOOSE_EVENTS.ERROR)
    logs.red(MONGOOSE_EVENTS_LOGS_MESSAGES.ERROR);
  if (event === MONGOOSE_EVENTS.RECONNECTING)
    logs.green(MONGOOSE_EVENTS_LOGS_MESSAGES.RECONNECTING);
};
