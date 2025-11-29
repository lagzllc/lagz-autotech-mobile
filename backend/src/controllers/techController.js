// backend/src/controllers/techController.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const techLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM technicians WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Technician not found" });
    }

    const tech = result.rows[0];

    const isMatch = await bcrypt.compare(password, tech.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: tech.id,
        email: tech.email,
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
};
