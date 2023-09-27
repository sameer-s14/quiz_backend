import { LEVELS } from "../constants";

export interface IQuestion {
  text?: string;
  level?: LEVELS;
  topicId?: string;
}

export interface ITopics {
  text?: string;
  parentId?: string;
}

export interface IOptions {
  text?: string;
  questionId?: string;
  isCorrect?: boolean;
}
