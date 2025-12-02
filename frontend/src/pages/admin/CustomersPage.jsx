// frontend/src/pages/admin/CustomersPage.jsx

import { useEffect, useState } from "react";
import { getAdminCustomers } from "../../lib/api";

export default function CustomersPage() {
  const [list, setList] = useState([]);

  async function load() {
    const res = await getAdminCustomers();
    setList(res.customers || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {list.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
