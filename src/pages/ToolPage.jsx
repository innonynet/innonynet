import { useParams, useNavigate } from "react-router-dom";
import { TOOLS } from "../tools";

export default function ToolPage({ t }) {
  const { toolId }  = useParams();
  const navigate    = useNavigate();
  const meta        = TOOLS.find(tool => tool.id === toolId);

  if (!meta) {
    return (
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "4rem 1rem", textAlign: "center" }}>
        <div style={{ fontSize: "0.85rem", color: t.muted }}>ツールが見つかりません</div>
        <button onClick={() => navigate("/")}
          style={{ marginTop: "1rem", padding: "0.5rem 1.2rem", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, cursor: "pointer" }}>
          ← トップへ戻る
        </button>
      </div>
    );
  }

  const Comp = meta.component;
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <div style={{ marginBottom: "1.2rem" }}>
        <div style={{ fontSize: "0.58rem", color: meta.color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{meta.label}</div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: t.text }}>{meta.ja}</h2>
        <p style={{ fontSize: "0.73rem", color: t.muted, marginTop: "0.2rem" }}>{meta.desc}</p>
      </div>
      <Comp t={t} />
    </div>
  );
}
