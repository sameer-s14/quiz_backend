import { configs } from "./../configs/configs";
import mongoose from "mongoose";
import { MONGOOSE_EVENTS } from "../constants/db.constants";
import { handleMongooseLogs } from "../utils";

export const connectDatabase = () => {
  return mongoose.connect(configs.MONGO_URI);
};
// HANDLE THE CONNECTING EVENT
mongoose.connection.on(
  MONGOOSE_EVENTS.CONNECTING,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.CONNECTING)
);

// HANDLE THE CLOSED EVENT
mongoose.connection.on(
  MONGOOSE_EVENTS.CLOSED,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.CLOSED)
);

// Handle the connected event
mongoose.connection.on(
  MONGOOSE_EVENTS.CONNECTED,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.CONNECTED)
);

// Handle the DISCONNECTED event
mongoose.connection.on(
  MONGOOSE_EVENTS.DISCONNECTED,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.DISCONNECTED)
);

// Handle the DISCONNECTING event
mongoose.connection.on(
  MONGOOSE_EVENTS.DISCONNECTING,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.DISCONNECTING)
);

// Trying to reconnect
mongoose.connection.on(
  MONGOOSE_EVENTS.RECONNECTING,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.RECONNECTING)
);

// Trying error event
mongoose.connection.on(
  MONGOOSE_EVENTS.ERROR,
  handleMongooseLogs.bind(null, MONGOOSE_EVENTS.ERROR)
);
