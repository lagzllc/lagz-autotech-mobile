import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ======================================================
// SEND EMAIL TO CUSTOMER
// ======================================================

export async function sendBookingEmail(booking) {
  const message = `
Hello ${booking.customer_name},

Your booking has been confirmed!

Service: ${booking.service_id}
Vehicle: ${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}
Appointment: ${booking.appointment_date}

Thank you for choosing Lagz AutoTech Mobile!
  `;

  await transporter.sendMail({
    from: `"Lagz AutoTech Mobile" <${process.env.EMAIL_USER}>`,
    to: booking.customer_email,
    subject: "Your booking is confirmed",
    text: message
  });
}

// ======================================================
// SEND EMAIL TO ADMIN (YOU)
// ======================================================

export async function sendAdminNotification(booking) {
  const message = `
NEW BOOKING RECEIVED:

Name: ${booking.customer_name}
Email: ${booking.customer_email}
Phone: ${booking.customer_phone}

Service: ${booking.service_id}
Vehicle: ${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}
Appointment: ${booking.appointment_date}

Check CRM for details.
  `;

  await transporter.sendMail({
    from: `"Lagz AutoTech Mobile" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Booking Received",
    text: message
  });
}
