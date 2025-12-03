import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [techs, setTechs] = useState([]);
  const [assignId, setAssignId] = useState(null);
  const [selectedTech, setSelectedTech] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const b = await axios.get("https://api.lagzautotechmobile.com/api/bookings");
    const t = await axios.get("https://api.lagzautotechmobile.com/api/technicians");
    setBookings(b.data);
    setTechs(t.data);
  };

  const assignTech = async () => {
    if (!selectedTech) return;

    await axios.put(
      `https://api.lagzautotechmobile.com/api/bookings/${assignId}/assign`,
      { tech_id: selectedTech }
    );

    setAssignId(null);
    loadData();
  };

  return (
    <div className="pt-28 p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{b.customer_name}</p>
              <p>{b.service}</p>
              <p className="text-gray-600">{b.date}</p>
              <p className="text-sm text-gray-500">Assigned: {b.tech_name || "None"}</p>
            </div>

            <button
              onClick={() => setAssignId(b.id)}
              className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
            >
              Assign Technician
            </button>
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {assignId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-xl mb-4 font-bold">Assign Technician</h3>

            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
            >
              <option value="">Select Technician</option>
              {techs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAssignId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-400 rounded"
                onClick={assignTech}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
