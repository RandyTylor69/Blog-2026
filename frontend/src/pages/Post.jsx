import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../CSS/Post.css";
import ReactMarkdown from "react-markdown"
import "github-markdown-css/github-markdown.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Post() {
  const { postid: post_id } = useParams();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}`,
      );
      const data = await res.json();
      setPostData(data);
      setLoading(false);
    };

    fetchPostData();
  }, []);

  return (
    <div className="post-outer-wrapper">
      {loading ? (
        <p className="loading-text">loading...</p>
      ) : (
        <main className="post-inner-wrapper">
          <h1>{postData.title}</h1>
          <p className="date">{postData.created_at}</p>
          <div className="markdown-body ">
            <ReactMarkdown
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
              {postData.content}
            </ReactMarkdown>
          </div>
        </main>
      )}
    </div>
  );
}
