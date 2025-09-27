# API Contracts

## REST API Endpoints

### Authentication

#### POST /api/auth/register
新規ユーザー登録
```typescript
Request:
{
  email: string;
  password: string;
  name: string;
}

Response:
{
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}
```

#### POST /api/auth/login
ログイン
```typescript
Request:
{
  email: string;
  password: string;
}

Response:
{
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}
```

### Boards

#### GET /api/boards
ボード一覧取得
```typescript
Response:
{
  boards: Array<{
    id: string;
    name: string;
    description?: string;
    thumbnail?: string;
    updatedAt: string;
    collaborators: number;
  }>;
}
```

#### POST /api/boards
新規ボード作成
```typescript
Request:
{
  name: string;
  description?: string;
  isPublic?: boolean;
}

Response:
{
  id: string;
  name: string;
  description?: string;
  settings: BoardSettings;
}
```

#### GET /api/boards/:id
ボード詳細取得
```typescript
Response:
{
  id: string;
  name: string;
  description?: string;
  settings: BoardSettings;
  elements: Element[];
  collaborators: Collaborator[];
}
```

#### PATCH /api/boards/:id
ボード更新
```typescript
Request:
{
  name?: string;
  description?: string;
  settings?: Partial<BoardSettings>;
}

Response:
{
  id: string;
  name: string;
  description?: string;
  settings: BoardSettings;
}
```

#### DELETE /api/boards/:id
ボード削除
```typescript
Response:
{
  success: boolean;
}
```

### Elements

#### POST /api/boards/:boardId/elements
要素作成
```typescript
Request:
{
  type: ElementType;
  position: Position;
  style: Style;
  data: ElementData;
}

Response:
{
  id: string;
  type: ElementType;
  position: Position;
  style: Style;
  data: ElementData;
}
```

#### PATCH /api/boards/:boardId/elements/:elementId
要素更新
```typescript
Request:
{
  position?: Position;
  style?: Partial<Style>;
  data?: Partial<ElementData>;
}

Response:
{
  id: string;
  type: ElementType;
  position: Position;
  style: Style;
  data: ElementData;
}
```

#### DELETE /api/boards/:boardId/elements/:elementId
要素削除
```typescript
Response:
{
  success: boolean;
}
```

### Collaboration

#### POST /api/boards/:boardId/collaborators
共同編集者追加
```typescript
Request:
{
  email: string;
  role: CollaborationRole;
}

Response:
{
  id: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  role: CollaborationRole;
}
```

#### PATCH /api/boards/:boardId/collaborators/:userId
共同編集者権限更新
```typescript
Request:
{
  role: CollaborationRole;
}

Response:
{
  success: boolean;
}
```

#### DELETE /api/boards/:boardId/collaborators/:userId
共同編集者削除
```typescript
Response:
{
  success: boolean;
}
```

## WebSocket Events

### Connection
```typescript
// Client -> Server
{
  type: 'board:join';
  boardId: string;
  userId: string;
}

// Server -> Client
{
  type: 'board:joined';
  boardId: string;
  elements: Element[];
  collaborators: Collaborator[];
}
```

### Cursor Updates
```typescript
// Client -> Server
{
  type: 'cursor:update';
  boardId: string;
  userId: string;
  position: {
    x: number;
    y: number;
  };
}

// Server -> Client
{
  type: 'cursor:updated';
  boardId: string;
  userId: string;
  position: {
    x: number;
    y: number;
  };
}
```

### Element Operations
```typescript
// Client -> Server
{
  type: 'element:create' | 'element:update' | 'element:delete';
  boardId: string;
  userId: string;
  elementId?: string;
  data?: {
    type?: ElementType;
    position?: Position;
    style?: Style;
    data?: ElementData;
  };
}

// Server -> Client
{
  type: 'element:created' | 'element:updated' | 'element:deleted';
  boardId: string;
  userId: string;
  elementId: string;
  data?: {
    type: ElementType;
    position: Position;
    style: Style;
    data: ElementData;
  };
}
```

### Selection
```typescript
// Client -> Server
{
  type: 'selection:update';
  boardId: string;
  userId: string;
  elementIds: string[];
}

// Server -> Client
{
  type: 'selection:updated';
  boardId: string;
  userId: string;
  elementIds: string[];
}
```

### Error Handling
```typescript
// Server -> Client
{
  type: 'error';
  code: string;
  message: string;
  details?: any;
}
```

## Error Codes

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

### Application Error Codes
```typescript
enum ErrorCode {
  // Auth Errors
  AUTH_INVALID_CREDENTIALS = 'auth/invalid-credentials',
  AUTH_EMAIL_EXISTS = 'auth/email-exists',
  AUTH_TOKEN_EXPIRED = 'auth/token-expired',
  
  // Board Errors
  BOARD_NOT_FOUND = 'board/not-found',
  BOARD_ACCESS_DENIED = 'board/access-denied',
  BOARD_NAME_REQUIRED = 'board/name-required',
  
  // Element Errors
  ELEMENT_NOT_FOUND = 'element/not-found',
  ELEMENT_INVALID_TYPE = 'element/invalid-type',
  ELEMENT_INVALID_DATA = 'element/invalid-data',
  
  // Collaboration Errors
  COLLAB_USER_NOT_FOUND = 'collab/user-not-found',
  COLLAB_INVALID_ROLE = 'collab/invalid-role',
  COLLAB_ALREADY_EXISTS = 'collab/already-exists',
  
  // WebSocket Errors
  WS_CONNECTION_FAILED = 'ws/connection-failed',
  WS_INVALID_MESSAGE = 'ws/invalid-message',
  WS_RATE_LIMIT = 'ws/rate-limit'
}
```

## Rate Limits

### REST API
- Authentication: 10 requests/minute
- Boards: 60 requests/minute
- Elements: 120 requests/minute
- Others: 30 requests/minute

### WebSocket
- Cursor updates: 10/second
- Element operations: 30/second
- Selection updates: 10/second

## Security

### Authentication
- JWTベースの認証
- トークン有効期限: 24時間
- リフレッシュトークン有効期限: 30日

### Authorization
- ボードオーナー: 全ての操作
- エディター: 要素の作成/編集/削除
- ビューアー: 閲覧のみ

### Data Validation
- すべてのリクエストに対してzodによるバリデーション
- ファイルアップロードの制限: 最大10MB
