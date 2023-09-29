export enum LEVELS {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPERT = "expert",
}

export const questionsDefaultProjection = [
  "id",
  "text",
  "level",
  "topicId",
  "isActive",
  "createdAt",
  "options.text",
  "options.isActive",
  "options.isCorrect",
  "options.createdAt",
  "options._id",
];
