import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";

const DURATIONS = { work: 25 * 60, break: 5 * 60, long: 15 * 60 };

export default function PomodoroTool({ t }) {
  const [mode,      setMode]      = useState("work");
  const [remaining, setRemaining] = useState(DURATIONS.work);
  const [running,   setRunning]   = useState(false);
  const [count,     setCount]     = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            setRunning(false);
            clearInterval(intervalRef.current);
            if (mode === "work") setCount(c => c + 1);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const switchMode = (m) => { setMode(m); setRemaining(DURATIONS[m]); setRunning(false); };
  const min        = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec        = String(remaining % 60).padStart(2, "0");
  const progress   = 1 - remaining / DURATIONS[mode];
  const r = 70, circ = 2 * Math.PI * r;
  const modeColor  = mode === "work" ? "#ef4444" : "#10b981";

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {[["work", "集中"], ["break", "休憩"], ["long", "長休憩"]].map(([m, l]) => (
            <button key={m} onClick={() => switchMode(m)}
              style={{ padding: "0.3rem 0.8rem", borderRadius: 20, border: `1px solid ${mode === m ? modeColor : t.border}`, background: mode === m ? modeColor + "20" : "transparent", color: mode === m ? modeColor : t.muted, fontSize: "0.75rem", cursor: "pointer" }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg width={180} height={180} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={90} cy={90} r={r} fill="none" stroke={t.faint} strokeWidth={8} />
            <circle cx={90} cy={90} r={r} fill="none" stroke={modeColor} strokeWidth={8}
              strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
            <div style={{ fontSize: "2.8rem", fontFamily: "monospace", fontWeight: 700, color: modeColor, lineHeight: 1 }}>{min}:{sec}</div>
            <div style={{ fontSize: "0.65rem", color: t.muted, marginTop: 4 }}>セッション {count}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.2rem" }}>
          <button onClick={() => setRunning(r => !r)}
            style={{ padding: "0.6rem 2rem", borderRadius: 8, border: "none", background: modeColor, color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
            {running ? "一時停止" : "スタート"}
          </button>
          <button onClick={() => { setRemaining(DURATIONS[mode]); setRunning(false); }}
            style={{ padding: "0.6rem 1.2rem", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, fontSize: "0.9rem", cursor: "pointer" }}>
            リセット
          </button>
        </div>
      </Card>
      <Card t={t}>
        <div style={{ fontSize: "0.72rem", color: t.muted, marginBottom: "0.8rem" }}>今日の実績</div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {Array.from({ length: Math.max(count, 8) }, (_, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: i < count ? "#ef4444" : t.faint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>
              {i < count ? "🍅" : ""}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
