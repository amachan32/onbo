# Tasks: Initial Setup

**Input**: Implementation plan from `/specs/initial-setup/plan.md`
**Prerequisites**: plan.md ✅

## Phase 3.1: プロジェクトセットアップ
- [ ] T001 Next.jsプロジェクトの作成と基本設定
- [ ] T002 [P] TailwindCSSのインストールと設定
- [ ] T003 [P] shadcn/uiのセットアップとテーマ設定
- [ ] T004 [P] TypeScript設定とESLint/Prettierの構成
- [ ] T005 [P] Jestとテスト環境のセットアップ
- [ ] T006 [P] Playwrightのインストールと設定
- [ ] T007 [P] v0プラットフォーム用の環境変数設定

## Phase 3.2: テスト準備 (TDD)
- [ ] T008 [P] Board作成のコントラクトテスト `tests/contract/board.test.ts`
- [ ] T009 [P] Element操作のコントラクトテスト `tests/contract/element.test.ts`
- [ ] T010 [P] リアルタイム同期のコントラクトテスト `tests/contract/realtime.test.ts`
- [ ] T011 [P] ユーザー認証のコントラクトテスト `tests/contract/auth.test.ts`
- [ ] T012 [P] 統合テスト：ボード作成フロー `tests/integration/board-creation.test.ts`
- [ ] T013 [P] 統合テスト：共同編集フロー `tests/integration/collaboration.test.ts`
- [ ] T014 [P] E2Eテスト設定 `tests/e2e/basic-flow.test.ts`

## Phase 3.3: コア機能実装
- [ ] T015 [P] 型定義の作成 `src/types/index.ts`
- [ ] T016 [P] ベース コンポーネントのセットアップ `src/components/ui/`
- [ ] T017 アプリケーションレイアウトの作成 `src/app/layout.tsx`
- [ ] T018 [P] ホワイトボードモデルの実装 `src/lib/models/board.ts`
- [ ] T019 [P] 描画要素モデルの実装 `src/lib/models/element.ts`
- [ ] T020 状態管理ストアの実装 `src/lib/store/index.ts`
- [ ] T021 WebSocket接続管理の実装 `src/lib/utils/websocket.ts`
- [ ] T022 [P] カスタムフックの作成 `src/lib/hooks/use-board.ts`

## Phase 3.4: UIコンポーネント実装
- [ ] T023 [P] ツールバーコンポーネント `src/components/whiteboard/toolbar.tsx`
- [ ] T024 [P] キャンバスコンポーネント `src/components/whiteboard/canvas.tsx`
- [ ] T025 [P] 要素選択コンポーネント `src/components/whiteboard/element-selector.tsx`
- [ ] T026 [P] カラーピッカー `src/components/whiteboard/color-picker.tsx`
- [ ] T027 [P] 共同作業者表示 `src/components/whiteboard/collaborators.tsx`
- [ ] T028 メインページの実装 `src/app/page.tsx`
- [ ] T029 ボードページの実装 `src/app/board/[id]/page.tsx`

## Phase 3.5: バックエンド連携
- [ ] T030 [P] v0データベーススキーマの定義
- [ ] T031 [P] ボード操作APIの実装 `src/app/api/boards/route.ts`
- [ ] T032 [P] 要素操作APIの実装 `src/app/api/elements/route.ts`
- [ ] T033 [P] WebSocket接続ハンドラの実装
- [ ] T034 認証・認可の実装
- [ ] T035 エラーハンドリングの実装

## Phase 3.6: 最適化とドキュメント
- [ ] T036 [P] パフォーマンステスト `tests/performance/drawing.test.ts`
- [ ] T037 [P] アクセシビリティテスト
- [ ] T038 [P] READMEの作成
- [ ] T039 [P] APIドキュメントの作成
- [ ] T040 デプロイメント設定の作成

## Dependencies
- セットアップタスク (T001-T007) は並列実行可能だが、T001は他の依存関係の基礎
- テスト (T008-T014) は実装前に作成
- コア機能 (T015-T022) はテスト完了後に実装開始
- UIコンポーネント (T023-T029) はコア機能実装後に開始
- バックエンド連携 (T030-T035) はコア機能とUIの基本実装後に実施
- 最適化とドキュメント (T036-T040) は機能実装完了後に実施

## 並列実行例
```bash
# セットアップ並列タスク
npm init next-app onbo --typescript
# T002-T007を並列実行

# テスト作成の並列実行
# T008-T014を並列実行

# コンポーネント実装の並列実行
# T023-T027を並列実行
```

## Notes
- コミット前に必ずテストを実行
- コンポーネントはStorybook形式でドキュメント化
- アクセシビリティを常に考慮
- パフォーマンスメトリクスを継続的に監視

## タスク検証チェックリスト
- [x] 全てのコア機能がタスクとして含まれている
- [x] 依存関係が明確に定義されている
- [x] 並列実行可能なタスクが適切にマークされている
- [x] テストカバレッジが十分
- [x] パフォーマンス要件が考慮されている
- [x] ドキュメント作成が含まれている
