// backend/src/server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(express.json());

// ROUTE IMPORTS
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";
import vehicleRoutes from "./routes/vehicles.js";
import invoiceRoutes from "./routes/invoices.js";
import paymentRoutes from "./routes/payments.js";
import serviceRoutes from "./routes/services.js";
import bookingRoutes from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";
import techRoutes from "./routes/tech.js";

// REGISTER ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tech", techRoutes);

// ROOT CHECK
app.get("/", (req, res) => {
  res.json({ status: "Lagz AutoTech API running" });
});

// START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`API Live on ${PORT}`);
});
