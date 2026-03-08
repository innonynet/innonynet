import { useState } from "react";
import Card from "../components/Card";

const QUESTIONS = [
  // E/I
  { dim: "EI", dir: "E", text: "初対面の人とでも気軽に話しかけられる" },
  { dim: "EI", dir: "I", text: "人と長時間一緒にいると疲れを感じる" },
  { dim: "EI", dir: "E", text: "グループ活動より一人で作業する方が好き", inv: true },
  { dim: "EI", dir: "E", text: "話すことでアイデアが整理されると感じる" },
  // S/N
  { dim: "SN", dir: "S", text: "具体的な事実やデータを重視する" },
  { dim: "SN", dir: "N", text: "可能性や将来のビジョンを考えるのが好き" },
  { dim: "SN", dir: "S", text: "新しいアイデアより実績ある方法を好む" },
  { dim: "SN", dir: "N", text: "物事の細部より全体像・パターンが気になる" },
  // T/F
  { dim: "TF", dir: "T", text: "決断は感情より論理・データを優先する" },
  { dim: "TF", dir: "F", text: "人への影響を考えると妥協しやすい" },
  { dim: "TF", dir: "T", text: "批判的なフィードバックを客観的に受け取れる" },
  { dim: "TF", dir: "F", text: "チームの雰囲気・調和を特に大切にする" },
  // J/P
  { dim: "JP", dir: "J", text: "計画を立てると安心して動ける" },
  { dim: "JP", dir: "P", text: "締め切りギリギリに追い込まれると集中できる" },
  { dim: "JP", dir: "J", text: "予定外の変更があると落ち着かない" },
  { dim: "JP", dir: "P", text: "複数の選択肢をできるだけ残しておきたい" },
];

const OPTIONS = [
  { label: "そう思う",    value: 2 },
  { label: "ややそう",    value: 1 },
  { label: "どちらでも", value: 0 },
  { label: "あまり",     value: -1 },
  { label: "違う",       value: -2 },
];

const TYPES = {
  INTJ: { name: "建築家", emoji: "🏛️", desc: "独立心旺盛な戦略家。長期ビジョンと緻密な計画で目標を達成する。" },
  INTP: { name: "論理学者", emoji: "🔬", desc: "知識への探究心が強い分析家。複雑な問題を解くのが生きがい。" },
  ENTJ: { name: "指揮官", emoji: "⚔️", desc: "生まれながらのリーダー。目標達成のため強い意志で人を率いる。" },
  ENTP: { name: "討論者", emoji: "💡", desc: "知的好奇心と機転で常に新しい視点を生み出すイノベーター。" },
  INFJ: { name: "提唱者", emoji: "🌿", desc: "深い洞察力と強い理想を持つ。人の可能性を信じ導く希少タイプ。" },
  INFP: { name: "仲介者", emoji: "🦋", desc: "内省的で共感力が高い理想主義者。価値観に従い誠実に生きる。" },
  ENFJ: { name: "主人公", emoji: "🌟", desc: "カリスマ的なリーダーで他者の成長を支援することに喜びを感じる。" },
  ENFP: { name: "運動家", emoji: "🎨", desc: "情熱的で創造的。人とのつながりとアイデアで世界をワクワクさせる。" },
  ISTJ: { name: "管理者", emoji: "📋", desc: "誠実で責任感が強い。伝統と事実を重んじ確実に仕事をこなす。" },
  ISFJ: { name: "擁護者", emoji: "🛡️", desc: "献身的で温かい。大切な人を守り安心できる環境を作ることに長ける。" },
  ESTJ: { name: "幹部", emoji: "🏢", desc: "秩序と効率を重視する実行者。ルールと責任感でチームを動かす。" },
  ESFJ: { name: "領事", emoji: "🤝", desc: "社交的で思いやりがある。周囲の調和を保ち人を喜ばせることが得意。" },
  ISTP: { name: "巨匠", emoji: "🔧", desc: "冷静な観察者で実践的問題解決が得意。道具と仕組みを使いこなす。" },
  ISFP: { name: "冒険家", emoji: "🎵", desc: "感受性が豊かで柔軟。今この瞬間の体験と美しさを大切にする。" },
  ESTP: { name: "起業家", emoji: "🚀", desc: "エネルギッシュで即断即決。リスクを楽しみながら現実を動かす。" },
  ESFP: { name: "エンターテイナー", emoji: "🎤", desc: "明るく自発的。人を楽しませ場を盛り上げる天性の持ち主。" },
};

function calcType(answers) {
  const scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  QUESTIONS.forEach((q, i) => {
    const v = answers[i] ?? 0;
    // positive dir scores push toward first letter of each pair
    scores[q.dim] += q.dir === q.dim[0] ? v : -v;
  });
  const e = scores.EI >= 0 ? "E" : "I";
  const s = scores.SN >= 0 ? "S" : "N";
  const t = scores.TF >= 0 ? "T" : "F";
  const j = scores.JP >= 0 ? "J" : "P";
  return { type: `${e}${s}${t}${j}`, scores };
}

function BarIndicator({ label, left, right, score, color, t }) {
  // score ranges roughly -8 to 8
  const pct = Math.round(((score + 8) / 16) * 100);
  const clamped = Math.max(5, Math.min(95, pct));
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: t.muted, marginBottom: "0.3rem" }}>
        <span>{left}</span><span>{right}</span>
      </div>
      <div style={{ position: "relative", height: 8, background: t.faint, borderRadius: 4 }}>
        <div style={{ position: "absolute", left: 0, width: `${clamped}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.4s" }} />
        <div style={{ position: "absolute", left: "50%", top: -2, width: 2, height: 12, background: t.border, borderRadius: 1 }} />
      </div>
      <div style={{ fontSize: "0.65rem", color: t.muted, textAlign: "center", marginTop: "0.2rem" }}>{label}</div>
    </div>
  );
}

export default function MbtiTool({ t }) {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;

  function answer(val) {
    const next = { ...answers, [current]: val };
    setAnswers(next);
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setCurrent(0);
    setDone(false);
  }

  if (done) {
    const { type, scores } = calcType(answers);
    const info = TYPES[type];
    return (
      <div>
        <Card t={t} style={{ marginBottom: "1rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.2rem" }}>{info.emoji}</div>
          <div style={{ fontSize: "0.6rem", color: t.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>あなたのMBTIタイプ</div>
          <div style={{ fontSize: "3.5rem", fontFamily: "monospace", fontWeight: 700, color: "#8b5cf6", lineHeight: 1.1 }}>{type}</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#8b5cf6", marginTop: "0.2rem" }}>{info.name}</div>
          <div style={{ fontSize: "0.78rem", color: t.muted, marginTop: "0.6rem", lineHeight: 1.6 }}>{info.desc}</div>
        </Card>
        <Card t={t} style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.65rem", color: t.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>傾向スコア</div>
          <BarIndicator label="エネルギーの向き"  left="外向 E" right="内向 I" score={-scores.EI} color="#f97316" t={t} />
          <BarIndicator label="情報の集め方"      left="現実 S" right="直感 N" score={-scores.SN} color="#3b82f6" t={t} />
          <BarIndicator label="意思決定"          left="論理 T" right="感情 F" score={-scores.TF} color="#ef4444" t={t} />
          <BarIndicator label="生活スタイル"      left="計画 J" right="柔軟 P" score={-scores.JP} color="#10b981" t={t} />
        </Card>
        <Card t={t} style={{ textAlign: "center" }}>
          <button onClick={reset} style={{ padding: "0.6rem 2rem", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
            もう一度診断する
          </button>
        </Card>
      </div>
    );
  }

  const q = QUESTIONS[current];
  const progress = Math.round((current / total) * 100);

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: t.muted, marginBottom: "0.4rem" }}>
          <span>質問 {current + 1} / {total}</span>
          <span>{progress}%</span>
        </div>
        <div style={{ height: 4, background: t.faint, borderRadius: 2, marginBottom: "1.4rem" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#8b5cf6", borderRadius: 2, transition: "width 0.3s" }} />
        </div>
        <div style={{ fontSize: "1.05rem", fontWeight: 600, color: t.text, lineHeight: 1.6, textAlign: "center", minHeight: "3rem", marginBottom: "1.6rem" }}>
          {q.text}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => answer(opt.value)} style={{
              padding: "0.65rem 1rem",
              background: t.faint,
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              color: t.text,
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
              textAlign: "center",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#8b5cf620"}
              onMouseLeave={e => e.currentTarget.style.background = t.faint}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>
      {current > 0 && (
        <Card t={t} style={{ textAlign: "center" }}>
          <button onClick={() => setCurrent(current - 1)} style={{ padding: "0.4rem 1.2rem", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 8, color: t.muted, cursor: "pointer", fontSize: "0.8rem" }}>
            ← 前の質問に戻る
          </button>
        </Card>
      )}
    </div>
  );
}
