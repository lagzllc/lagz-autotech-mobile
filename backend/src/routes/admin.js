// backend/src/routes/admin.js
import express from "express";
import pool from "../config/db.js";
import { adminLogin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* ---------------------- ADMIN LOGIN ---------------------- */
router.post("/login", adminLogin);

/* ---------------------- ADMIN PROFILE ---------------------- */
router.get("/me", adminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

/* ---------------------- ADMIN BOOKINGS LIST ---------------------- */
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    res.json({ bookings: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/* ---------------------- ADMIN STATS ---------------------- */
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalBookings = await pool.query(`SELECT COUNT(*) FROM bookings`);
    const pending = await pool.query(
      `SELECT COUNT(*) FROM bookings WHERE status='pending'`
    );
    const completed = await pool.query(
      `SELECT COUNT(*) FROM bookings WHERE status='completed'`
    );
    const revenue = await pool.query(`SELECT COALESCE(SUM(total),0) FROM invoices`);
    const techs = await pool.query(`SELECT COUNT(*) FROM technicians`);

    res.json({
      totalBookings: totalBookings.rows[0].count,
      pending: pending.rows[0].count,
      completed: completed.rows[0].count,
      revenue: revenue.rows[0].coalesce ?? revenue.rows[0].sum,
      technicians: techs.rows[0].count,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export default router;
import { getAdminStats } from "../controllers/adminController.js";

router.get("/stats", adminAuth, getAdminStats);
