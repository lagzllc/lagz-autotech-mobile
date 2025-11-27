import db from "../config/db.js";

export const createInvoicesTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      booking_id INTEGER REFERENCES bookings(id),
      amount NUMERIC(10,2),
      paid BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const createInvoice = async (booking_id, amount) => {
  const result = await db.query(
    `INSERT INTO invoices (booking_id, amount) VALUES ($1,$2) RETURNING *`,
    [booking_id, amount]
  );
  return result.rows[0];
};
