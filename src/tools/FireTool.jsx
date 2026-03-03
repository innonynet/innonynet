import { useState } from "react";
import Card from "../components/Card";
import SliderInput from "../components/SliderInput";

function calcFIRE(c, m, r, tg) {
  let a = c; const mr = r / 100 / 12;
  for (let i = 1; i <= 600; i++) { a = a * (1 + mr) + m; if (a >= tg) return i; }
  return null;
}

export default function FireTool({ t }) {
  const [current, setCurrent] = useState(2000);
  const [monthly, setMonthly] = useState(20);
  const [rate, setRate]       = useState(7);
  const [target, setTarget]   = useState(4500);
  const [age, setAge]         = useState(32);

  const months   = calcFIRE(current, monthly, rate, target);
  const years    = months ? Math.floor(months / 12) : null;
  const fireAge  = years ? age + years : null;
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <svg width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={50} cy={50} r={42} fill="none" stroke={t.faint} strokeWidth={8} />
              <circle cx={50} cy={50} r={42} fill="none" stroke="#f97316" strokeWidth={8}
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s" }} />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontFamily: "monospace", fontWeight: 700, color: "#f97316" }}>{progress.toFixed(0)}%</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {months ? (
              <>
                <div style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>FIRE達成まで</div>
                <div style={{ fontSize: "2.2rem", fontFamily: "monospace", fontWeight: 700, color: "#f97316", lineHeight: 1.1 }}>{years}<span style={{ fontSize: "1rem" }}>年</span></div>
                <div style={{ fontSize: "0.8rem", color: t.sub }}>{fireAge}歳で達成見込み</div>
              </>
            ) : (
              <div style={{ color: "#ef4444", fontSize: "0.85rem" }}>50年以内の達成が難しい設定です</div>
            )}
          </div>
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="現在の資産"    value={current} min={100}  max={10000} step={100} unit="万円" onChange={setCurrent} color="#f97316" t={t} />
        <SliderInput label="目標FIRE資産"  value={target}  min={1000} max={30000} step={500} unit="万円" onChange={setTarget}  color="#f97316" t={t} />
        <SliderInput label="月々の積立"    value={monthly} min={1}    max={100}   step={1}   unit="万円" onChange={setMonthly} color="#f97316" t={t} />
        <SliderInput label="年利（想定）"  value={rate}    min={1}    max={15}    step={0.5} unit="%"   onChange={setRate}    color="#f97316" t={t} />
        <SliderInput label="現在の年齢"    value={age}     min={20}   max={55}    step={1}   unit="歳"  onChange={setAge}     color="#f97316" t={t} />
      </Card>
    </div>
  );
}
