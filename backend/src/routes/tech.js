import express from "express";
import pool from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import techAuth from "../middleware/techAuth.js";

const router = express.Router();

// TECH LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM technicians WHERE email=$1 LIMIT 1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const tech = result.rows[0];
    const match = await bcryptjs.compare(password, tech.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: tech.id, role: "tech" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, tech });
  } catch (err) {
    console.error("Tech login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET TECH BOOKINGS
router.get("/activity", techAuth, async (req, res) => {
  const techId = req.tech.id;

  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE technician_id=$1 ORDER BY id DESC",
      [techId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Tech activity error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
