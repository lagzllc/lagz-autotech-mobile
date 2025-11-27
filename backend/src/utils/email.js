import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingEmail(booking) {
  try {
    const mailOptions = {
      from: `"Lagz AutoTech Mobile" <${process.env.EMAIL_USER}>`,
      to: booking.customer_email,
      subject: "Lagz AutoTech – Booking Confirmation",
      html: `
        <h2>Your appointment is confirmed</h2>
        <p>Hello <strong>${booking.customer_name}</strong>,</p>
        <p>Your vehicle service appointment has been scheduled:</p>
        <ul>
          <li><b>Vehicle:</b> ${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}</li>
          <li><b>Service ID:</b> ${booking.service_id}</li>
          <li><b>Technician ID:</b> ${booking.technician_id}</li>
          <li><b>Appointment:</b> ${booking.appointment_date}</li>
        </ul>
        <p>We look forward to serving you!</p>
        <p>— Lagz AutoTech Mobile</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.messageId);

  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
}
