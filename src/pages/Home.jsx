import "../CSS/Home.css";
export default function Home() {
  return (
    <div className="outer-wrapper">
      <div className="header-wrapper">
        <header>
          <a href="https://ziyinmao.vercel.app/">Ziyin Mao</a>
          <h1>Journal</h1>
          <p>
            I've never been good at writing, but this mind full of thoughts
            needs an outlet. Things I learned about web development or
            full-stack engineering are kept here, safe and sound.
          </p>
        </header>
      </div>
      <div className="main-wrapper">
        <main>
          {post.map((p) => (
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p className="description">{p.description}</p>
              <p className="date">{p.date}</p>
            </article>
          ))}
        </main>
      </div>
      <div className="footer-wrapper">
        {" "}
        <footer>
          <p>
            Made by <a className="portfolio-footer-link" href="https://ziyinmao.vercel.app/">Ziyin Mao</a>
          </p>
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
