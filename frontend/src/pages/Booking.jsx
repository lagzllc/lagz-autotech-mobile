import { useState, useEffect } from "react";
import { createBooking, getServices } from "../lib/api";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    service_id: "",
    technician_id: 1,
    appointment_date: "",
  });

  useEffect(() => {
    async function load() {
      const list = await getServices();
      setServices(list);
    }
    load();
  }, []);

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    const res = await createBooking(form);

    if (res.success) {
      alert("Your booking has been submitted! We will contact you shortly.");
    } else {
      alert("Booking failed. Please try again.");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          className="w-full border p-2"
          placeholder="Full Name"
          value={form.customer_name}
          onChange={(e) => setField("customer_name", e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Email"
          value={form.customer_email}
          onChange={(e) => setField("customer_email", e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Phone"
          value={form.customer_phone}
          onChange={(e) => setField("customer_phone", e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Vehicle Make (e.g. Honda)"
          value={form.vehicle_make}
          onChange={(e) => setField("vehicle_make", e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Vehicle Model (e.g. Civic)"
          value={form.vehicle_model}
          onChange={(e) => setField("vehicle_model", e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Vehicle Year"
          value={form.vehicle_year}
          onChange={(e) => setField("vehicle_year", e.target.value)}
        />

        <select
          className="w-full border p-2"
          value={form.service_id}
          onChange={(e) => setField("service_id", e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — ${s.price}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="w-full border p-2"
          value={form.appointment_date}
          onChange={(e) => setField("appointment_date", e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Submit Booking
        </button>
      </form>
    </div>
  );
}
