# Drawing Engine Design

## Overview
Canvas APIを使用したホワイトボード描画エンジンの設計仕様。パフォーマンス、使いやすさ、拡張性を重視した設計を目指します。

## Core Components

### 1. CanvasManager
キャンバスの基本機能を管理する中核コンポーネント。

```typescript
interface CanvasManager {
  // Canvas Setup
  initialize(container: HTMLElement): void;
  resize(width: number, height: number): void;
  clear(): void;
  
  // View Controls
  zoom(scale: number, center: Point): void;
  pan(offset: Point): void;
  resetView(): void;
  
  // State Management
  save(): void;
  restore(): void;
  
  // Utility
  screenToCanvas(point: Point): Point;
  canvasToScreen(point: Point): Point;
  
  // Event Handling
  addEventListener(type: CanvasEventType, handler: EventHandler): void;
  removeEventListener(type: CanvasEventType, handler: EventHandler): void;
}
```

### 2. LayerManager
複数レイヤーの管理と描画の最適化を行うコンポーネント。

```typescript
interface LayerManager {
  // Layer Management
  createLayer(id: string, options?: LayerOptions): Layer;
  deleteLayer(id: string): void;
  getLayer(id: string): Layer | null;
  
  // Layer Ordering
  moveLayerUp(id: string): void;
  moveLayerDown(id: string): void;
  setLayerIndex(id: string, index: number): void;
  
  // Visibility
  showLayer(id: string): void;
  hideLayer(id: string): void;
  
  // Rendering
  renderLayers(): void;
  renderLayer(id: string): void;
}

interface LayerOptions {
  name?: string;
  visible?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
}
```

### 3. RenderEngine
要素の実際の描画を担当するコンポーネント。

```typescript
interface RenderEngine {
  // Basic Shapes
  drawPath(points: Point[], style: PathStyle): void;
  drawShape(shape: Shape, style: ShapeStyle): void;
  drawText(text: Text, style: TextStyle): void;
  drawImage(image: ImageElement, style: ImageStyle): void;
  
  // Advanced Rendering
  applyFilter(filter: Filter): void;
  setCompositeOperation(operation: CompositeOperation): void;
  
  // Optimization
  enableCache(elementId: string): void;
  invalidateCache(elementId: string): void;
  
  // Debug
  showBounds(show: boolean): void;
}
```

### 4. InteractionManager
ユーザー入力の処理とインタラクションを管理。

```typescript
interface InteractionManager {
  // Mode Management
  setMode(mode: InteractionMode): void;
  getMode(): InteractionMode;
  
  // Selection
  select(elementIds: string[]): void;
  deselect(elementIds?: string[]): void;
  getSelection(): string[];
  
  // Transform
  startTransform(type: TransformType): void;
  updateTransform(delta: TransformDelta): void;
  endTransform(): void;
  
  // Drag & Drop
  enableDrag(options: DragOptions): void;
  disableDrag(): void;
}

type InteractionMode = 'select' | 'draw' | 'pan' | 'text' | 'shape';
type TransformType = 'move' | 'rotate' | 'scale' | 'skew';
```

### 5. HistoryManager
操作の履歴管理とUndo/Redo機能を提供。

```typescript
interface HistoryManager {
  // History Operations
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
  
  // State Management
  pushState(state: HistoryState): void;
  clear(): void;
  
  // Batch Operations
  startBatch(): void;
  endBatch(): void;
  
  // Events
  onStateChange(callback: StateChangeCallback): void;
}
```

## Implementation Details

### 1. Element Rendering Pipeline

```typescript
interface RenderPipeline {
  // Phase 1: Preparation
  prepareContext(ctx: CanvasRenderingContext2D): void;
  
  // Phase 2: Background
  renderBackground(): void;
  
  // Phase 3: Grid (if enabled)
  renderGrid(): void;
  
  // Phase 4: Content
  renderElements(elements: Element[]): void;
  
  // Phase 5: Overlay
  renderOverlay(): void;
  
  // Phase 6: UI Elements
  renderUI(): void;
}
```

### 2. Element Hit Testing

```typescript
interface HitTesting {
  // Point Testing
  hitTest(point: Point): Element | null;
  hitTestAll(point: Point): Element[];
  
  // Area Testing
  getElementsInRect(rect: Rect): Element[];
  getElementsInPolygon(points: Point[]): Element[];
  
  // Custom Testing
  testCustomShape(shape: Path2D): Element[];
}
```

### 3. Performance Optimizations

#### Spatial Partitioning
```typescript
interface QuadTree {
  insert(element: Element): void;
  remove(element: Element): void;
  query(bounds: Rect): Element[];
  clear(): void;
}
```

#### Render Caching
```typescript
interface RenderCache {
  // Cache Management
  cacheElement(element: Element): void;
  invalidateCache(element: Element): void;
  clearCache(): void;
  
  // Optimization
  shouldCache(element: Element): boolean;
  getCacheStats(): CacheStats;
}
```

## Event System

### 1. Canvas Events
```typescript
type CanvasEventType =
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'click'
  | 'dblclick'
  | 'wheel'
  | 'keydown'
  | 'keyup';

interface CanvasEvent {
  type: CanvasEventType;
  point: Point;
  target?: Element;
  originalEvent: Event;
}
```

### 2. Element Events
```typescript
type ElementEventType =
  | 'select'
  | 'deselect'
  | 'move'
  | 'transform'
  | 'style';

interface ElementEvent {
  type: ElementEventType;
  element: Element;
  changes?: Partial<Element>;
}
```

## State Management

### 1. Element State
```typescript
interface ElementState {
  id: string;
  type: ElementType;
  position: Point;
  rotation: number;
  scale: Point;
  style: Style;
  data: ElementData;
  isSelected: boolean;
  isLocked: boolean;
}
```

### 2. Canvas State
```typescript
interface CanvasState {
  zoom: number;
  pan: Point;
  selectedElements: string[];
  mode: InteractionMode;
  activeLayer: string;
}
```

## Error Handling

### 1. Error Types
```typescript
enum DrawingError {
  INVALID_ELEMENT = 'invalid_element',
  RENDER_FAILED = 'render_failed',
  TRANSFORM_FAILED = 'transform_failed',
  CACHE_FAILED = 'cache_failed',
}
```

### 2. Error Handling
```typescript
interface ErrorHandler {
  handleError(error: DrawingError, context: any): void;
  setErrorCallback(callback: ErrorCallback): void;
}
```

## Metrics & Performance

### 1. Performance Monitoring
```typescript
interface PerformanceMonitor {
  // Metrics
  getFPS(): number;
  getRenderTime(): number;
  getElementCount(): number;
  
  // Thresholds
  setFPSThreshold(fps: number): void;
  setRenderTimeThreshold(ms: number): void;
  
  // Callbacks
  onPerformanceDrop(callback: PerformanceCallback): void;
}
```

### 2. Optimization Strategies
```typescript
interface OptimizationStrategy {
  // Auto-optimization
  enableAutoOptimization(): void;
  disableAutoOptimization(): void;
  
  // Manual Optimization
  optimizeElement(element: Element): void;
  optimizeLayer(layer: Layer): void;
  
  // Suggestions
  getOptimizationSuggestions(): Suggestion[];
}
```

## Implementation Plan

### Phase 1: Core Foundation
1. CanvasManagerの基本実装
2. LayerManagerの実装
3. 基本的な描画機能の実装

### Phase 2: Interaction
1. InteractionManagerの実装
2. 選択機能の実装
3. 変形機能の実装

### Phase 3: Advanced Features
1. HistoryManagerの実装
2. キャッシュシステムの実装
3. パフォーマンス最適化

### Phase 4: Testing & Optimization
1. ユニットテストの作成
2. パフォーマンステスト
3. ブラウザ互換性テスト
