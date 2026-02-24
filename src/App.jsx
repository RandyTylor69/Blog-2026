import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":postid" element={<Post />} />
    </Routes>
  );
}
