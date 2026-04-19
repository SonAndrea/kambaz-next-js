import {
  IoNewspaperOutline,
  IoSettingsSharp,
  IoInformationCircle,
} from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

export default function PostSidebar({
  posts = [],
  selectedPost,
  onSelect,
  toggleSidebar,
  isSidebarVisible,
  onNewPost,
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "Today",
    "Yesterday",
  ]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName],
    );
  };

  const groupPostsByDate = (postsToGroup: any[]) => {
    const groups: { [key: string]: any[] } = {};
    const now = new Date();

    postsToGroup.forEach((post) => {
      const createdAt = post.createdAt;
      if (!createdAt) {
        const key = "Unknown Date";
        if (!groups[key]) groups[key] = [];
        groups[key].push(post);
        return;
      }

      const date = new Date(createdAt);
      if (isNaN(date.getTime())) {
        const key = "Unknown Date";
        if (!groups[key]) groups[key] = [];
        groups[key].push(post);
        return;
      }

      const todayMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const postMidnight = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
      const diffDays = Math.round(
        (todayMidnight.getTime() - postMidnight.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      let groupName: string;
      if (diffDays === 0) groupName = "Today";
      else if (diffDays === 1) groupName = "Yesterday";
      else if (diffDays < 7) groupName = "Last Week";
      else {
        const d = new Date(date);
        const day = d.getDay();
        const diffToMonday = day === 0 ? -6 : 1 - day;
        const monday = new Date(d);
        monday.setDate(d.getDate() + diffToMonday);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        groupName = `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
      }

      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(post);
    });

    return groups;
  };

  const filteredPosts = posts.filter((post: any) => {
    const q = searchQuery.toLowerCase();
    const summaryMatch = post.summary?.toLowerCase().includes(q);
    const plainDetails = post.details?.replace(/<[^>]*>/g, "") ?? "";
    const detailsMatch = plainDetails.toLowerCase().includes(q);
    return summaryMatch || detailsMatch;
  });

  const groupedPosts = groupPostsByDate(filteredPosts);

  const groupOrder = ["Today", "Yesterday", "Last Week"];
  const sortedGroupKeys = [
    ...groupOrder.filter((k) => groupedPosts[k]),
    ...Object.keys(groupedPosts)
      .filter((k) => !groupOrder.includes(k))
      .sort((a, b) => {
        if (a === "Unknown Date") return 1;
        if (b === "Unknown Date") return -1;
        return b.localeCompare(a);
      }),
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-controls">
        <div className="sidebar-filter-options">
          <button className="sidebar-filter-btn arrow" onClick={toggleSidebar}>
            <span
              className={isSidebarVisible ? "triangle-left" : "triangle-right"}
            />
          </button>
          <div className="sidebar-divider" />
          {["Unread", "Updated", "Unresolved", "Following"].map((f) => (
            <button key={f} className="sidebar-filter-btn filter">
              {f}
            </button>
          ))}
          <div className="sidebar-divider" />
          <button className="sidebar-filter-btn icon">
            <IoInformationCircle />
          </button>
          <button className="sidebar-filter-btn icon">
            <IoSettingsSharp />
          </button>
        </div>

        <div className="sidebar-search-grid">
          <button className="sidebar-new-post-btn" onClick={onNewPost}>
            <IoNewspaperOutline /> New Post
          </button>
          <input
            type="text"
            className="sidebar-search-posts"
            placeholder="Search or add a post..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="post-list">
        {sortedGroupKeys.map((groupName) => (
          <div key={groupName} className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => toggleGroup(groupName)}
            >
              {expandedGroups.includes(groupName) ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
              {groupName}
            </button>

            {expandedGroups.includes(groupName) && (
              <div className="accordion-content">
                {groupedPosts[groupName].map((post: any) => {
                  const roleLabel =
                    post.authorRole === "INSTRUCTOR" ? "Instructor" : "Student";
                  const authorDisplay = post.authorName
                    ? `${post.authorName} (${roleLabel})`
                    : roleLabel;

                  return (
                    <button
                      key={post._id}
                      onClick={() => onSelect(post)}
                      className={`post-item ${selectedPost?._id === post._id ? "selected" : ""}`}
                    >
                      <div className="post-summary">{post.summary}</div>
                      <div className="post-author-type">{authorDisplay}</div>
                      <div className="post-snippet">
                        {post.details
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 300)}
                        {(post.details?.replace(/<[^>]*>/g, "").length ?? 0) >
                        300
                          ? "..."
                          : ""}
                      </div>
                      <div className="post-meta">
                        {new Date(post.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#999",
              fontSize: "0.85rem",
            }}
          >
            {searchQuery ? "No posts match your search." : "No posts yet."}
          </div>
        )}
      </div>
    </aside>
  );
}
