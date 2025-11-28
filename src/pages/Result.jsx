import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Result(){
  const loc = useLocation();
  const params = useParams();
  let result = loc.state?.result;

  if(!result && params?.id) {
    const all = JSON.parse(localStorage.getItem("results") || "[]");
    result = all.find(r => r.testId === params.id);
  }

  if(!result) return <div className="card">Hasil tidak ditemukan (ini demo). Coba selesaikan tes dulu.</div>;

  return (
    <div>
      <h1>Hasil Tes</h1>
      <div className="card result-card">
        <h2>Skor Total</h2>
        <div className="big-score">{result.score}</div>
        <p>Selesai pada: {new Date(result.completedAt).toLocaleString()}</p>
        <p>Durasi: {Math.round(result.duration)} detik</p>

        <div className="interpretation">
          <strong>Interpretasi Hasil:</strong>
          <p>
            {result.score >= 24 ? "Kandidat memiliki gaya kepemimpinan yang kuat, tegas, dan cepat mengambil keputusan."
             : "Interpretasi dasar: skor lebih rendah — butuh analisis lebih lanjut."}
          </p>
        </div>
      </div>
    </div>
  );
}
