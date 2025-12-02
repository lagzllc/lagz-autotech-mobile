// frontend/src/components/admin/AssignModal.jsx

import { assignTechnician } from "../../lib/api";

export default function AssignModal({ booking, technicians, close, refresh }) {
  async function handleAssign(e) {
    e.preventDefault();

    const techId = e.target.tech_id.value;
    await assignTechnician(booking.id, techId);

    refresh();
    close();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg animate-fade">
        <h2 className="text-xl font-bold mb-4">Assign Technician</h2>

        <form onSubmit={handleAssign}>
          <label className="block font-semibold mb-2">Technician:</label>
          <select
            name="tech_id"
            className="w-full border p-2 rounded mb-4"
            required
          >
            <option disabled selected>Select a technician</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
