// backend/src/routes/technicians.js
import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/* ---------------------------
   GET ALL TECHNICIANS
---------------------------- */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM technicians ORDER BY id DESC");
    res.json({ technicians: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to load technicians" });
  }
});

/* ---------------------------
   CREATE TECHNICIAN
---------------------------- */
router.post("/", adminAuth, async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO technicians (name, email, phone, password)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, hashed]
    );

    res.json({ success: true, tech: result.rows[0] });

  } catch (err) {
    res.status(500).json({ error: "Failed to create technician" });
  }
});

/* ---------------------------
   UPDATE TECHNICIAN
---------------------------- */
router.put("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, status } = req.body;

  try {
    const resUpdate = await pool.query(
      `UPDATE technicians
       SET name=$1, email=$2, phone=$3, status=$4
       WHERE id=$5 RETURNING *`,
      [name, email, phone, status, id]
    );

    res.json({ success: true, tech: resUpdate.rows[0] });

  } catch (err) {
    res.status(500).json({ error: "Failed to update technician" });
  }
});

/* ---------------------------
   DELETE TECHNICIAN
---------------------------- */
router.delete("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM technicians WHERE id=$1", [id]);
    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to delete technician" });
  }
});

export default router;
