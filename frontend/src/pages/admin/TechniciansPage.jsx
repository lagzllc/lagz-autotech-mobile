// frontend/src/pages/admin/TechniciansPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician
} from "../../lib/api";

export default function TechniciansPage() {
  const [techs, setTechs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getTechnicians();
    setTechs(data.technicians || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      await updateTechnician(editing, form);
    } else {
      await createTechnician(form);
    }

    setForm({ name: "", email: "", phone: "", password: "" });
    setEditing(null);
    load();
  }

  async function remove(id) {
    await deleteTechnician(id);
    load();
  }

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Technicians</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Technician" : "Add Technician"}
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {!editing && (
          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update" : "Create"}
        </button>
      </form>

      {/* TABLE */}
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {techs.map((t) => (
            <motion.tr
              key={t.id}
              className="border-b"
              whileHover={{ scale: 1.02 }}
            >
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.email}</td>
              <td className="p-3">{t.phone}</td>
              <td className="p-3">{t.status}</td>

              <td className="p-3 flex gap-3">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm(t);
                    setEditing(t.id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => remove(t.id)}
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
