// frontend/src/pages/admin/AdminBookings.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getAdminBookings,
  updateBookingAdmin,
  getTechnicians
} from "../../lib/api";

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

  async function updateBooking(id, technician_id, status) {
    await updateBookingAdmin(id, technician_id, status);
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
              <th className="p-3">Tech</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b"
              >
                <td className="p-3">{b.id}</td>
                <td className="p-3">{b.customer_name}</td>
                <td className="p-3">{b.service_name}</td>

                {/* Technician dropdown */}
                <td className="p-3">
                  <select
                    className="border p-1"
                    value={b.technician_id || ""}
                    onChange={(e) =>
                      updateBooking(b.id, e.target.value, b.status)
                    }
                  >
                    <option value="">Unassigned</option>
                    {technicians.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Status dropdown */}
                <td className="p-3">
                  <select
                    className="border p-1"
                    value={b.status}
                    onChange={(e) =>
                      updateBooking(b.id, b.technician_id, e.target.value)
                    }
                  >
                    <option>pending</option>
                    <option>assigned</option>
                    <option>in-progress</option>
                    <option>completed</option>
                  </select>
                </td>

                <td className="p-3">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => updateBooking(b.id, b.technician_id, b.status)}
                  >
                    Save
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
