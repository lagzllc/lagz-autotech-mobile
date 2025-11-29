import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

/* ----------------------------
    TECH LOGIN
----------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM technicians WHERE email=$1 LIMIT 1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Technician not found" });
    }

    const tech = result.rows[0];

    // bcryptjs compare
    const isMatch = await bcrypt.compare(password, tech.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: tech.id, role: "technician" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Tech login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ----------------------------
    TECH PROFILE
----------------------------- */
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization?.split(" ")[1];
    if (!auth) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(auth, process.env.JWT_SECRET);

    const result = await pool.query(
      "SELECT id, name, email, status FROM technicians WHERE id=$1",
      [decoded.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Tech /me error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ----------------------------
    TECH BOOKINGS
----------------------------- */
router.get("/bookings", async (req, res) => {
  try {
    const auth = req.headers.authorization?.split(" ")[1];
    if (!auth) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(auth, process.env.JWT_SECRET);

    const result = await pool.query(
      "SELECT * FROM bookings WHERE technician_id=$1 ORDER BY appointment_date ASC",
      [decoded.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Tech bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ----------------------------
    UPDATE BOOKING STATUS
----------------------------- */
router.put("/bookings/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    const result = await pool.query(
      "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
      [status, bookingId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Tech update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ----------------------------
    EXPORT ROUTER
----------------------------- */
export default router;
