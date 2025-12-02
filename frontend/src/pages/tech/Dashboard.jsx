import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTechMe, getTechBookings, updateBookingStatus } from "../../lib/api";

export default function TechDashboard() {
  const [tech, setTech] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const me = await getTechMe();
    const b = await getTechBookings();
    setTech(me.tech);
    setBookings(b.bookings || []);
  }

  async function updateStatus(id, status) {
    await updateBookingStatus(id, status);
    load();
  }

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {tech?.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white shadow p-4 rounded"
          >
            <h2 className="font-bold text-xl">{b.service_name}</h2>
            <p className="text-gray-600">{b.customer_name}</p>
            <p className="text-gray-600">{b.appointment_date}</p>

            <select
              className="border mt-3 p-2 w-full"
              value={b.status}
              onChange={(e) => updateStatus(b.id, e.target.value)}
            >
              <option>pending</option>
              <option>assigned</option>
              <option>in-progress</option>
              <option>completed</option>
            </select>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
