import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "training_db", // your database
  password: "Admin123",    // your password
  port: 5432,
});

export default pool;