console.log("✅ Booking created:", booking);

// ---- SEND EMAILS ----
try {
  await sendBookingEmail(booking);
} catch (err) {
  console.error("❌ Email error (customer):", err);
}

try {
  await sendAdminNotification(booking);
} catch (err) {
  console.error("❌ Email error (admin):", err);
}

// ---- SEND SMS ----
try {
  await sendCustomerSMS(booking);
} catch (err) {
  console.error("❌ SMS error (customer):", err);
}

try {
  await sendTechSMS(booking);
} catch (err) {
  console.error("❌ SMS error (tech):", err);
}

return booking;
