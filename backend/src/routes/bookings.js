import express from "express";
import pool from "../config/db.js";
import { Resend } from "resend";

const router = express.Router();

// Initialize Resend email client
const resend = new Resend(process.env.RESEND_API_KEY);

// CREATE A NEW BOOKING
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

  // Required fields
  if (!name || !phone || !service) {
    return res.status(400).json({
      message: "Missing required fields: name, phone, and service are required.",
    });
  }

  try {
    // Insert booking into database
    const result = await pool.query(
      `INSERT INTO bookings 
      (name, phone, email, vehicle_year, vehicle_make, vehicle_model, engine, vin, service, notes, date, status)
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

    // ---------------------------------------------------------------------
    // EMAIL NOTIFICATIONS (Admin, Technician, Customer)
    // ---------------------------------------------------------------------

    // Admin email
    await resend.emails.send({
      from: "Lagz AutoTech <notifications@lagzautotechmobile.com>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking Received",
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>

        <h3>Vehicle Details</h3>
        <p><strong>Year:</strong> ${vehicle_year}</p>
        <p><strong>Make:</strong> ${vehicle_make}</p>
        <p><strong>Model:</strong> ${vehicle_model}</p>
        <p><strong>Engine:</strong> ${engine}</p>
        <p><strong>VIN:</strong> ${vin}</p>

        <h3>Service</h3>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Date Requested:</strong> ${date}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      `,
    });

    // Technician email
    await resend.emails.send({
      from: "Lagz AutoTech <notifications@lagzautotechmobile.com>",
      to: process.env.TECH_EMAIL,
      subject: "New Job Available",
      html: `
        <h2>New Job Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Vehicle:</strong> ${vehicle_year} ${vehicle_make} ${vehicle_model}</p>
        <p>Please log in to your technician dashboard to accept this job.</p>
      `,
    });

    // Customer confirmation email (optional but recommended)
    if (email) {
      await resend.emails.send({
        from: "Lagz AutoTech <notifications@lagzautotechmobile.com>",
        to: email,
        subject: "Your Booking Has Been Received",
        html: `
          <h2>Your Request Is Confirmed!</h2>
          <p>Hi ${name},</p>
          <p>We have received your booking request. A technician will contact you shortly.</p>
          <h3>Booking Summary</h3>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Vehicle:</strong> ${vehicle_year} ${vehicle_make} ${vehicle_model}</p>
          <p>Thank you for choosing Lagz AutoTech Mobile!</p>
        `,
      });
    }

    return res.json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    console.error("Booking creation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
