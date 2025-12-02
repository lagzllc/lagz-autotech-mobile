import { useEffect, useState } from "react";
import { getAdminBookings } from "../../lib/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAdminBookings();
      setBookings(data.bookings || []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <table className="w-full bg-white shadow rounded border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Service</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.customer_name}</td>
              <td className="p-3">{b.service_name}</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3">{b.appointment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
