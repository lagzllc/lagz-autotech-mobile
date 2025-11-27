// backend/src/utils/email.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --------------------------------------------------------
//  NEW EMAILS YOU REQUESTED
// --------------------------------------------------------
const ADMIN_EMAIL = "admin@lagzautotechmobile.com";
const TECHNICIAN_EMAIL = "noah@lagzautotechmobile.com";
const FROM_EMAIL = "service@lagzautotechmobile.com";   // customer-facing
// --------------------------------------------------------

export async function sendBookingEmail(booking) {
  try {
    await resend.emails.send({
      from: `Lagz AutoTech Mobile <${FROM_EMAIL}>`,
      to: booking.customer_email,
      subject: "Your Booking Confirmation",
      html: `
        <h2>Booking Confirmed</h2>
        <p>Hi ${booking.customer_name}, your booking has been received!</p>
        <p><strong>Service:</strong> ID ${booking.service_id}</p>
        <p><strong>Date:</strong> ${booking.appointment_date}</p>
        <p>We will contact you soon.</p>
      `
    });

    console.log("Customer email sent!");
  } catch (err) {
    console.error("❌ Email error (customer):", err);
  }
}

export async function sendAdminNotification(booking) {
  try {
    await resend.emails.send({
      from: `Lagz AutoTech Mobile <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL, TECHNICIAN_EMAIL], // send to BOTH admin + tech
      subject: "New Booking Received",
      html: `
        <h2>New Booking Created</h2>
        <p><strong>Name:</strong> ${booking.customer_name}</p>
        <p><strong>Email:</strong> ${booking.customer_email}</p>
        <p><strong>Phone:</strong> ${booking.customer_phone}</p>
        <p><strong>Service ID:</strong> ${booking.service_id}</p>
        <p><strong>Date:</strong> ${booking.appointment_date}</p>
      `
    });

    console.log("Admin + Technician notification sent!");
  } catch (err) {
    console.error("❌ Email error (admin):", err);
  }
}
