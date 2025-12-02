import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await db.oneOrNone(
      "SELECT * FROM admin WHERE email=$1",
      [email]
    );

    if (!admin) return res.status(400).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
