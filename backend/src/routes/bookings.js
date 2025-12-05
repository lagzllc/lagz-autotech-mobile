import express from "express";
import pool from "../db.js";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// CREATE BOOKING
router.post("/", async (req, res) => {
  const {
    name,
    phone,
    email,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    engine,
    vin,
    service,
    notes,
    date
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings
        (name, phone, email, vehicle_year, vehicle_make, vehicle_model, engine, vin, service, notes, date, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending')
       RETURNING *`,
      [name, phone, email, vehicle_year, vehicle_make, vehicle_model, engine, vin, service, notes, date]
    );

    const booking = result.rows[0];

    // SEND EMAIL NOTIFICATION
    await resend.emails.send({
      from: `Lagz AutoTech <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking Submitted",
      html: `
        <h2>New Booking Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Vehicle:</b> ${vehicle_year} ${vehicle_make} ${vehicle_model}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Notes:</b> ${notes}</p>
      `
    });

    res.json({ success: true, booking });

  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
