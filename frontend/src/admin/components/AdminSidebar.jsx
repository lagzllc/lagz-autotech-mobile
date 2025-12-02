// frontend/src/admin/components/AdminSidebar.jsx

import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 space-y-6 fixed">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <nav className="space-y-4 text-lg">
        <Link className="block hover:text-blue-400" to="/admin/dashboard">
          Dashboard
        </Link>

        <Link className="block hover:text-blue-400" to="/admin/bookings">
          Bookings
        </Link>

        <Link className="block hover:text-blue-400" to="/admin/services">
          Services
        </Link>

        <Link className="block hover:text-blue-400" to="/admin/technicians">
          Technicians
        <li>
         <a href="/admin/services" className="block py-2 hover:text-blue-500">
        Services
        </a>
        </li>

        </Link>
      </nav>
    </div>
  );
}
