import express from "express";
import pool from "../config/db.js";
import adminAuth from "../middleware/adminAuth.js";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Validate admin session
router.get("/me", adminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

// Get all bookings
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    res.json({ bookings: result.rows });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update booking status
router.put("/bookings/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *;",
      [status, id]
    );

    res.json({ updated: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Delete a booking
router.delete("/bookings/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM bookings WHERE id = $1", [id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

export default router;
