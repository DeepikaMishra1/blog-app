const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// Create blog
router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

// Get all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Update blog
router.put("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// Delete blog
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
