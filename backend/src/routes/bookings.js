// backend/src/routes/bookings.js
import express from "express";
import { createBooking } from "../models/bookings.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.json({ success: true, booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
