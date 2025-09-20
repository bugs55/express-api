import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

// GET /api/posts - Get all posts with optional limit parameter
router.get("/", getAllPosts);

// GET /api/posts/:id - Get single post by ID
router.get("/:id", getPostById);

// POST /api/posts - Create new post
router.post("/", createPost);

// PUT /api/posts/:id - Update existing post by ID
router.put("/:id", updatePost);

// DELETE /api/posts/:id - Delete post by ID
router.delete("/:id", deletePost);

export default router;
