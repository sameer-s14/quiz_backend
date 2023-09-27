import { model, Schema } from "mongoose";
import { DB_Model, IOptions } from "../interfaces";

const optionSchema = new Schema(
  {
    text: {
      type: String, // answer text
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export const Options = model<DB_Model<IOptions>>("options", optionSchema);
