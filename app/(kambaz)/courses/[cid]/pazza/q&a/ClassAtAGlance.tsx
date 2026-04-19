"use client";
import { useState, useEffect } from "react";

export default function ClassAtAGlance({ stats }: { stats: any }) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    setSecondsAgo(0);
    const interval = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [stats]);

  const formatAge = (s: number) => {
    if (s < 60) return `${s} second${s !== 1 ? "s" : ""} ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m} minute${m !== 1 ? "s" : ""} ago`;
    const h = Math.floor(m / 60);
    return `${h} hour${h !== 1 ? "s" : ""} ago`;
  };

  if (!stats) {
    return (
      <div className="cag-wrapper">
        <div className="cag-header">
          <span className="cag-lock">🔒</span>
          <h2 className="cag-title">Class at a Glance</h2>
        </div>
        <p className="cag-updated">Loading...</p>
      </div>
    );
  }

  const checks = [
    {
      ok: (stats.unreadCount ?? 0) === 0,
      okLabel: "no unread posts",
      badLabel: `${stats.unreadCount} unread post${stats.unreadCount !== 1 ? "s" : ""}`,
    },
    {
      ok: (stats.unansweredQuestions ?? 0) === 0,
      okLabel: "no unanswered questions",
      badLabel: `${stats.unansweredQuestions} unanswered question${stats.unansweredQuestions !== 1 ? "s" : ""}`,
    },
  ];

  const rightStats = [
    { value: stats.instructorResponses, label: "instructors' responses" },
    { value: stats.studentResponses, label: "students' responses" },
    { value: stats.studentsEnrolled, label: "students enrolled" },
  ];

  return (
    <div className="cag-wrapper" style={{ width: "100%" }}>
      <div className="cag-header">
        <div className="cag-header-left">
          <h2 className="cag-title">Class at a Glance</h2>
        </div>
        <a className="cag-live-link" href="#">
          Go to Live Q&amp;A
        </a>
      </div>

      <p className="cag-updated">
        Updated {formatAge(secondsAgo)}.{" "}
        <a
          className="cag-reload"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          Reload
        </a>
      </p>

      <div className="cag-card">
        <div className="cag-left">
          {checks.map((c, i) => (
            <div key={i} className="cag-check-row">
              <span className={`cag-check-badge ${c.ok ? "ok" : "bad"}`}>
                {c.ok ? "✓" : "!"}
              </span>
              <span className={`cag-check-label ${c.ok ? "ok" : "bad"}`}>
                {c.ok ? c.okLabel : c.badLabel}
              </span>
            </div>
          ))}
        </div>
        <div className="cag-divider" />

        <div className="cag-right">
          {rightStats.map((s, i) => (
            <div key={i} className="cag-stat-row">
              <span className="cag-stat-value">{s.value ?? 0}</span>
              <span className="cag-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
