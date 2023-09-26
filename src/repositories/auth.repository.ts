import { userModel } from "../database";
import { IUser } from "./../interfaces/user.interface";

export class AuthRepository {
  //Function to get user data

  getUserData = (where: { email?: string }) => {
    return userModel.findOne({ ...where });
  };

  //Function to save User Data
  saveUserData = (
    userData: Pick<IUser, "email" | "password" | "firstName" | "lastName">
  ): Promise<IUser> => {
    return userModel.create(userData);
  };
}

export const authRepository = new AuthRepository();
