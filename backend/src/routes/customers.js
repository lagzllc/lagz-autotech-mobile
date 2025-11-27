import express from "express";
import { addCustomer, getCustomerById } from "../models/customers.js";

const router = express.Router();

// Add customer
router.post("/", async (req, res) => {
  const customer = await addCustomer(req.body);
  res.json(customer);
});

// Get customer by ID
router.get("/:id", async (req, res) => {
  const customer = await getCustomerById(req.params.id);
  res.json(customer);
});

export default router;
