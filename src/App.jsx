import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Post from "./pages/Post";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":postid" element={<Post />} />
      <Route path="login" element={<Login />} />
      <Route path="create-post" element={<CreatePost />} />
    </Routes>
  );
}
