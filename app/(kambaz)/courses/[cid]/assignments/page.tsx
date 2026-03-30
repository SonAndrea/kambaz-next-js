"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "./client";

import AssignmentControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";

import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await client.findAssignmentsForCourse(cid as string);
        setAssignments(data);
      } catch (err) {
        console.error("Failed to load assignments:", err);
      }
    };

    if (cid) {
      loadAssignments();
    }
  }, [cid]);

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
            {assignments.map((assignment: any) => {
              const thisLink = `/courses/${cid}/assignments/editor/${assignment._id}`;

              return (
                <ListGroupItem
                  className="wd-lesson p-3 ps-1"
                  key={assignment._id}
                >
                  <BsGripVertical className="me-2 fs-3" />

                  <Link href={thisLink} id={assignment.title}>
                    {assignment.title}
                  </Link>

                  <LessonControlButtons />

                  <p id="wd-assignment-text">
                    Multiple Modules | <b>Not Available until</b> May 6 at
                    12:00am | <br />
                    <b>Due</b> {assignment.dueDate} at {assignment.dueTime} |{" "}
                    {assignment.points} pts
                  </p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
