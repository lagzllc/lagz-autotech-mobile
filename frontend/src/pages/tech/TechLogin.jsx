import { useState } from "react";
import axios from "axios";

export default function TechLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Verifying...");

    try {
      const res = await axios.post(
        "https://api.lagzautotechmobile.com/api/tech/login",
        form
      );

      localStorage.setItem("techToken", res.data.token);
      setMsg("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/tech/dashboard";
      }, 800);
    } catch (err) {
      setMsg("Invalid technician credentials.");
    }
  };

  return (
    <div className="pt-28 pb-16 px-6 max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Technician Login</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Technician Email"
          className="w-full p-3 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-900 transition"
        >
          Login
        </button>
      </form>

      {msg && (
        <p className="mt-6 text-center text-yellow-500 font-medium text-lg">
          {msg}
        </p>
      )}
    </div>
  );
}
