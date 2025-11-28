// backend/src/models/bookings.js
import pool from "../config/db.js";
import { generateInvoicePDF } from "../utils/pdf.js";
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

    // ---- INVOICE CREATION ----
    try {
      const invoice = await pool.query(
        `INSERT INTO invoices (
           booking_id, customer_name, customer_email, 
           service_name, technician_name, total
         ) VALUES ($1,$2,$3,$4,$5,$6)
         RETURNING id;`,
        [
          booking.id,
          booking.customer_name,
          booking.customer_email,
          "Service",
          "Assigned Tech",
          49.99
        ]
      );

      const invoiceId = invoice.rows[0].id;

      await generateInvoicePDF(booking, invoiceId);

    } catch (err) {
      console.error("Invoice/PDF error:", err);
    }

    // ---- SEND EMAILS ----
    try {
      await sendBookingEmail(booking);
      console.log("Customer email sent!");
    } catch (err) {
      console.error("Email error (customer):", err);
    }

    try {
      await sendAdminNotification(booking);
      console.log("Admin email sent!");
    } catch (err) {
      console.error("Email error (admin):", err);
    }

    return booking;

  } catch (err) {
    console.error("Booking error:", err);
    throw err;
  }
};
