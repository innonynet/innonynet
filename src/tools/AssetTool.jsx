import { useState } from "react";
import Card from "../components/Card";

const ASSETS = [
  { key: "us",   label: "米国株", color: "#3b82f6", ideal: 60 },
  { key: "jp",   label: "日本株", color: "#f59e0b", ideal: 10 },
  { key: "bond", label: "債券",   color: "#10b981", ideal: 15 },
  { key: "reit", label: "REIT",   color: "#f97daa", ideal: 5  },
  { key: "cash", label: "現金",   color: "#a78bfa", ideal: 10 },
];

const toXY = (pct) => {
  const a = pct * 2 * Math.PI - Math.PI / 2;
  return [50 + 42 * Math.cos(a), 50 + 42 * Math.sin(a)];
};

export default function AssetTool({ t }) {
  const [vals, setVals] = useState({ us: 70, jp: 10, bond: 10, reit: 5, cash: 5 });

  const total      = Object.values(vals).reduce((s, v) => s + v, 0);
  const score      = Math.max(0, 100 - ASSETS.reduce((s, a) => s + Math.abs(vals[a.key] - a.ideal) * 2, 0));
  const scoreColor = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  let cum = 0;
  const slices = ASSETS.map(a => {
    const p = vals[a.key] / Math.max(total, 1);
    const s = cum; cum += p;
    return { ...a, start: s, pct: p };
  });

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <svg viewBox="0 0 100 100" style={{ width: 100, flexShrink: 0 }}>
          {slices.map((s, i) => {
            if (s.pct <= 0) return null;
            if (s.pct >= 1) return <circle key={i} cx={50} cy={50} r={42} fill={s.color} />;
            const [x1, y1] = toXY(s.start);
            const [x2, y2] = toXY(s.start + s.pct);
            return <path key={i} d={`M50,50 L${x1},${y1} A42,42 0 ${s.pct > 0.5 ? 1 : 0},1 ${x2},${y2} Z`} fill={s.color} opacity={0.9} />;
          })}
          <circle cx={50} cy={50} r={26} fill={t.surface} />
        </svg>
        <div>
          <div style={{ fontSize: "0.6rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>分散スコア</div>
          <div style={{ fontSize: "2.4rem", fontFamily: "monospace", fontWeight: 700, color: scoreColor, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: "0.7rem", color: t.muted }}>合計 <span style={{ color: total === 100 ? "#10b981" : "#ef4444", fontFamily: "monospace" }}>{total}%</span></div>
        </div>
      </Card>
      <Card t={t}>
        {ASSETS.map(a => (
          <div key={a.key} style={{ marginBottom: "1.2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color }} />
                <span style={{ fontSize: "0.8rem", color: t.text }}>{a.label}</span>
                <span style={{ fontSize: "0.6rem", color: t.muted }}>理想{a.ideal}%</span>
              </div>
              <input type="number" min={0} max={100} value={vals[a.key]}
                onChange={e => setVals(v => ({ ...v, [a.key]: Math.min(100, Math.max(0, Number(e.target.value))) }))}
                style={{ width: 48, background: t.faint, border: `1px solid ${t.border}`, color: a.color, fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem", textAlign: "right", borderRadius: 4, padding: "2px 4px" }} />
            </div>
            <div style={{ position: "relative", height: 4, background: t.faint, borderRadius: 2 }}>
              <div style={{ position: "absolute", left: `${a.ideal}%`, top: -3, width: 2, height: 10, background: t.border, transform: "translateX(-50%)" }} />
              <div style={{ height: "100%", width: `${Math.min(vals[a.key], 100)}%`, background: a.color, borderRadius: 2, transition: "width 0.3s" }} />
              <input type="range" min={0} max={100} step={1} value={vals[a.key]}
                onChange={e => setVals(v => ({ ...v, [a.key]: Number(e.target.value) }))}
                style={{ position: "absolute", top: -8, left: 0, width: "100%", height: 20, opacity: 0, cursor: "pointer", margin: 0 }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
