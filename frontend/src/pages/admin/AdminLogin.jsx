// frontend/src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import { adminLogin } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    const res = await adminLogin(form.email, form.password);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (!res.token) {
      setError("Invalid response from server");
      return;
    }

    localStorage.setItem("adminToken", res.token);
    navigate("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg p-8 rounded w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-5"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
