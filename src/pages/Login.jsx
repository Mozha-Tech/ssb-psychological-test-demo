import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/pt-sentra-solusi-bangsa-ssb.png";
import '../../src/index.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = auth.login({ email, password });

    if (res.ok) nav("/");
    else setError(res.message || "Gagal login");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>

        {/* LOGO */}
        <img src={logo} alt="logo" className="logo-big" />

        <h2 className="login-title">Masukkan Email & Password</h2>

        {error && <div className="alert">{error}</div>}

        <div className="form-group">
          <label className="input-label">Email Address</label>
          <input
            className="input-field"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Masukkan password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
