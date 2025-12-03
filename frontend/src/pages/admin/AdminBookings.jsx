import { useEffect, useState } from "react";
import {
  getAdminBookings,
  getTechnicians,
  assignTechnician,
  updateNotes,
} from "../../lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const b = await getAdminBookings();
    const t = await getTechnicians();
    setBookings(b.data);
    setTechs(t.data);
  }

  const assign = async (bookingId, techId) => {
    await assignTechnician({ booking_id: bookingId, tech_id: techId });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Tech</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b">
              <td>{b.name}<br />{b.phone}</td>
              <td>{b.year} {b.make} {b.model}<br />VIN: {b.vin}</td>

              <td>
                <span className="px-2 py-1 rounded bg-yellow-200">
                  {b.status}
                </span>
              </td>

              <td>{b.tech_name || "Unassigned"}</td>

              <td>
                <select
                  onChange={(e) => assign(b.id, e.target.value)}
                  className="border p-1"
                >
                  <option>Choose Tech</option>
                  {techs.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
