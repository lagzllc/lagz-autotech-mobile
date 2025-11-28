import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch("https://api.lagzautotechmobile.com/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setBookings(d));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="p-10 flex-1">
        <h2 className="text-3xl font-bold mb-6">Bookings</h2>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Customer</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Tech</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.customer_name}</td>
                <td>
                  {b.vehicle_make} {b.vehicle_model} ({b.vehicle_year})
                </td>
                <td>{b.service_name}</td>
                <td>{b.technician_name}</td>
                <td>{new Date(b.appointment_date).toLocaleString()}</td>
                <td className="text-yellow-600 font-bold">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
