import axios from "axios";
import { useState } from "react";

export default function Booking() {
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: ""
  });

  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      await axios.post(`${API}/bookings`, form);
      setMsg("Booking submitted successfully!");
    } catch (err) {
      setMsg("Error submitting booking.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-primary mb-4">Book a Service</h1>

      <input className="border p-2 w-full mb-3"
        placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})}
      />

      <input className="border p-2 w-full mb-3"
        placeholder="Phone"
        onChange={e => setForm({...form, phone: e.target.value})}
      />

      <input className="border p-2 w-full mb-3"
        placeholder="Requested Service"
        onChange={e => setForm({...form, service: e.target.value})}
      />

      <button onClick={submit}
        className="bg-primary text-white px-4 py-2 rounded">
        Submit
      </button>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
