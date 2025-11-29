// backend/src/routes/services.js
import express from "express";
import pool from "../config/db.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* ---------------------------
   GET ALL SERVICES
---------------------------- */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY id DESC");
    res.json({ services: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to load services" });
  }
});

/* ---------------------------
   CREATE SERVICE
---------------------------- */
router.post("/", adminAuth, async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO services (name, price, description)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, price, description]
    );
    res.json({ success: true, service: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to create service" });
  }
});

/* ---------------------------
   UPDATE SERVICE
---------------------------- */
router.put("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE services
       SET name=$1, price=$2, description=$3
       WHERE id=$4 RETURNING *`,
      [name, price, description, id]
    );
    res.json({ success: true, service: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to update service" });
  }
});

/* ---------------------------
   DELETE SERVICE
---------------------------- */
router.delete("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM services WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;
