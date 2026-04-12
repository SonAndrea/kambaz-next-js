import AssignmentsDao from "./dao.js";

export default function AssignmentsRoute(app) {
  const dao = AssignmentsDao();

  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { aid } = req.params;
    const assignment = await dao.findAssignmentById(aid);
    res.json(assignment);
  };

  const createAssignment = async (req, res) => {
    const { cid } = req.params;
    const assignment = req.body;
    const newAssignment = await dao.createAssignment(cid, assignment);
    res.json(newAssignment);
  };

  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    await dao.deleteAssignment(aid);
    res.sendStatus(204);
  };

  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const updates = req.body;
    await dao.updateAssignment(aid, updates);
    res.sendStatus(204);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
}