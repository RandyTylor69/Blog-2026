import { Routes, Route } from "react-router";
import { createContext, useState } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Post from "./pages/Post";

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(false);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Routes>
        <Route index element={<Home />} />
        <Route path=":postid" element={<Post />} />
        <Route path="login" element={<Login />} />
        <Route path="create-post" element={<CreatePost />} />
      </Routes>
    </AuthContext.Provider>
  );
}
