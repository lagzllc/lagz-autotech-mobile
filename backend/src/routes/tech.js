router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM technicians WHERE email=$1 LIMIT 1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Technician not found" });
    }

    const tech = result.rows[0];

    // FIXED: bcryptjs async compare
    const isMatch = await bcrypt.compare(password, tech.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: tech.id, role: "technician" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Tech login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
