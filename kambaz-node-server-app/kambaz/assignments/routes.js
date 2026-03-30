import AssignmentsDao from "./dao.js";

export default function AssignmentsRoute(app, db) {
  const dao = AssignmentsDao(db);

  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { cid } = req.params;
    const assignments = dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const findAssignmentById = (req, res) => {
    const { aid } = req.params;
    const assignment = dao.findAssignmentById(aid);
    res.json(assignment);
  };

  const createAssignment = (req, res) => {
    const { cid } = req.params;
    const assignment = req.body;
    const newAssignment = dao.createAssignment(cid, assignment);
    res.json(newAssignment);
  };

  const deleteAssignment = (req, res) => {
    const { aid } = req.params;
    dao.deleteAssignment(aid);
    res.sendStatus(204);
  };

  const updateAssignment = (req, res) => {
    const { aid } = req.params;
    const updates = req.body;
    const updated = dao.updateAssignment(aid, updates);
    res.json(updated);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
}