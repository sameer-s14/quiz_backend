import { authMiddleware, validateRoles } from "./../middlewares";
import { Router } from "express";
import { injectable, container } from "tsyringe";
import { TopicsController } from "../controllers";
import { Routes } from "../interfaces";
import { TopicsValidations } from "../validations";
import { RoutesConstants, USER_ROLES } from "../constants";

@injectable()
class Route implements Routes {
  private readonly path = RoutesConstants.TOPICS;
  public router = Router();

  constructor(
    private readonly topicsController: TopicsController,
    private readonly topicsValidation: TopicsValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.topicsValidation.create,
      this.topicsController.createTopic
    );

    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.topicsValidation.update,
      this.topicsController.editTopics
    );

    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.topicsController.getAllTopic
    );

    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.topicsController.getTopic
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.topicsController.deleteTopic
    );
  }
}

export const TopicsRoute = container.resolve(Route);
