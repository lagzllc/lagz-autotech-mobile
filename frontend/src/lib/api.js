import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.lagzautotechmobile.com",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("techToken");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* -------------------------------------------
   PUBLIC — CREATE BOOKING
-------------------------------------------- */
export const createBooking = (data) => API.post("/booking", data);

/* -------------------------------------------
   ADMIN AUTH
-------------------------------------------- */
export const adminLogin = (data) => API.post("/admin/login", data);

/* -------------------------------------------
   ADMIN — BOOKINGS
-------------------------------------------- */
export const getAdminBookings = () => API.get("/booking/admin");

export const assignTechnician = (data) =>
  API.post("/booking/assign", data);

/* -------------------------------------------
   ADMIN — CUSTOMERS
-------------------------------------------- */
export const getAdminCustomers = () => API.get("/admin/customers");

/* -------------------------------------------
   ADMIN — TECHNICIANS
-------------------------------------------- */
export const getTechnicians = () => API.get("/admin/technicians");

/* -------------------------------------------
   TECH AUTH
-------------------------------------------- */
export const techLogin = (data) => API.post("/tech/login", data);

/* -------------------------------------------
   TECH — UPDATE STATUS
-------------------------------------------- */
export const updateStatus = (data) => API.post("/booking/status", data);

/* -------------------------------------------
   ADD NOTES
-------------------------------------------- */
export const updateNotes = (data) => API.post("/booking/notes", data);

/* -------------------------------------------
   TECH — PARTS + LABOR
-------------------------------------------- */
export const updatePartsLabor = (data) =>
  API.post("/booking/parts-labor", data);

/* -------------------------------------------
   INVOICES
-------------------------------------------- */
export const getInvoices = () => API.get("/admin/invoices");

