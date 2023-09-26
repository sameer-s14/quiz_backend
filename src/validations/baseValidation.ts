import { NextFunction, Response, Request } from "express";
import Joi from "joi";
export class BaseValidation {
  protected validateRequest(
    schema: Joi.ObjectSchema,
    value: "body" | "query" | "params" = "body"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req[value]);
      if (error) {
        return next(
          new Error(
            error?.details[0]?.message?.replace(new RegExp(/\"/, "g"), "")
          )
        );
      }
      next();
    };
  }
}
