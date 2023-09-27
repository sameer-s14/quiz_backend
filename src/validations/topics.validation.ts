import Joi from "joi";
import { injectable } from 'tsyringe';
import { BaseValidation } from "./baseValidation";

@injectable()
export class TopicsValidations extends BaseValidation {
  public create = this.validateRequest(
    Joi.object({
      text: Joi.string().required(),
      parentId: Joi.string().optional()
    })
  );

  public update = this.validateRequest(
    Joi.object({
        text: Joi.string().optional(),
        parentId: Joi.string().optional()
      })
  );
}
