import express from "express";
import techAuth from "../middleware/techAuth.js";
import { technicianLogin, getMyBookings, completeBooking } from "../controllers/technicianController.js";

const router = express.Router();

router.post("/login", technicianLogin);
router.get("/bookings", techAuth, getMyBookings);
router.put("/booking/:id/complete", techAuth, completeBooking);

export default router;
