import { useState } from "react";
import { createBooking } from "../lib/api";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
    make: "",
    model: "",
    year: "",
    vin: "",
    mileage: "",
    engine: "",
    drivetrain: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking(form);
    alert("Booking submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Book a Service</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

        <input name="name" placeholder="Full Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" required onChange={handleChange} />
        <input name="phone" placeholder="Phone" required onChange={handleChange} />
        <input name="service" placeholder="Service Needed" required onChange={handleChange} />
        
        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="date" required onChange={handleChange} />
          <input type="time" name="time" required onChange={handleChange} />
        </div>

        {/* Vehicle Section */}
        <h2 className="text-xl font-bold mt-4">Vehicle Details</h2>

        <input name="make" placeholder="Make (e.g., Honda)" onChange={handleChange} />
        <input name="model" placeholder="Model (e.g., Civic)" onChange={handleChange} />
        <input name="year" placeholder="Year" onChange={handleChange} />
        <input name="vin" placeholder="VIN" onChange={handleChange} />
        <input name="mileage" placeholder="Mileage" onChange={handleChange} />
        <input name="engine" placeholder="Engine (e.g., 3.5L V6)" onChange={handleChange} />
        <input name="drivetrain" placeholder="Drivetrain (FWD, AWD, etc.)" onChange={handleChange} />

        <textarea
          name="notes"
          placeholder="Additional Notes"
          className="h-24"
          onChange={handleChange}
        />

        <button className="bg-yellow-500 text-black py-3 rounded">
          Submit Booking
        </button>
      </form>
    </div>
  );
}
