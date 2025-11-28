// frontend/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        } else {
          setAdmin(data.admin);
        }
      });
  }, []);

  if (!admin) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome, {admin.email}</p>

      <div className="mt-6">
        <a
          href="/admin/bookings"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          View Bookings
        </a>
      </div>

      <button
        className="mt-4 text-red-500"
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
