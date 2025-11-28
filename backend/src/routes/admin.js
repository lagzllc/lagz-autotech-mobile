import express from "express";
import pool from "../config/db.js";
import { adminLogin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// GET all bookings (admin only)
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    res.json({ bookings: result.rows });
  } catch (err) {
    console.error("Admin bookings error:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// LOGIN
router.post("/login", adminLogin);

// CHECK LOGGED IN ADMIN
router.get("/me", adminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
