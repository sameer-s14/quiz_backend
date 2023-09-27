import { authMiddleware } from "./../middlewares/auth.middleware";
import { Router } from "express";
import { injectable, container } from "tsyringe";
import { AuthController, TopicsController } from "../controllers";
import { Routes } from "../interfaces";
import { AuthValidations, TopicsValidations } from "../validations";
import { RoutesConstants } from "../constants";

@injectable()
class Route implements Routes {
  public path = "/";
  public router = Router();

  constructor(
    private readonly topicsController: TopicsController,
    private readonly topicsValidation: TopicsValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}topics`,
      authMiddleware,
      this.topicsValidation.create,
      this.topicsController.createTopic
    );

    this.router.put(
      `${this.path}topics/:id`,
      authMiddleware,
      this.topicsValidation.update,
      this.topicsController.editTopics
    );

    this.router.get(
      `${this.path}topics`,
      authMiddleware,
      this.topicsController.getAllTopic
    );

    this.router.get(
      `${this.path}topics/:id`,
      authMiddleware,
      this.topicsController.getTopic
    );

    this.router.delete(
      `${this.path}topics/:id`,
      authMiddleware,
      this.topicsController.deleteTopic
    );
  }
}

export const TopicsRoute = container.resolve(Route);
