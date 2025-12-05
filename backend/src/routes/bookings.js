import express from "express";
import pool from "../config/db.js";
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
    date,
  } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings
      (customer_name, customer_phone, customer_email,
       vehicle_year, vehicle_make, vehicle_model, engine, vin,
       service, notes, appointment_date, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending')
      RETURNING *`,
      [
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
        date,
      ]
    );

    const booking = result.rows[0];

    // ADMIN EMAIL
    await resend.emails.send({
      from: "Lagz AutoTech <notifications@lagzautotechmobile.com>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking Request",
      html: `<h2>New Booking Request</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Vehicle:</b> ${vehicle_year} ${vehicle_make} ${vehicle_model}</p>
             <p><b>Service:</b> ${service}</p>`
    });

    // TECH EMAIL
    await resend.emails.send({
      from: "Lagz AutoTech <notifications@lagzautotechmobile.com>",
      to: process.env.TECH_EMAIL,
      subject: "New Job Available",
      html: `<h2>New Job Available</h2>
             <p>${vehicle_year} ${vehicle_make} ${vehicle_model}</p>
             <p>Service: ${service}</p>`
    });

    return res.json({ message: "Booking created", booking });

  } catch (err) {
    console.error("Booking creation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
