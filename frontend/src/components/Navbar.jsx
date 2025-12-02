import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Lagz AutoTech
        </Link>

{/* DESKTOP MENU */}
<div className="hidden md:flex items-center gap-8 text-lg">
  <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
  <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
  <Link to="/booking" className="hover:text-yellow-400 transition">Booking</Link>
  <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>

  <a
    href="tel:+17195106453"
    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition flex items-center gap-2"
  >
    <Phone size={18} /> Call
  </a>
</div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-yellow-400"
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-black text-white px-6 pb-6 space-y-4 animate-slideDown">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block text-lg py-2 border-b border-gray-700"
          >
            Home
          </Link>

          <Link
            to="/services"
            onClick={() => setOpen(false)}
            className="block text-lg py-2 border-b border-gray-700"
          >
            Services
          </Link>

          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className="block text-lg py-2 border-b border-gray-700"
          >
            Book
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-lg py-2 border-b border-gray-700"
          >
            Contact
          </Link>

          <a
            href="tel:+17195106453"
            className="block text-lg text-yellow-400 py-2 flex items-center gap-2"
          >
            <Phone size={18} /> Call Now
          </a>
        </div>
      )}
    </nav>
  );
}
