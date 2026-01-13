import Link from "next/link";

export default function Assignments() {
  return (
    <div>
      <input type="text" placeholder="Search for Assignments" />
      <button id="wd-group-btn">+ Group</button>
      <button id="wd-assignments-btn">+ Assignment</button>
      <h3>
        ASSGIMENTS 40% of Total <button>+</button>
      </h3>
      <ul>
        <li>
          <Link href="assignments/a1" id="wd-a1-link">
            A1 - ENV + HTML
          </Link>
          <p id="wd-assignment-text">
            Multiple Modules | <b>Not Available until</b> May 6 at 12:00am |{" "}
            <br />
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </p>
        </li>
        <li>
          <Link href="assignments/a1" id="wd-a2-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <p id="wd-assignment-text">
            Multiple Modules | <b>Not Available until</b> May 13 at 12:00am |{" "}
            <br />
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </p>
        </li>
        <li>
          <Link href="assignments/a1" id="wd-a3-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <p id="wd-assignment-text">
            Multiple Modules | <b>Not Available until</b> May 20 at 12:00am |{" "}
            <br />
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
    </div>
  );
}
