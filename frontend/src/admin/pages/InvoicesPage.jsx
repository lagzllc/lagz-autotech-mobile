import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch("https://api.lagzautotechmobile.com/api/invoices", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setInvoices(d));
  }, []);

  const viewPDF = (id) => {
    window.open(`https://api.lagzautotechmobile.com/api/invoices/${id}/pdf`);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-10 flex-1">
        <h2 className="text-3xl font-bold mb-6">Invoices</h2>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Customer</th>
              <th>Service</th>
              <th>Tech</th>
              <th>Total</th>
              <th>PDF</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.customer_name}</td>
                <td>{i.service_name}</td>
                <td>{i.technician_name}</td>
                <td>${i.total}</td>
                <td>
                  <button
                    onClick={() => viewPDF(i.id)}
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    View PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
