import { setSuccessResponse } from "./../utils/common";
import { TopicsRepository } from "./../repositories";
import { injectable } from "tsyringe";
import { handleError } from "../utils";
import { RequestHandler } from "express";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../constants";

@injectable()
export class TopicsController {
  constructor(private readonly topicsRepository: TopicsRepository) {}

  public createTopic: RequestHandler = async (req, res, next) => {
    try {
      const { parentId, text } = req.body;
      const topicExists = await this.topicsRepository
        .getTopic({
          text,
        })
        .lean(); // returns POJO and not the whole document instance reducing size

      if (topicExists) throw new Error(ERROR_MESSAGES.ALREADY_EXIST);

      await this.topicsRepository.saveTopic({
        text,
        ...(parentId && { parentId }),
      });
      return res.json(setSuccessResponse(RESPONSE_MESSAGES.CREATED));
    } catch (error) {
      handleError("TopicsController :: createTopic", error);
      next(error);
    }
  };

  public getAllTopic: RequestHandler = async (req, res, next) => {
    try {
      const topics = await this.topicsRepository
        .getAllTopics({
          ...(req.query?.parentId && {
            parentId: req.query?.parentId as string,
          }),
        })
        .select("id text")
        .lean(); // returns POJO and not the whole document instance reducing size

      return res.json(setSuccessResponse(undefined, topics));
    } catch (error) {
      handleError("TopicsController :: getAllTopic", error);
      next(error);
    }
  };

  public editTopics: RequestHandler = async (req, res, next) => {
    try {
      const { id: _id } = req.params;
      const { text, parentId } = req.body;
      const topicFound = await this.topicsRepository.getTopic({ _id });
      if (!topicFound) throw new Error(ERROR_MESSAGES.NOT_EXISTS);

      if (text) topicFound.text = text;
      if (parentId) topicFound.parentId = parentId;
      await topicFound.save();
      return res.json(setSuccessResponse(RESPONSE_MESSAGES.UPDATED));
    } catch (error) {
      handleError("TopicsController :: getAllTopic", error);
      next(error);
    }
  };

  public getTopic: RequestHandler = async (req, res, next) => {
    try {
      const topic = await this.topicsRepository
        .getTopic({
          _id: req?.params?.id,
        })
        .select("id text isActive")
        .lean(); // returns POJO and not the whole document instance reducing size

      return res.json(setSuccessResponse(undefined, topic ?? {}));
    } catch (error) {
      handleError("TopicsController :: getAllTopic", error);
      next(error);
    }
  };

  public deleteTopic: RequestHandler = async (req, res, next) => {
    try {
      await this.topicsRepository.deleteTopic(req?.params?.id);
      return res.json(setSuccessResponse());
    } catch (error) {
      handleError("TopicsController :: getAllTopic", error);
      next(error);
    }
  };
}
