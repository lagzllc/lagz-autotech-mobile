import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-black text-white h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <nav className="flex flex-col space-y-4">
        <Link to="/admin/dashboard" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/bookings" className="hover:text-yellow-300">Bookings</Link>
        <Link to="/admin/customers" className="hover:text-yellow-300">Customers</Link>
        <Link to="/admin/invoices" className="hover:text-yellow-300">Invoices</Link>
        <Link to="/admin/services" className="hover:text-yellow-300">Services</Link>
        <Link to="/admin/technicians" className="hover:text-yellow-300">Technicians</Link>
      </nav>
    </div>
  );
}
