import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import "../CSS/CreatePost.css";
import "github-markdown-css/github-markdown.css";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/create`,
        {
          method: "POST",
          body: JSON.stringify({ content, description, title }),
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error(e.message);
    }
    console.log(title, description, content);
  };
  // ----------- REFRESH ALERT ------------
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  // -------------------------------------
  return (
    <div className="create-post-wrapper">
      <div className="cpw-inner-wrapper">
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            name="content"
            className="content"
            placeholder="Start writing..."
          />

          <textarea
            className="description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
          />

          <input
            className="title"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Title"
          />

          <button type="submit">Submit</button>
        </form>
        <div className="markdown-body markdown-container ">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
