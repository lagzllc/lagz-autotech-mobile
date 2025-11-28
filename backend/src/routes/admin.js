// backend/src/routes/admin.js
import express from "express";
import { adminLogin } from "../controllers/adminAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/me", adminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
