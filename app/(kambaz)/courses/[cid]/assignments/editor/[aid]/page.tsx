"use client";
import * as db from "../../../../../database";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Col, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const thisAssignment = db.assignments.find(
    (assignment) => assignment._id === aid && assignment.course === cid,
  );

  if (!thisAssignment) return <div>This assignment does not exist</div>;

  return (
    <div id="wd-assignments-editor">
      <FormLabel column sm={2}>
        Assignment Name
      </FormLabel>
      <Col sm={6}>
        <FormControl
          as="textarea"
          rows={1}
          defaultValue={thisAssignment.title}
        />
      </Col>
      <br />
      <Col sm={6}>
        <FormControl
          as="textarea"
          rows={5}
          defaultValue={thisAssignment.description}
        />
      </Col>
      <br />
      <Row>
        <FormLabel column sm={2}>
          {" "}
          Points{" "}
        </FormLabel>
        <Col sm={4}>
          <FormControl
            type="number"
            as="textarea"
            rows={1}
            defaultValue={thisAssignment.points}
          />
        </Col>
      </Row>

      <br />
      <Row>
        <FormLabel column sm={2}>
          {" "}
          Assignment Group{" "}
        </FormLabel>
        <Col sm={4}>
          <FormSelect defaultValue={thisAssignment.type}>
            <option value="assignments">ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="test">TEST</option>
          </FormSelect>
        </Col>
      </Row>
      <br />
      <Row>
        <FormLabel column sm={2}>
          {" "}
          Display Grade As{" "}
        </FormLabel>
        <Col sm={4}>
          <FormSelect defaultValue={thisAssignment.gradeDisplayType}>
            <option value="percent">Percentage</option>
            <option value="point">Points</option>
            <option value="fraction">Fraction</option>
          </FormSelect>
        </Col>
      </Row>
      <br />

      <Row style={{}}>
        <Col sm={2}>
          {" "}
          <FormLabel> Submission Type </FormLabel>
        </Col>
        <Col>
          <Col sm={4}>
            <FormSelect defaultValue={thisAssignment.submissionType}>
              <option value="online">Online</option>
              <option value="by-hand">By Hand</option>
            </FormSelect>
          </Col>
          <br />
          <FormLabel column sm={4}>
            {" "}
            Online Entry Options{" "}
          </FormLabel>

          <br />
          <input
            type="checkbox"
            name="check-submission-type"
            id="wd-chkbox-text"
            value="text"
            defaultChecked={thisAssignment.entryOptions.includes("text")}
          />
          <label htmlFor="wd-chkbox-text"> Text Entry</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-type"
            id="wd-chkbox-url"
            value="url"
            defaultChecked={thisAssignment.entryOptions.includes("url")}
          />
          <label htmlFor="wd-chkbox-url"> Website URL</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-media"
            id="wd-chkbox-media"
            value="media"
            defaultChecked={thisAssignment.entryOptions.includes("media")}
          />
          <label htmlFor="wd-chkbox-media"> Media Recording</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-annotation"
            id="wd-chkbox-annotation"
            value="annotation"
            defaultChecked={thisAssignment.entryOptions.includes("annotation")}
          />
          <label htmlFor="wd-chkbox-annotation"> Student Annotation</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-file"
            id="wd-chkbox-file"
            value="file"
            defaultChecked={thisAssignment.entryOptions.includes("file")}
          />
          <label htmlFor="wd-chkbox-file"> File Uploads</label>
        </Col>
      </Row>

      <br />
      <Row style={{}}>
        <Col sm={2}>
          {" "}
          <FormLabel> Assign </FormLabel>
        </Col>
        <Col sm={10}>
          <FormLabel column sm={2}>
            {" "}
            Assign To{" "}
          </FormLabel>
          <Col sm={4}>
            <FormControl
              type="number"
              as="textarea"
              rows={1}
              defaultValue={thisAssignment.assignTo}
            />
          </Col>
          <br />
          <FormLabel column sm={2}>
            {" "}
            Due{" "}
          </FormLabel>
          <Col sm={4}>
            <FormControl
              type="date"
              id="wd-email"
              placeholder="email"
              className="mb-2"
              defaultValue={thisAssignment.dueDateForm}
            />
          </Col>
          <br />
          <Row>
            <FormLabel column sm={2}>
              {" "}
              Available From{" "}
            </FormLabel>
            <FormLabel column sm={2}>
              {" "}
              Until{" "}
            </FormLabel>
          </Row>
          <Row>
            {" "}
            <Col sm={2}>
              <FormControl
                type="date"
                id="wd-email"
                placeholder="email"
                className="mb-2"
                defaultValue={thisAssignment.availableFrom}
              />
            </Col>
            <Col sm={2}>
              <FormControl
                type="date"
                id="wd-email"
                placeholder="email"
                className="mb-2"
                defaultValue={thisAssignment.until}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <br />
      <Row>
        <Col sm={2}>
          <Link
            id="wd-signin-btn"
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary w-100 mb-2"
          >
            Cancel{" "}
          </Link>
        </Col>
        <Col sm={2}>
          <Link
            id="wd-signin-btn"
            href={`/courses/${cid}/assignments`}
            className="btn btn-danger w-100 mb-2"
          >
            Save{" "}
          </Link>
        </Col>
      </Row>
    </div>
  );
}
