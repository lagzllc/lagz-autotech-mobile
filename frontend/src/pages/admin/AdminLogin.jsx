// frontend/src/pages/admin/AdminLogin.jsx

import { useState } from "react";
import { adminLogin } from "../../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await adminLogin(email, password);

    if (res.token) {
      localStorage.setItem("adminToken", res.token);
      window.location.href = "/admin/dashboard";
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
