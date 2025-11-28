// frontend/src/pages/admin/AdminLogin.jsx
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("adminToken", data.token);

      // Redirect to dashboard
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Admin Login</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label>Email</label>
          <input 
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </div>

        <button className="bg-primary text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
