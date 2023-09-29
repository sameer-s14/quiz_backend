import { Request, RequestHandler, Router } from "express";
import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface Routes {
  // path: string;
  router: Router;
}

export interface IResponse<T = unknown> {
  status?: boolean;
  message?: string;
  data?: T;
}

export interface BaseModel {
  _id?: string;
  id?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DB_Model<model> = model & Omit<BaseModel, "_id"> & Document;

export interface RequestWithUser extends Request {
  user: IUser;
}
