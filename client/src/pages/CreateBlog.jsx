import { useState } from "react";
import Editor from "../components/Editor";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Blog created!");
        setTitle("");
        setContent("");
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Create New Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 8 }}
          required
        />

        <br /><br />

        {/* Lexical Rich Text Editor */}
        <Editor onContentChange={setContent} />

        <br /><br />

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
