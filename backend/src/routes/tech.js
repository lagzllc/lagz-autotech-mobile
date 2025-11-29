// backend/src/routes/tech.js
import express from "express";
import pool from "../config/db.js";
import technicianAuth from "../middleware/technicianAuth.js";

const router = express.Router();

// -----------------------------------------
// TECH LOGIN (already working)
// -----------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const tech = await pool.query("SELECT * FROM technicians WHERE email=$1", [email]);

    if (tech.rowCount === 0)
      return res.status(404).json({ error: "Technician not found" });

    const bcrypt = await import("bcryptjs");
    const valid = bcrypt.compareSync(password, tech.rows[0].password);

    if (!valid)
      return res.status(401).json({ error: "Invalid password" });

    const jwt = await import("jsonwebtoken");
    const token = jwt.sign(
      {
        id: tech.rows[0].id,
        email: tech.rows[0].email,
        role: "technician"
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Tech login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -----------------------------------------
// GET BOOKINGS ASSIGNED TO TECHNICIAN
// -----------------------------------------
router.get("/bookings", technicianAuth, async (req, res) => {
  try {
    const techId = req.tech.id;

    const jobs = await pool.query(
      "SELECT * FROM bookings WHERE technician_id=$1 ORDER BY appointment_date ASC",
      [techId]
    );

    res.json({ bookings: jobs.rows });

  } catch (err) {
    console.error("Tech bookings error:", err);
    res.status(500).json({ error: "Failed to fetch technician bookings" });
  }
});

// -----------------------------------------
// UPDATE BOOKING STATUS
// pending → in_progress → completed
// -----------------------------------------
router.put("/bookings/:id/status", technicianAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    const allowed = ["pending", "in_progress", "completed"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    await pool.query(
      "UPDATE bookings SET status=$1 WHERE id=$2",
      [status, bookingId]
    );

    res.json({ success: true, message: "Status updated" });

  } catch (err) {
    console.error("Tech update error:", err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// -----------------------------------------
// UPDATE TECHNICIAN AVAILABILITY
// available | busy | offline
// -----------------------------------------
router.put("/status", technicianAuth, async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["available", "busy", "offline"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid technician status" });
    }

    await pool.query(
      "UPDATE technicians SET status=$1 WHERE id=$2",
      [status, req.tech.id]
    );

    res.json({ success: true, message: "Technician status updated" });

  } catch (err) {
    console.error("Tech status error:", err);
    res.status(500).json({ error: "Failed to update technician status" });
  }
});

export default router;
