// frontend/src/pages/admin/AdminBookings.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdminBookings, updateBookingAdmin, getTechnicians } from "../../lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const b = await getAdminBookings();
    const t = await getTechnicians();
    setBookings(b.bookings || []);
    setTechnicians(t.technicians || []);
  }

  async function updateBooking(id, techId, status) {
    await updateBookingAdmin(id, techId, status);
    load();
  }

  return (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Technician</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.id}</td>
                <td className="p-3">{b.customer_name}</td>
                <td className="p-3">{b.service_name}</td>

                <td className="p-3">
                  <select
                    value={b.technician_id || ""}
                    onChange={(e) => updateBooking(b.id, e.target.value, b.status)}
                    className="border p-2 rounded"
                  >
                    <option value="">Unassigned</option>
                    {technicians.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3">{b.status}</td>

                <td className="p-3">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => updateBooking(b.id, b.technician_id, "completed")}
                  >
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
