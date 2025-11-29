// backend/src/controllers/adminController.js
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =============================
//  ADMIN LOGIN
// =============================
export async function adminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND role = 'admin'",
      [email]
    );

    if (admin.rows.length === 0) {
      return res.status(400).json({ error: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, admin.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: admin.rows[0].id,
        email: admin.rows[0].email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// =============================
//  ADMIN STATS
// =============================
export async function getAdminStats(req, res) {
  try {
    const totalBookings = await pool.query("SELECT COUNT(*) FROM bookings");
    const pending = await pool.query("SELECT COUNT(*) FROM bookings WHERE status='pending'");
    const completed = await pool.query("SELECT COUNT(*) FROM bookings WHERE status='completed'");
    const revenue = await pool.query("SELECT COALESCE(SUM(total), 0) FROM invoices");
    const technicians = await pool.query("SELECT COUNT(*) FROM technicians");

    const monthlyBookings = await pool.query(`
      SELECT TO_CHAR(appointment_date, 'Mon') AS month, COUNT(*) AS bookings
      FROM bookings GROUP BY month ORDER BY MIN(appointment_date)
    `);

    const monthlyRevenue = await pool.query(`
      SELECT TO_CHAR(created_at, 'Mon') AS month, SUM(total) AS revenue
      FROM invoices GROUP BY month ORDER BY MIN(created_at)
    `);

    const serviceBreakdown = await pool.query(`
      SELECT s.name AS service, COUNT(b.id) AS count
      FROM services s
      LEFT JOIN bookings b ON b.service_id = s.id
      GROUP BY s.name
    `);

    const techPerformance = await pool.query(`
      SELECT t.name, COUNT(b.id) AS completed
      FROM technicians t
      LEFT JOIN bookings b ON b.technician_id = t.id AND b.status='completed'
      GROUP BY t.name
    `);

    res.json({
      totals: {
        totalBookings: totalBookings.rows[0].count,
        pending: pending.rows[0].count,
        completed: completed.rows[0].count,
        revenue: revenue.rows[0].coalesce,
        technicians: technicians.rows[0].count
      },
      charts: {
        monthlyBookings: monthlyBookings.rows,
        monthlyRevenue: monthlyRevenue.rows,
        serviceBreakdown: serviceBreakdown.rows,
        techPerformance: techPerformance.rows
      }
    });

  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to load stats" });
  }
}
