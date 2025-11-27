import express from "express";
import {
  addTechnician,
  getAvailableTechs
} from "../models/technicians.js";

const router = express.Router();

// Add technician
router.post("/", async (req, res) => {
  const tech = await addTechnician(req.body);
  res.json(tech);
});

// List available techs
router.get("/available", async (_req, res) => {
  const techs = await getAvailableTechs();
  res.json(techs);
});

export default router;
