"use client";

import { useEffect, useState } from "react";
import {
  findFoldersForCourse,
  createFolder,
  deleteFolders,
  updateFolder,
} from "../client";

type Folder = {
  _id: string;
  name: string;
};

export default function ManageFolders({ cid }: { cid: string }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchFolders = async () => {
    const data = await findFoldersForCourse(cid);
    setFolders(data);
  };

  useEffect(() => {
    fetchFolders();
  }, [cid]);

  const handleAdd = async () => {
    if (!newFolderName.trim()) return;
    await createFolder(cid, newFolderName);
    setNewFolderName("");
    fetchFolders();
  };

  const handleDelete = async () => {
    await deleteFolders(selected);
    setSelected([]);
    fetchFolders();
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleSave = async (id: string) => {
    await updateFolder(id, editingName);
    setEditingId(null);
    fetchFolders();
  };

  return (
    <div className="mf-wrapper">
      <h2 className="mf-title">Configure Class Folders</h2>
      <p className="mf-description">
        Folders allow you to keep class content organized. When students and
        instructors add a new post, they will be required to specify at least
        one folder for their post.
      </p>

      <div className="mf-section-heading">Create new folders:</div>
      <div className="mf-add-row">
        <input
          className="mf-add-input"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a folder(s)"
        />
        <button className="mf-btn-add" onClick={handleAdd}>
          Add folder
        </button>
      </div>

      <div className="mf-section-heading" style={{ marginTop: "28px" }}>
        Manage folders:
      </div>
      <p className="mf-manage-hint">
        Reorder, delete, edit folder names, or create subfolders.
      </p>

      <div className="mf-list-toolbar">
        <button
          className="mf-btn-delete-selected"
          onClick={handleDelete}
          disabled={selected.length === 0}
        >
          Delete selected folders
        </button>
      </div>

      <div className="mf-folder-list">
        {folders.length === 0 && (
          <div className="mf-empty">No folders yet. Add one above.</div>
        )}
        {folders.map((folder) => (
          <div
            key={folder._id}
            className={`mf-folder-row${selected.includes(folder._id) ? " selected" : ""}`}
          >
            <div className="mf-folder-left">
              <input
                type="checkbox"
                className="mf-checkbox"
                checked={selected.includes(folder._id)}
                onChange={() => toggleSelect(folder._id)}
              />

              {editingId === folder._id ? (
                <input
                  className="mf-edit-input"
                  value={editingName}
                  autoFocus
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(folder._id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
              ) : (
                <span className="mf-folder-chip">{folder.name}</span>
              )}
            </div>

            <div className="mf-folder-actions">
              {editingId === folder._id ? (
                <>
                  <button
                    className="mf-btn-action save"
                    onClick={() => handleSave(folder._id)}
                  >
                    Save
                  </button>
                  <button
                    className="mf-btn-action cancel"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mf-btn-action edit"
                    onClick={() => {
                      setEditingId(folder._id);
                      setEditingName(folder.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="mf-btn-action create-sub"
                    onClick={() => {}}
                  >
                    Create subfolders
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
