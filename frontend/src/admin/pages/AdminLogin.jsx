import { useState } from "react";
import { adminLogin } from "../../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await adminLogin(email, password);

    if (res.error) return setError(res.error);

    localStorage.setItem("adminToken", res.token);
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96 border"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          className="w-full p-3 mt-4 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mt-4 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-700 text-white p-3 rounded mt-5 hover:bg-green-900">
          Login
        </button>
      </form>
    </div>
  );
}
