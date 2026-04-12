import model from "./model.js";

export default function AssignmentsDao() {
  async function findAllAssignments() {
    return await model.find();
  }

  async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
  }

  async function findAssignmentById(assignmentId) {
    return await model.findById(assignmentId);
  }

  async function createAssignment(courseId, assignment) {
    return await model.create({
      ...assignment,
      course: courseId,
    });
  }

  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    return await model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }

  return {
    findAllAssignments,
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}