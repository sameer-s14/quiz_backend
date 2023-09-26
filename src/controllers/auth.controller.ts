import { RequestHandler } from "express";
import { injectable } from "tsyringe";
import { AuthRepository, authRepository } from "../repositories";
import { handleError, setSuccessResponse } from "../utils";
/**
 * @description This controller is responsible for the authentication part in this application
 */

@injectable()
export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}
  public signUp: RequestHandler = async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const userFound = await this.authRepository.getUserData({ email });
      if (userFound) {
        throw new Error(`This email ${email} already exists`);
      }
      const savedData = await this.authRepository.saveUserData({
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
