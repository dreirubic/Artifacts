
import { useState, useEffect } from "react";

const PRACTICE_QUESTIONS = [
  { q: "3.5 + 2.1", answer: 5.6, hint: "Line up the decimal points!" },
  { q: "7.8 − 3.4", answer: 4.4, hint: "Subtract digit by digit." },
  { q: "0.45 + 0.32", answer: 0.77, hint: "Hundredths + hundredths." },
  { q: "9.0 − 4.6", answer: 4.4, hint: "Think of 9.0 as having a zero in the tenths." },
  { q: "1.25 + 2.50", answer: 3.75, hint: "Add tenths and hundredths separately." },
  { q: "6.7 − 1.9", answer: 4.8, hint: "You may need to regroup!" },
  { q: "0.8 + 0.75", answer: 1.55, hint: "0.8 = 0.80 — align those decimals." },
  { q: "12.4 − 5.05", answer: 7.35, hint: "12.4 = 12.40 before subtracting." },
];

const FINAL_QUIZ = [
  { q: "4.6 + 3.7", answer: 8.3 },
  { q: "10.0 − 2.55", answer: 7.45 },
  { q: "0.99 + 0.01", answer: 1.0 },
  { q: "15.3 − 7.8", answer: 7.5 },
  { q: "3.14 + 2.86", answer: 6.0 },
  { q: "8.0 − 0.45", answer: 7.55 },
  { q: "1.1 + 2.22 + 3.333", answer: 6.653 },
  { q: "20.0 − 9.99", answer: 10.01 },
  { q: "0.5 + 0.05 + 0.005", answer: 0.555 },
  { q: "100.0 − 0.1", answer: 99.9 },
];

const close = (a, b) => Math.abs(parseFloat(a) - b) < 0.001;

const Star = ({ filled }) => (
  <span style={{ color: filled ? "#f5c842" : "#ccc", fontSize: "1.2rem" }}>★</span>
);

const ProgressBar = ({ value, max, color }) => (
  <div style={{ background: "#e8e0f5", borderRadius: 99, height: 10, overflow: "hidden", margin: "8px 0" }}>
    <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
  </div>
);

export default function DecimalQuiz() {
  const [mode, setMode] = useState("home"); // home | practice | final | results
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceStatus, setPracticeStatus] = useState(null); // correct | wrong | null
  const [practiceCorrect, setPracticeCorrect] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(Array(FINAL_QUIZ.length).fill(""));
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [bounce, setBounce] = useState(false);

  const pq = PRACTICE_QUESTIONS[practiceIdx];

  const checkPractice = () => {
    if (!practiceInput.trim()) return;
    const correct = close(practiceInput, pq.answer);
    setPracticeStatus(correct ? "correct" : "wrong");
    if (correct) {
      setPracticeCorrect(c => c + 1);
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const nextPractice = () => {
    if (practiceIdx + 1 < PRACTICE_QUESTIONS.length) {
      setPracticeIdx(i => i + 1);
      setPracticeInput("");
      setPracticeStatus(null);
      setShowHint(false);
    } else {
      setMode("final");
    }
  };

  const submitFinal = () => {
    let score = 0;
    FINAL_QUIZ.forEach((q, i) => { if (close(finalAnswers[i], q.answer)) score++; });
    setFinalScore(score);
    setFinalSubmitted(true);
    setMode("results");
  };

  const reset = () => {
    setMode("home");
    setPracticeIdx(0);
    setPracticeInput("");
    setPracticeStatus(null);
    setPracticeCorrect(0);
    setShowHint(false);
    setFinalAnswers(Array(FINAL_QUIZ.length).fill(""));
    setFinalSubmitted(false);
    setFinalScore(0);
  };

  const stars = Math.round((finalScore / FINAL_QUIZ.length) * 5);
  const pct = Math.round((finalScore / FINAL_QUIZ.length) * 100);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0ebff 0%, #e8f4ff 60%, #fff9f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "24px 16px",
    },
    card: {
      background: "#fff",
      borderRadius: 24,
      boxShadow: "0 8px 40px rgba(120,80,200,0.13), 0 2px 8px rgba(0,0,0,0.06)",
      padding: "40px 36px",
      maxWidth: 520,
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    accent: {
      position: "absolute", top: 0, left: 0, right: 0, height: 6,
      background: "linear-gradient(90deg, #7c3aed, #3b82f6, #f59e0b)",
    },
    title: { fontSize: "2rem", fontWeight: 700, color: "#3b0764", marginBottom: 4, letterSpacing: "-0.5px" },
    sub: { color: "#7c3aed", fontSize: "1rem", marginBottom: 28 },
    btn: {
      display: "inline-block", padding: "12px 28px", borderRadius: 12, border: "none",
      cursor: "pointer", fontFamily: "'Georgia', serif", fontSize: "1rem", fontWeight: 700,
      transition: "transform 0.15s, box-shadow 0.15s",
    },
    primary: { background: "linear-gradient(135deg,#7c3aed,#3b82f6)", color: "#fff", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" },
    secondary: { background: "#f3f0ff", color: "#7c3aed" },
    danger: { background: "#fef2f2", color: "#dc2626" },
    input: {
      width: "100%", padding: "14px 18px", fontSize: "1.4rem", borderRadius: 12,
      border: "2px solid #e0d7f7", outline: "none", fontFamily: "'Georgia', serif",
      textAlign: "center", boxSizing: "border-box", transition: "border 0.2s",
    },
    qBox: {
      background: "linear-gradient(135deg,#f5f0ff,#eff6ff)",
      borderRadius: 16, padding: "20px 24px", marginBottom: 20, textAlign: "center",
    },
    qText: { fontSize: "2.2rem", fontWeight: 700, color: "#1e1b4b", letterSpacing: "1px" },
    chip: { display: "inline-block", borderRadius: 99, padding: "4px 14px", fontSize: "0.8rem", fontWeight: 700 },
    correct: { background: "#dcfce7", color: "#16a34a" },
    wrong: { background: "#fee2e2", color: "#dc2626" },
    hint: { background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontSize: "0.9rem", color: "#92400e", margin: "12px 0" },
    row: { display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" },
    scoreCircle: {
      width: 110, height: 110, borderRadius: "50%",
      background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 16px",
      boxShadow: "0 6px 24px rgba(124,58,237,0.35)",
    },
    scoreNum: { color: "#fff", fontSize: "2rem", fontWeight: 700, textAlign: "center", lineHeight: 1.1 },
    finalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 },
    finalItem: { borderRadius: 10, padding: "10px 14px", fontSize: "0.9rem" },
  };

  // Home screen
  if (mode === "home") return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.accent} />
        <div style={{ textAlign: "center", paddingTop: 12 }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>🔢</div>
          <h1 style={styles.title}>Decimals Quiz</h1>
          <p style={styles.sub}>Adding & Subtracting Decimals</p>
          <p style={{ color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>
            First, warm up with <strong>8 practice questions</strong> — get hints and instant feedback.<br />
            Then, test yourself with a <strong>10-item Final Quiz</strong>!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={{ ...styles.btn, ...styles.primary }} onClick={() => setMode("practice")}>
              Start Practice ▶
            </button>
          </div>
          <div style={{ marginTop: 20, color: "#9ca3af", fontSize: "0.85rem" }}>
            Tip: Type your answer using a decimal point (e.g. 4.5)
          </div>
        </div>
      </div>
    </div>
  );

  // Practice screen
  if (mode === "practice") return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.accent} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ color: "#7c3aed", fontWeight: 700, fontSize: "0.9rem" }}>PRACTICE</span>
          <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{practiceIdx + 1} / {PRACTICE_QUESTIONS.length}</span>
        </div>
        <ProgressBar value={practiceIdx + (practiceStatus === "correct" ? 1 : 0)} max={PRACTICE_QUESTIONS.length} color="linear-gradient(90deg,#7c3aed,#3b82f6)" />

        <div style={{ ...styles.qBox, ...(shake ? { animation: "shake 0.4s" } : {}), ...(bounce ? { animation: "bounce 0.5s" } : {}) }}>
          <div style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: 700, marginBottom: 4 }}>Solve:</div>
          <div style={styles.qText}>{pq.q} = ?</div>
        </div>

        {practiceStatus === null && (
          <>
            <input
              style={{ ...styles.input, borderColor: "#c4b5fd" }}
              type="number"
              step="any"
              placeholder="Your answer..."
              value={practiceInput}
              onChange={e => setPracticeInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && checkPractice()}
              autoFocus
            />
            {showHint && <div style={styles.hint}>💡 {pq.hint}</div>}
            <div style={styles.row}>
              <button style={{ ...styles.btn, ...styles.primary, flex: 1 }} onClick={checkPractice}>Check ✓</button>
              <button style={{ ...styles.btn, ...styles.secondary }} onClick={() => setShowHint(h => !h)}>
                {showHint ? "Hide Hint" : "Hint 💡"}
              </button>
            </div>
          </>
        )}

        {practiceStatus === "correct" && (
          <>
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <span style={{ ...styles.chip, ...styles.correct, fontSize: "1rem", padding: "8px 20px" }}>✅ Correct! Well done!</span>
            </div>
            <button style={{ ...styles.btn, ...styles.primary, width: "100%" }} onClick={nextPractice}>
              {practiceIdx + 1 < PRACTICE_QUESTIONS.length ? "Next Question →" : "Go to Final Quiz 🎯"}
            </button>
          </>
        )}

        {practiceStatus === "wrong" && (
          <>
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <span style={{ ...styles.chip, ...styles.wrong, fontSize: "1rem", padding: "8px 20px" }}>❌ Not quite. The answer is <strong>{pq.answer}</strong></span>
            </div>
            <div style={styles.hint}>💡 {pq.hint}</div>
            <button style={{ ...styles.btn, ...styles.primary, width: "100%", marginTop: 8 }} onClick={nextPractice}>
              {practiceIdx + 1 < PRACTICE_QUESTIONS.length ? "Next Question →" : "Go to Final Quiz 🎯"}
            </button>
          </>
        )}

        <div style={{ marginTop: 20, color: "#9ca3af", fontSize: "0.82rem", textAlign: "center" }}>
          ✅ Correct so far: {practiceCorrect} / {practiceIdx + (practiceStatus ? 1 : 0)}
        </div>
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)} 70%{transform:translateY(-5px)} }
          input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        `}</style>
      </div>
    </div>
  );

  // Final quiz screen
  if (mode === "final") return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.accent} />
        <h2 style={{ ...styles.title, fontSize: "1.5rem" }}>🎯 Final Quiz</h2>
        <p style={{ color: "#6b7280", marginBottom: 16, fontSize: "0.9rem" }}>
          Answer all 10 questions, then click <strong>Submit</strong>. No hints this time!
        </p>
        <div style={styles.finalGrid}>
          {FINAL_QUIZ.map((q, i) => (
            <div key={i} style={{ ...styles.finalItem, background: finalAnswers[i] ? "#f0fdf4" : "#faf5ff", border: `1.5px solid ${finalAnswers[i] ? "#86efac" : "#e9d5ff"}` }}>
              <div style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 700, marginBottom: 4 }}>Q{i + 1}</div>
              <div style={{ fontWeight: 700, color: "#1e1b4b", marginBottom: 6 }}>{q.q} =</div>
              <input
                type="number"
                step="any"
                placeholder="?"
                value={finalAnswers[i]}
                onChange={e => {
                  const arr = [...finalAnswers];
                  arr[i] = e.target.value;
                  setFinalAnswers(arr);
                }}
                style={{ ...styles.input, padding: "8px 10px", fontSize: "1rem", borderColor: finalAnswers[i] ? "#86efac" : "#e0d7f7" }}
              />
            </div>
          ))}
        </div>
        <div style={styles.row}>
          <button
            style={{ ...styles.btn, ...styles.primary, flex: 1 }}
            onClick={submitFinal}
            disabled={finalAnswers.some(a => !a.trim())}
          >
            Submit Final Quiz 🚀
          </button>
          <button style={{ ...styles.btn, ...styles.secondary }} onClick={() => setMode("practice")}>
            ← Back
          </button>
        </div>
        {finalAnswers.some(a => !a.trim()) && (
          <p style={{ color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", marginTop: 8 }}>
            Please answer all questions before submitting.
          </p>
        )}
        <style>{`input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}`}</style>
      </div>
    </div>
  );

  // Results screen
  if (mode === "results") return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.accent} />
        <div style={{ textAlign: "center", paddingTop: 12 }}>
          <div style={styles.scoreCircle}>
            <div style={styles.scoreNum}>{finalScore}<div style={{ fontSize: "0.9rem", opacity: 0.8 }}>/ 10</div></div>
          </div>
          <h2 style={{ ...styles.title, fontSize: "1.6rem" }}>
            {pct === 100 ? "Perfect Score! 🎉" : pct >= 80 ? "Great Job! 🌟" : pct >= 60 ? "Good Effort! 👍" : "Keep Practicing! 💪"}
          </h2>
          <div style={{ margin: "8px 0 4px" }}>
            {[1,2,3,4,5].map(i => <Star key={i} filled={i <= stars} />)}
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", marginBottom: 16 }}>{pct}% — {finalScore} correct out of 10</p>
          <ProgressBar value={finalScore} max={10} color="linear-gradient(90deg,#f59e0b,#f97316)" />
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 700, color: "#3b0764", marginBottom: 10 }}>Answer Review:</div>
          <div style={styles.finalGrid}>
            {FINAL_QUIZ.map((q, i) => {
              const correct = close(finalAnswers[i], q.answer);
              return (
                <div key={i} style={{ ...styles.finalItem, background: correct ? "#f0fdf4" : "#fff1f2", border: `1.5px solid ${correct ? "#86efac" : "#fca5a5"}` }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: correct ? "#16a34a" : "#dc2626" }}>Q{i + 1} {correct ? "✅" : "❌"}</div>
                  <div style={{ fontSize: "0.85rem", color: "#374151" }}>{q.q}</div>
                  {!correct && <div style={{ fontSize: "0.78rem", color: "#dc2626" }}>Your: {finalAnswers[i] || "—"}</div>}
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>= {q.answer}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...styles.row, marginTop: 20 }}>
          <button style={{ ...styles.btn, ...styles.primary, flex: 1 }} onClick={reset}>Try Again 🔄</button>
          <button style={{ ...styles.btn, background: "#f0fdf4", color: "#16a34a" }} onClick={() => { setFinalAnswers(Array(FINAL_QUIZ.length).fill("")); setFinalSubmitted(false); setMode("final"); }}>
            Redo Final Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
