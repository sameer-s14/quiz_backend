import { USER_ROLES } from "./../constants/common.constants";
import {
  MONGOOSE_EVENTS,
  MONGOOSE_EVENTS_LOGS_MESSAGES,
  ObjectIdRegex,
} from "../constants";
import { logs } from "../helpers";
import { IResponse } from "../interfaces";

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

// Function to return response object
export const initResponse = (): IResponse => {
  return {
    status: false,
    message: "",
    data: null,
  };
};

export const setSuccessResponse = (
  message = "Success",
  data: unknown = null
): IResponse => ({
  status: true,
  message,
  data,
});

export const handleError = (path: string, error: unknown) => {
  logs.red(`${path} :: ${(error as Error)?.message}`);
};

export const getEnumValues = (enumObj: any): string[] => Object.values(enumObj);

export const isUser = (role: USER_ROLES) => role === USER_ROLES.USER;

export const projection = (...keys: string[]) => {
  return keys.reduce((acc: Record<string, number>, curr: string) => {
    acc[curr] = 1;
    return acc;
  }, {});
};

export const validateObjectId = (id: string) => ObjectIdRegex.test(id);
