import express from "express";
import { createInvoice } from "../models/invoices.js";

const router = express.Router();

// Create invoice
router.post("/", async (req, res) => {
  const { booking_id, amount } = req.body;
  const invoice = await createInvoice(booking_id, amount);
  res.json(invoice);
});

export default router;
