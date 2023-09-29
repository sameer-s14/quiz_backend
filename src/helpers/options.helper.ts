import { IOptions } from "../interfaces/model.interface";

export const prepareInsertOptionsArray = (
  questionId: string,
  options: IOptions[]
) => {
  return options.map((option) => ({
    text: option?.text,
    questionId: questionId,
    isCorrect: option?.isCorrect,
  }));
};
