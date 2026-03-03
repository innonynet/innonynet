import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { themes } from "./theme";
import HomePage from "./pages/HomePage";
import ToolPage from "./pages/ToolPage";

export default function App() {
  const [dark, setDark] = useState(true);
  const navigate        = useNavigate();
  const t               = themes[dark ? "dark" : "light"];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Hiragino Kaku Gothic ProN','Helvetica Neue',sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } button, select { font-family: inherit; }`}</style>

      <div style={{ borderBottom: `1px solid ${t.border}`, padding: "0.8rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: t.bg, zIndex: 100 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: t.text, letterSpacing: "-0.02em" }}>innonynet</span>
          <span style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.1em" }}>.com</span>
        </button>
        <button onClick={() => setDark(d => !d)}
          style={{ background: t.faint, border: `1px solid ${t.border}`, borderRadius: 20, padding: "0.3rem 0.8rem", cursor: "pointer", fontSize: "0.75rem", color: t.sub }}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <Routes>
        <Route path="/"        element={<HomePage t={t} />} />
        <Route path="/:toolId" element={<ToolPage t={t} />} />
      </Routes>
    </div>
  );
}
