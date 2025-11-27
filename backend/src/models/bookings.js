// backend/src/models/bookings.js
import pool from "../config/db.js";
import { sendBookingEmail, sendAdminNotification } from "../utils/email.js";

export const createBooking = async (data) => {
  try {
    const query = `
      INSERT INTO bookings (
        customer_name, customer_email, customer_phone,
        vehicle_make, vehicle_model, vehicle_year,
        service_id, technician_id, appointment_date
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;

    const values = [
      data.customer_name,
      data.customer_email,
      data.customer_phone,
      data.vehicle_make,
      data.vehicle_model,
      data.vehicle_year,
      data.service_id,
      data.technician_id,
      data.appointment_date
    ];

    const result = await pool.query(query, values);
    const booking = result.rows[0];

    console.log("✅ Booking created:", booking);

    // ---- SEND EMAILS ----
    try {
      await sendBookingEmail(booking);
    } catch (err) {
      console.error("❌ Email error (customer):", err);
    }

    try {
      await sendAdminNotification(booking);
    } catch (err) {
      console.error("❌ Email error (admin):", err);
    }

    return booking;
  } catch (err) {
    console.error("Booking error:", err);
    throw err;
  }
};
