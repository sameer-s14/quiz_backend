import { ErrorRequestHandler } from "express";
import { logs } from "../helpers";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  logs.red('Error From middleware: ' + err?.message)
  return res.json({
    status: false,
    message: err?.message ?? "Something went wrong !!",
    data: null,
  });
};
