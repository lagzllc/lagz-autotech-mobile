import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,    // service@lagzautotechmobile.com
        pass: process.env.EMAIL_PASS     // your gmail/app password
      }
    });

    await transporter.sendMail({
      from: `"Lagz AutoTech Mobile" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
};
