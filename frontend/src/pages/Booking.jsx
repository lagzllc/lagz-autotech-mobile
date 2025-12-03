import { useState } from "react";
import axios from "axios";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await axios.post(
        "https://api.lagzautotechmobile.com/api/bookings",
        form
      );

      setMessage("Booking submitted successfully!");
      setForm({
        name: "",
        phone: "",
        email: "",
        vehicle: "",
        service: "",
        date: "",
      });
    } catch (err) {
      setMessage("Error submitting booking. Please try again.");
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Book a Service</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 border rounded"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vehicle"
          placeholder="Vehicle Model (e.g. Toyota Camry)"
          className="w-full p-3 border rounded"
          value={form.vehicle}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="service"
          placeholder="Requested Service"
          className="w-full p-3 border rounded"
          value={form.service}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="w-full p-3 border rounded"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-900"
        >
          Submit Booking
        </button>
      </form>

      {message && (
        <p className="text-center mt-6 text-lg font-medium text-yellow-500">
          {message}
        </p>
      )}
    </div>
  );
}
