import { Document } from "mongoose";
import { USER_ROLES } from "../constants";
import { BaseModel } from "./common.interface";

export interface IUser extends Omit<BaseModel, "_id" | "id">, Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  role: USER_ROLES;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}
