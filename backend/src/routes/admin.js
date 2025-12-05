import express from "express";
import pool from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admins WHERE email=$1 LIMIT 1", [email]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const admin = result.rows[0];

    const match = await bcryptjs.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, admin });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET INVOICES
router.get("/invoices", adminAuth, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM invoices ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Admin invoices error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
