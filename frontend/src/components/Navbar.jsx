// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Lagz AutoTech
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg">

          <Link to="/" className="hover:text-yellow-400">Home</Link>

          <Link to="/services" className="hover:text-yellow-400">Services</Link>

          <Link to="/booking" className="hover:text-yellow-400">Book Appointment</Link>

          <Link to="/admin/login" className="hover:text-red-300">Admin</Link>

          <Link to="/tech/login" className="hover:text-blue-300">Technician</Link>

        </div>
      </div>
    </nav>
  );
}
