import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/pt-sentra-solusi-bangsa-ssb.png";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="logo" className="sidebar-logo" />
        <h3 className="sidebar-title">Sentra Solusi Bangsa</h3>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/tests" className="sidebar-link">
          Tes Saya
        </NavLink>
      </nav>
    </aside>
  );
}
