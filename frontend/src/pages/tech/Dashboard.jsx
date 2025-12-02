// frontend/src/pages/tech/Dashboard.jsx
import { useEffect, useState } from "react";
import { getTechMe, getTechBookings, updateBookingStatus } from "../../lib/api";

export default function TechDashboard() {
  const [tech, setTech] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  // Load technician info
  useEffect(() => {
    async function loadTechData() {
      const me = await getTechMe();
      if (me.error) {
        setError("Unauthorized. Please log in again.");
        return (window.location.href = "/tech/login");
      }
      setTech(me.tech);

      const b = await getTechBookings();
      setBookings(b.bookings || []);
    }

    loadTechData();
  }, []);

  async function handleStatus(id, status) {
    const res = await updateBookingStatus(id, status);

    if (res.error) {
      alert("Failed to update status");
      return;
    }

    alert("Status updated!");
    window.location.reload();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Technician Dashboard
      </h1>

      {tech && (
        <p className="mt-2 text-lg">
          Welcome, <strong>{tech.name}</strong>
        </p>
      )}

      <button
        className="mt-4 text-red-500 underline"
        onClick={() => {
          localStorage.removeItem("techToken");
          window.location.href = "/tech/login";
        }}
      >
        Logout
      </button>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Assigned Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings assigned.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            className="border p-4 rounded-lg shadow mb-4 bg-white"
          >
            <h3 className="text-xl font-bold">{b.customer_name}</h3>
            <p>Email: {b.customer_email}</p>
            <p>Phone: {b.customer_phone}</p>

            <h4 className="mt-2 font-semibold">Vehicle</h4>
            <p>{b.vehicle_year} {b.vehicle_make} {b.vehicle_model}</p>

            <h4 className="mt-2 font-semibold">Service</h4>
            <p>Service ID: {b.service_id}</p>

            <p className="mt-2">
              <strong>Status:</strong> {b.status}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => handleStatus(b.id, "arrived")}
              >
                Arrived
              </button>

              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => handleStatus(b.id, "completed")}
              >
                Completed
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
