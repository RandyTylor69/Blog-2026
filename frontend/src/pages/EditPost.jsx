import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router";
import "../CSS/CreatePost.css";
import rehypeSlug from "rehype-slug";

import "github-markdown-css/github-markdown.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function EditPost() {
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { post_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, description, title, post_id }),
      });
      const data = await res.json();
      if (data == "successful edit") {
        alert(data);
        navigate("/");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    // fetch post data from db

    const fetchPostData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}`,
      );
      const data = await res.json();

      setTitle(data.title);
      setContent(data.content);
      setDescription(data.description);
    };

    fetchPostData();

    // ----------- REFRESH ALERT ------------
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
            value={content}
          />

          <textarea
            className="description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
            value={description}
          />

          <input
            className="title"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Title"
            value={title}
          />

          <button type="submit">Submit</button>
        </form>
        <div className="markdown-body markdown-container ">
          <ReactMarkdown
            rehypePlugins={[rehypeSlug]}
            components={{
              code({ className, children, ...rest }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={nord}
                    {...rest}
                  >
                    {children}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
