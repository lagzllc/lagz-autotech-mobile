import { Phone, Wrench, Car, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Mobile Auto Repair — We Come To You
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          Fast, affordable, and professional auto services delivered at your home, office, or roadside.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="tel:+17195106453"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded flex items-center justify-center gap-2 hover:bg-yellow-300 transition"
          >
            <Phone size={20} /> Call Us Now
          </a>

          <Link
            to="/booking"
            className="border border-white px-6 py-3 rounded flex items-center justify-center gap-2 hover:bg-white hover:text-black transition"
          >
            Book a Service <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Lagz AutoTech?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-6">
            <Wrench className="text-yellow-500 mx-auto" size={40} />
            <h3 className="text-xl font-semibold mt-4">Certified Technicians</h3>
            <p className="text-gray-600 mt-2">
              Highly skilled and experienced mobile technicians available on-demand.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-6">
            <Car className="text-yellow-500 mx-auto" size={40} />
            <h3 className="text-xl font-semibold mt-4">We Come To You</h3>
            <p className="text-gray-600 mt-2">
              Home, office, roadside — save time and avoid the towing fees.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-6">
            <ShieldCheck className="text-yellow-500 mx-auto" size={40} />
            <h3 className="text-xl font-semibold mt-4">Reliable & Affordable</h3>
            <p className="text-gray-600 mt-2">
              Transparent pricing and high-quality service you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Common Services</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="bg-white p-6 shadow rounded-xl">
            <h3 className="font-semibold text-xl">Oil Change</h3>
            <p className="text-gray-600 mt-2">Full synthetic + filter replacement.</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h3 className="font-semibold text-xl">Brake Repair</h3>
            <p className="text-gray-600 mt-2">Pads, rotors, inspections & replacements.</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h3 className="font-semibold text-xl">Engine Diagnostics</h3>
            <p className="text-gray-600 mt-2">Check engine light, scanning & troubleshooting.</p>
          </div>

        </div>

        <Link
          to="/services"
          className="mt-10 inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
        >
          View All Services
        </Link>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready To Book Your Service?</h2>
        <p className="text-gray-300 mb-6">Fast response and professional mobile repair.</p>

        <Link
          to="/booking"
          className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded hover:bg-yellow-300 transition"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
