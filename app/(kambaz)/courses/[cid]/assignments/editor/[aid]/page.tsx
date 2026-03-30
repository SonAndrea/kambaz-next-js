"use client";

import { useEffect, useState } from "react";
import * as client from "../../client";
import { useParams, useRouter } from "next/navigation";
import { Col, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();

  const [assignment, setAssignment] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.findAssignmentById(aid as string);
      setAssignment(data);
    };

    if (aid) load();
  }, [aid]);

  if (!assignment) return <div>Loading...</div>;

  const updateField = (field: string, value: any) => {
    setAssignment({ ...assignment, [field]: value });
  };

  const toggleEntryOption = (option: string) => {
    const exists = assignment.entryOptions.includes(option);

    const newOptions = exists
      ? assignment.entryOptions.filter((o: string) => o !== option)
      : [...assignment.entryOptions, option];

    setAssignment({ ...assignment, entryOptions: newOptions });
  };

  const handleSave = async () => {
    await client.updateAssignment(assignment);
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <FormLabel column sm={2}>
        Assignment Name
      </FormLabel>
      <Col sm={6}>
        <FormControl
          as="textarea"
          rows={1}
          value={assignment.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </Col>

      <br />

      <Col sm={6}>
        <FormControl
          as="textarea"
          rows={5}
          value={assignment.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </Col>

      <br />

      <Row>
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={4}>
          <FormControl
            type="number"
            value={assignment.points || 0}
            onChange={(e) => updateField("points", Number(e.target.value))}
          />
        </Col>
      </Row>

      <br />

      <Row>
        <FormLabel column sm={2}>
          Assignment Group
        </FormLabel>
        <Col sm={4}>
          <FormSelect
            value={assignment.type || ""}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option value="assignments">ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="test">TEST</option>
          </FormSelect>
        </Col>
      </Row>

      <br />

      <Row>
        <FormLabel column sm={2}>
          Display Grade As
        </FormLabel>
        <Col sm={4}>
          <FormSelect
            value={assignment.gradeDisplayType || ""}
            onChange={(e) => updateField("gradeDisplayType", e.target.value)}
          >
            <option value="percent">Percentage</option>
            <option value="point">Points</option>
            <option value="fraction">Fraction</option>
          </FormSelect>
        </Col>
      </Row>

      <br />

      <Row>
        <Col sm={2}>
          <FormLabel>Submission Type</FormLabel>
        </Col>

        <Col sm={4}>
          <FormSelect
            value={assignment.submissionType || ""}
            onChange={(e) => updateField("submissionType", e.target.value)}
          >
            <option value="online">Online</option>
            <option value="by-hand">By Hand</option>
          </FormSelect>
        </Col>

        <br />

        <FormLabel column sm={4}>
          Online Entry Options
        </FormLabel>

        {["text", "url", "media", "annotation", "file"].map((opt) => (
          <div key={opt}>
            <input
              type="checkbox"
              checked={assignment.entryOptions?.includes(opt)}
              onChange={() => toggleEntryOption(opt)}
            />
            <label> {opt}</label>
          </div>
        ))}
      </Row>

      <br />

      <Row>
        <Col sm={2}>
          <FormLabel>Assign To</FormLabel>
        </Col>

        <Col sm={4}>
          <FormControl
            value={assignment.assignTo || ""}
            onChange={(e) => updateField("assignTo", e.target.value)}
          />
        </Col>

        <br />

        <FormLabel column sm={2}>
          Due
        </FormLabel>
        <Col sm={4}>
          <FormControl
            type="date"
            value={assignment.dueDateForm || ""}
            onChange={(e) => updateField("dueDateForm", e.target.value)}
          />
        </Col>
      </Row>

      <br />

      <Row>
        <Col sm={2}>
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary w-100 mb-2"
          >
            Cancel
          </Link>
        </Col>

        <Col sm={2}>
          <button onClick={handleSave} className="btn btn-danger w-100 mb-2">
            Save
          </button>
        </Col>
      </Row>
    </div>
  );
}
