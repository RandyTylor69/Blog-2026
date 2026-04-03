import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

// create post
app.post(`/api/create`, async (req, res) => {
  try {
    // 1. get FE data
    const { content, description, title, post_id } = req.body;

    const newPost = await db.query(
      "INSERT INTO posts (title, content, description, post_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, description, post_id],
    );
    res.status(201).json("Post Creation Successful");
  } catch (e) {
    console.error(e.message);
    res.status(500).json(e.message);
  }
});

// get all posts
app.get(`/api/posts`, async (req, res) => {
  try {
    const allPosts = await db.query("SELECT * FROM posts");
    const result = allPosts.rows;
    // trim the dates to be YYYY-MM-DD
    for (let post of result) {
      post.created_at = post.created_at.toISOString().slice(0, 10);
      post.updated_at = post.updated_at.toISOString().slice(0, 10);
    }
    res.status(201).json(result);
  } catch (e) {
    console.error(e.message);
    res.status(500).json(e.message);
  }
});

// get single post
app.get(`/api/posts/:post_id`, async (req, res) => {
  try {
    const { post_id } = req.params;
    const result = await db.query("SELECT * FROM posts WHERE post_id = $1", [
      post_id,
    ]);
    const post = result.rows[0];
    post.created_at = post.created_at.toISOString().slice(0, 10);
    post.updated_at = post.updated_at.toISOString().slice(0, 10);
    res.status(201).json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).json(e.message);
  }
});

// login
app.post(`/api/login`, async (req, res) => {
  try {
    const { password, email } = req.body;
    // compare request with db content
    const result = await db.query(
      "SELECT * FROM users WHERE password = $1 AND email = $2",
      [password, email],
    );
    // conditional return
    if (result.rows[0]) {
      res.status(201).json(result.rows[0].email);
    } else {
      res.status(201).json("wrong password or email");
    }
  } catch (e) {
    console.error(e.message);
  }
});

// edit a post
app.post(`/api/edit`, async (req, res) => {
  try {
    const { title, description, content, post_id } = req.body;
    const result = await db.query(
      "UPDATE posts SET title = $1, description = $2, content = $3 WHERE post_id = $4",
      [title, description, content, post_id],
    );
    res.status(201).json("successful edit");
  } catch (e) {
    console.error(e.message);
  }
});

// delete a post
app.delete(`/api/delete/:post_id`, async (req, res) => {
  try {
    const { post_id } = req.params;
    const result = await db.query("DELETE FROM posts WHERE post_id = $1", [
      post_id,
    ]);
    res.status(201).json(`todo id ${post_id} deleted`);
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(5000, () => console.log("App running healthy on 5000"));
