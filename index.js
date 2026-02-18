const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect (MongoDB installed hona chahiye)
mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Blog API Running...");
});

// Blog Model
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);

// CREATE
app.post("/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

// READ
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// UPDATE
app.put("/blogs/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// DELETE
app.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
