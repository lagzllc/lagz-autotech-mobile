import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const tech = await db.oneOrNone(
      "SELECT * FROM technicians WHERE email=$1",
      [email]
    );

    if (!tech) return res.status(400).json({ error: "Technician not found" });

    const isMatch = await bcrypt.compare(password, tech.password);

    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: tech.id, role: "technician" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, tech });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
