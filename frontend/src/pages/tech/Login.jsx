// frontend/src/pages/tech/Login.jsx
import { useState } from "react";
import { techLogin } from "../../lib/api";

export default function TechLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await techLogin(form.email, form.password);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.token) {
      localStorage.setItem("techToken", res.token);
      window.location.href = "/tech/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Technician Login
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-2">{error}</div>
        )}

        <input
          type="email"
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
