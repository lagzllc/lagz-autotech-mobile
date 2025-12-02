// frontend/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdminStats } from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    technicians: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const data = await getAdminStats();
    setStats({
      bookings: data.bookings || 0,
      technicians: data.technicians || 0,
      revenue: data.revenue || 0,
    });
  }

  return (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* BOOKINGS */}
        <motion.div 
          className="bg-white shadow p-6 rounded"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold mt-2">{stats.bookings}</p>
        </motion.div>

        {/* TECHNICIANS */}
        <motion.div 
          className="bg-white shadow p-6 rounded"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold">Technicians</h2>
          <p className="text-4xl font-bold mt-2">{stats.technicians}</p>
        </motion.div>

        {/* REVENUE */}
        <motion.div 
          className="bg-white shadow p-6 rounded"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold mt-2">${stats.revenue}</p>
        </motion.div>

      </div>
    </motion.div>
  );
}
