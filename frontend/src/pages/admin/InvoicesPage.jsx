// frontend/src/pages/admin/InvoicesPage.jsx

import { useEffect, useState } from "react";
import { getInvoices } from "../../lib/api";

export default function InvoicesPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getInvoices();
      setList(res.invoices || []);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Invoice #</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {list.map((i) => (
            <tr key={i.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{i.id}</td>
              <td className="p-3">{i.customer_name}</td>
              <td className="p-3">${i.amount}</td>
              <td className="p-3">{i.status}</td>
              <td className="p-3">{i.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
