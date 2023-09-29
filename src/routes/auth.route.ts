import { authMiddleware } from "./../middlewares/auth.middleware";
import { Router } from "express";
import { injectable, container } from "tsyringe";
import { AuthController } from "../controllers";
import { Routes } from "../interfaces";
import { AuthValidations } from "../validations";

@injectable()
class Route implements Routes {
  private readonly path = `/`;
  public router = Router();

  constructor(
    private readonly authController: AuthController,
    private readonly authValidation: AuthValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Sign Up Route
    this.router.post(
      `${this.path}signup`,
      this.authValidation.signUp,
      this.authController.signUp
    );

    // Log In Route
    this.router.post(
      `${this.path}login`,
      this.authValidation.login,
      this.authController.login
    );

    // Get Users Details

    this.router.get(
      `${this.path}user-profile`,
      authMiddleware,
      this.authController.getUsersProfile
    );
  }
}

export const AuthRoute = container.resolve(Route);
