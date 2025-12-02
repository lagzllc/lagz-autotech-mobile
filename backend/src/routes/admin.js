import express from "express";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    try {
        const result = await pool.query(
            "SELECT * FROM admins WHERE email = $1 LIMIT 1",
            [email]
        );

        if (result.rows.length === 0)
            return res.status(401).json({ message: "Invalid credentials" });

        const admin = result.rows[0];

        const match = await bcryptjs.compare(password, admin.password);
        if (!match)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin.id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful", token, admin });
    } catch (err) {
        console.error("Admin login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
