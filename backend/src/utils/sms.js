// backend/src/utils/sms.js

import twilio from "twilio";

// Twilio credentials (in Render environment variables)
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

// Technician & admin phone numbers
const TECHNICIAN_NUMBER = "+17195106453"; 
const ADMIN_NUMBER = "+17195106453"; // Or another number if needed

// ===============================
// 📲  Send SMS to Customer
// ===============================
export async function sendCustomerSMS(booking) {
  try {
    await client.messages.create({
      body: `Your booking is confirmed for ${booking.appointment_date}. Thank you for choosing Lagz AutoTech Mobile!`,
      from: TWILIO_NUMBER,
      to: booking.customer_phone
    });
    console.log("Customer SMS sent!");
  } catch (err) {
    console.error("❌ Customer SMS error:", err);
  }
}

// ===============================
// 📲 Send SMS to Technician
// ===============================
export async function sendTechSMS(booking) {
  try {
    await client.messages.create({
      body: `New booking assigned:\n${booking.customer_name} - ${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}\nAppt: ${booking.appointment_date}`,
      from: TWILIO_NUMBER,
      to: TECHNICIAN_NUMBER
    });
    console.log("Technician SMS sent!");
  } catch (err) {
    console.error("❌ Technician SMS error:", err);
  }
}
