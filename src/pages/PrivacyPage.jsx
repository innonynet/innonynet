import { useNavigate } from "react-router-dom";

export default function PrivacyPage({ t }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <button onClick={() => navigate("/")}
        style={{ background: "none", border: "none", cursor: "pointer", color: t.muted, fontSize: "0.8rem", marginBottom: "1.5rem", padding: 0 }}>
        ← トップへ戻る
      </button>

      <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: t.text, marginBottom: "0.4rem" }}>プライバシーポリシー</h1>
      <p style={{ fontSize: "0.7rem", color: t.muted, marginBottom: "2rem" }}>最終更新: 2026年3月</p>

      {[
        {
          title: "サイトについて",
          body: "innonynet.com（以下「当サイト」）は、投資・エンジニア・生産性に関するミニツールを提供する個人運営のウェブサービスです。",
        },
        {
          title: "広告について",
          body: "当サイトはGoogle AdSenseを利用した広告を掲載しています。Googleはユーザーのブラウザに保存されるCookieを使用して、ユーザーの興味・関心に基づいた広告を表示することがあります。Cookieを無効にする方法や「広告のカスタマイズ」についてはGoogle広告設定ページをご参照ください。",
        },
        {
          title: "アクセス解析について",
          body: "当サイトはアクセス状況の把握のためにGoogle Analyticsを利用することがあります。データは匿名で収集されており、個人を特定するものではありません。",
        },
        {
          title: "Cookieについて",
          body: "当サイトでは一部機能においてCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることが可能ですが、一部機能が正常に動作しない場合があります。",
        },
        {
          title: "個人情報について",
          body: "当サイトは問い合わせフォーム等を通じて個人情報を収集することがあります。収集した個人情報は、お問い合わせへの返答以外の目的に使用しません。",
        },
        {
          title: "免責事項",
          body: "当サイトのツールが提供する計算結果・スコアは参考情報であり、投資判断・キャリア判断等の根拠として使用することは推奨しません。当サイトの情報を利用したことによる損害について、運営者は一切の責任を負いません。",
        },
        {
          title: "お問い合わせ",
          body: "当サイトに関するお問い合わせは X（旧Twitter）@innonynet までお願いします。",
        },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: "1.6rem" }}>
          <h2 style={{ fontSize: "0.85rem", fontWeight: 700, color: t.text, marginBottom: "0.4rem" }}>{title}</h2>
          <p style={{ fontSize: "0.78rem", color: t.muted, lineHeight: 1.8 }}>{body}</p>
        </div>
      ))}

      <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: "1rem", marginTop: "1rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.6rem", color: t.muted }}>innonynet.com</p>
      </div>
    </div>
  );
}
