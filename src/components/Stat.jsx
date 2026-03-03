export default function Stat({ label, value, color, t }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "0.6rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: "1.3rem", fontFamily: "monospace", fontWeight: 700, color: color || t.text }}>{value}</div>
    </div>
  );
}
