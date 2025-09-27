# Data Model Definition

## Overview
オンラインホワイトボードアプリケーションのデータモデルは、以下の主要エンティティで構成されます。

## Entities

### User
ユーザー情報を管理します。

```typescript
interface User {
  id: string;                // ユーザーの一意識別子
  email: string;            // メールアドレス
  name: string;             // 表示名
  avatar?: string;          // アバター画像URL
  createdAt: Date;         // アカウント作成日時
  updatedAt: Date;         // 最終更新日時
  settings: {              // ユーザー設定
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
  };
}
```

### Board
ホワイトボードの基本情報を管理します。

```typescript
interface Board {
  id: string;                // ボードの一意識別子
  name: string;             // ボード名
  description?: string;     // 説明
  ownerId: string;          // 作成者ID
  createdAt: Date;         // 作成日時
  updatedAt: Date;         // 最終更新日時
  settings: {              // ボード設定
    isPublic: boolean;     // 公開/非公開
    allowComments: boolean; // コメント許可
    gridSize: number;      // グリッドサイズ
    background: string;    // 背景設定
  };
  thumbnail?: string;      // サムネイルURL
  lastAccessedAt: Date;    // 最終アクセス日時
}
```

### Element
ボード上の描画要素を管理します。

```typescript
interface Element {
  id: string;                // 要素の一意識別子
  boardId: string;          // 所属ボードID
  type: ElementType;        // 要素タイプ
  createdAt: Date;         // 作成日時
  updatedAt: Date;         // 最終更新日時
  createdBy: string;       // 作成者ID
  updatedBy: string;       // 最終更新者ID
  position: {              // 位置情報
    x: number;
    y: number;
    z: number;            // 重なり順
  };
  style: {                 // スタイル情報
    strokeColor: string;
    fillColor?: string;
    strokeWidth: number;
    opacity: number;
  };
  data: ElementData;       // 要素固有のデータ
  isLocked: boolean;       // ロック状態
  isVisible: boolean;      // 表示/非表示
}

type ElementType = 'path' | 'shape' | 'text' | 'image' | 'connector';

type ElementData = PathData | ShapeData | TextData | ImageData | ConnectorData;

interface PathData {
  points: Point[];         // パスを構成する点群
  smoothing?: number;      // スムージング係数
}

interface ShapeData {
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'line';
  width: number;
  height: number;
  rotation: number;
}

interface TextData {
  content: string;
  fontSize: number;
  fontFamily: string;
  alignment: 'left' | 'center' | 'right';
  rotation: number;
}

interface ImageData {
  url: string;
  width: number;
  height: number;
  rotation: number;
  originalWidth: number;
  originalHeight: number;
}

interface ConnectorData {
  sourceId: string;        // 接続元要素ID
  targetId: string;        // 接続先要素ID
  controlPoints: Point[];  // 制御点
  startArrow?: string;    // 開始矢印スタイル
  endArrow?: string;      // 終了矢印スタイル
}

interface Point {
  x: number;
  y: number;
}
```

### Collaboration
共同編集情報を管理します。

```typescript
interface Collaboration {
  boardId: string;          // ボードID
  userId: string;          // ユーザーID
  role: CollaborationRole; // 権限
  joinedAt: Date;         // 参加日時
  lastActiveAt: Date;     // 最終アクティブ時間
  cursor?: {              // カーソル位置
    x: number;
    y: number;
    color: string;
  };
  selection?: string[];   // 選択中の要素ID
}

type CollaborationRole = 'owner' | 'editor' | 'viewer';
```

### Operation
編集操作の履歴を管理します。

```typescript
interface Operation {
  id: string;                // 操作の一意識別子
  boardId: string;          // ボードID
  userId: string;          // 実行ユーザーID
  type: OperationType;     // 操作タイプ
  targetIds: string[];     // 対象要素ID
  data: any;               // 操作データ
  timestamp: Date;         // 実行時刻
  version: number;         // 操作バージョン
}

type OperationType = 
  | 'create'
  | 'update'
  | 'delete'
  | 'move'
  | 'style'
  | 'group'
  | 'ungroup'
  | 'lock'
  | 'unlock';
```

## Relationships

### Board-User
- ボードは1人のオーナーを持つ（1:1）
- ボードは複数のコラボレーターを持つ（1:N）
- ユーザーは複数のボードを所有/参加できる（N:M）

### Board-Element
- ボードは複数の要素を持つ（1:N）
- 要素は必ず1つのボードに属する（N:1）

### Element-Element
- 要素は他の要素と接続できる（N:M）
- 要素はグループ化できる（Tree構造）

## Indexes

### User Indexes
- email (Unique)
- createdAt

### Board Indexes
- ownerId
- isPublic
- createdAt
- updatedAt
- lastAccessedAt

### Element Indexes
- boardId
- type
- createdAt
- updatedAt
- (boardId, z) // 重なり順の高速取得用

### Collaboration Indexes
- boardId
- userId
- (boardId, userId) Unique
- lastActiveAt

### Operation Indexes
- boardId
- timestamp
- version
- (boardId, version) // 操作順序の保証用

## Constraints

### User
- emailは一意
- nameは1文字以上50文字以下
- passwordは8文字以上

### Board
- nameは1文字以上100文字以下
- description は1000文字以下

### Element
- position.zは同一board内で一意
- style.opacityは0-1の範囲

### Collaboration
- (boardId, userId)の組み合わせは一意

## Validation Rules

### User
- emailは有効なメールアドレス形式
- passwordは英数字記号を含む

### Board
- thumbnailは有効なURL形式
- gridSizeは正の整数

### Element
- position.x, position.yは数値
- style.colorは有効なカラーコード
- ImageData.urlは有効なURL形式

## Cascading Behavior

### Board削除時
- 関連するElement を全て削除
- 関連するCollaboration を全て削除
- 関連するOperation を全て削除

### User削除時
- 所有するBoardの処理（アーカイブまたは削除）
- 関連するCollaboration を全て削除
