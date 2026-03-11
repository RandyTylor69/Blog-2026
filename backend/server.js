import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = new Pool({
  connectionString: `postgresql://postgres.yfoqhbcmwivyuntwzifo:${process.env.DB_PASSWORD}@aws-1-ca-central-1.pooler.supabase.com:5432/postgres`,
});

app.post(`/api/create`, async (req, res) => {
  try {
    // 1. get FE data
    const { content, description, title } = req.body;
    const newPost = await db.query(
      "INSERT INTO posts (title, content, description) VALUES ($1, $2, $3) RETURNING *",
      [title, content, description],
    );
    res.status(201).json(newPost);
  } catch (e) {
    console.error(e.message);
    res.status(500).json(e.message);
  }
});

app.get("/api/test", async (req, res) => {
  console.log("im running alright");
  res.status(200).json(process.env.DB_PASSWORD);
});

app.listen(5000, () => console.log("App running healthy on 5000"));
