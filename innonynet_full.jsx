import { useState, useEffect, useRef } from "react";

const themes = {
  dark: { bg: "#0c0c0c", surface: "#141414", border: "#222", text: "#e8e8e8", muted: "#555", faint: "#1e1e1e", accent: "#e8e8e8", sub: "#999" },
  light: { bg: "#f4f4f0", surface: "#ffffff", border: "#e0e0e0", text: "#111", muted: "#999", faint: "#f0f0ec", accent: "#111", sub: "#666" }
};

function Card({ children, t, style }) {
  return <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "1.4rem", ...style }}>{children}</div>;
}

function SliderInput({ label, value, min, max, step, unit, onChange, color, t }) {
  return (
    <div style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.72rem", color: t.muted, letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ fontSize: "1rem", fontFamily: "monospace", fontWeight: 700, color: color || t.text }}>{value.toLocaleString()}{unit}</span>
      </div>
      <div style={{ position: "relative", height: 4, background: t.faint, borderRadius: 2 }}>
        <div style={{ height: "100%", width: `${((value - min) / (max - min)) * 100}%`, background: color || t.accent, borderRadius: 2, transition: "width 0.15s" }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
          style={{ position: "absolute", top: -8, left: 0, width: "100%", height: 20, opacity: 0, cursor: "pointer", margin: 0 }} />
      </div>
    </div>
  );
}

function Stat({ label, value, color, t }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "0.6rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: "1.3rem", fontFamily: "monospace", fontWeight: 700, color: color || t.text }}>{value}</div>
    </div>
  );
}

// ── FIRE ──────────────────────────────────────────────
function FireTool({ t }) {
  const [current, setCurrent] = useState(2000);
  const [monthly, setMonthly] = useState(20);
  const [rate, setRate] = useState(7);
  const [target, setTarget] = useState(4500);
  const [age, setAge] = useState(32);

  function calcFIRE(c, m, r, tg) {
    let a = c; const mr = r / 100 / 12;
    for (let i = 1; i <= 600; i++) { a = a * (1 + mr) + m; if (a >= tg) return i; }
    return null;
  }
  const months = calcFIRE(current, monthly, rate, target);
  const years = months ? Math.floor(months / 12) : null;
  const fireAge = years ? age + years : null;
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
        <SliderInput label="現在の資産" value={current} min={100} max={10000} step={100} unit="万円" onChange={setCurrent} color="#f97316" t={t} />
        <SliderInput label="目標FIRE資産" value={target} min={1000} max={30000} step={500} unit="万円" onChange={setTarget} color="#f97316" t={t} />
        <SliderInput label="月々の積立" value={monthly} min={1} max={100} step={1} unit="万円" onChange={setMonthly} color="#f97316" t={t} />
        <SliderInput label="年利（想定）" value={rate} min={1} max={15} step={0.5} unit="%" onChange={setRate} color="#f97316" t={t} />
        <SliderInput label="現在の年齢" value={age} min={20} max={55} step={1} unit="歳" onChange={setAge} color="#f97316" t={t} />
      </Card>
    </div>
  );
}

// ── ASSET ─────────────────────────────────────────────
const ASSETS = [
  { key: "us", label: "米国株", color: "#3b82f6", ideal: 60 },
  { key: "jp", label: "日本株", color: "#f59e0b", ideal: 10 },
  { key: "bond", label: "債券", color: "#10b981", ideal: 15 },
  { key: "reit", label: "REIT", color: "#f97daa", ideal: 5 },
  { key: "cash", label: "現金", color: "#a78bfa", ideal: 10 },
];

function AssetTool({ t }) {
  const [vals, setVals] = useState({ us: 70, jp: 10, bond: 10, reit: 5, cash: 5 });
  const total = Object.values(vals).reduce((s, v) => s + v, 0);
  const score = Math.max(0, 100 - ASSETS.reduce((s, a) => s + Math.abs(vals[a.key] - a.ideal) * 2, 0));
  const scoreColor = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  const toXY = (pct) => { const a = pct * 2 * Math.PI - Math.PI / 2; return [50 + 42 * Math.cos(a), 50 + 42 * Math.sin(a)]; };
  let cum = 0;
  const slices = ASSETS.map(a => { const p = vals[a.key] / Math.max(total, 1); const s = cum; cum += p; return { ...a, start: s, pct: p }; });

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <svg viewBox="0 0 100 100" style={{ width: 100, flexShrink: 0 }}>
          {slices.map((s, i) => {
            if (s.pct <= 0) return null;
            if (s.pct >= 1) return <circle key={i} cx={50} cy={50} r={42} fill={s.color} />;
            const [x1, y1] = toXY(s.start); const [x2, y2] = toXY(s.start + s.pct);
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

// ── COMPOUND ───────────────────────────────────────────
function CompoundTool({ t }) {
  const [principal, setPrincipal] = useState(200);
  const [monthly, setMonthly] = useState(10);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const mr = rate / 100 / 12;
  const months = years * 12;
  const fv = principal * Math.pow(1 + mr, months) + monthly * ((Math.pow(1 + mr, months) - 1) / mr);
  const totalInput = principal + monthly * months;
  const gain = fv - totalInput;

  const bars = Array.from({ length: years }, (_, i) => {
    const m = (i + 1) * 12;
    const v = principal * Math.pow(1 + mr, m) + monthly * ((Math.pow(1 + mr, m) - 1) / mr);
    return { year: i + 1, fv: v, input: principal + monthly * m };
  });
  const maxFV = bars[bars.length - 1]?.fv || 1;

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Stat label="最終資産" value={`${Math.round(fv).toLocaleString()}万`} color="#10b981" t={t} />
          <Stat label="総投入額" value={`${Math.round(totalInput).toLocaleString()}万`} color={t.sub} t={t} />
          <Stat label="運用益" value={`+${Math.round(gain).toLocaleString()}万`} color="#10b981" t={t} />
        </div>
      </Card>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
          {bars.filter((_, i) => i % Math.ceil(years / 20) === 0 || i === years - 1).map((b, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 70 }}>
                <div style={{ width: "100%", background: "#10b981", opacity: 0.3, borderRadius: "2px 2px 0 0", height: `${(b.input / maxFV) * 100}%` }} />
                <div style={{ width: "100%", background: "#10b981", borderRadius: "2px 2px 0 0", height: `${((b.fv - b.input) / maxFV) * 100}%`, marginTop: -2 }} />
              </div>
              <div style={{ fontSize: "0.5rem", color: t.muted }}>{b.year}y</div>
            </div>
          ))}
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="初期投資" value={principal} min={0} max={5000} step={50} unit="万円" onChange={setPrincipal} color="#10b981" t={t} />
        <SliderInput label="月々の積立" value={monthly} min={0} max={100} step={1} unit="万円" onChange={setMonthly} color="#10b981" t={t} />
        <SliderInput label="年利（想定）" value={rate} min={1} max={15} step={0.5} unit="%" onChange={setRate} color="#10b981" t={t} />
        <SliderInput label="運用期間" value={years} min={1} max={40} step={1} unit="年" onChange={setYears} color="#10b981" t={t} />
      </Card>
    </div>
  );
}

// ── SALARY ─────────────────────────────────────────────
function SalaryTool({ t }) {
  const [annual, setAnnual] = useState(550);
  const [overtime, setOvertime] = useState(20);
  const [vacation, setVacation] = useState(10);

  const workDays = 365 - 104 - 15 - vacation;
  const workHours = workDays * 8 + overtime * 12;
  const hourly = Math.round((annual * 10000) / workHours);
  const nominalHourly = Math.round((annual * 10000) / (workDays * 8));
  const taxApprox = annual > 600 ? annual * 0.3 : annual * 0.25;
  const netHourly = Math.round(((annual - taxApprox) * 10000) / workHours);

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Stat label="額面時給" value={`¥${nominalHourly.toLocaleString()}`} color={t.sub} t={t} />
          <Stat label="実質時給" value={`¥${hourly.toLocaleString()}`} color="#8b5cf6" t={t} />
          <Stat label="手取り時給" value={`¥${netHourly.toLocaleString()}`} color="#8b5cf6" t={t} />
        </div>
      </Card>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.72rem", color: t.muted, marginBottom: "0.6rem" }}>月給換算</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div><div style={{ fontSize: "0.6rem", color: t.muted }}>額面</div><div style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>{Math.round(annual / 12 * 10) / 10}万円</div></div>
          <div><div style={{ fontSize: "0.6rem", color: t.muted }}>手取り（概算）</div><div style={{ fontFamily: "monospace", fontWeight: 700, color: "#8b5cf6" }}>{Math.round((annual - taxApprox) / 12 * 10) / 10}万円</div></div>
          <div><div style={{ fontSize: "0.6rem", color: t.muted }}>年間稼働時間</div><div style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>{workHours.toLocaleString()}h</div></div>
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="年収" value={annual} min={200} max={2000} step={10} unit="万円" onChange={setAnnual} color="#8b5cf6" t={t} />
        <SliderInput label="月平均残業時間" value={overtime} min={0} max={80} step={5} unit="h" onChange={setOvertime} color="#8b5cf6" t={t} />
        <SliderInput label="年間有給取得日数" value={vacation} min={0} max={20} step={1} unit="日" onChange={setVacation} color="#8b5cf6" t={t} />
      </Card>
    </div>
  );
}

// ── CLOUD ──────────────────────────────────────────────
function CloudTool({ t }) {
  const [vcpu, setVcpu] = useState(4);
  const [ram, setRam] = useState(16);
  const [storage, setStorage] = useState(100);
  const [hours, setHours] = useState(730);

  const providers = [
    { name: "AWS", color: "#f59e0b", base: vcpu * 0.048 + ram * 0.006, storage: storage * 0.023 },
    { name: "GCP", color: "#06b6d4", base: vcpu * 0.044 + ram * 0.006, storage: storage * 0.02 },
    { name: "Azure", color: "#3b82f6", base: vcpu * 0.05 + ram * 0.007, storage: storage * 0.0184 },
  ].map(p => ({ ...p, total: Math.round((p.base * hours + p.storage) * 150) }));
  const maxCost = Math.max(...providers.map(p => p.total));

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        {providers.map(p => (
          <div key={p.name} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "0.85rem", color: p.color, fontWeight: 600 }}>{p.name}</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>¥{p.total.toLocaleString()}<span style={{ fontSize: "0.65rem", color: t.muted }}>/月</span></span>
            </div>
            <div style={{ height: 6, background: t.faint, borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${(p.total / maxCost) * 100}%`, background: p.color, borderRadius: 3, transition: "width 0.4s" }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize: "0.6rem", color: t.muted, margin: "0.5rem 0 0" }}>※ 概算値・為替150円換算</p>
      </Card>
      <Card t={t}>
        <SliderInput label="vCPU" value={vcpu} min={1} max={32} step={1} unit="コア" onChange={setVcpu} color="#06b6d4" t={t} />
        <SliderInput label="メモリ" value={ram} min={1} max={128} step={1} unit="GB" onChange={setRam} color="#06b6d4" t={t} />
        <SliderInput label="ストレージ" value={storage} min={10} max={2000} step={10} unit="GB" onChange={setStorage} color="#06b6d4" t={t} />
        <SliderInput label="月間稼働時間" value={hours} min={1} max={730} step={10} unit="h" onChange={setHours} color="#06b6d4" t={t} />
      </Card>
    </div>
  );
}

// ── POMODORO ───────────────────────────────────────────
function PomodoroTool({ t }) {
  const [mode, setMode] = useState("work");
  const DURATIONS = { work: 25 * 60, break: 5 * 60, long: 15 * 60 };
  const [remaining, setRemaining] = useState(DURATIONS.work);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) { setRunning(false); clearInterval(intervalRef.current); if (mode === "work") setCount(c => c + 1); return 0; }
          return r - 1;
        });
      }, 1000);
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const switchMode = (m) => { setMode(m); setRemaining(DURATIONS[m]); setRunning(false); };
  const min = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec = String(remaining % 60).padStart(2, "0");
  const progress = 1 - remaining / DURATIONS[mode];
  const r = 70, circ = 2 * Math.PI * r;
  const modeColor = mode === "work" ? "#ef4444" : "#10b981";

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

// ── MEETING ────────────────────────────────────────────
function MeetingTool({ t }) {
  const [people, setPeople] = useState(5);
  const [hourly, setHourly] = useState(3000);
  const [duration, setDuration] = useState(60);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const costPerSec = (people * hourly) / 3600;
  const plannedCost = Math.round(people * hourly * (duration / 60));
  const liveCost = Math.round(elapsed * costPerSec);
  const progress = Math.min(elapsed / (duration * 60), 1);
  const overrun = elapsed > duration * 60;

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
          <button onClick={() => setRunning(r => !r)} style={{ padding: "0.5rem 1.5rem", borderRadius: 8, border: "none", background: "#f59e0b", color: "#000", fontWeight: 700, cursor: "pointer" }}>
            {running ? "停止" : "計測開始"}
          </button>
          <button onClick={() => { setRunning(false); setElapsed(0); }} style={{ padding: "0.5rem 1rem", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, cursor: "pointer" }}>
            リセット
          </button>
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="参加人数" value={people} min={1} max={30} step={1} unit="人" onChange={setPeople} color="#f59e0b" t={t} />
        <SliderInput label="平均時給" value={hourly} min={1000} max={10000} step={500} unit="円" onChange={setHourly} color="#f59e0b" t={t} />
        <SliderInput label="予定時間" value={duration} min={5} max={180} step={5} unit="分" onChange={setDuration} color="#f59e0b" t={t} />
      </Card>
    </div>
  );
}

// ── CERT SCORER ────────────────────────────────────────
const CERTS = [
  { id: "aws_sap", label: "AWS SAP", category: "クラウド", points: 95, rare: true },
  { id: "aws_saa", label: "AWS SAA", category: "クラウド", points: 65 },
  { id: "aws_clf", label: "AWS CLF", category: "クラウド", points: 25 },
  { id: "gcp_pca", label: "GCP PCA", category: "クラウド", points: 90, rare: true },
  { id: "gcp_ace", label: "GCP ACE", category: "クラウド", points: 60 },
  { id: "az305", label: "Azure Az-305", category: "クラウド", points: 85, rare: true },
  { id: "az104", label: "Azure Az-104", category: "クラウド", points: 60 },
  { id: "nw", label: "ネットワークスペシャリスト", category: "IPA", points: 85, rare: true },
  { id: "sc", label: "情報処理安全確保支援士", category: "IPA", points: 85, rare: true },
  { id: "ap", label: "応用情報技術者", category: "IPA", points: 55 },
  { id: "fe", label: "基本情報技術者", category: "IPA", points: 30 },
  { id: "k8s", label: "CKA / Kubernetes", category: "インフラ", points: 80, rare: true },
  { id: "lpic2", label: "LPIC-2 / LinuC", category: "インフラ", points: 50 },
  { id: "ccna", label: "CCNA", category: "ネットワーク", points: 55 },
  { id: "cissp", label: "CISSP", category: "セキュリティ", points: 90, rare: true },
  { id: "boki2", label: "簿記2級", category: "ビジネス", points: 40 },
  { id: "toeic800", label: "TOEIC 800+", category: "ビジネス", points: 45 },
  { id: "toeic900", label: "TOEIC 900+", category: "ビジネス", points: 65, rare: true },
];
const CATEGORIES = ["クラウド", "IPA", "インフラ", "ネットワーク", "セキュリティ", "ビジネス"];
const CAT_COLORS = { クラウド: "#f97316", IPA: "#3b82f6", インフラ: "#10b981", ネットワーク: "#06b6d4", セキュリティ: "#ef4444", ビジネス: "#8b5cf6" };

function CertScorer({ t }) {
  const [selected, setSelected] = useState(["aws_sap", "gcp_pca", "az305", "az104", "nw", "sc", "toeic800"]);
  const [activeCategory, setActiveCategory] = useState("クラウド");

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const totalPoints = selected.reduce((sum, id) => sum + (CERTS.find(c => c.id === id)?.points || 0), 0);
  const multiBonus = selected.length >= 5 ? 20 : selected.length >= 3 ? 10 : 0;
  const crossBonus = new Set(selected.map(id => CERTS.find(c => c.id === id)?.category)).size >= 3 ? 15 : 0;
  const score = Math.min(Math.round(totalPoints * 0.6 + multiBonus + crossBonus), 999);
  const rank = score >= 800 ? { label: "神話級", color: "#f59e0b", desc: "市場価値トップ1%。どこでも即採用レベル" }
    : score >= 600 ? { label: "エキスパート", color: "#f97316", desc: "転職市場で引く手あまた。年収UP余地大" }
    : score >= 400 ? { label: "シニア", color: "#3b82f6", desc: "十分な市場価値。あと1〜2資格で化ける" }
    : score >= 200 ? { label: "ミドル", color: "#10b981", desc: "基礎はある。専門資格の追加で差別化を" }
    : { label: "ジュニア", color: "#6b7280", desc: "まずはSAAかAPが近道" };

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "0.6rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>エンジニア市場価値スコア</div>
        <div style={{ fontSize: "4rem", fontFamily: "monospace", fontWeight: 700, color: rank.color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: rank.color, marginTop: "0.3rem" }}>{rank.label}</div>
        <div style={{ fontSize: "0.75rem", color: t.muted, marginTop: "0.3rem" }}>{rank.desc}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${t.border}` }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.6rem", color: t.muted }}>取得資格</div><div style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>{selected.length}個</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.6rem", color: t.muted }}>複数ボーナス</div><div style={{ fontFamily: "monospace", fontWeight: 700, color: "#10b981" }}>+{multiBonus}</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.6rem", color: t.muted }}>クロス領域</div><div style={{ fontFamily: "monospace", fontWeight: 700, color: "#10b981" }}>+{crossBonus}</div></div>
        </div>
      </Card>
      <Card t={t}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: "0.25rem 0.7rem", borderRadius: 20, border: `1px solid ${activeCategory === cat ? CAT_COLORS[cat] : t.border}`, background: activeCategory === cat ? CAT_COLORS[cat] + "20" : "transparent", color: activeCategory === cat ? CAT_COLORS[cat] : t.muted, fontSize: "0.7rem", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {CERTS.filter(c => c.category === activeCategory).map(cert => (
            <button key={cert.id} onClick={() => toggle(cert.id)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.7rem 0.9rem", borderRadius: 8, border: `1px solid ${selected.includes(cert.id) ? CAT_COLORS[cert.category] : t.border}`, background: selected.includes(cert.id) ? CAT_COLORS[cert.category] + "15" : t.faint, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${selected.includes(cert.id) ? CAT_COLORS[cert.category] : t.border}`, background: selected.includes(cert.id) ? CAT_COLORS[cert.category] : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#fff" }}>
                  {selected.includes(cert.id) && "✓"}
                </div>
                <span style={{ fontSize: "0.85rem", color: t.text }}>{cert.label}</span>
                {cert.rare && <span style={{ fontSize: "0.55rem", color: "#f59e0b", border: "1px solid #f59e0b", borderRadius: 3, padding: "0 3px" }}>希少</span>}
              </div>
              <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: CAT_COLORS[cert.category] }}>+{cert.points}pt</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── BOKI ───────────────────────────────────────────────
const QUESTIONS = [
  { q: "商品¥50,000を現金で仕入れた", debit: "仕入", credit: "現金", amount: 50000, hint: "モノを買ったら「仕入」、払ったら「現金」が減る" },
  { q: "商品¥80,000を掛けで売り上げた", debit: "売掛金", credit: "売上", amount: 80000, hint: "後払いで売ったら「売掛金」が増える" },
  { q: "売掛金¥80,000を現金で回収した", debit: "現金", credit: "売掛金", amount: 80000, hint: "お金が入ってきたら「現金」増、請求権が消えたら「売掛金」減" },
  { q: "給料¥300,000を現金で支払った", debit: "給料", credit: "現金", amount: 300000, hint: "費用が発生したら借方に記録" },
  { q: "備品¥200,000を現金で購入した", debit: "備品", credit: "現金", amount: 200000, hint: "資産が増えたら借方" },
  { q: "借入金¥500,000を現金で返済した", debit: "借入金", credit: "現金", amount: 500000, hint: "負債が減ったら借方" },
  { q: "商品¥30,000を掛けで仕入れた", debit: "仕入", credit: "買掛金", amount: 30000, hint: "後払いで仕入れたら「買掛金」が増える" },
  { q: "買掛金¥30,000を現金で支払った", debit: "買掛金", credit: "現金", amount: 30000, hint: "負債を払ったら借方に「買掛金」" },
  { q: "資本金¥1,000,000で会社を設立し現金を受け取った", debit: "現金", credit: "資本金", amount: 1000000, hint: "出資を受けたら「資本金」が増える（貸方）" },
  { q: "家賃¥100,000を現金で支払った", debit: "支払家賃", credit: "現金", amount: 100000, hint: "費用は借方。支払ったら現金が減る" },
  { q: "売上¥200,000が普通預金に振り込まれた", debit: "普通預金", credit: "売上", amount: 200000, hint: "銀行に入ったら「普通預金」が増える" },
  { q: "水道光熱費¥15,000を現金で支払った", debit: "水道光熱費", credit: "現金", amount: 15000, hint: "費用が発生したら借方に" },
];
const ACCOUNTS = ["現金", "普通預金", "売掛金", "買掛金", "仕入", "売上", "給料", "備品", "借入金", "支払家賃", "資本金", "水道光熱費"];

function BokiTool({ t }) {
  const [qIndex, setQIndex] = useState(0);
  const [debit, setDebit] = useState("");
  const [credit, setCredit] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const q = QUESTIONS[qIndex % QUESTIONS.length];
  const isCorrect = debit === q.debit && credit === q.credit;
  const check = () => { if (!debit || !credit) return; setChecked(true); setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 })); };
  const next = () => { setQIndex(i => i + 1); setDebit(""); setCredit(""); setChecked(false); setShowHint(false); };
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.6rem", color: t.muted }}>問題 {(qIndex % QUESTIONS.length) + 1}/{QUESTIONS.length}</span>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#7c3aed", fontSize: "1.1rem" }}>正答率 {accuracy}%</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.6rem", color: t.muted }}>正解/出題</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>{score.correct}/{score.total}</div>
          </div>
        </div>
        <div style={{ marginTop: "0.8rem", height: 3, background: t.faint, borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${accuracy}%`, background: "#7c3aed", borderRadius: 2, transition: "width 0.4s" }} />
        </div>
      </Card>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.8rem" }}>仕訳問題</div>
        <div style={{ fontSize: "1rem", color: t.text, fontWeight: 500, marginBottom: "1.2rem", lineHeight: 1.6 }}>{q.q}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.6rem", color: t.muted, marginBottom: "0.3rem", textAlign: "center" }}>借方</div>
            <select value={debit} onChange={e => setDebit(e.target.value)} disabled={checked}
              style={{ width: "100%", padding: "0.6rem", background: t.faint, border: `1px solid ${checked ? (debit === q.debit ? "#10b981" : "#ef4444") : t.border}`, borderRadius: 8, color: t.text, fontSize: "0.9rem", cursor: "pointer" }}>
              <option value="">選択...</option>
              {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ fontSize: "1.2rem", color: t.muted, paddingTop: "1.2rem" }}>/</div>
          <div>
            <div style={{ fontSize: "0.6rem", color: t.muted, marginBottom: "0.3rem", textAlign: "center" }}>貸方</div>
            <select value={credit} onChange={e => setCredit(e.target.value)} disabled={checked}
              style={{ width: "100%", padding: "0.6rem", background: t.faint, border: `1px solid ${checked ? (credit === q.credit ? "#10b981" : "#ef4444") : t.border}`, borderRadius: 8, color: t.text, fontSize: "0.9rem", cursor: "pointer" }}>
              <option value="">選択...</option>
              {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: "0.8rem", color: t.muted, marginBottom: "1rem" }}>
          金額: <span style={{ fontFamily: "monospace", color: t.text, fontWeight: 700 }}>¥{q.amount.toLocaleString()}</span>
        </div>
        {checked ? (
          <div>
            <div style={{ padding: "0.8rem", borderRadius: 8, background: isCorrect ? "#10b98120" : "#ef444420", border: `1px solid ${isCorrect ? "#10b981" : "#ef4444"}`, textAlign: "center", marginBottom: "0.8rem" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.2rem" }}>{isCorrect ? "✓ 正解！" : "✗ 不正解"}</div>
              {!isCorrect && <div style={{ fontSize: "0.8rem", color: t.muted }}>正解: <span style={{ color: "#10b981", fontWeight: 700 }}>{q.debit}</span> / <span style={{ color: "#10b981", fontWeight: 700 }}>{q.credit}</span></div>}
            </div>
            <div style={{ fontSize: "0.75rem", color: t.muted, marginBottom: "1rem", padding: "0.6rem", background: t.faint, borderRadius: 6 }}>💡 {q.hint}</div>
            <button onClick={next} style={{ width: "100%", padding: "0.7rem", borderRadius: 8, border: "none", background: "#7c3aed", color: "#fff", fontWeight: 700, cursor: "pointer" }}>次の問題 →</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={check} disabled={!debit || !credit}
              style={{ flex: 1, padding: "0.7rem", borderRadius: 8, border: "none", background: debit && credit ? "#7c3aed" : t.faint, color: debit && credit ? "#fff" : t.muted, fontWeight: 700, cursor: debit && credit ? "pointer" : "default" }}>
              答え合わせ
            </button>
            <button onClick={() => setShowHint(h => !h)}
              style={{ padding: "0.7rem 1rem", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, cursor: "pointer", fontSize: "0.8rem" }}>
              ヒント
            </button>
          </div>
        )}
        {showHint && !checked && (
          <div style={{ marginTop: "0.8rem", fontSize: "0.75rem", color: t.muted, padding: "0.6rem", background: t.faint, borderRadius: 6 }}>💡 {q.hint}</div>
        )}
      </Card>
      {score.total > 0 && (
        <button onClick={() => { setQIndex(0); setDebit(""); setCredit(""); setChecked(false); setShowHint(false); setScore({ correct: 0, total: 0 }); }}
          style={{ width: "100%", padding: "0.6rem", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, cursor: "pointer", fontSize: "0.8rem" }}>
          最初からやり直す
        </button>
      )}
    </div>
  );
}

// ── JOB CHANGE ─────────────────────────────────────────
function JobChangeTool({ t }) {
  const [age, setAge] = useState(32);
  const [salary, setSalary] = useState(550);
  const [satisfaction, setSatisfaction] = useState(40);
  const [skills, setSkills] = useState(70);
  const [yearsInJob, setYearsInJob] = useState(5);

  const ageScore = age <= 28 ? 100 : age <= 32 ? 85 : age <= 35 ? 65 : age <= 40 ? 40 : 20;
  const salaryScore = salary < 400 ? 90 : salary < 500 ? 70 : salary < 600 ? 50 : salary < 800 ? 30 : 15;
  const satisfactionScore = 100 - satisfaction;
  const tenureScore = yearsInJob >= 3 && yearsInJob <= 7 ? 90 : yearsInJob < 3 ? 40 : 70;
  const total = Math.round(ageScore * 0.25 + salaryScore * 0.2 + satisfactionScore * 0.25 + skills * 0.15 + tenureScore * 0.15);

  const result = total >= 80 ? { label: "今すぐ動け", color: "#ef4444", emoji: "🔥", desc: "タイミングは今。市場価値が高く、現職への満足度も低い。" }
    : total >= 60 ? { label: "積極的に検討", color: "#f97316", emoji: "⚡", desc: "エージェントに登録して市場感を掴むだけでも価値がある。" }
    : total >= 40 ? { label: "準備しつつ様子見", color: "#f59e0b", emoji: "🌱", desc: "スキルアップで価値を高めておく時期。" }
    : { label: "今は留まるが吉", color: "#10b981", emoji: "🏠", desc: "現職のメリットを活かしながらFIRE資産を積み上げる好機。" };

  const factors = [
    { label: "年齢（若さは武器）", score: ageScore, color: "#3b82f6" },
    { label: "年収の伸びしろ", score: salaryScore, color: "#f97316" },
    { label: "現職への不満度", score: satisfactionScore, color: "#ef4444" },
    { label: "スキル市場価値", score: skills, color: "#8b5cf6" },
    { label: "在籍年数の適切さ", score: tenureScore, color: "#10b981" },
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
        <SliderInput label="年齢" value={age} min={22} max={50} step={1} unit="歳" onChange={setAge} color="#3b82f6" t={t} />
        <SliderInput label="現在の年収" value={salary} min={200} max={1500} step={50} unit="万円" onChange={setSalary} color="#f97316" t={t} />
        <SliderInput label="現職への満足度" value={satisfaction} min={0} max={100} step={5} unit="%" onChange={setSatisfaction} color="#ef4444" t={t} />
        <SliderInput label="スキルの市場価値（自己評価）" value={skills} min={0} max={100} step={5} unit="%" onChange={setSkills} color="#8b5cf6" t={t} />
        <SliderInput label="現職在籍年数" value={yearsInJob} min={0} max={20} step={1} unit="年" onChange={setYearsInJob} color="#10b981" t={t} />
      </Card>
    </div>
  );
}

// ── TOOLS META ─────────────────────────────────────────
const TOOLS = [
  { id: "fire",     label: "FIRE Calculator",    ja: "FIREシミュレーター",    tag: "投資",      color: "#f97316", desc: "積立・利回りから財務的自由までの年数を計算",        component: FireTool },
  { id: "asset",    label: "Asset Allocator",    ja: "資産分散チェッカー",    tag: "投資",      color: "#3b82f6", desc: "ポートフォリオの分散度を可視化してスコア化",          component: AssetTool },
  { id: "compound", label: "Compound Calc",      ja: "複利計算機",            tag: "投資",      color: "#10b981", desc: "元本・利率・期間から将来の資産額をシミュレート",      component: CompoundTool },
  { id: "salary",   label: "Salary → Hourly",   ja: "年収・時給換算",        tag: "エンジニア", color: "#8b5cf6", desc: "残業・有給を考慮した実質時給を算出",                  component: SalaryTool },
  { id: "cloud",    label: "Cloud Cost",         ja: "クラウドコスト比較",    tag: "エンジニア", color: "#06b6d4", desc: "AWS / GCP / Azureの月額コストを概算比較",           component: CloudTool },
  { id: "cert",     label: "Cert Scorer",        ja: "技術資格スコアラー",    tag: "エンジニア", color: "#f59e0b", desc: "保有資格からエンジニアの市場価値スコアを算出",        component: CertScorer },
  { id: "pomodoro", label: "Pomodoro",           ja: "ポモドーロタイマー",    tag: "生産性",    color: "#ef4444", desc: "25分集中・5分休憩で作業効率アップ",                  component: PomodoroTool },
  { id: "meeting",  label: "Meeting Cost",       ja: "会議コスト計算機",      tag: "生産性",    color: "#f59e0b", desc: "参加人数と時給から会議の費用を可視化",                component: MeetingTool },
  { id: "boki",     label: "Boki Practice",      ja: "簿記練習ツール",        tag: "生産性",    color: "#7c3aed", desc: "簿記3級レベルの仕訳問題をランダム出題",              component: BokiTool },
  { id: "job",      label: "Job Change Score",   ja: "転職タイミング診断",    tag: "生産性",    color: "#ec4899", desc: "今転職すべきか？5つの指標でスコア化",                component: JobChangeTool },
];

const TAG_COLORS = { 投資: "#f97316", エンジニア: "#3b82f6", 生産性: "#10b981" };
const TAGS = ["投資", "エンジニア", "生産性"];

// ── APP ────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState(null);
  const t = themes[dark ? "dark" : "light"];
  const activeMeta = TOOLS.find(tool => tool.id === active);
  const ActiveComp = activeMeta?.component;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Hiragino Kaku Gothic ProN','Helvetica Neue',sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } button, select { font-family: inherit; }`}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${t.border}`, padding: "0.8rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: t.bg, zIndex: 100 }}>
        <button onClick={() => setActive(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {active && <span style={{ color: t.muted, fontSize: "0.8rem" }}>←</span>}
          <span style={{ fontWeight: 700, fontSize: "1rem", color: t.text, letterSpacing: "-0.02em" }}>innonynet</span>
          <span style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.1em" }}>.com</span>
        </button>
        <button onClick={() => setDark(d => !d)}
          style={{ background: t.faint, border: `1px solid ${t.border}`, borderRadius: 20, padding: "0.3rem 0.8rem", cursor: "pointer", fontSize: "0.75rem", color: t.sub }}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "1.5rem 1rem" }}>
        {!active ? (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "0.4rem" }}>
                シンプルな<br /><strong style={{ fontWeight: 700 }}>ツール集</strong>
              </h1>
              <p style={{ fontSize: "0.78rem", color: t.muted }}>投資・エンジニア・仕事に使えるミニツール — {TOOLS.length} tools</p>
            </div>

            {TAGS.map(tag => (
              <div key={tag} style={{ marginBottom: "1.8rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
                  <div style={{ width: 3, height: 14, background: TAG_COLORS[tag], borderRadius: 2 }} />
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: t.muted, textTransform: "uppercase" }}>{tag}</span>
                  <span style={{ fontSize: "0.6rem", color: t.muted }}>({TOOLS.filter(tl => tl.tag === tag).length})</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {TOOLS.filter(tl => tl.tag === tag).map(tool => (
                    <button key={tool.id} onClick={() => setActive(tool.id)}
                      style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "1rem 1.2rem", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = tool.color}
                      onMouseLeave={e => e.currentTarget.style.borderColor = t.border}>
                      <div>
                        <div style={{ fontSize: "0.58rem", color: tool.color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{tool.label}</div>
                        <div style={{ fontSize: "0.9rem", color: t.text, fontWeight: 500 }}>{tool.ja}</div>
                        <div style={{ fontSize: "0.7rem", color: t.muted, marginTop: "0.15rem" }}>{tool.desc}</div>
                      </div>
                      <span style={{ color: tool.color, fontSize: "1rem", marginLeft: "1rem", flexShrink: 0 }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ textAlign: "center", paddingTop: "1rem", borderTop: `1px solid ${t.border}` }}>
              <p style={{ fontSize: "0.6rem", color: t.muted }}>innonynet.com</p>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "0.58rem", color: activeMeta.color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{activeMeta.label}</div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{activeMeta.ja}</h2>
              <p style={{ fontSize: "0.73rem", color: t.muted, marginTop: "0.2rem" }}>{activeMeta.desc}</p>
            </div>
            <ActiveComp t={t} />
          </>
        )}
      </div>
    </div>
  );
}
