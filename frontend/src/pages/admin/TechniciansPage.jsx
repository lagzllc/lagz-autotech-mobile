import { useEffect, useState } from "react";
import {
  getTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician
} from "../../lib/api";

export default function TechniciansPage() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getTechnicians();
    setList(data.technicians || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      await updateTechnician(editing, form);
    } else {
      await createTechnician(form);
    }

    setForm({ name: "", email: "", phone: "" });
    setEditing(null);
    load();
  }

  async function remove(id) {
    await deleteTechnician(id);
    load();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Technicians</h1>

      <form className="bg-white shadow p-4 rounded mb-8" onSubmit={handleSubmit}>
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? "Update" : "Create"}
        </button>
      </form>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.email}</td>
              <td className="p-3">{t.phone}</td>
              <td className="p-3 flex gap-3">
                <button
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                  onClick={() => {
                    setEditing(t.id);
                    setForm(t);
                  }}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 px-3 py-1 text-white rounded"
                  onClick={() => remove(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
