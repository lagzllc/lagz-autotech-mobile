import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch("https://api.lagzautotechmobile.com/api/customers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setCustomers(d));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-10 flex-1">
        <h2 className="text-3xl font-bold mb-6">Customers</h2>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
