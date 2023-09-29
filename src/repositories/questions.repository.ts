import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { questionsDefaultProjection } from "../constants";
import { Questions } from "../database";
import { BaseModel, DB_Model, IQuestion } from "../interfaces";
import { projection } from "../utils";

injectable();
export class QuestionsRepository {
  getQuestion = (
    where: Pick<IQuestion, "topicId" | "level" | "text"> & { _id?: string }
  ) => {
    return Questions.findOne({ ...where });
  };

  saveQuestion = (
    questionData: Pick<IQuestion & BaseModel, "topicId" | "level" | "text">
  ): Promise<DB_Model<IQuestion>> => {
    return Questions.create(questionData);
  };

  getAllQuestions = (findOptions: IQuestion & BaseModel = {}) => {
    const where = { ...findOptions };
    if(where?._id) where._id = new Types.ObjectId(where._id) as unknown as string;
    return Questions.aggregate([
      {
        $match: where,
      },
      {
        $lookup: {
          from: "options",
          localField: "_id",
          foreignField: "questionId",
          as: "options",
        },
      },
      {
        $project: {
          ...projection(...questionsDefaultProjection),
          id: "$_id",
          _id: 0,
        },
      },
      {
        $addFields: {
          options: {
            $map: {
              input: "$options",
              as: "options",
              in: {
                $mergeObjects: [
                  "$$options",
                  { id: "$$options._id" }, // Rename _id to id
                ],
              },
            },
          },
        },
      },
    ]);
  };

  updateQuestions = (
    id: string,
    QuestionsData: Pick<
      IQuestion & BaseModel,
      "topicId" | "level" | "text" | "isActive"
    >
  ) => {
    return Questions.updateOne({ _id: id }, QuestionsData);
  };

  deleteQuestions = (_id: string) => Questions.deleteOne({ _id });
}
