import Link from "next/link";
import { Col, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <FormLabel column sm={2}>
        Assignment Name
      </FormLabel>
      <Col sm={6}>
        <FormControl as="textarea" rows={1} />
      </Col>
      <br />
      <Col sm={6}>
        <FormControl as="textarea" rows={5} />
      </Col>
      <br />
      <Row>
        <FormLabel column sm={2}>
          {" "}
          Points{" "}
        </FormLabel>
        <Col sm={4}>
          <FormControl type="number" as="textarea" rows={1} />
        </Col>
      </Row>

      <br />
      <Row>
        <FormLabel column sm={2}>
          {" "}
          Assignment Group{" "}
        </FormLabel>
        <Col sm={4}>
          <FormSelect>
            <option value="assignments" defaultChecked>
              ASSIGNMENTS
            </option>
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
          <FormSelect>
            <option value="assignments" defaultChecked>
              Percentage
            </option>
            <option value="quizzes">Points</option>
            <option value="test">Fraction</option>
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
            <FormSelect>
              <option value="online" defaultChecked>
                Online
              </option>
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
          />
          <label htmlFor="wd-chkbox-text"> Text Entry</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-type"
            id="wd-chkbox-url"
          />
          <label htmlFor="wd-chkbox-url"> Website URL</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-media"
            id="wd-chkbox-media"
          />
          <label htmlFor="wd-chkbox-media"> Media Recording</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-annotation"
            id="wd-chkbox-annotation"
          />
          <label htmlFor="wd-chkbox-annotation"> Student Annotation</label>

          <br />
          <input
            type="checkbox"
            name="check-submission-file"
            id="wd-chkbox-file"
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
            <FormControl type="number" as="textarea" rows={1} />
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
              defaultValue="07-22-2005"
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
                defaultValue="07-22-2005"
              />
            </Col>
            <Col sm={2}>
              <FormControl
                type="date"
                id="wd-email"
                placeholder="email"
                className="mb-2"
                defaultValue="07-22-2005"
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
            href="/courses/cs4550/assignments"
            className="btn btn-danger w-100 mb-2"
          >
            Save{" "}
          </Link>
        </Col>
      </Row>
    </div>
  );
}
