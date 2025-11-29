// backend/src/controllers/technicianController.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const technicianLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const tech = await pool.query("SELECT * FROM technicians WHERE email=$1", [email]);

    if (tech.rows.length === 0) {
      return res.status(404).json({ error: "Technician not found" });
    }

    const user = tech.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: "technician" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Technician login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM bookings WHERE technician_id=$1 ORDER BY id DESC`,
      [req.tech.id]
    );

    res.json({ bookings: result.rows });
  } catch (err) {
    console.error("Fetch tech bookings error:", err);
    res.status(500).json({ error: "Cannot load bookings" });
  }
};

export const completeBooking = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE bookings SET status='completed' WHERE id=$1`,
      [id]
    );

    res.json({ success: true, message: "Booking marked completed" });
  } catch (err) {
    console.error("Tech complete error:", err);
    res.status(500).json({ error: "Failed to complete booking" });
  }
};
