import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Dashboard error:", err));
  }, []);

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card title="Total Bookings" value={stats.totalBookings} color="blue" />
        <Card title="Pending" value={stats.pending} color="yellow" />
        <Card title="Completed" value={stats.completed} color="green" />
        <Card title="Revenue" value={`$${stats.revenue}`} color="purple" />
        <Card title="Technicians" value={stats.technicians} color="rose" />

      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow bg-${color}-100`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-3xl font-bold text-${color}-700`}>{value}</p>
    </div>
  );
}
