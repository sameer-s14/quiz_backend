export const enum MONGOOSE_EVENTS {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  DISCONNECTING = "disconnecting", // Your app called Connection#close() to disconnect from MongoDB
  DISCONNECTED = "disconnected", //This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
  CLOSED = "close",
  RECONNECTING = "reconnected", //Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected.
  ERROR = "error",
}

export const enum MONGOOSE_EVENTS_LOGS_MESSAGES {
  CONNECTING = "Database is trying to connect .....",
  CONNECTED = "Database connected successfully",
  DISCONNECTING = "Database is loosing connection ....",
  DISCONNECTED = "Database is disconnected !!",
  CLOSED = "Database is closed successfully !!",
  RECONNECTING = "Database reconnected successfully !!",
  ERROR = "An Error occurred in Database ::",
}
