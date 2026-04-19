import { PostModel, FolderModel, AnswerModel, FollowupModel } from "./model.js";
import EnrollmentModel from "../enrollments/model.js";
import { v4 as uuidv4 } from "uuid";

export function PazzaDao() {

  function findPostsForCourse(courseId) {
    return PostModel.find({ course: courseId }).sort({ createdAt: -1 });
  }

  function findPostById(postId) {
    return PostModel.findById(postId);
  }

  function createPost(courseId, authorId, authorRole, authorName, { type, postTo, folders, summary, details }) {
    return PostModel.create({
      _id: uuidv4(),
      course: courseId,
      author: authorId,
      authorRole: authorRole || "STUDENT",
      authorName: authorName || "Unknown",
      type,
      postTo,
      folders,
      summary,
      details,
      views: 0,
      viewedBy: [],
      answers: [],
      followups: [],
      createdAt: new Date(),
    });
  }

  async function getCourseStats(courseId, userId) {
    const posts = await PostModel.find({ course: courseId });
    const postIds = posts.map(p => p._id);

    const unreadCount = userId
      ? posts.filter(p => !p.viewedBy?.includes(userId)).length
      : posts.length;

    const unansweredQuestions = posts.filter(p =>
      p.type === "QUESTION" && (!p.answers || p.answers.length === 0)
    ).length;

    const allAnswers   = await AnswerModel.find({ post: { $in: postIds } });
    const allFollowups = await FollowupModel.find({ post: { $in: postIds } });

    let instructorResponses = allAnswers.filter(a => a.role === "INSTRUCTOR").length;
    let studentResponses    = allAnswers.filter(a => a.role === "STUDENT").length;


    for (const followup of allFollowups) {
      if (followup.authorRole === "INSTRUCTOR") instructorResponses++;
      else studentResponses++;

      for (const reply of followup.replies || []) {
        if (reply.authorRole === "INSTRUCTOR") instructorResponses++;
        else studentResponses++;
      }
    }

    const enrollments = await EnrollmentModel.find({
      course: courseId,
      status: "ENROLLED",
    });
    
    const studentsEnrolled = enrollments.length;

    return {
      unreadCount,
      unansweredQuestions,
      instructorResponses,
      studentResponses,
      studentsEnrolled,
    };
  }

  function deletePost(postId) {
    return PostModel.deleteOne({ _id: postId });
  }

  async function findPostWithDetails(postId) {
    const post = await PostModel.findOne({ _id: postId }).lean();
    if (!post) return null;
    const answers   = await AnswerModel.find({ post: postId }).sort({ createdAt: 1 });
    const followups = await FollowupModel.find({ post: postId }).sort({ createdAt: 1 });
    return { ...post, answers, followups };
  }

  async function createAnswer(postId, authorId, authorName, role, content) {
    const answer = await AnswerModel.create({
      _id: uuidv4(),
      post: postId,
      author: authorId,
      authorName: authorName || "Unknown",
      role,
      content,
      createdAt: new Date(),
    });
    // Push answer ID onto the post's answers array
    await PostModel.updateOne({ _id: postId }, { $push: { answers: answer._id } });
    return answer;
  }

  function deleteAnswer(answerId) {
    return AnswerModel.deleteOne({ _id: answerId });
  }

  async function createFollowup(postId, authorId, authorName, authorRole, content) {
    const followup = await FollowupModel.create({
      _id: uuidv4(),
      post: postId,
      author: authorId,
      authorName: authorName || "Unknown",
      authorRole,
      content,
      isResolved: false,
      replies: [],
      createdAt: new Date(),
    });
    // Push followup ID onto the post's followups array
    await PostModel.updateOne({ _id: postId }, { $push: { followups: followup._id } });
    return followup;
  }

  function deleteFollowup(followupId) {
    return FollowupModel.deleteOne({ _id: followupId });
  }

  async function addReply(followupId, authorId, authorName, authorRole, content) {
    const reply = {
      author: authorId,
      authorName: authorName || "Unknown",
      authorRole,
      content,
      createdAt: new Date(),
    };
    const updated = await FollowupModel.findOneAndUpdate(
      { _id: followupId },
      { $push: { replies: reply } },
      { new: true }
    );
    return updated;
  }

  async function deleteReply(followupId, replyId) {
    const updated = await FollowupModel.findOneAndUpdate(
      { _id: followupId },
      { $pull: { replies: { _id: replyId } } },
      { new: true }
    );
    return updated;
  }

  return {
    findPostsForCourse, findPostById, createPost, getCourseStats,
    deletePost, findPostWithDetails,
    createAnswer, deleteAnswer,
    createFollowup, deleteFollowup,
    addReply, deleteReply,
  };

}

export function FoldersDao() {
  const createFolder = (courseId, folderName) => {
    return FolderModel.create({
      _id: uuidv4(),
      course: courseId,
      name: folderName,
    });
  };

  const findFoldersForCourse = (courseId) => {
    return FolderModel.find({ course: courseId });
  };

  const deleteFolders = (folderIds) => {
    return FolderModel.deleteMany({ _id: { $in: folderIds } });
  };

  const updateFolder = (folderId, newName) => {
    return FolderModel.updateOne(
      { _id: folderId },
      { $set: { name: newName } }
    );
  };

  return { createFolder, findFoldersForCourse, deleteFolders, updateFolder };
}