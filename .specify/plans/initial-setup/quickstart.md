# Quick Start Guide

## Prerequisites
- Node.js 18.x以上
- npm 9.x以上
- Git
- VSCode（推奨）

## Environment Setup

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd onbo
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 環境変数の設定
`.env.local`ファイルをプロジェクトルートに作成:
```bash
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. 開発サーバーの起動
```bash
npm run dev
```
アプリケーションは http://localhost:3000 で利用可能になります。

## Development Tools

### 推奨VSCode拡張機能
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens

### コードスタイル
- ESLintとPrettierが設定済み
- コミット前に`npm run lint`を実行

## Testing

### ユニットテスト
```bash
npm run test
```

### E2Eテスト
```bash
npm run test:e2e
```

## Build & Deployment

### ビルド
```bash
npm run build
```

### 本番環境確認
```bash
npm run start
```

### v0プラットフォームへのデプロイ
```bash
npm run deploy
```

## 開発フロー

### 1. ブランチ戦略
- main: 本番環境
- develop: 開発環境
- feature/*: 機能開発
- fix/*: バグ修正

### 2. コミットメッセージ規約
```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: フォーマット
- refactor: リファクタリング
- test: テスト
- chore: その他

### 3. PRレビュー
- PRテンプレートに従う
- レビュー担当者を指定
- CI/CDチェックを確認

## Troubleshooting

### 一般的な問題

#### 1. 開発サーバーが起動しない
```bash
# node_modulesを削除して再インストール
rm -rf node_modules
npm install
```

#### 2. 型エラーが発生する
```bash
# 型定義を更新
npm run typecheck
```

#### 3. キャッシュの問題
```bash
# Next.jsのキャッシュをクリア
rm -rf .next
```

### デバッグ方法

#### 1. ログ出力
```typescript
// development環境でのみ出力
if (process.env.NODE_ENV === 'development') {
  console.log('Debug:', data);
}
```

#### 2. デバッグモード
VSCodeのデバッグ設定が`.vscode/launch.json`に用意されています。

#### 3. パフォーマンス計測
Chrome DevToolsのPerformanceタブを使用。

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [v0 Platform Documentation](https://v0.dev)
