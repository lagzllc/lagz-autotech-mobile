import { useState } from "react";
import { Phone, Calendar, Car, User, Mail, MapPin } from "lucide-react";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    address: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://api.lagzautotechmobile.com/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Booking submitted! A technician will contact you shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        service: "",
        address: "",
        date: "",
      });
    } else {
      alert("Error submitting booking. Try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Book a Service</h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Fill out the form below and our technician will contact you to confirm your appointment.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        {/* NAME */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <User size={18} /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <Mail size={18} /> Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="youremail@example.com"
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <Phone size={18} /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="719-510-6453"
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* VEHICLE */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <Car size={18} /> Vehicle Make & Model
          </label>
          <input
            type="text"
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            placeholder="Toyota Camry, Ford F150..."
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* SERVICE */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <Wrench size={18} /> Service Needed
          </label>
          <input
            type="text"
            name="service"
            value={form.service}
            onChange={handleChange}
            placeholder="Oil change, brake repair, diagnostics..."
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <MapPin size={18} /> Service Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Your home, work, or location"
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* DATE */}
        <div>
          <label className="font-semibold flex items-center gap-2 mb-1">
            <Calendar size={18} /> Preferred Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 rounded border focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
        >
          Submit Booking
        </button>
      </form>

      {/* CALL INSTEAD */}
      <div className="text-center mt-10">
        <a
          href="tel:+17195106453"
          className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-500"
        >
          <Phone size={18} /> Prefer to call? Tap here: (719) 510-6453
        </a>
      </div>
    </div>
  );
}
