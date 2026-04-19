"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../client";
import PazzaNavigation from "../Navigation";
import "../styles.css";
import FolderManager from "./FolderManager";

export default function ManageClassScreen() {
  const { cid } = useParams();

  const [activeTab, setActiveTab] = useState("Manage Folders");

  const tabs = [
    "General Settings",
    "Customize Q&A",
    "Manage Folders",
    "Manage Enrollments",
    "Create Groups",
    "Customize Course Page",
    "Pazza Network Settings",
  ];

  return (
    <div className="container">
      <PazzaNavigation />

      <div className="manage-tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`manage-tab-btn${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="manage-tab-content">
        {activeTab === "Manage Folders" ? (
          <FolderManager cid={cid as string} />
        ) : (
          <p className="text-muted" style={{ padding: "24px" }}>
            Work in progress...
          </p>
        )}
      </div>
    </div>
  );
}
