"use client";
import React, { useEffect, useState } from "react";
import PostSidebar from "./Sidebar";
import { FaFolder } from "react-icons/fa";
import CreatePost from "./Create";
import PostScreen from "./PostScreen";
import ClassAtAGlance from "./ClassAtAGlance";
import { getCourseStats } from "../client";

export default function PazzaContent({
  posts,
  setPosts,
  folders = [],
  selectedPost,
  setSelectedPost,
  cid,
  currentUser,
}: any) {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [snbView, setSnbView] = useState<"Q&A" | "Drafts" | "Folders">("Q&A");
  const [isCreating, setIsCreating] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!selectedPost && !isCreating && cid) {
      getCourseStats(cid).then(setStats).catch(console.error);
    }
  }, [selectedPost, isCreating, cid, posts]);

  const filteredPosts = activeFolder
    ? (posts || []).filter((p: any) => p.folders?.includes(activeFolder))
    : posts || [];

  const handleSelectPost = async (post: any) => {
    setIsCreating(false);

    if (selectedPost?._id === post._id) {
      setSelectedPost(null);
      return;
    }

    setSelectedPost(post);
  };

  const handleNewPostClick = () => {
    setSelectedPost(null);
    setIsCreating(true);
  };

  const handlePostCreated = (newPost: any) => {
    setPosts((prev: any[]) => [newPost, ...prev]);
  };

  return (
    <>
      <div className="folder-pane">
        <button
          onClick={() => {
            setActiveFolder(null);
            setSnbView("Q&A");
          }}
          className={`folder-pane-full-btn ${snbView === "Q&A" ? "active" : ""}`}
        >
          <FaFolder className="ff-icon" /> LIVE Q&A
        </button>
        <div className="folder-pane-divider" />
        <button
          onClick={() => {
            setActiveFolder(null);
            setSnbView("Drafts");
          }}
          className={`folder-pane-full-btn ${snbView === "Drafts" ? "active" : ""}`}
        >
          <FaFolder className="ff-icon" /> Drafts
        </button>
        <div className="folder-pane-divider" />
        <div
          className={`folder-pane-folders-container ${snbView === "Folders" ? "active" : ""}`}
        >
          <FaFolder className="ff-icon main-folder-icon" />
          {folders.map((f: any) => (
            <button
              key={f._id}
              onClick={() => {
                setActiveFolder(f.name);
                setSnbView("Folders");
              }}
              className={`folder-pane-folder-link ${activeFolder === f.name ? "selected" : ""}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="content-div">
        {isSidebarVisible && (
          <PostSidebar
            posts={filteredPosts}
            selectedPost={selectedPost}
            currentUser={currentUser}
            onSelect={handleSelectPost}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
            onNewPost={handleNewPostClick}
          />
        )}

        {!isSidebarVisible && (
          <div className="sidebar-filter-options collapsed">
            <button
              className="sidebar-filter-btn arrow"
              onClick={() => setIsSidebarVisible(true)}
            >
              <span className="triangle-right" />
            </button>
          </div>
        )}

        <main className="main-view">
          {isCreating ? (
            <CreatePost
              folders={folders}
              cid={cid}
              currentUser={currentUser}
              onCancel={() => setIsCreating(false)}
              onPostCreated={handlePostCreated}
            />
          ) : selectedPost ? (
            <PostScreen
              selectedPost={selectedPost}
              currentUser={currentUser}
              onDeletePost={(postId: string) => {
                setPosts((prev: any[]) =>
                  prev.filter((p: any) => p._id !== postId),
                );
                setSelectedPost(null);
              }}
            />
          ) : (
            <div className="d-flex w-100 h-100 align-items-center justify-content-center">
              <ClassAtAGlance stats={stats} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
