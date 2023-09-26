import { Router } from "express";
import { injectable, container } from "tsyringe";
import { AuthController } from "../controllers";
import { Routes } from "../interfaces";
import { AuthValidations } from "../validations";

@injectable()
class Route implements Routes {
  public path = `/`;
  public router = Router();

  constructor(
    private readonly authController: AuthController,
    private readonly authValidation: AuthValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}signup`,
      this.authValidation.signUp,
      this.authController.signUp
    );
  }
}

export const AuthRoute = container.resolve(Route);
