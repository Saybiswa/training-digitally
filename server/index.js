import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "training_db",
  password: "your_password",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/assessment", async (req, res) => {
  try {
    const { username, day, topic, score, duration, totalTopics } = req.body;

    await pool.query(
      `INSERT INTO assessments
       (username, day, topic, score, duration, total_topics)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, day, topic, score, duration, totalTopics]
    );

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});