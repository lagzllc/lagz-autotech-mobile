import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoicePDF = (invoiceData) => {
  const { id, booking_id, amount, customer, service } = invoiceData;

  const filePath = `invoice_${id}.pdf`;
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  // HEADER
  doc.fontSize(22).text("Lagz AutoTech Mobile", { align: "center" });
  doc.fontSize(12).text("Colorado Springs, CO", { align: "center" });
  doc.moveDown();

  // INVOICE DETAILS
  doc.fontSize(18).text(`Invoice #${id}`);
  doc.fontSize(14).text(`Booking: ${booking_id}`);
  doc.text(`Customer: ${customer}`);
  doc.text(`Service: ${service}`);
  doc.text(`Amount: $${amount}`);
  doc.moveDown(2);

  // FOOTER
  doc.fontSize(12).text(
    "Thank you for choosing Lagz AutoTech Mobile!",
    { align: "center" }
  );

  doc.end();
  return filePath;
};
