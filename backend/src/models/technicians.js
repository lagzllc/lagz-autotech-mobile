import db from "../config/db.js";

export const createTechniciansTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS technicians (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      email VARCHAR(255),
      status VARCHAR(50) DEFAULT 'available',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const addTechnician = async (data) => {
  const { name, phone, email } = data;
  const result = await db.query(
    "INSERT INTO technicians (name, phone, email) VALUES ($1,$2,$3) RETURNING *",
    [name, phone, email]
  );
  return result.rows[0];
};

export const getAvailableTechs = async () => {
  const result = await db.query(
    "SELECT * FROM technicians WHERE status='available'"
  );
  return result.rows;
};
