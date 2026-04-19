"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../client";
import PazzaNavigation from "../Navigation";
import PazzaContent from "./Content";
import "../styles.css";

export default function PazzaQandAPage() {
  const params = useParams();
  const cid = params?.cid as string;

  const [posts, setPosts] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!cid) return;
      try {
        const [fetchedPosts, fetchedFolders, fetchedUser] = await Promise.all([
          client.findPostsForCourse(cid),
          client.findFoldersForCourse(cid),
          client.getCurrentUser(),
        ]);
        setPosts(fetchedPosts || []);
        setFolders(fetchedFolders || []);
        setCurrentUser(fetchedUser || null);
      } catch (e) {
        console.error("Failed to load Q&A data", e);
      }
    };
    loadData();
  }, [cid]);

  return (
    <div className="container">
      <PazzaNavigation />
      <PazzaContent
        posts={posts}
        setPosts={setPosts}
        folders={folders}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        cid={cid}
        currentUser={currentUser}
      />
    </div>
  );
}
