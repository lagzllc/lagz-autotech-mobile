import { Wrench, Droplets, Car, Battery, Sparkles, Gauge, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
     icon: <Droplets size={38} className="text-yellow-500" />,
      title: "Oil Change",
      desc: "Full synthetic oil, filter replacement, and a multi-point inspection.",
    },
    {
      icon: <Wrench size={38} className="text-yellow-500" />,
      title: "Brake Repair",
      desc: "Brake pads, rotors, calipers, fluid flush, and diagnostics.",
    },
    {
      icon: <Battery size={38} className="text-yellow-500" />,
      title: "Battery Replacement",
      desc: "On-site battery testing, replacement & electrical system check.",
    },
    {
      icon: <Car size={38} className="text-yellow-500" />,
      title: "Engine Diagnostics",
      desc: "Check-engine light scanning, troubleshooting, and repairs.",
    },
    {
      icon: <Gauge size={38} className="text-yellow-500" />,
      title: "AC / Heating",
      desc: "Air conditioning repair, recharge, heater diagnostics, and more.",
    },
    {
      icon: <Sparkles size={38} className="text-yellow-500" />,
      title: "Detailing",
      desc: "Interior & exterior detailing that restores shine and freshness.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Our Services</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        High-quality mobile auto services delivered at your home, office, or roadside.
        Fast, affordable, and done by certified technicians.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-center mt-4">{service.title}</h3>
            <p className="text-gray-600 text-center mt-2">{service.desc}</p>

            <div className="flex justify-center mt-4">
              <Link
                to="/booking"
                className="text-black font-semibold px-4 py-2 flex items-center gap-2 border border-black rounded hover:bg-black hover:text-white transition"
              >
                Book Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <section className="mt-16 bg-black text-white py-16 rounded-xl text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Need a Repair Today?</h2>
        <p className="text-gray-300 mb-6">
          Our certified mobile technicians are ready to assist you now.
        </p>
        <Link
          to="/booking"
          className="bg-yellow-400 text-black px-8 py-3 rounded font-semibold hover:bg-yellow-300 transition"
        >
          Book a Service
        </Link>
      </section>
    </div>
  );
}
