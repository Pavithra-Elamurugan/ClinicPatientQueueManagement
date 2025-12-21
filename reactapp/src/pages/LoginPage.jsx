import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin, loading, error }) {
  const [role, setRole] = useState("ADMIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();                 // 👈 add this

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }

    // tell App.js which role logged in
    if (onLogin) {
      onLogin({ role, email, password });
    }

    // ✅ after login go to home
    navigate("/");
  };

  return (
    <div className="page-center">
      <div className="form-card">
        <h1 className="page-title">Login</h1>
        <p className="page-subtitle">Choose your role and sign in.</p>

        <div className="role-tabs">
          <button
            type="button"
            className={`role-tab ${role === "ADMIN" ? "active" : ""}`}
            onClick={() => setRole("ADMIN")}
          >
            👩‍💼 Admin
          </button>
          <button
            type="button"
            className={`role-tab ${role === "DOCTOR" ? "active" : ""}`}
            onClick={() => setRole("DOCTOR")}
          >
            🩺 Doctor
          </button>
          <button
            type="button"
            className={`role-tab ${role === "PATIENT" ? "active" : ""}`}
            onClick={() => setRole("PATIENT")}
          >
            🧑‍⚕️ Patient
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {(localError || error) && (
            <p style={{ color: "red", marginTop: 8 }}>
              {localError || error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : `Login as ${role.toLowerCase()}`}
          </button>
        </form>
      </div>
    </div>
  );
}
