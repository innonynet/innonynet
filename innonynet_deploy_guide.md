# innonynet.com — Azure SWA デプロイ手順

## 前提条件

- Node.js 18以上
- GitHubアカウント
- Azureアカウント（無料で作れる）
- カスタムドメイン `innonynet.com`（取得済み前提）

---

## STEP 1 — Viteプロジェクトを作る

```bash
npm create vite@latest innonynet -- --template react
cd innonynet
npm install
```

`src/App.jsx` の中身を `innonynet_full.jsx` の内容で丸ごと置き換える。

```bash
npm run dev   # http://localhost:5173 で動作確認
```

---

## STEP 2 — GitHubにpushする

```bash
git init
git add .
git commit -m "initial commit"
```

GitHub上で `innonynet` リポジトリを新規作成して：

```bash
git remote add origin https://github.com/YOUR_USERNAME/innonynet.git
git branch -M main
git push -u origin main
```

---

## STEP 3 — Azure Static Web Apps を作成する

1. [portal.azure.com](https://portal.azure.com) にログイン
2. 「リソースの作成」→「Static Web Apps」を検索
3. 以下の設定で作成：

| 項目 | 設定値 |
|------|--------|
| プラン | **Free** |
| リージョン | East Asia |
| デプロイソース | GitHub |
| リポジトリ | innonynet |
| ブランチ | main |
| ビルドプリセット | **React** |
| アプリの場所 | `/` |
| 出力先 | `dist` |

作成後、GitHubに `.github/workflows/azure-static-web-apps-xxx.yml` が自動追加される（CI/CDパイプライン）。

---

## STEP 4 — 自動デプロイを確認する

GitHub の Actions タブを開いてビルドが成功しているか確認。

成功すると `https://xxx.azurestaticapps.net` でアクセスできる。

---

## STEP 5 — カスタムドメインを設定する

### Azure側
1. SWAリソース →「カスタムドメイン」→「追加」
2. `innonynet.com` を入力
3. 表示される CNAME または TXT レコードをメモ

### ドメイン管理側（お名前.comなど）

```
タイプ: CNAME
ホスト名: www
値:    xxx.azurestaticapps.net

タイプ: A または ALIAS
ホスト名: @ (ルートドメイン)
値:    Azureが指定する値
```

反映まで最大48時間（たいてい数十分）。

---

## STEP 6 — 以降の更新フロー

```bash
git add .
git commit -m "add new tool"
git push
```

pushするだけで自動ビルド→デプロイ完了。

---

## 費用まとめ

| 項目 | 費用 |
|------|------|
| Azure SWA（Freeプラン） | ¥0 |
| SSL証明書 | ¥0（Azure SWAが自動発行） |
| 帯域（100GB/月まで） | ¥0 |
| カスタムドメイン（年額） | 約¥1,000〜1,500 |

ドメイン代だけ払えばOK。

---

## トラブルシューティング

**ビルドが失敗する**
→ GitHub ActionsのログでエラーConfirm。大抵はパスの設定ミス。

**カスタムドメインが反映されない**
→ DNS反映待ち。`dig innonynet.com` で確認できる。

**ページが真っ白になる**
→ `vite.config.js` に `base: '/'` があるか確認。
