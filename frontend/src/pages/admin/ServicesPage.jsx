// frontend/src/pages/admin/ServicesPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  adminGetServices,
  createService,
  updateService,
  deleteService
} from "../../lib/api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await adminGetServices();
    setServices(data.services || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      await updateService(editing, form);
    } else {
      await createService(form);
    }

    setForm({ name: "", price: "", description: "" });
    setEditing(null);
    load();
  }

  async function remove(id) {
    await deleteService(id);
    load();
  }

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-6">Services</h1>

      {/* FORM */}
      <form className="bg-white shadow p-4 rounded mb-8" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Service" : "Add Service"}
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Service Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update" : "Create"}
        </button>
      </form>

      {/* TABLE */}
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <motion.tr
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t"
            >
              <td className="p-3">{s.name}</td>
              <td className="p-3">${s.price}</td>
              <td className="p-3">{s.description}</td>

              <td className="p-3 flex gap-3">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setEditing(s.id);
                    setForm(s);
                  }}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => remove(s.id)}
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
