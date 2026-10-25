# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code 向けのガイドです。

## プロジェクト概要

**task-board** — タスク管理ボードアプリケーション。

- タスクは localStorage（キー: `task-board.tasks`）に保存され、リロード後も保持される

## デプロイ先

https://akiwasunshine-cell.github.io/task-board/

- `main` へのプッシュで `.github/workflows/deploy.yml` が実行され、GitHub Pages に自動デプロイされる
- `vite.config.js` の `base` は `/task-board/`。リポジトリ名を変えた場合はここも合わせて変更する
- このため開発サーバーのURLも http://localhost:5173/task-board/ になる

## 技術スタック

| 用途 | 使用技術 |
| --- | --- |
| UI ライブラリ | React 18.3（関数コンポーネント + Hooks） |
| ビルドツール / 開発サーバー | Vite 5.4（`@vitejs/plugin-react`） |
| 言語 | JavaScript（JSX）。TypeScript は未導入 |
| スタイル | 素の CSS（`src/App.css`）。CSS フレームワークは未使用 |
| データ保存 | ブラウザの localStorage（バックエンドなし） |
| ホスティング | GitHub Pages（GitHub Actions でデプロイ、Node 22） |

- テストフレームワークと Linter / Formatter はまだ導入していない

### コマンド

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド（dist/ に出力）
```

### 構成

- `src/App.jsx` — タスクの追加・完了切り替え・削除を行うメインコンポーネント
- `src/App.css` — スタイル（完了済みタスクは `.task.done` でグレー表示）
- `src/main.jsx` — エントリーポイント（`App` を `#root` に描画）

## コンポーネントの命名規約

現在のコード（`src/App.jsx`）の書き方に合わせる。

- **コンポーネント名**: PascalCase（例: `App`、`TaskItem`、`AddTaskForm`）
- **ファイル名**: コンポーネント名と同じ PascalCase + `.jsx`（例: `TaskItem.jsx`）。1ファイル1コンポーネントとし、`export default` で公開する
- **定義の書き方**: `function App() { ... }` のように関数宣言で書く（アロー関数のコンポーネントにしない）
- **イベント処理の関数**: 「動詞 + 名詞」の camelCase（例: `addTask`、`toggleTask`、`deleteTask`）
- **イベントを受け取る props**: `on` + 動詞 + 名詞（例: `onToggleTask`、`onDeleteTask`）
- **ヘルパー関数**: camelCase（例: `loadTasks`）。コンポーネントの外に置く
- **定数**: UPPER_SNAKE_CASE（例: `STORAGE_KEY`）
- **state**: `[値, set値]` の組で命名する（例: `[tasks, setTasks]`、`[text, setText]`）
- **CSS クラス名**: kebab-case（例: `add-form`、`task-list`）。状態は修飾クラスで表す（例: `task done`）
- **コンポーネントの置き場所**: 新しく分割するコンポーネントは `src/components/` に置く

## Git 運用ルール

### 基本方針

- **コードを変更するたびに、コミットして GitHub にプッシュすること。**
  - 1つの変更（機能追加・バグ修正・リファクタリングなど）が完了したら、その都度 `git add` → `git commit` → `git push` まで行う。
  - 変更をローカルに溜め込まない。
- プッシュ前に、変更内容が動作すること（ビルド・テストが通ること）を確認する。
- プッシュに失敗した場合（認証エラー、リモートとの競合など）は、強制プッシュ（`--force`）で解決せず、原因をユーザーに報告する。

### コミット

- コミットは意味のある単位で小さく分ける。
- コミットメッセージは変更内容が分かるように簡潔に書く（日本語可）。
  - 例: `タスクの並び替え機能を追加`、`カード削除時のエラーを修正`
- 秘密情報（API キー、パスワード、`.env` ファイルなど）はコミットしない。必要に応じて `.gitignore` に追加する。

### ブランチ

- `main` ブランチを基本とする。
- 大きな変更や試験的な変更は作業ブランチ（例: `feature/xxx`、`fix/xxx`）を作成してプッシュする。

### 初期セットアップ（未実施の場合）

```bash
git init
git branch -M main
git remote add origin https://github.com/<ユーザー名>/task-board.git
git push -u origin main
```
