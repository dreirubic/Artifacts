import { useState } from "react";

const PRACTICE = [
  {
    emoji: "🍎",
    story: "Mia bought apples that weighed 1.5 kg. Then she bought more apples that weighed 0.8 kg. How many kilograms of apples does she have in all?",
    question: "1.5 + 0.8 = ?",
    answer: 2.3,
    hint: "Just add the two weights together!",
    solution: "1.5 + 0.8 = 2.3 kg",
  },
  {
    emoji: "💧",
    story: "Leo had a bottle with 2.75 liters of water. He drank 1.2 liters. How much water is left in the bottle?",
    question: "2.75 − 1.2 = ?",
    answer: 1.55,
    hint: "Think of 1.2 as 1.20 before subtracting.",
    solution: "2.75 − 1.20 = 1.55 liters",
  },
  {
    emoji: "🏃",
    story: "Ana ran 3.6 km in the morning and 2.45 km in the afternoon. How far did she run in total?",
    question: "3.6 + 2.45 = ?",
    answer: 6.05,
    hint: "3.6 = 3.60. Now add the hundredths!",
    solution: "3.60 + 2.45 = 6.05 km",
  },
  {
    emoji: "🛒",
    story: "A bag of rice costs ₱58.50. Marco paid ₱100.00. How much change should he get?",
    question: "100.00 − 58.50 = ?",
    answer: 41.5,
    hint: "Subtract ₱58.50 from ₱100.00.",
    solution: "100.00 − 58.50 = 41.50",
  },
  {
    emoji: "🎀",
    story: "Sofia had a ribbon 5.0 m long. She cut off 1.75 m to wrap a gift. How much ribbon is left?",
    question: "5.0 − 1.75 = ?",
    answer: 3.25,
    hint: "5.0 = 5.00 — now you can subtract!",
    solution: "5.00 − 1.75 = 3.25 m",
  },
  {
    emoji: "🐟",
    story: "A fish weighed 0.85 kg. Another fish weighed 1.4 kg. What is their combined weight?",
    question: "0.85 + 1.4 = ?",
    answer: 2.25,
    hint: "1.4 = 1.40. Add like normal!",
    solution: "0.85 + 1.40 = 2.25 kg",
  },
  {
    emoji: "🧃",
    story: "There were 3.5 liters of juice. The kids drank 0.75 liters at snack time. How much juice is left?",
    question: "3.5 − 0.75 = ?",
    answer: 2.75,
    hint: "3.5 = 3.50. Now subtract 0.75.",
    solution: "3.50 − 0.75 = 2.75 liters",
  },
  {
    emoji: "📏",
    story: "Ben's pencil is 12.4 cm long. His eraser is 3.15 cm long. How much longer is the pencil than the eraser?",
    question: "12.4 − 3.15 = ?",
    answer: 9.25,
    hint: "12.4 = 12.40. Then subtract!",
    solution: "12.40 − 3.15 = 9.25 cm",
  },
];

const FINAL = [
  {
    emoji: "🧁",
    story: "A cupcake weighs 0.25 kg and a muffin weighs 0.4 kg. What is their total weight?",
    answer: 0.65,
  },
  {
    emoji: "🚗",
    story: "A toy car costs ₱45.75. A toy truck costs ₱62.5. How much more does the truck cost than the car?",
    answer: 16.75,
  },
  {
    emoji: "🌧️",
    story: "It rained 4.8 cm on Monday and 2.35 cm on Tuesday. How much rain fell in total?",
    answer: 7.15,
  },
  {
    emoji: "🎒",
    story: "Luz's school bag weighs 3.2 kg. She removed a book weighing 0.85 kg. How heavy is the bag now?",
    answer: 2.35,
  },
  {
    emoji: "🍕",
    story: "Carlo ate 1.5 slices of pizza and his sister ate 2.25 slices. How many slices did they eat together?",
    answer: 3.75,
  },
  {
    emoji: "🧵",
    story: "A tailor had 10.0 m of cloth. She used 4.65 m for a dress. How much cloth is left?",
    answer: 5.35,
  },
  {
    emoji: "🐾",
    story: "A puppy weighed 2.6 kg last month. This month it weighs 3.15 kg. How much weight did it gain?",
    answer: 0.55,
  },
  {
    emoji: "🍌",
    story: "Nina bought 1.25 kg of bananas and 0.9 kg of mangoes. How many kilograms of fruit did she buy in all?",
    answer: 2.15,
  },
  {
    emoji: "💰",
    story: "Nico saved ₱35.50 this week and ₱42.75 last week. How much has he saved in total?",
    answer: 78.25,
  },
  {
    emoji: "🏊",
    story: "A swimming pool had 8.0 m of water depth. After draining, only 3.45 m remained. How much water was removed?",
    answer: 4.55,
  },
];

const close = (a, b) => Math.abs(parseFloat(a) - b) < 0.005;

export default function WordProblemQuiz() {
  const [mode, setMode] = useState("home");
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [finalAnswers, setFinalAnswers] = useState(Array(FINAL.length).fill(""));
  const [finalDone, setFinalDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [anim, setAnim] = useState("");

  const q = PRACTICE[idx];

  const checkPractice = () => {
    if (!input.trim()) return;
    const ok = close(input, q.answer);
    setStatus(ok ? "correct" : "wrong");
    if (ok) { setPracticeScore(s => s + 1); setAnim("pop"); setTimeout(() => setAnim(""), 600); }
    else { setAnim("shake"); setTimeout(() => setAnim(""), 500); }
  };

  const next = () => {
    if (idx + 1 < PRACTICE.length) {
      setIdx(i => i + 1); setInput(""); setStatus(null); setShowHint(false); setAnim("");
    } else { setMode("final"); }
  };

  const submitFinal = () => {
    let s = 0;
    FINAL.forEach((q, i) => { if (close(finalAnswers[i], q.answer)) s++; });
    setFinalScore(s); setFinalDone(true); setMode("results");
  };

  const reset = () => {
    setMode("home"); setIdx(0); setInput(""); setStatus(null); setShowHint(false);
    setPracticeScore(0); setFinalAnswers(Array(FINAL.length).fill("")); setFinalDone(false); setFinalScore(0); setAnim("");
  };

  const pct = Math.round((finalScore / FINAL.length) * 100);
  const medal = pct === 100 ? "🥇" : pct >= 80 ? "🥈" : pct >= 60 ? "🥉" : "📝";
  const msg = pct === 100 ? "PERFECT! You're a decimal star!" : pct >= 80 ? "Awesome work! Almost perfect!" : pct >= 60 ? "Good job! Keep practicing!" : "Nice try! Review and try again!";

  const C = {
    page: {
      minHeight: "100vh",
      background: "#fffbf0",
      backgroundImage: "radial-gradient(circle at 20% 20%, #fde68a44 0%, transparent 50%), radial-gradient(circle at 80% 80%, #bbf7d044 0%, transparent 50%)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
      padding: "28px 16px",
    },
    card: {
      background: "#fff",
      borderRadius: 28,
      boxShadow: "0 6px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)",
      padding: "36px 32px",
      maxWidth: 560,
      width: "100%",
      border: "3px solid #fde68a",
    },
    topBand: { height: 8, borderRadius: "24px 24px 0 0", background: "linear-gradient(90deg,#f97316,#facc15,#4ade80,#60a5fa,#c084fc)", marginBottom: 24, marginLeft: -32, marginRight: -32, marginTop: -36, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
    title: { fontSize: "1.8rem", fontWeight: 900, color: "#ea580c", textAlign: "center", marginBottom: 4 },
    subtitle: { textAlign: "center", color: "#78716c", fontSize: "0.95rem", marginBottom: 24 },
    storyBox: {
      background: "linear-gradient(135deg, #fef9c3, #fef3c7)",
      border: "2.5px dashed #fbbf24",
      borderRadius: 18, padding: "18px 20px", marginBottom: 16,
      fontSize: "1.05rem", color: "#1c1917", lineHeight: 1.7,
    },
    questionBox: {
      background: "#eff6ff", border: "2px solid #93c5fd",
      borderRadius: 14, padding: "12px 16px", marginBottom: 16,
      textAlign: "center", fontSize: "1.3rem", fontWeight: 900, color: "#1d4ed8",
    },
    input: {
      width: "100%", padding: "14px 16px", fontSize: "1.3rem", borderRadius: 14,
      border: "2.5px solid #93c5fd", outline: "none", fontFamily: "inherit",
      textAlign: "center", boxSizing: "border-box", background: "#f0f9ff",
      color: "#1e3a5f",
    },
    hint: {
      background: "#fef9c3", border: "1.5px solid #fde68a",
      borderRadius: 12, padding: "10px 14px", color: "#92400e",
      fontSize: "0.9rem", margin: "10px 0",
    },
    solution: {
      background: "#f0fdf4", border: "1.5px solid #86efac",
      borderRadius: 12, padding: "10px 14px", color: "#166534",
      fontSize: "0.9rem", margin: "10px 0", fontWeight: 700,
    },
    btn: {
      padding: "12px 24px", borderRadius: 14, border: "none",
      cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 900,
      transition: "transform 0.12s",
    },
    green: { background: "#4ade80", color: "#14532d", boxShadow: "0 3px 0 #16a34a" },
    yellow: { background: "#facc15", color: "#713f12", boxShadow: "0 3px 0 #ca8a04" },
    blue: { background: "#60a5fa", color: "#1e3a8a", boxShadow: "0 3px 0 #2563eb" },
    orange: { background: "#fb923c", color: "#7c2d12", boxShadow: "0 3px 0 #ea580c" },
    row: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" },
    badge: { display: "inline-block", borderRadius: 99, padding: "5px 16px", fontWeight: 900, fontSize: "0.95rem" },
    okBadge: { background: "#dcfce7", color: "#15803d" },
    noBadge: { background: "#fee2e2", color: "#b91c1c" },
    progress: { background: "#fef3c7", borderRadius: 99, height: 12, overflow: "hidden", margin: "6px 0 18px" },
    progressFill: (v, max) => ({ width: `${(v/max)*100}%`, height: "100%", background: "linear-gradient(90deg,#f97316,#facc15)", borderRadius: 99, transition: "width 0.4s" }),
  };

  // HOME
  if (mode === "home") return (
    <div style={C.page}>
      <div style={C.card}>
        <div style={C.topBand} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 6 }}>📖✏️</div>
          <h1 style={C.title}>Decimal Word Problems!</h1>
          <p style={C.subtitle}>Grade 4 · Adding & Subtracting Decimals</p>
          <div style={{ background: "#fef9c3", borderRadius: 16, padding: "16px 20px", textAlign: "left", marginBottom: 24, border: "2px dashed #fbbf24" }}>
            <p style={{ margin: "0 0 8px", fontWeight: 900, color: "#92400e" }}>Here's how it works:</p>
            <p style={{ margin: "0 0 6px", color: "#78716c", fontSize: "0.95rem" }}>📘 <strong>8 Practice Problems</strong> — read the story, solve it! You can ask for a hint.</p>
            <p style={{ margin: 0, color: "#78716c", fontSize: "0.95rem" }}>🎯 <strong>10-Item Final Quiz</strong> — answer all on your own and get a score!</p>
          </div>
          <button style={{ ...C.btn, ...C.orange, fontSize: "1.1rem", padding: "14px 36px" }} onClick={() => setMode("practice")}>
            Let's Go! 🚀
          </button>
          <p style={{ marginTop: 14, color: "#a8a29e", fontSize: "0.82rem" }}>Tip: Type decimals like 2.5 or 14.75</p>
        </div>
      </div>
    </div>
  );

  // PRACTICE
  if (mode === "practice") return (
    <div style={C.page}>
      <div style={C.card}>
        <div style={C.topBand} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontWeight: 900, color: "#f97316", fontSize: "0.9rem" }}>PRACTICE 📘</span>
          <span style={{ color: "#a8a29e", fontSize: "0.85rem" }}>{idx + 1} / {PRACTICE.length}</span>
        </div>
        <div style={C.progress}><div style={C.progressFill(idx + (status === "correct" ? 1 : 0), PRACTICE.length)} /></div>

        <div style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: 8 }}>{q.emoji}</div>

        <div style={{ ...C.storyBox, ...(anim === "shake" ? { animation: "shake 0.4s" } : {}), ...(anim === "pop" ? { animation: "pop 0.5s" } : {}) }}>
          {q.story}
        </div>

        <div style={C.questionBox}>🔢 {q.question}</div>

        {status === null && (
          <>
            <input
              style={C.input}
              type="number" step="any"
              placeholder="Type your answer here..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && checkPractice()}
              autoFocus
            />
            {showHint && <div style={C.hint}>💡 Hint: {q.hint}</div>}
            <div style={C.row}>
              <button style={{ ...C.btn, ...C.green, flex: 1 }} onClick={checkPractice}>Check ✓</button>
              <button style={{ ...C.btn, ...C.yellow }} onClick={() => setShowHint(h => !h)}>{showHint ? "Hide Hint" : "Hint 💡"}</button>
            </div>
          </>
        )}

        {status === "correct" && (
          <>
            <div style={{ textAlign: "center", margin: "12px 0 6px" }}>
              <span style={{ ...C.badge, ...C.okBadge, fontSize: "1.05rem", padding: "8px 22px" }}>🎉 Correct! Great job!</span>
            </div>
            <div style={C.solution}>✅ Solution: {q.solution}</div>
            <button style={{ ...C.btn, ...C.blue, width: "100%", marginTop: 8 }} onClick={next}>
              {idx + 1 < PRACTICE.length ? "Next Problem →" : "Go to Final Quiz 🎯"}
            </button>
          </>
        )}

        {status === "wrong" && (
          <>
            <div style={{ textAlign: "center", margin: "10px 0 6px" }}>
              <span style={{ ...C.badge, ...C.noBadge, fontSize: "1.05rem", padding: "8px 22px" }}>❌ Not quite! The answer is {q.answer}</span>
            </div>
            <div style={C.solution}>✅ Solution: {q.solution}</div>
            <div style={C.hint}>💡 {q.hint}</div>
            <button style={{ ...C.btn, ...C.blue, width: "100%", marginTop: 8 }} onClick={next}>
              {idx + 1 < PRACTICE.length ? "Next Problem →" : "Go to Final Quiz 🎯"}
            </button>
          </>
        )}

        <div style={{ marginTop: 16, textAlign: "center", color: "#a8a29e", fontSize: "0.82rem" }}>
          ✅ Correct so far: {practiceScore} / {idx + (status ? 1 : 0)}
        </div>

        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
          @keyframes pop { 0%{transform:scale(1)} 40%{transform:scale(1.04)} 70%{transform:scale(0.98)} 100%{transform:scale(1)} }
          input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
          button:hover{transform:translateY(-2px);}
        `}</style>
      </div>
    </div>
  );

  // FINAL QUIZ
  if (mode === "final") return (
    <div style={C.page}>
      <div style={C.card}>
        <div style={C.topBand} />
        <h2 style={{ ...C.title, fontSize: "1.5rem" }}>🎯 Final Quiz Time!</h2>
        <p style={{ textAlign: "center", color: "#78716c", fontSize: "0.9rem", marginBottom: 20 }}>
          Read each problem carefully and write your answer. No hints this round!
        </p>
        {FINAL.map((q, i) => (
          <div key={i} style={{ background: finalAnswers[i] ? "#f0fdf4" : "#fafafa", border: `2px solid ${finalAnswers[i] ? "#86efac" : "#e7e5e4"}`, borderRadius: 16, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.6rem", lineHeight: 1.3 }}>{q.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#44403c", fontSize: "0.95rem", marginBottom: 8, lineHeight: 1.6 }}>
                  <span style={{ background: "#fef9c3", borderRadius: 6, padding: "1px 7px", fontSize: "0.78rem", fontWeight: 900, color: "#92400e", marginRight: 6 }}>Q{i + 1}</span>
                  {q.story}
                </div>
                <input
                  type="number" step="any"
                  placeholder="Your answer..."
                  value={finalAnswers[i]}
                  onChange={e => { const a = [...finalAnswers]; a[i] = e.target.value; setFinalAnswers(a); }}
                  style={{ ...C.input, fontSize: "1.05rem", padding: "10px 14px", borderColor: finalAnswers[i] ? "#86efac" : "#d6d3d1" }}
                />
              </div>
            </div>
          </div>
        ))}
        <div style={C.row}>
          <button
            style={{ ...C.btn, ...C.orange, flex: 1, fontSize: "1.05rem" }}
            onClick={submitFinal}
            disabled={finalAnswers.some(a => !a.trim())}
          >
            Submit My Answers 🚀
          </button>
          <button style={{ ...C.btn, background: "#e7e5e4", color: "#57534e" }} onClick={() => setMode("practice")}>← Back</button>
        </div>
        {finalAnswers.some(a => !a.trim()) && <p style={{ textAlign: "center", color: "#a8a29e", fontSize: "0.8rem", marginTop: 8 }}>Please answer all questions first! 😊</p>}
        <style>{`input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}button:hover{transform:translateY(-2px);}`}</style>
      </div>
    </div>
  );

  // RESULTS
  if (mode === "results") return (
    <div style={C.page}>
      <div style={C.card}>
        <div style={C.topBand} />
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: "4rem", marginBottom: 4 }}>{medal}</div>
          <h2 style={{ ...C.title, fontSize: "1.6rem" }}>{msg}</h2>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#ea580c", margin: "6px 0" }}>{finalScore} / {FINAL.length}</div>
          <div style={{ color: "#78716c", fontSize: "0.95rem", marginBottom: 8 }}>{pct}% correct</div>
          <div style={C.progress}><div style={C.progressFill(finalScore, FINAL.length)} /></div>
        </div>

        <div style={{ fontWeight: 900, color: "#44403c", marginBottom: 10 }}>Answer Key:</div>
        {FINAL.map((q, i) => {
          const ok = close(finalAnswers[i], q.answer);
          return (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: ok ? "#f0fdf4" : "#fff1f2", border: `1.5px solid ${ok ? "#86efac" : "#fca5a5"}`, borderRadius: 12, padding: "10px 14px", marginBottom: 8 }}>
              <span style={{ fontSize: "1.3rem" }}>{q.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", color: "#57534e", lineHeight: 1.5 }}>{q.story}</div>
                <div style={{ marginTop: 4, fontSize: "0.85rem" }}>
                  {ok
                    ? <span style={{ color: "#16a34a", fontWeight: 900 }}>✅ Your answer: {finalAnswers[i]} — Correct!</span>
                    : <span style={{ color: "#dc2626", fontWeight: 900 }}>❌ Your answer: {finalAnswers[i] || "—"} | Answer: {q.answer}</span>}
                </div>
              </div>
            </div>
          );
        })}

        <div style={C.row}>
          <button style={{ ...C.btn, ...C.orange, flex: 1 }} onClick={reset}>Try Again 🔄</button>
          <button style={{ ...C.btn, ...C.yellow }} onClick={() => { setFinalAnswers(Array(FINAL.length).fill("")); setMode("final"); }}>Redo Final Quiz</button>
        </div>
        <style>{`button:hover{transform:translateY(-2px);}`}</style>
      </div>
    </div>
  );
}
