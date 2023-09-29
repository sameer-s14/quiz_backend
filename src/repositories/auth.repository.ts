import { USER_ROLES } from './../constants/common.constants';
import { injectable } from "tsyringe";
import { userModel } from "../database";
import { IUser } from "./../interfaces/user.interface";

injectable();
export class AuthRepository {
  //Function to get user data

  getUserData = (where: Partial<Pick<IUser, "email" | "id" | "_id">>) => {
    return userModel.findOne({ ...where });
  };

  //Function to save User Data
  saveUserData = (
    userData: Pick<IUser, "email" | "password" | "firstName" | "lastName">
  ): Promise<IUser> => {
    return userModel.create(userData);
  };

  updateUsersDetails = (
    findOptions: Partial<Pick<IUser, "email" | "_id">>,
    data: Partial<Pick<IUser, "email" | "password" | "isActive">>
  ) => {
    return userModel
      .findOneAndUpdate(findOptions, data, { new: true })
      .select("+password");
  };
}
