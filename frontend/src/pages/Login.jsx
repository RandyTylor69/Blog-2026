import "../CSS/Login.css";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../App";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const formData = Object.fromEntries(e);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const data = await res.json();
    if (data == formData.email) {
      setUser(true);
      localStorage.setItem("user", true)
      navigate("/");
    } else {
      alert("can u lock tf in");
    }
  };

  return (
    <main className="login-main-wrapper">
      <form className="login-form" action={handleSubmit}>
        <label>
          Email
          <input placeholder="shivroy@waystarroyco.org" name="email" />
        </label>
        <label>
          Password
          <input placeholder="..." name="password" />
        </label>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
