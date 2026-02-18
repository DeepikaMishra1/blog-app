import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.map(b => (
        <div key={b._id}>
          <h4>{b.title}</h4>
          <p>{b.content}</p>
        </div>
      ))}
    </div>
  );
}

