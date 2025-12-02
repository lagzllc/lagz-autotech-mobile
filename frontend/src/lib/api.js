// frontend/src/lib/api.js

const API_URL = "https://api.lagzautotechmobile.com/api";

/* -------------------------------------------
   ADMIN AUTH
-------------------------------------------- */

export async function adminLogin(email, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return res.json();
}

export async function getAdminMe() {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

export async function getAdminStats() {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

export async function getAdminBookings() {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

/* Update booking (assign technician + status update) */
export async function updateBookingAdmin(bookingId, technicianId, status) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ technicianId, status })
  });

  return res.json();
}

/* Get all technicians */
export async function getTechnicians() {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/technicians`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

/* Create technician */
export async function createTechnician(data) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/technicians`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

/* Update technician */
export async function updateTechnician(id, data) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/technicians/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

/* Delete technician */
export async function deleteTechnician(id) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/technicians/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

/* -------------------------------------------
   TECHNICIAN AUTH
-------------------------------------------- */

export async function techLogin(email, password) {
  const res = await fetch(`${API_URL}/tech/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return res.json();
}

export async function getTechMe() {
  const token = localStorage.getItem("techToken");

  const res = await fetch(`${API_URL}/tech/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

export async function getTechBookings() {
  const token = localStorage.getItem("techToken");

  const res = await fetch(`${API_URL}/tech/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

export async function updateBookingStatus(bookingId, status) {
  const token = localStorage.getItem("techToken");

  const res = await fetch(`${API_URL}/tech/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  return res.json();
}

/* -------------------------------------------
   SERVICES CRUD (ADMIN)
-------------------------------------------- */

export async function adminGetServices() {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/services`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

export async function createService(data) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function updateService(id, data) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function deleteService(id) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}/admin/services/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}

/* -------------------------------------------
   PUBLIC SERVICES + BOOKING
-------------------------------------------- */

export async function getServices() {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_URL}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
}

/* -------------------------------------------
   DEFAULT EXPORT
-------------------------------------------- */
export default {
  adminLogin,
  getAdminMe,
  getAdminBookings,
  getAdminStats,
  updateBookingAdmin,

  techLogin,
  getTechMe,
  getTechBookings,
  updateBookingStatus,

  getServices,
  createBooking,

  createService,
  updateService,
  deleteService,
  adminGetServices,

  getTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician
};
