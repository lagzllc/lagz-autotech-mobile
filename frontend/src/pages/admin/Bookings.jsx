import { useEffect, useState } from "react";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("adminToken");

  const loadBookings = async () => {
    const res = await getAllBookings(token);
    setBookings(res.bookings || []);
  };

  const changeStatus = async (id, status) => {
    await updateBookingStatus(id, status, token);
    loadBookings();
  };

  const removeBooking = async (id) => {
    await deleteBooking(id, token);
    loadBookings();
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t">
              <td>{b.id}</td>
              <td>{b.customer_name}</td>
              <td>
                {b.vehicle_make} {b.vehicle_model}
              </td>
              <td>{b.service_id}</td>
              <td>{new Date(b.appointment_date).toLocaleString()}</td>
              <td>{b.status}</td>

              <td className="space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => changeStatus(b.id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => changeStatus(b.id, "completed")}
                >
                  Complete
                </button>

                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => removeBooking(b.id)}
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
