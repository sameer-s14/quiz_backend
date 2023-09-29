import { RequestHandler } from "express";
import { injectable } from "tsyringe";
import { QuestionsRepository, OptionsRepository } from "./../repositories";
import {
  handleError,
  isUser,
  setSuccessResponse,
  validateObjectId,
} from "../utils";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../constants";
import { prepareInsertOptionsArray } from "../helpers";
import { RequestWithUser } from "../interfaces";

@injectable()
export class QuestionsController {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly optionsRepository: OptionsRepository
  ) {}

  public createQuestions: RequestHandler = async (req, res, next) => {
    try {
      const { text, topicId, level, options } = req.body;
      const questionExists = await this.questionsRepository.getQuestion({
        text,
      });

      if (questionExists) throw new Error(ERROR_MESSAGES.ALREADY_EXIST);

      const questionCreated = await this.questionsRepository.saveQuestion({
        text,
        topicId,
        level,
      });
      const optionsData = prepareInsertOptionsArray(
        questionCreated?.id,
        options
      );
      await this.optionsRepository.createBulkOptions(optionsData);
      return res.json(setSuccessResponse(RESPONSE_MESSAGES.CREATED));
    } catch (error) {
      handleError("QuestionsController :: createQuestions", error);
      next(error);
    }
  };

  public getAllQuestions: RequestHandler = async (req, res, next) => {
    try {
      const questions = await this.questionsRepository.getAllQuestions({
        ...(isUser((req as RequestWithUser).user?.role) && { isActive: true }),
      });
      return res.json(setSuccessResponse(undefined, questions));
    } catch (error) {
      handleError("QuestionsController :: getAllQuestions", error);
      next(error);
    }
  };

  public editQuestions: RequestHandler = async (req, res, next) => {
    try {
      const { id: _id } = req.params;
      if (!validateObjectId(_id)) throw new Error("id is invalid");
      const { text, topicId, options } = req.body;
      const questionFound = await this.questionsRepository.getQuestion({ _id });

      if (!questionFound) throw new Error(ERROR_MESSAGES.NOT_EXISTS);

      if (text) questionFound.text = text;
      if (topicId) questionFound.topicId = topicId;

      await questionFound.save();
      await this.optionsRepository.updateOptionsInBulk(options);

      return res.json(setSuccessResponse(RESPONSE_MESSAGES.UPDATED));
    } catch (error) {
      handleError("QuestionsController :: editQuestions", error);
      next(error);
    }
  };

  public getQuestion: RequestHandler = async (req, res, next) => {
    try {
      const [questionFound] = await this.questionsRepository.getAllQuestions({
        _id: req?.params?.id,
      });

      return res.json(setSuccessResponse(undefined, questionFound ?? {}));
    } catch (error) {
      handleError("QuestionsController :: getQuestion", error);
      next(error);
    }
  };

  public deleteQuestion: RequestHandler = async (req, res, next) => {
    try {
      const { id: questionId } = req.params;
      const questionFound = await this.questionsRepository.getQuestion({
        _id: questionId,
      });

      if (!questionFound) throw new Error(ERROR_MESSAGES.NOT_EXISTS);

      await this.questionsRepository.deleteQuestions(questionId);
      await this.optionsRepository.deleteOptionsByQuestionId(questionId);

      return res.json(setSuccessResponse());
    } catch (error) {
      handleError("QuestionsController :: deleteQuestion", error);
      next(error);
    }
  };
}
