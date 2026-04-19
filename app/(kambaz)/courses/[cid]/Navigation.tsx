"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = [
    { label: "Home", path: "home" },
    { label: "Modules", path: "modules" },
    { label: "Pazza", path: "pazza" },
    { label: "Zoom", path: "zoom" },
    { label: "Assignments", path: "assignments" },
    { label: "Quizzes", path: "quizzes" },
    { label: "Grades", path: "grades" },
    { label: "People", path: "people/table" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const thisPath = `/courses/${cid}/${link.path}`;
        const isActive = pathname === thisPath;
        return (
          <Link
            key={link.path}
            href={thisPath}
            id={`wd-course-${link.path}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
