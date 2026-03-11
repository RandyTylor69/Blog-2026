import "../CSS/Login.css";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const formData = Object.fromEntries(e);
    console.log(formData);
    navigate("/");
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
