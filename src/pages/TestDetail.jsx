import React from "react";
import { useParams, Link } from "react-router-dom";
import { tests } from "../data/dummy";
import { useAuth } from "../contexts/AuthContext";

export default function TestDetail(){
  const { id } = useParams();
  const t = tests.find(x => x.id === id);
  const { user } = useAuth();

  if(!t) return <div>Test not found</div>;

  const results = JSON.parse(localStorage.getItem("results") || "[]");
  const myResult = user ? results.find(r => r.testId === t.id && r.userEmail === user.email) : null;

  if(myResult) {
    return (
      <div>
        <h1>Hasil Tes — {t.title}</h1>
        <div className="card result-card">
          <h2>Skor Total</h2>
          <div className="big-score">{myResult.score}</div>
          <p>Selesai pada: {new Date(myResult.completedAt).toLocaleString()}</p>
          <p>Durasi: {Math.round(myResult.duration)} detik</p>

          <div className="interpretation">
            <strong>Interpretasi Hasil:</strong>
            <p>
              {myResult.score >= 24 ? "Kandidat memiliki gaya kepemimpinan yang kuat, tegas, dan cepat mengambil keputusan."
               : "Interpretasi dasar: skor lebih rendah — butuh analisis lebih lanjut."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Detail Tes — {t.title}</h1>
      <div className="card">
        <h3>{t.title}</h3>
        <p>{t.description}</p>
        <p>Durasi: {Math.round(t.durationSeconds/60)} menit</p>
        <Link to={`/play/${t.id}`} className="btn btn-primary">Mulai Tes</Link>
      </div>
    </div>
  );
}
