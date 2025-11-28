// backend/src/controllers/adminController.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin user
    const result = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Admin not found" });
    }

    const admin = result.rows[0];

    // check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
