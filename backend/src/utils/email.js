// backend/src/utils/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ======================
// 📧 EMAIL ADDRESSES
// ======================
const ADMIN_EMAIL = "admin@lagzautotechmobile.com";
const TECHNICIAN_EMAIL = "noah@lagzautotechmobile.com";
const SERVICE_EMAIL = "service@lagzautotechmobile.com";

// ======================
// 📩 Send email to customer
// ======================
export async function sendBookingEmail(booking) {
  try {
    await resend.emails.send({
      from: "Lagz AutoTech <service@lagzautotechmobile.com>",
      to: booking.customer_email,
      subject: "Your Booking is Confirmed!",
      html: `
        <h2>Your Booking is Confirmed</h2>
        <p>Thank you for choosing Lagz AutoTech Mobile!</p>
        <p><strong>Appointment:</strong> ${booking.appointment_date}</p>
        <p><strong>Service ID:</strong> ${booking.service_id}</p>
      `
    });

    console.log("Customer email sent!");
  } catch (err) {
    console.error("❌ Email error (customer):", err);
  }
}

// ======================
// 🛠 Send notification to Admin + Technician + Service Desk
// ======================
export async function sendAdminNotification(booking) {
  const emails = [ADMIN_EMAIL, TECHNICIAN_EMAIL, SERVICE_EMAIL];

  for (const email of emails) {
    try {
      await resend.emails.send({
        from: "Lagz AutoTech <service@lagzautotechmobile.com>",
        to: email,
        subject: "📥 New Booking Submitted",
        html: `
          <h2>New Booking Alert</h2>
          <p><strong>Name:</strong> ${booking.customer_name}</p>
          <p><strong>Email:</strong> ${booking.customer_email}</p>
          <p><strong>Phone:</strong> ${booking.customer_phone}</p>
          <p><strong>Vehicle:</strong> ${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}</p>
          <p><strong>Service ID:</strong> ${booking.service_id}</p>
          <p><strong>Technician:</strong> ${booking.technician_id}</p>
          <p><strong>Appointment:</strong> ${booking.appointment_date}</p>
        `
      });

      console.log(`Admin/Tech/Service email sent to: ${email}`);
    } catch (err) {
      console.error(`❌ Email error (${email}):`, err);
    }
  }
}
