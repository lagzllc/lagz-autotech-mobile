// backend/src/routes/tech.js
import express from "express";
import { techLogin } from "../controllers/techController.js";
import techAuth from "../middleware/techAuth.js";

const router = express.Router();

router.post("/login", techLogin);

router.get("/me", techAuth, (req, res) => {
  res.json({ tech: req.tech });
});

export default router;
