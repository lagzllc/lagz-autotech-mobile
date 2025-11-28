import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function TechniciansPage() {
  const [techs, setTechs] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const token = localStorage.getItem("adminToken");

  const loadTechs = () => {
    fetch("https://api.lagzautotechmobile.com/api/technicians")
      .then((r) => r.json())
      .then((d) => setTechs(d));
  };

  const addTech = async () => {
    await fetch("https://api.lagzautotechmobile.com/api/technicians/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone }),
    });

    loadTechs();
  };

  useEffect(() => {
    loadTechs();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-10 flex-1">
        <h2 className="text-3xl font-bold mb-6">Technicians</h2>

        <div className="bg-white p-5 rounded shadow mb-6">
          <h3 className="text-xl font-bold mb-3">Add Technician</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 mr-2"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={addTech}
          >
            Add
          </button>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {techs.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.name}</td>
                <td>{t.phone}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
