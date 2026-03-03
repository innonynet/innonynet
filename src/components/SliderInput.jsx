export default function SliderInput({ label, value, min, max, step, unit, onChange, color, t }) {
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
