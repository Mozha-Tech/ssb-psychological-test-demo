import React from "react";
import { tests } from "../data/dummy";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Tests(){
  const { user } = useAuth();
  const results = JSON.parse(localStorage.getItem("results") || "[]");

  const hasResult = (testId) => {
    if(!user) return false;
    return results.some(r => r.testId === testId && r.userEmail === user.email);
  };

  return (
    <div>
      <h1>Tes Saya</h1>
      <div className="card">
        <table className="table">
          <thead><tr><th>Jenis Tes</th><th>Deskripsi</th><th>Aksi</th></tr></thead>
          <tbody>
            {tests.map(t=>(
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>
                  <Link to={`/tests/${t.id}`} className="btn">Detail</Link>
                  <Link
                    to={hasResult(t.id) ? `/result/${t.id}` : `/play/${t.id}`}
                    className={`btn ${hasResult(t.id) ? '' : 'btn-primary'}`}
                    aria-disabled={hasResult(t.id)}
                    onClick={(e) => { if(hasResult(t.id)) e.preventDefault(); }}
                    style={ hasResult(t.id) ? { opacity: 0.6, pointerEvents: 'none' } : {} }
                  >
                    {hasResult(t.id) ? 'Sudah Selesai' : 'Kerjakan'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
