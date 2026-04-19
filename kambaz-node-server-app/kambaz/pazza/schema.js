import mongoose from "mongoose";

export const postSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel" },
    author: { type: String, ref: "UserModel" },
    authorRole: { type: String, enum: ["STUDENT", "INSTRUCTOR"], default: "STUDENT" },
    authorName: { type: String, default: "Unknown" },
    type: { type: String, enum: ["QUESTION", "NOTE"], default: "QUESTION" },
    postTo: { type: String, enum: ["ENTIRE_CLASS", "INDIVIDUAL"], default: "ENTIRE_CLASS" },
    visibleTo: [{ type: String, ref: "UserModel" }],
    folders: [String],
    summary: { type: String, required: true, maxLength: 100 },
    details: { type: String, required: true },
    views: { type: Number, default: 0 },
    viewedBy: [{ type: String, ref: "UserModel" }],
    answers: [{ type: String, ref: "AnswerModel" }],
    followups: [{ type: String, ref: "FollowupModel" }],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "posts" }
);

export const answerSchema = new mongoose.Schema(
  {
    _id: String,
    post: { type: String, ref: "PostModel" },
    author: { type: String, ref: "UserModel" },
    authorName: { type: String, default: "Unknown" },
    role: { type: String, enum: ["STUDENT", "INSTRUCTOR"] },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "answers" }
);

export const followupSchema = new mongoose.Schema(
  {
    _id: String,
    post: { type: String, ref: "PostModel" },
    author: { type: String, ref: "UserModel" },
    authorName: { type: String, default: "Unknown" },
    authorRole: { type: String, enum: ["STUDENT", "INSTRUCTOR"], default: "STUDENT" },
    content: { type: String, required: true },
    isResolved: { type: Boolean, default: false },
    replies: [
      {
        author: { type: String, ref: "UserModel" },
        authorName: { type: String, default: "Unknown" },
        authorRole: { type: String, enum: ["STUDENT", "INSTRUCTOR"], default: "STUDENT" },
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "followups" }
);

export const folderSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel" },
    name: { type: String, required: true },
  },
  { collection: "folders" }
);