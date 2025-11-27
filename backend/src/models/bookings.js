import pool from "../config/db.js";
import { sendBookingEmail, sendAdminNotification } from "../utils/email.js";

// ======================================================
// CREATE NEW BOOKING
// ======================================================

export async function createBooking(data) {
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

    // ======================================================
    // SEND EMAILS (non-blocking so API stays fast)
    // ======================================================

    sendBookingEmail(booking).catch(err =>
      console.error("❌ Email error (customer):", err)
    );

    sendAdminNotification(booking).catch(err =>
      console.error("❌ Email error (admin):", err)
    );

    // ======================================================
    // RETURN NEW BOOKING
    // ======================================================
    return booking;

  } catch (err) {
    console.error("❌ Booking error:", err);
    throw err;
  }
}

// ======================================================
// GET ALL BOOKINGS
// ======================================================

export async function getAllBookings() {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    return result.rows;
  } catch (err) {
    console.error("❌ Failed to fetch bookings:", err);
    throw err;
  }
}

// ======================================================
// GET A BOOKING BY ID
// ======================================================

export async function getBookingById(id) {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Failed to fetch booking:", err);
    throw err;
  }
}

// ======================================================
// UPDATE BOOKING STATUS
// ======================================================

export async function updateBookingStatus(id, status) {
  try {
    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Failed to update status:", err);
    throw err;
  }
}
