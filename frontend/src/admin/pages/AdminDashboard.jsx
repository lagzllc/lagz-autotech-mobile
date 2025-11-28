import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch("https://api.lagzautotechmobile.com/api/admin/stats", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

        {!stats ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold">Bookings</h3>
              <p className="text-3xl mt-2">{stats.bookings}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold">Customers</h3>
              <p className="text-3xl mt-2">{stats.customers}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold">Invoices</h3>
              <p className="text-3xl mt-2">{stats.invoices}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
