import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export async function sendSMS(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to,
    });
  } catch (err) {
    console.error("SMS error:", err);
  }
}
