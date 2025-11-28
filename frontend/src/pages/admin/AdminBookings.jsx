import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/admin/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        } else {
          setBookings(data.bookings);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Vehicle</th>
            <th className="p-2 border">Service ID</th>
            <th className="p-2 border">Tech ID</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="p-2 border">{b.id}</td>
              <td className="p-2 border">
                {b.customer_name}<br />
                {b.customer_email}<br />
                {b.customer_phone}
              </td>
              <td className="p-2 border">
                {b.vehicle_make} {b.vehicle_model} ({b.vehicle_year})
              </td>
              <td className="p-2 border">{b.service_id}</td>
              <td className="p-2 border">{b.technician_id}</td>
              <td className="p-2 border">
                {new Date(b.appointment_date).toLocaleString()}
              </td>
              <td className="p-2 border">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
