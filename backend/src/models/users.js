import db from "../config/db.js";

export const createUserTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const findUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  return result.rows[0];
};

export const createUser = async (name, email, password, role = "customer") => {
  const result = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, role]
  );
  return result.rows[0];
};

