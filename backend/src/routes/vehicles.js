import express from "express";
import { addVehicle } from "../models/vehicles.js";

const router = express.Router();

// Add vehicle
router.post("/", async (req, res) => {
  const vehicle = await addVehicle(req.body);
  res.json(vehicle);
});

export default router;
