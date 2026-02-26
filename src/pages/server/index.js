import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Admin login
app.post("/api/admin-login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE username=$1 AND password=$2",
      [username, password]
    );

    if (user.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Save assessment
app.post("/api/assessment", async (req, res) => {
  const { username, day, topic, score, duration } = req.body;

  const completed = score >= 80;

  try {
    await pool.query(
      `INSERT INTO assessments (username, day, topic, score, duration_seconds, completed)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, day, topic, score, duration, completed]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get all assessment data
app.get("/api/assessments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM assessments ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Reset all data
app.delete("/api/assessments", async (req, res) => {
  try {
    await pool.query("DELETE FROM assessments");
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));