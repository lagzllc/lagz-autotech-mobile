import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

// Load API key safely
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY missing from .env");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------
// CUSTOMER CONFIRMATION EMAIL
// ---------------------------
export async function sendBookingEmail(booking) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: booking.customer_email,
      subject: "Your Booking Confirmation",
      html: `
        <h2>Thank you, ${booking.customer_name}!</h2>
        <p>Your appointment is set for:</p>
        <b>${booking.appointment_date}</b>
        <p>We look forward to serving you.</p>
      `,
    });

    console.log("Customer email sent!");
  } catch (err) {
    console.error("Email error (customer):", err);
  }
}

// ---------------------------
// ADMIN / TECH EMAIL
// ---------------------------
export async function sendAdminNotification(booking) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [
        "admin@lagzautotechmobile.com",
        "noah@lagzautotechmobile.com",
        "service@lagzautotechmobile.com"
      ],
      subject: "New Booking Received",
      html: `
        <h2>New booking received</h2>
        <p><b>Name:</b> ${booking.customer_name}</p>
        <p><b>Phone:</b> ${booking.customer_phone}</p>
        <p><b>Vehicle:</b> ${booking.vehicle_make} ${booking.vehicle_model}</p>
        <p><b>Appointment:</b> ${booking.appointment_date}</p>
      `,
    });

    console.log("Admin emails sent!");
  } catch (err) {
    console.error("Email error (admin):", err);
  }
}
