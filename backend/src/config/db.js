import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

console.log("DB.js USING:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;
