const API_URL = "https://api.lagzautotechmobile.com/api";

// Public booking creation
export async function createBooking(form) {
  const res = await fetch(`${API_URL}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}

// Admin login
export async function adminLogin(email, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// Validate admin
export async function getAdminMe(token) {
  const res = await fetch(`${API_URL}/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Get all bookings
export async function getAllBookings(token) {
  const res = await fetch(`${API_URL}/admin/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Update booking status
export async function updateBookingStatus(id, status, token) {
  const res = await fetch(`${API_URL}/admin/bookings/${id}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

// Delete booking
export async function deleteBooking(id, token) {
  const res = await fetch(`${API_URL}/admin/bookings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
