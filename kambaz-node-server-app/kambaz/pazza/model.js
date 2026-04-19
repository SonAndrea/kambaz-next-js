import mongoose from "mongoose";
import { postSchema, folderSchema, answerSchema, followupSchema } from "./schema.js";

export const PostModel = mongoose.model("PostModel", postSchema);
export const FolderModel = mongoose.model("FolderModel", folderSchema);
export const AnswerModel = mongoose.model("AnswerModel", answerSchema);
export const FollowupModel = mongoose.model("FollowupModel", followupSchema);