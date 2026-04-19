"use client";
import { useState, useRef, useEffect } from "react";
import {
  deletePost,
  getPostDetails,
  createAnswer,
  deleteAnswer,
  createFollowup,
  deleteFollowup,
  addReply,
  deleteReply,
} from "../client";

interface Post {
  _id: string;
  summary: string;
  details: string;
  type?: "QUESTION" | "NOTE";
  author?: string;
  authorName?: string;
  authorRole?: "STUDENT" | "INSTRUCTOR";
  folders?: string[];
  views?: number;
  createdAt?: string;
}

interface PostScreenProps {
  selectedPost?: Post | null;
  currentUser?: any;
  onDeletePost?: (postId: string) => void;
}

export default function PostScreen({
  selectedPost,
  currentUser,
  onDeletePost,
}: PostScreenProps) {
  const [goodQuestion, setGoodQuestion] = useState(0);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [postDetails, setPostDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [newFollowupText, setNewFollowupText] = useState("");

  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  const loadDetails = async () => {
    if (!selectedPost?._id) return;
    setLoadingDetails(true);
    try {
      const full = await getPostDetails(selectedPost._id);
      setPostDetails(full);
    } catch (err) {
      console.error("Failed to load post details", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [selectedPost?._id]);

  if (!selectedPost) {
    return;
  }

  const isQuestion = selectedPost.type !== "NOTE";
  const postNumber = selectedPost._id?.slice(-3) || "—";

  const isInstructor =
    currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";
  const canModify = isInstructor || currentUser?._id === selectedPost.author;

  return (
    <div className="post-screen-wrapper">
      {" "}
      <div className="post-top-half">
        <div className="post-meta-bar">
          <div className="post-meta-left">
            <span
              className={`post-type-badge ${isQuestion ? "question" : "note"}`}
            >
              {isQuestion ? "?" : "i"}
            </span>
            <span className="post-type-label">
              {isQuestion ? "question" : "note"} @{postNumber}
            </span>
          </div>
          <div className="post-meta-right">
            <span className="post-view-count">
              {selectedPost.views ?? 1} view
              {(selectedPost.views ?? 1) !== 1 ? "s" : ""}
            </span>
            {canModify && (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginLeft: "10px",
                }}
              >
                <button
                  style={{
                    padding: "4px 12px",
                    fontSize: "0.8rem",
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => setActionsOpen((o) => !o)}
                >
                  Actions ▾
                </button>
                {actionsOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
                      minWidth: "150px",
                      zIndex: 100,
                    }}
                  >
                    <button
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "9px 16px",
                        textAlign: "left",
                        fontSize: "0.85rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log("edited");
                        setActionsOpen(false);
                      }}
                    >
                      ✎ Edit post
                    </button>
                    <button
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "9px 16px",
                        textAlign: "left",
                        fontSize: "0.85rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#c0392b",
                      }}
                      onClick={async () => {
                        try {
                          await deletePost(selectedPost._id);
                        } catch (err) {
                          console.error("Failed to delete post:", err);
                          alert(
                            "Failed to delete post. You may not have permission.",
                          );
                          return;
                        }
                        onDeletePost?.(selectedPost._id);
                        setActionsOpen(false);
                      }}
                    >
                      🗑 Delete post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <h1 className="post-title">{selectedPost.summary}</h1>

        <div className="post-author-line">
          <span className="post-author-name">
            {selectedPost.authorName || "Unknown"}
          </span>
          {selectedPost.createdAt && (
            <span className="post-author-date">
              {new Date(selectedPost.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: selectedPost.details }}
        />

        {selectedPost.folders && selectedPost.folders.length > 0 && (
          <div className="post-folder-chips">
            {selectedPost.folders.map((f) => (
              <span key={f} className="post-folder-chip">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="post-action-bar">
          <div className="post-action-left">
            {canModify && (
              <button
                className="post-action-btn primary"
                onClick={() => console.log("edited")}
              >
                Edit
              </button>
            )}
            <button
              className="post-action-btn good-question"
              onClick={() => setGoodQuestion((n) => n + 1)}
            >
              good question
            </button>
            <span className="post-good-count">{goodQuestion}</span>
          </div>
        </div>
      </div>
      <div className="post-bottom-half">
        {loadingDetails || !postDetails ? (
          <div className="post-loading">Loading...</div>
        ) : (
          <>
            <div className="post-answer-section">
              <div className="post-answer-header">
                <span className="post-answer-icon">i</span>
                <span className="post-answer-label">
                  <strong>the instructors' answer,</strong>{" "}
                  <em>
                    where instructors collectively construct a single answer
                  </em>
                </span>
              </div>

              {postDetails.answers?.length > 0 ? (
                postDetails.answers.map((ans: any) => {
                  const canEdit =
                    isInstructor || currentUser?._id === ans.author;

                  return (
                    <div key={ans._id} className="post-answer">
                      <div className="post-answer-meta">
                        <strong>{ans.authorName}</strong>
                        <span>{new Date(ans.createdAt).toLocaleString()}</span>

                        {canEdit && (
                          <div className="answer-actions">
                            <button>Edit</button>
                            <button
                              onClick={async () => {
                                try {
                                  await deleteAnswer(ans._id);
                                  await loadDetails();
                                } catch (err) {
                                  console.error("Failed to delete answer", err);
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: ans.content,
                        }}
                      />
                    </div>
                  );
                })
              ) : isInstructor ? (
                <div className="post-answer-editor">
                  <textarea
                    placeholder="Write an instructor answer..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                  />
                  <button
                    className="post-action-btn primary"
                    onClick={async () => {
                      if (!answerText.trim()) return;
                      try {
                        await createAnswer(selectedPost._id, answerText);
                        setAnswerText("");
                        await loadDetails();
                      } catch (err) {
                        console.error("Failed to submit answer", err);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="post-answer-placeholder">No answer yet.</div>
              )}
            </div>

            <div className="post-discussion-section">
              <h3>Followup discussions</h3>

              {postDetails.followups?.map((f: any) => {
                const canEdit = isInstructor || currentUser?._id === f.author;

                return (
                  <div key={f._id} className="discussion">
                    <div className="discussion-header">
                      <span
                        className={`discussion-status ${
                          f.isResolved ? "resolved" : "unresolved"
                        }`}
                      >
                        {f.isResolved ? "Resolved" : "Unresolved"}
                      </span>

                      <strong>{f.authorName}</strong>
                      <span>{new Date(f.createdAt).toLocaleString()}</span>

                      {canEdit && (
                        <div className="discussion-actions">
                          <button>Edit</button>
                          <button
                            onClick={async () => {
                              try {
                                await deleteFollowup(f._id);
                                await loadDetails();
                              } catch (err) {
                                console.error("Failed to delete followup", err);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="discussion-body">{f.content}</div>

                    {/* Replies */}
                    <div className="discussion-replies">
                      {f.replies?.map((r: any, idx: number) => {
                        const canEditReply =
                          isInstructor || currentUser?._id === r.author;

                        return (
                          <div key={idx} className="reply">
                            <div className="reply-header">
                              <strong>{r.authorName}</strong>
                              <span>
                                {new Date(r.createdAt).toLocaleString()}
                              </span>

                              {canEditReply && (
                                <div className="reply-actions">
                                  <button>Edit</button>
                                  <button
                                    onClick={async () => {
                                      try {
                                        await deleteReply(f._id, r._id);
                                        await loadDetails();
                                      } catch (err) {
                                        console.error(
                                          "Failed to delete reply",
                                          err,
                                        );
                                      }
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="reply-body">{r.content}</div>
                          </div>
                        );
                      })}

                      {/* Reply input */}
                      <textarea
                        placeholder="Reply..."
                        value={replyTexts[f._id] ?? ""}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [f._id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        className="post-action-btn"
                        onClick={async () => {
                          const text = replyTexts[f._id]?.trim();
                          if (!text) return;
                          try {
                            await addReply(f._id, text);
                            setReplyTexts((prev) => ({ ...prev, [f._id]: "" }));
                            await loadDetails();
                          } catch (err) {
                            console.error("Failed to add reply", err);
                          }
                        }}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="new-discussion">
                <textarea
                  placeholder="Start a new followup discussion..."
                  value={newFollowupText}
                  onChange={(e) => setNewFollowupText(e.target.value)}
                />
                <button
                  className="post-action-btn primary"
                  onClick={async () => {
                    if (!newFollowupText.trim()) return;
                    try {
                      await createFollowup(selectedPost._id, newFollowupText);
                      setNewFollowupText("");
                      await loadDetails();
                    } catch (err) {
                      console.error("Failed to create followup", err);
                    }
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
