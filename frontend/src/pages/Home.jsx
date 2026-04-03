import "../CSS/Home.css";
import { CgCodeSlash } from "react-icons/cg";
import { Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // auto scroll to top upon each refresh
    window.scrollTo(0, 0);

    // fetch all posts from server
    const fetchAllPosts = async () => {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
      if (!res.ok) {
        console.error("response error from server");
        setLoading(false);
        alert("response error from server, check the console");
      }
      const data = await res.json();
      setPosts(data.reverse());
      setLoading(false);
    };

    setTimeout(() => {
      fetchAllPosts();
    }, 3000);
  }, []);

  return (
    <div className="outer-wrapper">
      <div className="header-wrapper">
        <header>
          <h1>Journal</h1>
          {localStorage.user && (
            <Link className="utility-btn" id="header-btn" to="create-post">
              +
            </Link>
          )}

          <p>
            I've never been good at writing, but this mind full of thoughts
            needs an outlet. I study software, typography, and motion design.
            Find me at{" "}
            <a target="_blank" href="https://ziyinmao.vercel.app">
              Ziyin
            </a>{" "}
            <GoArrowUpRight />
          </p>
        </header>
      </div>
      <div className="main-wrapper">
        <main>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : (
            posts.map((p) => (
              <article className="home-post-container" key={p.post_id}>
                <div className="link-to-post">
                  <Link to={p.post_id}>{p.title}</Link>
                </div>

                <p className="description">{p.description}</p>
                <p className="date">{p.created_at}</p>
              </article>
            ))
          )}
        </main>
      </div>
      <div className="footer-wrapper">
        {" "}
        <footer>
          <p>
            Made by{" "}
            <a
              className="portfolio-footer-link"
              href="https://ziyinmao.vercel.app/"
            >
              Ziyin Mao
            </a>
          </p>
          <div className="btn-container">
            <Link to="login" className="utility-btn">
              <CgCodeSlash />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

const post = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    date: "2026-02-23",
    id: 0,
  },

  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    date: "2026-02-23",
    id: 1,
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    date: "2026-02-23",
    id: 2,
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    date: "2026-02-23",
    id: 3,
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    date: "2026-02-23",
    id: 4,
  },
];
