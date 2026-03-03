import { useState } from "react";
import Card from "../components/Card";
import SliderInput from "../components/SliderInput";

export default function JobChangeTool({ t }) {
  const [age,        setAge]        = useState(32);
  const [salary,     setSalary]     = useState(550);
  const [satisfaction, setSatisfaction] = useState(40);
  const [skills,     setSkills]     = useState(70);
  const [yearsInJob, setYearsInJob] = useState(5);

  const ageScore          = age <= 28 ? 100 : age <= 32 ? 85 : age <= 35 ? 65 : age <= 40 ? 40 : 20;
  const salaryScore       = salary < 400 ? 90 : salary < 500 ? 70 : salary < 600 ? 50 : salary < 800 ? 30 : 15;
  const satisfactionScore = 100 - satisfaction;
  const tenureScore       = yearsInJob >= 3 && yearsInJob <= 7 ? 90 : yearsInJob < 3 ? 40 : 70;
  const total             = Math.round(ageScore * 0.25 + salaryScore * 0.2 + satisfactionScore * 0.25 + skills * 0.15 + tenureScore * 0.15);

  const result = total >= 80 ? { label: "今すぐ動け",       color: "#ef4444", emoji: "🔥", desc: "タイミングは今。市場価値が高く、現職への満足度も低い。" }
    : total >= 60 ?             { label: "積極的に検討",     color: "#f97316", emoji: "⚡", desc: "エージェントに登録して市場感を掴むだけでも価値がある。" }
    : total >= 40 ?             { label: "準備しつつ様子見", color: "#f59e0b", emoji: "🌱", desc: "スキルアップで価値を高めておく時期。" }
    :                           { label: "今は留まるが吉",   color: "#10b981", emoji: "🏠", desc: "現職のメリットを活かしながらFIRE資産を積み上げる好機。" };

  const factors = [
    { label: "年齢（若さは武器）", score: ageScore,          color: "#3b82f6" },
    { label: "年収の伸びしろ",     score: salaryScore,       color: "#f97316" },
    { label: "現職への不満度",     score: satisfactionScore, color: "#ef4444" },
    { label: "スキル市場価値",     score: skills,            color: "#8b5cf6" },
    { label: "在籍年数の適切さ",   score: tenureScore,       color: "#10b981" },
  ];

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.2rem" }}>{result.emoji}</div>
        <div style={{ fontSize: "0.6rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>転職推奨スコア</div>
        <div style={{ fontSize: "3.5rem", fontFamily: "monospace", fontWeight: 700, color: result.color, lineHeight: 1.1 }}>{total}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: result.color, marginTop: "0.2rem" }}>{result.label}</div>
        <div style={{ fontSize: "0.78rem", color: t.muted, marginTop: "0.6rem", lineHeight: 1.6 }}>{result.desc}</div>
      </Card>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.8rem" }}>スコア内訳</div>
        {factors.map(f => (
          <div key={f.label} style={{ marginBottom: "0.8rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
              <span style={{ fontSize: "0.75rem", color: t.sub }}>{f.label}</span>
              <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: f.color, fontWeight: 700 }}>{f.score}</span>
            </div>
            <div style={{ height: 4, background: t.faint, borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${f.score}%`, background: f.color, borderRadius: 2, transition: "width 0.4s", opacity: 0.8 }} />
            </div>
          </div>
        ))}
      </Card>
      <Card t={t}>
        <SliderInput label="年齢"                   value={age}        min={22}  max={50}   step={1}  unit="歳"  onChange={setAge}          color="#3b82f6" t={t} />
        <SliderInput label="現在の年収"             value={salary}     min={200} max={1500} step={50} unit="万円" onChange={setSalary}       color="#f97316" t={t} />
        <SliderInput label="現職への満足度"         value={satisfaction} min={0} max={100}  step={5}  unit="%"   onChange={setSatisfaction}  color="#ef4444" t={t} />
        <SliderInput label="スキルの市場価値（自己評価）" value={skills} min={0} max={100}  step={5}  unit="%"   onChange={setSkills}        color="#8b5cf6" t={t} />
        <SliderInput label="現職在籍年数"           value={yearsInJob} min={0}   max={20}   step={1}  unit="年"  onChange={setYearsInJob}   color="#10b981" t={t} />
      </Card>
    </div>
  );
}
