import { Document } from "mongoose";
import { USER_ROLES } from "../constants";

export interface BaseModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Omit<BaseModel, '_id'>, Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  role: USER_ROLES;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
