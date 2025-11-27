import pool from "../config/db.js";
import { sendBookingEmail } from "../utils/email.js";

export async function createBooking(data) {
  try {
    const query = `
      INSERT INTO bookings (
        customer_name, customer_email, customer_phone,
        vehicle_make, vehicle_model, vehicle_year,
        service_id, technician_id, appointment_date
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
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

    // ✅ Send confirmation email
    sendBookingEmail(booking).catch(err =>
      console.error("Email error:", err)
    );

    return booking;

  } catch (err) {
    console.error("Booking error:", err);
    throw err;
  }
}

// Send customer confirmation
await sendEmail(
  data.customer_email,
  "Your Booking is Confirmed - Lagz AutoTech Mobile",
  `
  <h2>Thanks for booking with us!</h2>
  <p>Your appointment is scheduled for <strong>${data.appointment_date}</strong>.</p>
  <p>We will contact you shortly.</p>
  `
);

// Send admin alert
await sendEmail(
  "service@lagzautotechmobile.com",
  "New Booking Received",
  `
  <h2>New Booking</h2>
  <p>Name: ${data.customer_name}</p>
  <p>Service ID: ${data.service_id}</p>
  <p>Scheduled: ${data.appointment_date}</p>
  `
);
