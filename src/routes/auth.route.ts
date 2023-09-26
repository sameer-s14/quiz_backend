import { Router } from "express";
import { AuthController } from "../controllers";
import { Routes } from "../interfaces";
import { AuthValidations } from "../validations";

class Route implements Routes {
  public path = `/`;
  public router = Router();
  public authController = new AuthController();
  private authValidation = new AuthValidations();

  constructor() {
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

export const AuthRoute = new Route();
