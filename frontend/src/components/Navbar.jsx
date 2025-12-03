import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

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

          {/* ADMIN + TECH LINKS */}
          <Link to="/admin" className="hover:text-yellow-400 transition">Admin</Link>
          <Link to="/tech" className="hover:text-yellow-400 transition">Technician</Link>

          {/* PHONE BUTTON */}
          <a
            href="tel:+17195106453"
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <Phone size={18} /> Call
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-yellow-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-4 text-lg">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/booking" onClick={() => setOpen(false)}>Booking</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {/* ADMIN + TECH */}
          <Link to="/admin" onClick={() => setOpen(false)}>Admin Login</Link>
          <Link to="/tech" onClick={() => setOpen(false)}>Technician Login</Link>

          <a
            href="tel:+17195106453"
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <Phone size={18} /> Call
          </a>
        </div>
      )}
    </nav>
  );
}
