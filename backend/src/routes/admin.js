// backend/src/routes/admin.js

import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import pool from "../config/db.js";

const router = express.Router();

/* ---------------------------
   GET ALL BOOKINGS
---------------------------- */
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, t.name AS tech_name
       FROM bookings b
       LEFT JOIN technicians t ON b.technician_id = t.id
       ORDER BY b.id DESC`
    );
    res.json({ bookings: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/* ---------------------------
   UPDATE BOOKING
---------------------------- */
router.put("/booking/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { technician_id, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE bookings
       SET technician_id = $1, status = $2
       WHERE id = $3
       RETURNING *`,
      [technician_id, status, id]
    );

    res.json({ success: true, booking: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

/* ---------------------------
   ADMIN STATS
---------------------------- */
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM bookings) AS total,
        (SELECT COUNT(*) FROM bookings WHERE status='pending') AS pending,
        (SELECT COUNT(*) FROM bookings WHERE status='completed') AS completed,
        (SELECT COUNT(*) FROM technicians) AS techs
    `);

    res.json(stats.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to load stats" });
  }
});

export default router;
