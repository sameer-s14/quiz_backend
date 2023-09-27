import { RequestHandler } from "express";
import { injectable } from "tsyringe";
import { AuthRepository } from "../repositories";
import { JwtService } from "../services";
import { handleError, setSuccessResponse } from "../utils";
/**
 * @description This controller is responsible for the authentication part in this application
 */

@injectable()
export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

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

  public login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userFound = await this.authRepository
        .getUserData({ email })
        .select("+password");
      if (!userFound || !(await userFound?.matchPassword(password))) {
        throw new Error(`Invalid Email or Password`);
      }
      return res.json(
        setSuccessResponse(
          "Sign Up Successfully",
          this.jwtService.createToken({ id: userFound?.id })
        )
      );
    } catch (error) {
      handleError("AuthController :: signUp", error);
      next(error);
    }
  };

  public getUsersProfile: RequestHandler = async (req, res, next) => {
    try {
      const userFound = await this.authRepository
        .getUserData({ _id: (req as any)?.user?.id })
        .select("firstName lastName email isVerified isActive");
      return res.json(setSuccessResponse("Sign Up Successfully", userFound));
    } catch (error) {
      handleError("AuthController :: signUp", error);
      next(error);
    }
  };
}
