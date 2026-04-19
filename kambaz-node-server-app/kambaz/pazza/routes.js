import { PazzaDao, FoldersDao } from "./dao.js";

export default function PazzaRoutes(app) {
  const pDao = PazzaDao();
  const fDao = FoldersDao();
  
  app.get("/api/pazza/:cid/posts", async (req, res) => {
    try {
      const posts = await pDao.findPostsForCourse(req.params.cid);
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.post("/api/pazza/:cid/posts", async (req, res) => {
    try {
      const { cid } = req.params;
      if (!cid || cid === "undefined") {
        return res.status(400).json({ error: "Invalid course ID." });
      }
      const currentUser = req.session?.currentUser;
      const authorId   = currentUser?._id || null;
      const authorRole = currentUser?.role === "FACULTY" ? "INSTRUCTOR" : "STUDENT";
      const authorName = currentUser
        ? [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ") ||
          currentUser.username || currentUser.email || "Unknown"
        : "Unknown";

      const { type, postTo, folders, summary, details } = req.body;
      const post = await pDao.createPost(cid, authorId, authorRole, authorName, {
        type, postTo, folders, summary, details,
      });
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.get("/api/pazza/posts/:pid/details", async (req, res) => {
    try {
      const post = await pDao.findPostWithDetails(req.params.pid);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.delete("/api/pazza/posts/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      console.log("DELETE post request for pid:", pid);
 
      const currentUser = req.session?.currentUser;
      console.log("currentUser on delete:", currentUser?._id, currentUser?.role);
 
      const post = await pDao.findPostById(pid);
      console.log("Found post:", post?._id, "author:", post?.author);
 
      if (!post) return res.status(404).json({ error: "Post not found.", pid });
 
      const isInstructor = currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";
      const isAuthor = currentUser?._id === post.author;
      if (!isInstructor && !isAuthor) {
        return res.status(403).json({ error: "Not authorized to delete this post." });
      }
 
      await pDao.deletePost(pid);
      res.json({ deleted: pid });
    } catch (err) {
      console.error("Error deleting post:", err);
      res.status(500).send(err.message);
    }
  });

  app.get("/api/pazza/:cid/stats", async (req, res) => {
    try {
      const { cid } = req.params;
      const userId = req.session?.currentUser?._id || null;
      const stats = await pDao.getCourseStats(cid, userId);
      res.json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.get("/api/pazza/:cid/folders", async (req, res) => {
    try {
      const folders = await fDao.findFoldersForCourse(req.params.cid);
      res.json(folders);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.post("/api/pazza/:cid/folders", async (req, res) => {
    try {
      const { cid } = req.params;
      const { name } = req.body;
      const folder = await fDao.createFolder(cid, name);
      res.json(folder);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.delete("/api/pazza/folders", async (req, res) => {
    try {
      const { folderIds } = req.body;
      const status = await fDao.deleteFolders(folderIds);
      res.json(status);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });

  app.put("/api/pazza/folders/:fid", async (req, res) => {
    try {
      const { fid } = req.params;
      const { name } = req.body;
      const status = await fDao.updateFolder(fid, name);
      res.json(status);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
}