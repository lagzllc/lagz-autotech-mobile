import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        {/* CONTACT INFO */}
        <div>
          <h2 className="text-xl font-bold mb-4">Lagz AutoTech Mobile</h2>
          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <Phone size={18} className="text-yellow-400" />
            (719) 510-6453
          </p>
          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <Mail size={18} className="text-yellow-400" />
            service@lagzautotechmobile.com
          </p>
          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <MapPin size={18} className="text-yellow-400" />
            Colorado Springs, CO
          </p>
          <p className="text-gray-400 mb-2 flex items-center gap-2">
            <Clock size={18} className="text-yellow-400" />
            Mon–Sun: 8:00 AM – 7:00 PM
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
            <li><Link to="/booking" className="hover:text-yellow-400">Book a Service</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            Professional mobile auto repair delivered right to your home,
            office, or roadside. Fast, reliable, and affordable services from
            certified technicians.
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center py-4 border-t border-gray-700 text-gray-500 text-sm">
        © {new Date().getFullYear()} Lagz AutoTech Mobile. All rights reserved.
      </div>
    </footer>
  );
}
