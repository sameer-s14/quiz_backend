import { injectable } from "tsyringe";
import { Topics } from "../database";
import { BaseModel, DB_Model, ITopics } from "../interfaces";

injectable();
export class TopicsRepository {
  getTopic = (where: Pick<ITopics, "parentId" | "text"> & { _id?: string }) => {
    return Topics.findOne({ ...where });
  };

  saveTopic = (
    topicData: Pick<ITopics & BaseModel, "parentId" | "text" | "isActive">
  ): Promise<DB_Model<ITopics>> => {
    return Topics.create(topicData);
  };

  getAllTopics = (where: { parentId?: string; isActive?: boolean } = {}) => {
    return Topics.find({ isActive: true, ...where });
  };

  updateTopic = (
    id: string,
    topicData: Pick<ITopics & BaseModel, "parentId" | "text" | "isActive">
  ) => {
    return Topics.updateOne({ _id: id }, topicData);
  };

  deleteTopic = (_id: string) => Topics.deleteOne({ _id });
}
