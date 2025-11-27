import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/users.js";

const router = express.Router();

// REGISTER user (admin manually registers techs or customers)
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashed, role);

  res.json(user);
});

// LOGIN user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "48h" }
  );

  res.json({ user, token });
});

export default router;
