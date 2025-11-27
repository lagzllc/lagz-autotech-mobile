// backend/src/models/services.js
import pool from "../config/db.js";

export async function getAllServices() {
  const query = "SELECT * FROM services ORDER BY id ASC";
  const result = await pool.query(query);
  return result.rows;
}
