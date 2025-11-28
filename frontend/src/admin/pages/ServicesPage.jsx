import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("adminToken");

  const loadServices = () => {
    fetch("https://api.lagzautotechmobile.com/api/services")
      .then((r) => r.json())
      .then((d) => setServices(d));
  };

  const addService = async () => {
    await fetch("https://api.lagzautotechmobile.com/api/services/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price }),
    });

    loadServices();
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-10 flex-1">
        <h2 className="text-3xl font-bold mb-6">Services</h2>

        <div className="bg-white p-5 rounded shadow mb-6">
          <h3 className="text-xl font-bold mb-3">Add Service</h3>
          <input
            className="border p-2 mr-2"
            placeholder="Service name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 mr-2"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={addService}
          >
            Add
          </button>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.name}</td>
                <td>${s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
