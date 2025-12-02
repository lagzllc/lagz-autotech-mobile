import { useState } from "react";
import axios from "axios";
import { Wrench, Mail, Lock } from "lucide-react";

export default function TechLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tech/login`,
        form
      );

      localStorage.setItem("techToken", res.data.token);
      window.location.href = "/tech/dashboard";
    } catch (err) {
      setError("Invalid technician credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl p-10 rounded-xl w-full max-w-md">

        <div className="flex flex-col items-center text-center mb-6">
          <Wrench size={50} className="text-yellow-500" />
          <h1 className="text-3xl font-bold mt-3">Technician Login</h1>
        </div>

        <form className="space-y-5" onSubmit={login}>
          <div className="flex items-center gap-3 border p-3 rounded-lg">
            <Mail className="text-gray-500" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="flex-1 outline-none"
              onChange={update}
              required
            />
          </div>

          <div className="flex items-center gap-3 border p-3 rounded-lg">
            <Lock className="text-gray-500" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="flex-1 outline-none"
              onChange={update}
              required
            />
          </div>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 p-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
