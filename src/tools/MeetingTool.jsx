import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import SliderInput from "../components/SliderInput";

export default function MeetingTool({ t }) {
  const [people,   setPeople]   = useState(5);
  const [hourly,   setHourly]   = useState(3000);
  const [duration, setDuration] = useState(60);
  const [running,  setRunning]  = useState(false);
  const [elapsed,  setElapsed]  = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const costPerSec  = (people * hourly) / 3600;
  const plannedCost = Math.round(people * hourly * (duration / 60));
  const liveCost    = Math.round(elapsed * costPerSec);
  const progress    = Math.min(elapsed / (duration * 60), 1);
  const overrun     = elapsed > duration * 60;

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
          {running ? "現在のコスト" : "予定コスト"}
        </div>
        <div style={{ fontSize: "3rem", fontFamily: "monospace", fontWeight: 700, color: overrun ? "#ef4444" : "#f59e0b", lineHeight: 1, transition: "color 0.3s" }}>
          ¥{(running ? liveCost : plannedCost).toLocaleString()}
        </div>
        {running && (
          <div style={{ marginTop: "0.8rem" }}>
            <div style={{ height: 4, background: t.faint, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: overrun ? "#ef4444" : "#f59e0b", borderRadius: 2, transition: "width 1s linear" }} />
            </div>
            <div style={{ fontSize: "0.7rem", color: t.muted, marginTop: "0.3rem" }}>
              {Math.floor(elapsed / 60)}分{elapsed % 60}秒 / {duration}分 {overrun && <span style={{ color: "#ef4444" }}>⚠ 超過中</span>}
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          <button onClick={() => setRunning(r => !r)}
            style={{ padding: "0.5rem 1.5rem", borderRadius: 8, border: "none", background: "#f59e0b", color: "#000", fontWeight: 700, cursor: "pointer" }}>
            {running ? "停止" : "計測開始"}
          </button>
          <button onClick={() => { setRunning(false); setElapsed(0); }}
            style={{ padding: "0.5rem 1rem", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, cursor: "pointer" }}>
            リセット
          </button>
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="参加人数" value={people}   min={1}    max={30}    step={1}   unit="人" onChange={setPeople}   color="#f59e0b" t={t} />
        <SliderInput label="平均時給" value={hourly}   min={1000} max={10000} step={500} unit="円" onChange={setHourly}   color="#f59e0b" t={t} />
        <SliderInput label="予定時間" value={duration} min={5}    max={180}   step={5}   unit="分" onChange={setDuration} color="#f59e0b" t={t} />
      </Card>
    </div>
  );
}
