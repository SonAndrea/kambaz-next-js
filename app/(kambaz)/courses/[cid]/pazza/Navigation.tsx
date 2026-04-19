"use client";
import { RootState } from "@/app/(kambaz)/store";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function PazzaNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const cid = pathname.split("/")[2];
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser,
  );

  const isInstructor =
    currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";

  const navLinks = [
    { label: "Q & A", path: "q&a" },
    { label: "Resources", path: "resources" },
    { label: "Statistics", path: "statistics" },
    { label: "Manage Class", path: "manage-class" },
  ];

  return (
    <nav className="nav-container">
      <div className="d-flex align-items-center">
        <span
          className="nav-pazza-logo"
          onClick={() => router.push(`/courses/${cid}/pazza/q&a`)}
        >
          pazza
        </span>
        <span className="nav-class-name border-start">{cid || "Course"}</span>
      </div>

      <div className="h-100">
        <ul className="nav-links">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <button
                className={`nav-link ${pathname.endsWith(path) ? "active" : ""}`}
                onClick={() => {
                  if (path === "manage-class" && !isInstructor) {
                    alert(
                      "You are not able to view this. Please log in as an instructor.",
                    );
                    return;
                  }
                  router.push(`/courses/${cid}/pazza/${path}`);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-profile-section">
        <div className="nav-profile-box">
          <span style={{ fontSize: "12px", color: "#adb5bd" }}>Pic</span>
        </div>
        <span className="nav-username">
          {currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : "[guest]"}
        </span>
      </div>
    </nav>
  );
}
