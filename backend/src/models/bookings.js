// backend/src/models/bookings.js
import pool from "../config/db.js";
import { 
  sendBookingEmail, 
  sendAdminNotification, 
  sendInvoiceEmail 
} from "../utils/email.js";
import { generateInvoicePDF } from "../utils/pdf.js";

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

    // ---- SEND CONFIRMATION EMAIL ----
    try {
      await sendBookingEmail(booking);
    } catch (err) {
      console.error("❌ Email error (customer):", err);
    }

    // ---- SEND ADMIN EMAIL ----
    try {
      await sendAdminNotification(booking);
    } catch (err) {
      console.error("❌ Email error (admin):", err);
    }

    // ---- CREATE INVOICE ----
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
          "Service",        // update later
          "Assigned Tech",  // update later
          49.99             // update later
        ]
      );

      const invoiceId = invoice.rows[0].id;

      // Generate PDF
      const pdfPath = await generateInvoicePDF(booking, invoiceId);

      // Email invoice
      await sendInvoiceEmail(booking, pdfPath);

      console.log("📄 Invoice generated & emailed!");
    } catch (err) {
      console.error("❌ Invoice error:", err);
    }

    return booking;
  } catch (err) {
    console.error("Booking error:", err);
    throw err;
  }
};
