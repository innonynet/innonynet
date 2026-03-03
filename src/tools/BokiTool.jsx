import { useState } from "react";
import Card from "../components/Card";

const QUESTIONS = [
  { q: "商品¥50,000を現金で仕入れた",                       debit: "仕入",    credit: "現金",   amount: 50000,   hint: "モノを買ったら「仕入」、払ったら「現金」が減る" },
  { q: "商品¥80,000を掛けで売り上げた",                     debit: "売掛金",  credit: "売上",   amount: 80000,   hint: "後払いで売ったら「売掛金」が増える" },
  { q: "売掛金¥80,000を現金で回収した",                     debit: "現金",    credit: "売掛金", amount: 80000,   hint: "お金が入ってきたら「現金」増、請求権が消えたら「売掛金」減" },
  { q: "給料¥300,000を現金で支払った",                      debit: "給料",    credit: "現金",   amount: 300000,  hint: "費用が発生したら借方に記録" },
  { q: "備品¥200,000を現金で購入した",                      debit: "備品",    credit: "現金",   amount: 200000,  hint: "資産が増えたら借方" },
  { q: "借入金¥500,000を現金で返済した",                    debit: "借入金",  credit: "現金",   amount: 500000,  hint: "負債が減ったら借方" },
  { q: "商品¥30,000を掛けで仕入れた",                       debit: "仕入",    credit: "買掛金", amount: 30000,   hint: "後払いで仕入れたら「買掛金」が増える" },
  { q: "買掛金¥30,000を現金で支払った",                     debit: "買掛金",  credit: "現金",   amount: 30000,   hint: "負債を払ったら借方に「買掛金」" },
  { q: "資本金¥1,000,000で会社を設立し現金を受け取った",    debit: "現金",    credit: "資本金", amount: 1000000, hint: "出資を受けたら「資本金」が増える（貸方）" },
  { q: "家賃¥100,000を現金で支払った",                      debit: "支払家賃", credit: "現金",  amount: 100000,  hint: "費用は借方。支払ったら現金が減る" },
  { q: "売上¥200,000が普通預金に振り込まれた",              debit: "普通預金", credit: "売上",  amount: 200000,  hint: "銀行に入ったら「普通預金」が増える" },
  { q: "水道光熱費¥15,000を現金で支払った",                 debit: "水道光熱費", credit: "現金", amount: 15000,  hint: "費用が発生したら借方に" },
];
const ACCOUNTS = ["現金", "普通預金", "売掛金", "買掛金", "仕入", "売上", "給料", "備品", "借入金", "支払家賃", "資本金", "水道光熱費"];

export default function BokiTool({ t }) {
  const [qIndex,    setQIndex]    = useState(0);
  const [debit,     setDebit]     = useState("");
  const [credit,    setCredit]    = useState("");
  const [checked,   setChecked]   = useState(false);
  const [score,     setScore]     = useState({ correct: 0, total: 0 });
  const [showHint,  setShowHint]  = useState(false);

  const q         = QUESTIONS[qIndex % QUESTIONS.length];
  const isCorrect = debit === q.debit && credit === q.credit;
  const check     = () => { if (!debit || !credit) return; setChecked(true); setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 })); };
  const next      = () => { setQIndex(i => i + 1); setDebit(""); setCredit(""); setChecked(false); setShowHint(false); };
  const accuracy  = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

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
