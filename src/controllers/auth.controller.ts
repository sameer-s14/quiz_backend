import { RequestHandler } from "express";
import { authRepository } from "../repositories";
import { handleError, setSuccessResponse } from "../utils";

/**
 * @description This controller is responsible for the authentication part in this application
 */
export class AuthController {
  public signUp: RequestHandler = async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const userFound = await authRepository.getUserData({ email });
      if (userFound) {
        throw new Error(`This email ${email} already exists`);
      }
      const savedData = await authRepository.saveUserData({
        email,
        password,
        firstName,
        lastName,
      });

      return res.json(
        setSuccessResponse("Sign Up Successfully", { id: savedData?.id })
      );
    } catch (error) {
      handleError("AuthController :: signUp", error);
      next(error);
    }
  };
}
