import { useState } from "react";
import Card from "../components/Card";

const CERTS = [
  { id: "aws_sap",  label: "AWS SAP",              category: "クラウド",     points: 95, rare: true },
  { id: "aws_saa",  label: "AWS SAA",              category: "クラウド",     points: 65 },
  { id: "aws_clf",  label: "AWS CLF",              category: "クラウド",     points: 25 },
  { id: "gcp_pca",  label: "GCP PCA",              category: "クラウド",     points: 90, rare: true },
  { id: "gcp_ace",  label: "GCP ACE",              category: "クラウド",     points: 60 },
  { id: "az305",    label: "Azure Az-305",         category: "クラウド",     points: 85, rare: true },
  { id: "az104",    label: "Azure Az-104",         category: "クラウド",     points: 60 },
  { id: "nw",       label: "ネットワークスペシャリスト", category: "IPA",    points: 85, rare: true },
  { id: "sc",       label: "情報処理安全確保支援士",     category: "IPA",    points: 85, rare: true },
  { id: "ap",       label: "応用情報技術者",            category: "IPA",    points: 55 },
  { id: "fe",       label: "基本情報技術者",            category: "IPA",    points: 30 },
  { id: "k8s",      label: "CKA / Kubernetes",    category: "インフラ",     points: 80, rare: true },
  { id: "lpic2",    label: "LPIC-2 / LinuC",      category: "インフラ",     points: 50 },
  { id: "ccna",     label: "CCNA",                category: "ネットワーク", points: 55 },
  { id: "cissp",    label: "CISSP",               category: "セキュリティ", points: 90, rare: true },
  { id: "boki2",    label: "簿記2級",              category: "ビジネス",     points: 40 },
  { id: "toeic800", label: "TOEIC 800+",          category: "ビジネス",     points: 45 },
  { id: "toeic900", label: "TOEIC 900+",          category: "ビジネス",     points: 65, rare: true },
];
const CATEGORIES = ["クラウド", "IPA", "インフラ", "ネットワーク", "セキュリティ", "ビジネス"];
const CAT_COLORS = { クラウド: "#f97316", IPA: "#3b82f6", インフラ: "#10b981", ネットワーク: "#06b6d4", セキュリティ: "#ef4444", ビジネス: "#8b5cf6" };

export default function CertScorer({ t }) {
  const [selected, setSelected]           = useState(["aws_sap", "gcp_pca", "az305", "az104", "nw", "sc", "toeic800"]);
  const [activeCategory, setActiveCategory] = useState("クラウド");

  const toggle      = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const totalPoints = selected.reduce((sum, id) => sum + (CERTS.find(c => c.id === id)?.points || 0), 0);
  const multiBonus  = selected.length >= 5 ? 20 : selected.length >= 3 ? 10 : 0;
  const crossBonus  = new Set(selected.map(id => CERTS.find(c => c.id === id)?.category)).size >= 3 ? 15 : 0;
  const score       = Math.min(Math.round(totalPoints * 0.6 + multiBonus + crossBonus), 999);
  const rank = score >= 800 ? { label: "神話級",       color: "#f59e0b", desc: "市場価値トップ1%。どこでも即採用レベル" }
    : score >= 600 ?           { label: "エキスパート", color: "#f97316", desc: "転職市場で引く手あまた。年収UP余地大" }
    : score >= 400 ?           { label: "シニア",       color: "#3b82f6", desc: "十分な市場価値。あと1〜2資格で化ける" }
    : score >= 200 ?           { label: "ミドル",       color: "#10b981", desc: "基礎はある。専門資格の追加で差別化を" }
    :                          { label: "ジュニア",     color: "#6b7280", desc: "まずはSAAかAPが近道" };

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
