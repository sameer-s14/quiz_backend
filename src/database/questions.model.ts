import { model, Schema } from "mongoose";
import { LEVELS } from "../constants";
import { DB_Model, IQuestion } from "../interfaces";

const questionSchema = new Schema(
  {
    text: {
      type: String, // question text
      required: true,
    },
    level: {
      type: String, // Level of question to be shown to user
      enum: LEVELS,
      required: true,
    },
    topicId: {
      type: Schema.Types.ObjectId, // topicId: belongs to which topic
      ref: "topics",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export const Questions = model<DB_Model<IQuestion>>("questions", questionSchema);

