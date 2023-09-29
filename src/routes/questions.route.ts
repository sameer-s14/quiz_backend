import { authMiddleware, validateRoles } from "./../middlewares";
import { Router } from "express";
import { injectable, container } from "tsyringe";
import { QuestionsController } from "../controllers";
import { Routes } from "../interfaces";
import { QuestionsValidations } from "../validations";
import { RoutesConstants, USER_ROLES } from "../constants";

@injectable()
class Route implements Routes {
  private readonly path = RoutesConstants.QUESTIONS;
  public router = Router();

  constructor(
    private readonly questionController: QuestionsController,
    private readonly questionValidations: QuestionsValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create a new Question
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.questionValidations.create,
      this.questionController.createQuestions
    );

    // Get all Question
    this.router.get(
      `${this.path}`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.questionController.getAllQuestions
    );

    // Get Question By Id
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.questionController.getQuestion
    );

    // Edit Question
    this.router.put(
      `${this.path}`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.questionValidations.create,
      this.questionController.editQuestions
    );

    //Delete Question
    this.router.delete(
      `${this.path}`,
      authMiddleware,
      validateRoles(USER_ROLES.ADMIN),
      this.questionController.deleteQuestion
    );
  }
}

export const QuestionsRoute = container.resolve(Route);
