import PDFDocument from "pdfkit";
import fs from "fs";

export function generateInvoice(booking, service) {
  const filePath = `/tmp/invoice-${booking.id}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Lagz AutoTech Mobile – Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Booking ID: ${booking.id}`);
  doc.text(`Customer: ${booking.customer_name}`);
  doc.text(`Email: ${booking.customer_email}`);
  doc.text(`Phone: ${booking.customer_phone}`);
  doc.moveDown();

  doc.text(`Vehicle: ${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}`);
  doc.text(`Service: ${service.name}`);
  doc.text(`Price: $${service.price}`);
  doc.moveDown();

  doc.text(`Appointment: ${booking.appointment_date}`);
  doc.end();

  return filePath;
}
