import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logoImg from "../assets/pt-sentra-solusi-bangsa-ssb.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = (name = "") => {
    return name
      .split(" ")
      .map(n => n?.[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* logo image optional */}
        <img src={logoImg} alt="logo" className="navbar-logo" />
        <div className="navbar-brand">
          <div className="brand-title">PT Sentra Solusi Bangsa</div>
          <div className="brand-sub">Psikotes</div>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder="Search here..."
            aria-label="Search"
          />
        </div>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="profile-wrap">
            <div className="avatar-dropdown">
              <button
                className="avatar-btn"
                onClick={() => setOpen(v => !v)}
                aria-haspopup="true"
                aria-expanded={open}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="avatar-img" />
                ) : (
                  <div className="avatar-fallback">{initials(user.name)}</div>
                )}
              </button>

              {open && (
                <div className="dropdown" role="menu">
                  <div className="dropdown-user">
                    <div className="dropdown-user-name">{user.name}</div>
                    <div className="dropdown-user-email">{user.email}</div>
                  </div>

                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      // you may navigate to profile page later
                    }}
                  >
                    View Profile
                  </button>

                  <button
                    className="dropdown-item logout"
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <a href="/login" className="link">Login</a>
          </div>
        )}
      </div>
    </header>
  );
}
