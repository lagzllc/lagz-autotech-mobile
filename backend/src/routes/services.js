// backend/src/routes/services.js
import express from "express";
import { getAllServices } from "../models/services.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const services = await getAllServices();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

export default router;
