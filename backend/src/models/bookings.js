// backend/src/models/bookings.js
import pool from "../config/db.js";

export async function createBooking(data) {
  const {
    customer_name,
    customer_email,
    customer_phone,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    service_id,
    technician_id,
    appointment_date
  } = data;

  const query = `
    INSERT INTO bookings (
      customer_name, customer_email, customer_phone,
      vehicle_make, vehicle_model, vehicle_year,
      service_id, technician_id, appointment_date
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;

  const values = [
    customer_name,
    customer_email,
    customer_phone,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    service_id,
    technician_id,
    appointment_date
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}
