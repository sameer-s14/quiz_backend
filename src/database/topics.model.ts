import { model, Schema } from "mongoose";
import { LEAN_PLUGINS } from "../constants";
import { DB_Model, ITopics } from "../interfaces";

const topicSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId, // parentId: This will show if the topic is a subtopic or not
      ref: "topics",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

// topicSchema.plugin(require(LEAN_PLUGINS.VIRTUALS));
export const Topics = model<DB_Model<ITopics>>("topics", topicSchema);
