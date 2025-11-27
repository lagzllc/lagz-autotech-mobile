import express from "express";
import { createBooking } from "../models/bookings.js";
import { getAvailableTechs } from "../models/technicians.js";

const router = express.Router();

// Create booking AND auto assign technician
router.post("/", async (req, res) => {
  const available = await getAvailableTechs();
  if (!available.length)
    return res.status(400).json({ msg: "No technicians available" });

  const technician_id = available[0].id;

  const booking = await createBooking({
    ...req.body,
    technician_id
  });

  res.json({
    msg: "Booking created",
    assigned_tech: available[0],
    booking
  });
});

export default router;
