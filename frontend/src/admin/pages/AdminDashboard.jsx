import { useEffect, useState } from "react";
import { getAdminStats } from "../../lib/api";

import Chart from "chart.js/auto";       // ✅ Correct
import { Line, Pie } from "react-chartjs-2";   // ✅ Correct

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const info = await getAdminStats();
      setStats(info);
    }
    load();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([label, val]) => (
          <div className="bg-white p-6 shadow rounded-lg border">
            <h2 className="text-gray-600">{label}</h2>
            <p className="text-3xl font-bold">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
