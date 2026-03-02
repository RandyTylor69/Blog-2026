import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import "../CSS/CreatePost.css";
import "github-markdown-css/github-markdown.css";

export default function CreatePost() {
  const [postBody, setPostBody] = useState("");
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(e);
    console.log(formData);
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
        <form action={handleSubmit}>
          <textarea
            onChange={(e) => setPostBody(e.target.value)}
            name="postBody"
          />
          <button type="submit">Submit</button>
        </form>
        <div className="markdown-body markdown-container ">
          <Markdown>{postBody}</Markdown>
        </div>
      </div>
    </div>
  );
}
