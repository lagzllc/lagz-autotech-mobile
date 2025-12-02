// frontend/src/pages/Booking.jsx

import { useState, useEffect } from "react";
import { getServices, createBooking } from "../lib/api";

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
      setServices(list.services || []);
    }
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await createBooking(form);
    alert("Booking submitted!");
  }

  return (
    <div className="booking-page">
      <h1>Book a Service</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="customer_name"
          placeholder="Your Name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          name="customer_email"
          placeholder="Your Email"
          value={form.customer_email}
          onChange={handleChange}
          required
        />

        <input
          name="customer_phone"
          placeholder="Phone Number"
          value={form.customer_phone}
          onChange={handleChange}
          required
        />

        <input
          name="vehicle_make"
          placeholder="Vehicle Make"
          value={form.vehicle_make}
          onChange={handleChange}
          required
        />

        <input
          name="vehicle_model"
          placeholder="Vehicle Model"
          value={form.vehicle_model}
          onChange={handleChange}
          required
        />

        <input
          name="vehicle_year"
          placeholder="Vehicle Year"
          value={form.vehicle_year}
          onChange={handleChange}
          required
        />

        <select
          name="service_id"
          value={form.service_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a service</option>
          {services.map((srv) => (
            <option key={srv.id} value={srv.id}>
              {srv.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="appointment_date"
          value={form.appointment_date}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Service</button>
      </form>
    </div>
  );
}
