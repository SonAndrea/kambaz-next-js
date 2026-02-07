import Link from "next/link";
import AssignmentControls from "./AssignmentsControls";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <Link href="assignments/a1" id="wd-a1-link">
                A1 - ENV + HTML
              </Link>{" "}
              <LessonControlButtons />
              <p id="wd-assignment-text">
                Multiple Modules | <b>Not Available until</b> May 6 at 12:00am |{" "}
                <br />
                <b>Due</b> May 13 at 11:59pm | 100 pts
              </p>{" "}
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <Link href="assignments/a1" id="wd-a2-link">
                A2 - CSS + BOOTSTRAP
              </Link>{" "}
              <LessonControlButtons />
              <p id="wd-assignment-text">
                Multiple Modules | <b>Not Available until</b> May 13 at 12:00am
                | <br />
                <b>Due</b> May 20 at 11:59pm | 100 pts
              </p>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <Link href="assignments/a1" id="wd-a3-link">
                A3 - JAVASCRIPT + REACT
              </Link>{" "}
              <LessonControlButtons />
              <p id="wd-assignment-text">
                Multiple Modules | <b>Not Available until</b> May 20 at 12:00am
                | <br />
                <b>Due</b> May 27 at 11:59pm | 100 pts
              </p>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
