"use client";
import { useState } from "react";
import { createPost } from "../client";
import "../styles.css";
import { useRouter, usePathname } from "next/navigation";

type PostType = "QUESTION" | "NOTE" | "POLL";
type PostTo = "ENTIRE_CLASS" | "INDIVIDUAL";
type EditorMode = "RICH" | "PLAIN" | "MARKDOWN";

export default function CreatePost({
  folders = [],
  cid,
  onCancel,
  onPostCreated,
}: any) {
  const router = useRouter();
  const pathname = usePathname();

  const [postType, setPostType] = useState<PostType>("QUESTION");
  const [postTo, setPostTo] = useState<PostTo>("ENTIRE_CLASS");
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [editorMode, setEditorMode] = useState<EditorMode>("RICH");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const postTypeOptions: {
    value: PostType;
    label: string;
    subtitle: string;
  }[] = [
    { value: "QUESTION", label: "Question", subtitle: "if you need an answer" },
    { value: "NOTE", label: "Note", subtitle: "if you don't need an answer" },
    {
      value: "POLL",
      label: "Poll/In-Class Response",
      subtitle: "if you need a vote",
    },
  ];

  const toggleFolder = (name: string) => {
    setSelectedFolders((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const handlePost = async () => {
    const newErrors: any = {};
    if (selectedFolders.length === 0)
      newErrors.folders = "Select at least one folder.";
    if (!summary.trim()) newErrors.summary = "Summary is required.";
    if (summary.length > 100)
      newErrors.summary = "Summary must be under 100 characters.";
    if (!details.trim()) newErrors.details = "Details are required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const saved = await createPost(cid, {
        type: postType === "POLL" ? "QUESTION" : postType,
        postTo,
        folders: selectedFolders,
        summary,
        details,
      });
      onPostCreated?.(saved);
      onCancel();
    } catch (err) {
      console.error("Failed to create post:", err);
      setErrors({ submit: "Failed to save post. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const postTypeLabel =
    postType === "QUESTION"
      ? "Question"
      : postType === "NOTE"
        ? "Note"
        : "Poll";

  return (
    <div className="new-post-wrapper">
      <div className="new-post-type-bar">
        <div className="new-post-type-row">
          <span className="new-post-type-heading">Post Type*</span>
          <div className="new-post-type-options">
            {postTypeOptions.map((opt) => (
              <label
                key={opt.value}
                className={`new-post-type-option${postType === opt.value ? " selected" : ""}`}
                onClick={() => setPostType(opt.value)}
              >
                <input
                  type="radio"
                  name="postType"
                  checked={postType === opt.value}
                  onChange={() => setPostType(opt.value)}
                />
                <div>
                  <div className="new-post-type-label">{opt.label}</div>
                  <div className="new-post-type-subtitle">{opt.subtitle}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="new-post-body">
        <div className="new-post-row">
          <label className="new-post-label">Post To*</label>
          <div className="new-post-radio-group">
            {[
              { value: "ENTIRE_CLASS" as PostTo, label: "Entire Class" },
              {
                value: "INDIVIDUAL" as PostTo,
                label: "Individual Student(s) / Instructor(s)",
              },
            ].map((opt) => (
              <label key={opt.value} className="new-post-radio-option">
                <input
                  type="radio"
                  name="postTo"
                  checked={postTo === opt.value}
                  onChange={() => setPostTo(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="new-post-row">
          <label className="new-post-label">Select Folder(s)*</label>
          <div className="new-post-folders">
            <div className="new-post-folder-chips">
              {folders.map((f: any) => {
                const isSelected = selectedFolders.includes(f.name);
                return (
                  <button
                    key={f._id}
                    className={`new-post-folder-chip${isSelected ? " selected" : ""}`}
                    onClick={() => toggleFolder(f.name)}
                  >
                    {f.name}
                    {isSelected && (
                      <span
                        className="new-post-folder-chip-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFolder(f.name);
                        }}
                      >
                        ×
                      </span>
                    )}
                  </button>
                );
              })}
              {folders.length === 0 && (
                <span style={{ fontSize: 13, color: "#666" }}>
                  No folders available.
                </span>
              )}
            </div>
            {errors.folders && (
              <div className="new-post-error">{errors.folders}</div>
            )}
            <a
              href="#"
              className="new-post-manage-folders"
              onClick={() => router.push(`/courses/${cid}/pazza/manage-class`)}
            >
              Manage and reorder folders
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="new-post-row">
          <label className="new-post-label">Summary*</label>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              className="new-post-input"
              placeholder="Enter a one line summary, 100 characters or less"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
            />
            {errors.summary && (
              <div className="new-post-error">{errors.summary}</div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="new-post-row">
          <label className="new-post-label">Details</label>
          <div style={{ flex: 1 }}>
            <div className="new-post-editor-modes">
              {(["RICH", "PLAIN", "MARKDOWN"] as EditorMode[]).map((mode) => (
                <label key={mode} className="new-post-editor-mode">
                  <input
                    type="radio"
                    name="editorMode"
                    checked={editorMode === mode}
                    onChange={() => setEditorMode(mode)}
                  />
                  {mode === "RICH"
                    ? "Rich text editor"
                    : mode === "PLAIN"
                      ? "Plain text editor"
                      : "Markdown editor"}
                </label>
              ))}
              <div className="new-post-preview-toggle">
                <span>preview</span>
                <div className="new-post-toggle-track">
                  <div className="new-post-toggle-thumb" />
                </div>
              </div>
            </div>

            {editorMode === "RICH" && (
              <div className="new-post-toolbar">
                {["Insert", "Format", "Table"].map((item) => (
                  <button key={item} className="new-post-toolbar-btn">
                    {item}
                  </button>
                ))}
                <div className="new-post-toolbar-divider" />
                <button
                  className="new-post-toolbar-btn"
                  style={{ fontWeight: 700 }}
                >
                  B
                </button>
                <button
                  className="new-post-toolbar-btn"
                  style={{ fontStyle: "italic" }}
                >
                  I
                </button>
                {["≡", "≡", "⊳", "◁"].map((icon, i) => (
                  <button key={i} className="new-post-toolbar-btn">
                    {icon}
                  </button>
                ))}
                <span className="new-post-toolbar-more">⋯</span>
              </div>
            )}

            <textarea
              className={`new-post-textarea${editorMode === "RICH" ? " rich" : ""}${editorMode === "MARKDOWN" ? " monospace" : ""}`}
              rows={10}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            {errors.details && (
              <div className="new-post-error">{errors.details}</div>
            )}

            {editorMode === "RICH" && (
              <p className="new-post-editor-hint">
                Option + F9 to move focus to Menu Bar; Option + F10 to move
                focus to Tool Bar (use tab to move between button groups, and
                arrow keys to select specific items within groups); ESC to exit.{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  More help with editor.
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Posting Options */}
        <div className="new-post-row">
          <label className="new-post-label">Posting Options</label>
          <div>
            <label className="new-post-options-label">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
              />
              <span>
                <strong>Send email notifications immediately</strong> (bypassing
                students' email preferences, if necessary)
              </span>
            </label>
            <p className="new-post-required-note">* Required fields</p>
          </div>
        </div>

        {errors.submit && (
          <div className="new-post-error" style={{ marginBottom: 12 }}>
            {errors.submit}
          </div>
        )}

        <div className="new-post-actions">
          <button
            className="new-post-btn-submit"
            onClick={handlePost}
            disabled={submitting}
          >
            {submitting ? "Posting…" : "Post"}
          </button>
          <button className="new-post-btn-secondary">Save Draft</button>
          <button className="new-post-btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
