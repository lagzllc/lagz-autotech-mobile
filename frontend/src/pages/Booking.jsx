import { useState } from "react";
import axios from "axios";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vin: "",
    year: "",
    make: "",
    model: "",
    mileage: "",
    service: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await axios.post(
        "https://api.lagzautotechmobile.com/booking",
        form
      );

      setSuccess("Booking submitted successfully! We will contact you shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        vin: "",
        year: "",
        make: "",
        model: "",
        mileage: "",
        service: "",
        description: ""
      });
    } catch (err) {
      console.error(err);
      setSuccess("Error submitting booking. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-secondary">
        Book a Service
      </h1>

      <form
        onSubmit={submitBooking}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* CONTACT INFO */}
        <h2 className="text-xl font-semibold text-secondary">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
        </div>

        {/* VEHICLE INFO */}
        <h2 className="text-xl font-semibold text-secondary">Vehicle Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="vin"
            placeholder="VIN (optional)"
            value={form.vin}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
          <input
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
          <input
            name="mileage"
            placeholder="Mileage"
            value={form.mileage}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>

        {/* SERVICE & DETAILS */}
        <h2 className="text-xl font-semibold text-secondary">Service Details</h2>

        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full"
        >
          <option value="">Select a service</option>
          <option value="Diagnostics">Diagnostics</option>
          <option value="Brake Repair">Brake Repair</option>
          <option value="Oil Change">Oil Change</option>
          <option value="Battery Replacement">Battery Replacement</option>
          <option value="AC Repair">AC Repair</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe the issue…"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full min-h-[120px]"
        ></textarea>

        <button
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting…" : "Submit Booking"}
        </button>

        {success && (
          <p className="text-center text-lg mt-4 text-green-600 font-semibold">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
