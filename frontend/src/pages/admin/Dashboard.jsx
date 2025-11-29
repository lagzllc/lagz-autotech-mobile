import { useEffect, useState } from "react";
import { getAdminStats } from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return (window.location.href = "/admin/login");

    getAdminStats(token)
      .then(setStats)
      .catch(() => alert("Failed to load stats"));
  }, []);

  if (!stats) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Total Bookings</h2>
          <p className="text-2xl">{stats.totalBookings}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Pending</h2>
          <p className="text-2xl">{stats.pending}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Completed</h2>
          <p className="text-2xl">{stats.completed}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Revenue</h2>
          <p className="text-2xl">${stats.revenue}</p>
        </div>
      </div>

      <button
        className="mt-8 text-red-500"
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
