import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tests } from "../data/dummy";
import { useAuth } from "../contexts/AuthContext";

export default function TestPlayer(){
  const { id } = useParams();
  const nav = useNavigate();
  const test = tests.find(t => t.id === id);
  const { user } = useAuth();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test?.durationSeconds ?? 0);

  useEffect(()=>{
    if(!test) return;
    const t = setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev <= 1){
          clearInterval(t);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return ()=> clearInterval(t);
  }, [test]);

  if(!test) return <div>Test not found</div>;

  const select = (qId, idx) => {
    setAnswers(a=>({ ...a, [qId]: idx }));
  };

  const handleSubmit = () => {
    let total = 0;
    test.questions.forEach(q => {
      const a = answers[q.id];
      if(a === q.correct) total += q.score;
    });
    const result = {
      testId: test.id,
      score: total,
      completedAt: new Date().toISOString(),
      duration: (test.durationSeconds - timeLeft),
      userEmail: user?.email || "anonymous"
    };
    const all = JSON.parse(localStorage.getItem("results") || "[]");
    const filtered = all.filter(r => !(r.testId === result.testId && r.userEmail === result.userEmail));
    filtered.push(result);
    localStorage.setItem("results", JSON.stringify(filtered));
    nav(`/result/${result.testId}`, { state: { result } });
  };

  return (
    <div>
      <h1>Mengerjakan: {test.title}</h1>
      <div className="card">
        <div className="timer">Waktu tersisa: {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
        {test.questions.map(q=>(
          <div key={q.id} className="question">
            <p><strong>{q.id}. {q.text}</strong></p>
            <div className="options">
              {q.options.map((opt, idx)=>(
                <label key={idx} className={`option ${answers[q.id] === idx ? 'selected' : ''}`}>
                  <input type="radio" name={`q_${q.id}`} checked={answers[q.id]===idx} onChange={()=>select(q.id, idx)} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="actions">
          <button className="btn" onClick={()=>nav(-1)}>Batal</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Selesaikan Tes</button>
        </div>
      </div>
    </div>
  );
}
