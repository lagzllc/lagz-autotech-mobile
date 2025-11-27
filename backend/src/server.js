import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import db from "./config/db.js";
import serviceRoutes from "./routes/services.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// ROUTES
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";
import customerRoutes from "./routes/customers.js";
import techRoutes from "./routes/technicians.js";
import vehicleRoutes from "./routes/vehicles.js";
import invoiceRoutes from "./routes/invoices.js";
import paymentRoutes from "./routes/payments.js";

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/technicians", techRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Lagz AutoTech API running" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Live on ${PORT}`));
