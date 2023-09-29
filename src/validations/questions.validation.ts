import Joi from "joi";
import { injectable } from "tsyringe";
import { LEVELS, ObjectIdRegex, OPTIONS_COUNT } from "../constants";
import { getEnumValues } from "../utils";
import { BaseValidation } from "./baseValidation";

@injectable()
export class QuestionsValidations extends BaseValidation {
  private readonly createValidationSchema = Joi.object({
    text: Joi.string().required(),
    topicId: Joi.string().required(),
    level: Joi.string()
      .required()
      .valid(...getEnumValues(LEVELS)),
    options: Joi.array()
      .length(OPTIONS_COUNT)
      .items(
        Joi.object({
          text: Joi.string().required(),
          isCorrect: Joi.boolean().default(false).required(),
        })
      )
      .required(),
  });
  public create = this.validateRequest(this.createValidationSchema);

  private readonly updateValidations = Joi.object({
    text: Joi.string(),
    topicId: Joi.string(),
    level: Joi.string().valid(...getEnumValues(LEVELS)),
    options: Joi.array()
      .length(OPTIONS_COUNT)
      .items(
        Joi.object({
          text: Joi.string(),
          isCorrect: Joi.boolean().default(false),
          id: Joi.string().regex(ObjectIdRegex),
        })
      ),
  });

  public update = this.validateRequest(this.updateValidations);
}
