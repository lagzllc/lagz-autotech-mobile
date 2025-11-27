// backend/src/utils/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail(booking) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: booking.customer_email,
      subject: "Your Appointment is Confirmed",
      html: `
        <h2>Appointment Confirmation</h2>
        <p>Hi ${booking.customer_name},</p>
        <p>Your appointment is scheduled for:</p>
        <p><strong>${booking.appointment_date}</strong></p>
        <p>Thank you for choosing Lagz AutoTech Mobile.</p>
      `
    });

    console.log("Customer email sent!");
  } catch (err) {
    console.error("Email error (customer):", err);
  }
}

export async function sendAdminNotification(booking) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking Received",
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${booking.customer_name}</p>
        <p><strong>Service ID:</strong> ${booking.service_id}</p>
        <p><strong>Date:</strong> ${booking.appointment_date}</p>
      `
    });

    console.log("Admin email sent!");
  } catch (err) {
    console.error("Email error (admin):", err);
  }
}
