import db from "../config/db.js";

export const createBookingsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      vehicle_id INTEGER REFERENCES vehicles(id),
      technician_id INTEGER REFERENCES technicians(id),
      service TEXT,
      notes TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      scheduled_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const createBooking = async (data) => {
  const { customer_id, vehicle_id, technician_id, service, notes, scheduled_at } = data;
  const result = await db.query(
    `INSERT INTO bookings (customer_id, vehicle_id, technician_id, service, notes, scheduled_at)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [customer_id, vehicle_id, technician_id, service, notes, scheduled_at]
  );
  return result.rows[0];
};
