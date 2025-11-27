const API_URL = import.meta.env.VITE_API_URL;

export async function createBooking(data) {
  const res = await fetch(`${API_URL}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
}

export async function getServices() {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
}
