import { useEffect, useState } from "react";
import { getAdminMe } from "../../lib/api";

export default function AdminDashboard() {
  const token = localStorage.getItem("adminToken");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getAdminMe(token);
      setAdmin(res.admin || null);
    }
    load();
  }, []);

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Welcome, {admin.email}</h1>

      <a
        href="/admin/bookings"
        className="bg-primary text-white px-4 py-2 rounded block mt-4"
      >
        View Bookings
      </a>

      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
        className="mt-4 text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
