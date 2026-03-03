import { useNavigate } from "react-router-dom";
import { TOOLS, TAGS, TAG_COLORS } from "../tools";

export default function HomePage({ t }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "0.4rem", color: t.text }}>
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
              <button key={tool.id} onClick={() => navigate(`/${tool.id}`)}
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
        <p style={{ fontSize: "0.7rem", color: t.muted, marginBottom: "0.5rem" }}>innonynet.com</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem" }}>
          <a href="https://x.com/innonynet" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "0.65rem", color: t.muted, textDecoration: "none" }}>𝕏 @innonynet</a>
          <a href="/privacy"
            style={{ fontSize: "0.65rem", color: t.muted, textDecoration: "none" }}>プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
