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
      <h1 className="page-title">Tes Saya</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Jenis Tes</th>
              <th>Deskripsi</th>
              <th style={{ width: 260 }}>Aksi</th> {/* beri fixed width supaya tidak melar */}
            </tr>
          </thead>

          <tbody>
            {tests.map(t=> {
              const done = hasResult(t.id);
              return (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>
                    <div className="test-actions">
                      <Link to={`/tests/${t.id}`} className="btn">
                        Detail
                      </Link>

                      <Link
                        to={done ? `/result/${t.id}` : `/play/${t.id}`}
                        className={`btn btn-primary ${done ? 'disabled' : ''}`}
                        aria-disabled={done ? "true" : "false"}
                        onClick={(e) => { if(done) e.preventDefault(); }}
                      >
                        {done ? 'Sudah Selesai' : 'Kerjakan'}
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
