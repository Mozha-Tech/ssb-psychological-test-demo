import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard(){
  const { user } = useAuth();
  return (
    <div>
      <h1>Dashboard Kandidat</h1>
      <div className="card">
        <h3>Selamat Datang, {user?.name}</h3>
      </div>

      <div className="grid">
        <div className="card">
          <h4>Profil Saya</h4>
          <p><strong>{user?.name}</strong></p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
          <p>{user?.education}</p>
        </div>

        <div className="card">
          <h4>Lamaran Saya</h4>
          <p>Tidak ada data lamaran (dummy)</p>
        </div>

        <div className="card">
          <h4>Tes Mendatang</h4>
          <p>Tidak ada tes mendatang</p>
        </div>
      </div>
    </div>
  );
}
