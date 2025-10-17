# Visual Canvas/Whiteboard Feature Specification

## Document Overview

This document provides comprehensive specifications for the **Visual Canvas/Whiteboard** feature - a priority feature for the Points of You AI Studio platform. The canvas enables visual collaboration, card arrangement, hand-drawing, and element interconnection during training sessions.

**Status**: Priority Feature  
**Version**: 1.0  
**Last Updated**: October 2025  
**Owner**: Product & Engineering Teams

---

## Table of Contents

1. [Feature Overview](#feature-overview)
2. [Core Capabilities](#core-capabilities)
3. [Content Type Specifications](#content-type-specifications)
4. [Technical Architecture](#technical-architecture)
5. [User Experience](#user-experience)
6. [Integration Points](#integration-points)
7. [API Specifications](#api-specifications)
8. [Implementation Roadmap](#implementation-roadmap)
9. [Quality Standards](#quality-standards)
10. [Use Cases](#use-cases)
11. [Success Metrics](#success-metrics)

---

## Feature Overview

### Purpose

The Visual Canvas/Whiteboard is an interactive digital workspace that enables:
- **Visual Arrangement**: Place and organize cards, shapes, and elements freely
- **Hand Drawing**: Sketch, annotate, and illustrate with drawing tools
- **Element Interconnection**: Create visual connections showing relationships
- **Real-time Collaboration**: Multiple users editing simultaneously
- **Save, Share, Delete**: Full lifecycle management of canvas workspaces
- **Card Integration**: Seamless integration with all Points of You card types

### Priority Rationale

This feature is designated as **priority** because it:
1. **Enhances Core Methodology**: Supports the 4-step POY process (Pause, Expand, Focus, Doing)
2. **Enables Vision Boarding**: Critical for Click & Connect training template
3. **Facilitates Collaboration**: Real-time multi-user interaction during sessions
4. **Bridges Physical-Digital**: Digital equivalent of ClicKit physical canvas
5. **Drives Engagement**: Visual, interactive, and tactile learning experience
6. **Differentiates Platform**: Unique capability not found in competing platforms

### Target Users

- **Facilitators**: Create and guide visual exercises during sessions
- **Participants**: Individual and collaborative canvas work
- **Teams**: Real-time brainstorming and planning
- **Organizations**: Visual strategic planning and mapping
- **Coaches**: One-on-one visual coaching sessions

---

## Core Capabilities

### 1. Infinite Canvas Workspace

**Description**: Unlimited digital workspace with zoom and pan controls.

**Features**:
- Infinite canvas size (no boundaries)
- Smooth zoom (10% to 400%)
- Pan navigation (drag or arrow keys)
- Grid overlay options (none, dots, lines)
- Multiple background colors and patterns
- Viewport focus controls
- Minimap for navigation (optional)

**Technical Specifications**:
```typescript
interface CanvasWorkspace {
  canvas_id: string;
  canvas_name: string;
  canvas_size: 'infinite' | { width: number; height: number };
  viewport: {
    x: number;
    y: number;
    zoom: number; // 0.1 to 4.0
    rotation: number; // degrees
  };
  background: {
    type: 'blank' | 'grid' | 'dotted' | 'lined' | 'custom';
    color: string;
    pattern?: string;
  };
}
```

### 2. Element Library

**Card Elements**:
- Thematic cards (14 core cards)
- Question cards (inquiry prompts)
- Word cards (conceptual anchors)
- Drag from library to canvas
- Maintain card metadata and interactivity

**Visual Elements**:
- **Shapes**: Circle, rectangle, triangle, polygon, star, hexagon, custom
- **Text**: Text boxes, sticky notes, labels, headings
- **Icons**: Pre-designed icon library (100+ icons)
- **Images**: Upload or select from library
- **Frames**: Containers for grouping elements
- **Drawings**: Hand-drawn strokes and sketches

**Element Properties**:
- Position (x, y coordinates)
- Size (width, height)
- Rotation (0-360 degrees)
- Z-index (layering)
- Opacity (0-100%)
- Locking (prevent editing)
- Visibility (show/hide)

### 3. Drawing Tools

**Pen/Pencil**:
- Freeform drawing
- Brush sizes: 1-50px
- Pressure sensitivity (tablet support)
- Smoothing algorithms
- Multiple colors

**Highlighter**:
- Semi-transparent overlay
- Multiple colors
- Variable width (5-30px)
- Behind-element rendering

**Eraser**:
- Remove portions of drawings
- Variable eraser size
- Erase entire strokes or partial

**Shape Tools**:
- Quick geometric shapes
- Freehand to shape recognition
- Perfect circles and rectangles

**Color Palette**:
- Predefined color sets
- Custom color picker (RGB, HEX, HSL)
- Color history (last 10 colors)
- Opacity control (0-100%)

### 4. Interconnections

**Connection Types**:
- Straight lines
- Curved (bezier) lines
- Orthogonal (right-angle) lines
- Arrows (single, double, none)
- Custom paths

**Connection Properties**:
- Line styles: solid, dashed, dotted
- Line width: 1-10px
- Colors: any hex color
- Labels: text annotations on connections
- Anchor points: smart snapping to element edges

**Use Cases**:
- Show cause-and-effect relationships
- Map journey flows
- Connect related concepts
- Illustrate decision trees
- Document process flows

### 5. Real-time Collaboration

**Multi-user Features**:
- 50+ concurrent users per canvas
- Live cursor tracking
- User presence indicators
- Active user list with avatars
- Activity feed (recent changes)
- Conflict-free collaborative editing

**Collaboration Modes**:
- **Edit Mode**: Full editing capabilities
- **View Mode**: Read-only access
- **Comment Mode**: Add comments, no editing
- **Present Mode**: Facilitator-controlled walkthrough

**Synchronization**:
- Real-time WebSocket connection
- Operational Transformation (OT) or CRDT
- Sync latency < 100ms
- Automatic reconnection on disconnect
- Offline support with sync on reconnect

### 6. Save, Share, Delete

**Save Operations**:
- Auto-save every 30 seconds
- Manual save (Ctrl+S / Cmd+S)
- Save as new version
- Save as template
- Save confirmation notifications

**Share Capabilities**:
- Share with specific users
- Generate shareable link
- Permission levels: view/comment/edit/admin
- Link expiration options
- Copy/download controls
- Embed in other platforms

**Delete Operations**:
- Soft delete (move to trash)
- Trash retention: 30 days
- Permanent delete
- Delete confirmation prompts
- Bulk delete multiple canvases

### 7. Version Control

**Versioning Features**:
- Auto-version every 30 minutes
- Manual version checkpoints
- Version history (last 50 versions)
- Restore previous versions
- Compare versions side-by-side
- Version naming and descriptions

**Change Tracking**:
- Change log with timestamps
- User attribution for changes
- Undo/redo per user (50 steps)
- Global undo/redo (admin only)
- Change replay (optional)

### 8. Export and Download

**Export Formats**:
- **PNG**: High-resolution raster (300 DPI)
- **PDF**: Vector format, multi-page support
- **JSON**: Canvas data format for backup/import
- **SVG**: Scalable vector graphics (future)

**Export Options**:
- Include/exclude background
- Transparent background
- Custom dimensions
- Quality settings (low/medium/high)
- Current viewport or full canvas
- Selected elements only

---

## Content Type Specifications

### 1. Visual Canvas Core

**Type**: `visual_canvas`

**Purpose**: Main canvas workspace with all properties and settings.

**TypeScript Interface**:
```typescript
interface VisualCanvas {
  id: string;
  canvas_name: string;
  owner_id: string;
  session_id?: string;
  created_at: Date;
  last_modified: Date;
  canvas_size: CanvasDimensions;
  background: CanvasBackground;
  viewport: Viewport;
  elements: CanvasElement[];
  connections: CanvasConnection[];
  drawings: HandDrawing[];
  access_permissions: AccessPermission[];
  sharing_settings: SharingSettings;
  version_history: CanvasVersion[];
  tags: string[];
  is_template: boolean;
  is_deleted: boolean;
  deleted_at?: Date;
}

interface CanvasDimensions {
  width: number;
  height: number;
  units: 'px' | 'inches' | 'cm';
}

interface CanvasBackground {
  type: 'blank' | 'grid' | 'dotted' | 'lined' | 'custom';
  color: string;
  pattern?: BackgroundPattern;
  pattern_size?: number;
  pattern_color?: string;
}

interface Viewport {
  x: number;
  y: number;
  zoom: number;
  rotation: number;
}

interface AccessPermission {
  user_id: string;
  permission_level: 'view' | 'comment' | 'edit' | 'admin';
  granted_at: Date;
  granted_by: string;
  expires_at?: Date;
}

interface SharingSettings {
  is_public: boolean;
  allow_anonymous_view: boolean;
  shareable_link?: string;
  link_expiration?: Date;
  download_enabled: boolean;
  copy_enabled: boolean;
  require_authentication: boolean;
}

interface CanvasVersion {
  version_id: string;
  version_number: number;
  created_at: Date;
  created_by: string;
  changes_summary: string;
  snapshot_data: string; // JSON snapshot
  is_auto_save: boolean;
  version_name?: string;
  version_description?: string;
}
```

### 2. Canvas Element

**Type**: `canvas_element`

**Purpose**: Individual visual element on the canvas.

**TypeScript Interface**:
```typescript
interface CanvasElement {
  element_id: string;
  canvas_id: string;
  element_type: ElementType;
  position: Position;
  size: Size;
  rotation: number;
  z_index: number;
  opacity: number;
  content: ElementContent;
  styling: ElementStyle;
  locked: boolean;
  visible: boolean;
  created_by: string;
  created_at: Date;
  last_modified: Date;
  last_modified_by: string;
  interactions: ElementInteraction[];
  parent_frame_id?: string; // If contained in a frame
}

type ElementType = 
  | 'card' 
  | 'shape' 
  | 'text' 
  | 'icon' 
  | 'image' 
  | 'frame' 
  | 'sticky_note' 
  | 'drawing';

interface Position {
  x: number;
  y: number;
  anchor: 'top-left' | 'center' | 'bottom-right';
}

interface Size {
  width: number;
  height: number;
  maintain_aspect_ratio: boolean;
  min_width?: number;
  max_width?: number;
  min_height?: number;
  max_height?: number;
}

interface ElementContent {
  // Card elements
  card_reference_id?: string;
  card_type?: 'thematic' | 'question' | 'word';
  
  // Text elements
  text?: string;
  rich_text?: RichTextContent;
  
  // Image elements
  image_url?: string;
  image_alt_text?: string;
  
  // Icon elements
  icon_name?: string;
  icon_library?: string;
  
  // Shape elements
  shape_type?: 'circle' | 'rectangle' | 'triangle' | 'polygon' | 'star' | 'hexagon' | 'custom';
  shape_points?: Point[];
  
  // Drawing elements
  drawing_data?: DrawingData;
}

interface ElementStyle {
  fill_color?: string;
  stroke_color?: string;
  stroke_width?: number;
  border_radius?: number;
  shadow?: BoxShadow;
  font_family?: string;
  font_size?: number;
  font_weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  font_style?: 'normal' | 'italic' | 'oblique';
  text_align?: 'left' | 'center' | 'right' | 'justify';
  text_color?: string;
  text_decoration?: 'none' | 'underline' | 'line-through';
  padding?: number;
  background_image?: string;
}

interface BoxShadow {
  x_offset: number;
  y_offset: number;
  blur_radius: number;
  spread_radius: number;
  color: string;
}

interface ElementInteraction {
  interaction_type: 'click' | 'hover' | 'drag' | 'resize' | 'rotate';
  action: string;
  enabled: boolean;
  callback?: string;
}
```

### 3. Canvas Connection

**Type**: `canvas_connection`

**Purpose**: Visual connector between elements.

**TypeScript Interface**:
```typescript
interface CanvasConnection {
  connection_id: string;
  canvas_id: string;
  source_element_id: string;
  target_element_id: string;
  connection_type: ConnectionType;
  line_style: LineStyle;
  line_width: number;
  color: string;
  label?: ConnectionLabel;
  anchor_points: AnchorPoint[];
  z_index: number;
  animated: boolean;
  animation_speed?: number;
  created_by: string;
  created_at: Date;
}

type ConnectionType = 
  | 'line' 
  | 'arrow' 
  | 'double_arrow' 
  | 'curved' 
  | 'orthogonal' 
  | 'custom';

type LineStyle = 
  | 'solid' 
  | 'dashed' 
  | 'dotted' 
  | 'dash_dot';

interface ConnectionLabel {
  text: string;
  position: 'start' | 'middle' | 'end' | { x: number; y: number };
  background_color: string;
  text_color: string;
  font_size: number;
  font_family?: string;
  padding?: number;
  border_radius?: number;
}

interface AnchorPoint {
  element_id: string;
  anchor_position: AnchorPosition;
  offset_x: number;
  offset_y: number;
}

type AnchorPosition = 
  | 'top' 
  | 'top-left' 
  | 'top-right' 
  | 'right' 
  | 'bottom' 
  | 'bottom-left' 
  | 'bottom-right' 
  | 'left' 
  | 'center';

interface ConnectionRouting {
  algorithm: 'straight' | 'bezier' | 'orthogonal' | 'custom';
  control_points?: Point[];
  avoid_elements: boolean;
  snap_to_grid: boolean;
  grid_size?: number;
}
```

### 4. Drawing Tool & Hand Drawing

**Type**: `drawing_tool` and `hand_drawing`

**Purpose**: Hand-drawn strokes and annotations.

**TypeScript Interface**:
```typescript
interface DrawingTool {
  tool_id: string;
  tool_type: ToolType;
  brush_size: number;
  color: string;
  opacity: number;
  smoothing: number; // 0-1
  pressure_sensitivity: boolean;
  taper: boolean;
  fill: boolean;
}

type ToolType = 
  | 'pen' 
  | 'pencil' 
  | 'highlighter' 
  | 'eraser' 
  | 'shape_pen' 
  | 'marker';

interface HandDrawing {
  drawing_id: string;
  canvas_id: string;
  tool_used: DrawingTool;
  stroke_data: StrokePoint[];
  bounding_box: BoundingBox;
  is_closed_path: boolean;
  filled: boolean;
  created_by: string;
  created_at: Date;
  layer: number;
  simplified: boolean; // Whether stroke has been simplified
}

interface StrokePoint {
  x: number;
  y: number;
  pressure?: number; // 0-1 for pressure-sensitive devices
  tilt_x?: number; // Stylus tilt
  tilt_y?: number;
  timestamp: number; // Milliseconds since stroke start
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DrawingSession {
  session_id: string;
  canvas_id: string;
  user_id: string;
  active_tool: DrawingTool;
  current_stroke?: HandDrawing;
  completed_strokes: string[]; // drawing_ids
  undo_stack: string[];
  redo_stack: string[];
  stroke_count: number;
}
```

### 5. Canvas Template

**Type**: `canvas_template`

**Purpose**: Pre-configured canvas layouts for specific activities.

**TypeScript Interface**:
```typescript
interface CanvasTemplate {
  template_id: string;
  template_name: string;
  category: TemplateCategory;
  sub_category?: string;
  description: string;
  thumbnail: string;
  preview_images?: string[];
  preset_elements: CanvasElement[];
  preset_connections: CanvasConnection[];
  instructions: string;
  methodology_phase?: 'pause' | 'expand' | 'focus' | 'doing';
  recommended_for: string[];
  participant_range: { min: number; max: number };
  estimated_duration: number; // minutes
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  created_by: string;
  created_at: Date;
  is_official: boolean;
  is_public: boolean;
  usage_count: number;
  average_rating: number;
  rating_count: number;
}

type TemplateCategory = 
  | 'journey_mapping' 
  | 'decision_making' 
  | 'collaboration' 
  | 'reflection' 
  | 'vision' 
  | 'problem_solving' 
  | 'custom';

interface TemplateInstance {
  instance_id: string;
  template_id: string;
  canvas_id: string;
  customizations: TemplateCustomization[];
  created_from_template_at: Date;
  created_by: string;
}

interface TemplateCustomization {
  element_id: string;
  customization_type: 'added' | 'removed' | 'modified';
  original_value?: any;
  new_value: any;
  timestamp: Date;
}
```

### 6. Canvas Session Management

**Type**: `canvas_session`

**Purpose**: Real-time collaboration and session tracking.

**TypeScript Interface**:
```typescript
interface CanvasSession {
  session_id: string;
  canvas_id: string;
  active_users: ActiveUser[];
  collaboration_mode: CollaborationMode;
  real_time_sync: boolean;
  auto_save_interval: number; // seconds
  change_log: CanvasChange[];
  session_start: Date;
  session_end?: Date;
  recording_enabled: boolean;
  playback_data?: SessionPlayback;
  max_users?: number;
}

type CollaborationMode = 
  | 'edit' 
  | 'view' 
  | 'comment' 
  | 'present';

interface ActiveUser {
  user_id: string;
  user_name: string;
  avatar: string;
  cursor_position: { x: number; y: number };
  current_tool?: string;
  selected_elements: string[];
  last_activity: Date;
  connection_status: 'active' | 'idle' | 'disconnected';
  permission_level: 'view' | 'comment' | 'edit' | 'admin';
  viewport: Viewport;
}

interface CanvasChange {
  change_id: string;
  timestamp: Date;
  user_id: string;
  change_type: ChangeType;
  affected_element_id?: string;
  before_state?: any;
  after_state: any;
  is_undo: boolean;
  is_redo: boolean;
}

type ChangeType = 
  | 'create' 
  | 'update' 
  | 'delete' 
  | 'move' 
  | 'resize' 
  | 'rotate' 
  | 'style' 
  | 'connect' 
  | 'draw';

interface SessionPlayback {
  recording_start: Date;
  recording_end: Date;
  events: SessionEvent[];
  playback_speed: number;
  duration_seconds: number;
}

interface SessionEvent {
  timestamp: number;
  event_type: string;
  user_id: string;
  data: any;
}
```

### 7. Card Sharing on Canvas

**Type**: `card_sharing`

**Purpose**: Integration layer for placing and managing cards on canvas.

**TypeScript Interface**:
```typescript
interface CardOnCanvas {
  card_instance_id: string;
  canvas_id: string;
  original_card_id: string;
  card_type: 'thematic' | 'question' | 'word';
  position: Position;
  size: Size;
  rotation: number;
  z_index: number;
  annotations: Annotation[];
  reflections: CardReflection[];
  shared_by: string;
  shared_at: Date;
  visibility: 'private' | 'shared' | 'public';
  connections_to: string[];
  grouped_with: string[];
  tags: string[];
  interactions: CardInteraction[];
}

interface Annotation {
  annotation_id: string;
  text: string;
  author_id: string;
  author_name: string;
  created_at: Date;
  position: 'top' | 'right' | 'bottom' | 'left' | 'floating';
  style: AnnotationStyle;
}

interface AnnotationStyle {
  background_color: string;
  text_color: string;
  font_size: number;
  padding: number;
  border_radius: number;
  arrow: boolean;
}

interface CardReflection {
  reflection_id: string;
  participant_id: string;
  participant_name: string;
  reflection_text: string;
  created_at: Date;
  is_private: boolean;
  mood?: 'positive' | 'neutral' | 'negative';
}

interface CardInteraction {
  interaction_id: string;
  user_id: string;
  interaction_type: 'view' | 'click' | 'annotate' | 'reflect' | 'connect' | 'move' | 'resize';
  timestamp: Date;
  duration_ms?: number;
  context?: string;
}

interface CardCluster {
  cluster_id: string;
  canvas_id: string;
  cluster_name: string;
  card_instances: string[];
  cluster_theme: string;
  color: string;
  frame_style?: 'rectangle' | 'circle' | 'rounded' | 'none';
  created_by: string;
  created_at: Date;
}

interface CardSharingSession {
  session_id: string;
  canvas_id: string;
  sharing_mode: 'individual' | 'group' | 'facilitator_led';
  cards_shared: CardOnCanvas[];
  participation_stats: ParticipationStats;
  start_time: Date;
  end_time?: Date;
}

interface ParticipationStats {
  total_participants: number;
  cards_shared_count: number;
  annotations_count: number;
  reflections_count: number;
  connections_created: number;
  engagement_score: number;
}
```

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
├─────────────────────────────────────────────────────────────┤
│  React Canvas Component                                     │
│  ├── Canvas Rendering Engine (HTML5 Canvas / SVG)         │
│  ├── Drawing Library (Fabric.js / Konva.js)               │
│  ├── Drag & Drop System                                    │
│  ├── Zoom & Pan Controls                                   │
│  └── Real-time Sync Client                                 │
├─────────────────────────────────────────────────────────────┤
│                   WebSocket Layer                           │
│  Real-time Collaboration Server                            │
│  ├── Connection Management                                  │
│  ├── Message Broadcasting                                   │
│  ├── Conflict Resolution (OT / CRDT)                       │
│  └── Presence Tracking                                      │
├─────────────────────────────────────────────────────────────┤
│                    Backend Layer                            │
│  Canvas API Server                                          │
│  ├── Canvas CRUD Operations                                │
│  ├── Element Management                                     │
│  ├── Drawing Stroke Processing                             │
│  ├── Connection Management                                  │
│  ├── Version Control System                                 │
│  ├── Export Generation Service                             │
│  └── Permission & Access Control                           │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ├── PostgreSQL: Canvas metadata, elements, connections   │
│  ├── Redis: Real-time session state, cursor positions     │
│  ├── S3/Blob Storage: Drawing strokes, export files       │
│  └── Elasticsearch: Canvas search and discovery            │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend**:
- React 18+ with TypeScript
- Canvas Rendering: Fabric.js or Konva.js
- State Management: Redux Toolkit or Zustand
- Real-time: Socket.io client
- Drawing: Perfect Freehand library
- Export: html2canvas, jsPDF

**Backend**:
- Node.js with Express or Fastify
- WebSocket: Socket.io server
- Database: PostgreSQL 14+
- Cache: Redis 7+
- Storage: AWS S3 or Azure Blob Storage
- Queue: Bull or BullMQ for export jobs

**Infrastructure**:
- Kubernetes for orchestration
- NGINX for load balancing
- CloudFlare for CDN
- Monitoring: Datadog or New Relic

### Data Storage Strategy

**Canvas Metadata** (PostgreSQL):
```sql
CREATE TABLE canvases (
    id UUID PRIMARY KEY,
    canvas_name VARCHAR(255),
    owner_id UUID REFERENCES users(id),
    session_id UUID REFERENCES sessions(id),
    created_at TIMESTAMP,
    last_modified TIMESTAMP,
    canvas_size JSONB,
    background JSONB,
    viewport JSONB,
    sharing_settings JSONB,
    is_template BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

CREATE TABLE canvas_elements (
    element_id UUID PRIMARY KEY,
    canvas_id UUID REFERENCES canvases(id),
    element_type VARCHAR(50),
    position JSONB,
    size JSONB,
    rotation FLOAT,
    z_index INTEGER,
    opacity FLOAT,
    content JSONB,
    styling JSONB,
    locked BOOLEAN DEFAULT FALSE,
    visible BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP,
    last_modified TIMESTAMP
);

CREATE TABLE canvas_connections (
    connection_id UUID PRIMARY KEY,
    canvas_id UUID REFERENCES canvases(id),
    source_element_id UUID REFERENCES canvas_elements(element_id),
    target_element_id UUID REFERENCES canvas_elements(element_id),
    connection_type VARCHAR(50),
    line_style VARCHAR(50),
    line_width INTEGER,
    color VARCHAR(20),
    label JSONB,
    anchor_points JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP
);

CREATE TABLE canvas_versions (
    version_id UUID PRIMARY KEY,
    canvas_id UUID REFERENCES canvases(id),
    version_number INTEGER,
    created_at TIMESTAMP,
    created_by UUID REFERENCES users(id),
    changes_summary TEXT,
    snapshot_url VARCHAR(500), -- S3 URL
    is_auto_save BOOLEAN DEFAULT TRUE
);
```

**Drawing Strokes** (Blob Storage):
- Store as compressed JSON in S3
- File path: `drawings/{canvas_id}/{drawing_id}.json`
- Compression: gzip
- CDN caching for frequently accessed drawings

**Real-time State** (Redis):
```
canvas:{canvas_id}:users -> Set of active user IDs
canvas:{canvas_id}:cursor:{user_id} -> JSON of cursor position
canvas:{canvas_id}:lock:{element_id} -> User ID who locked element
canvas:{canvas_id}:changes -> Ordered set of recent changes
```

### Real-time Collaboration Architecture

**WebSocket Protocol**:

```typescript
// Client -> Server Messages
interface WSClientMessage {
  type: 'join' | 'leave' | 'update' | 'cursor' | 'lock' | 'unlock';
  canvas_id: string;
  user_id: string;
  payload: any;
  timestamp: number;
}

// Server -> Client Messages
interface WSServerMessage {
  type: 'user_joined' | 'user_left' | 'element_updated' | 'cursor_moved' | 'element_locked' | 'sync_state';
  canvas_id: string;
  user_id: string;
  payload: any;
  timestamp: number;
}
```

**Conflict Resolution**:
- Use Operational Transformation (OT) for text editing
- Last-write-wins for element position/size
- Optimistic UI updates with server reconciliation
- Conflict markers for simultaneous edits
- 5-second lock on elements being edited

**Performance Optimizations**:
- Throttle cursor position updates (60 FPS max)
- Batch element updates (max 100ms)
- Lazy load elements outside viewport
- Compress WebSocket messages
- Connection pooling and reuse

---

## User Experience

### User Flows

#### 1. Creating a New Canvas

```
User clicks "New Canvas" button
  ↓
Modal appears: Choose template or blank canvas
  ↓
User selects option
  ↓
Canvas editor opens
  ↓
Auto-save starts (30-second interval)
  ↓
User can add elements, draw, connect
  ↓
User names and saves canvas
```

#### 2. Collaborating on Canvas

```
User opens shared canvas link
  ↓
Canvas loads with all elements
  ↓
User joins collaboration session
  ↓
User avatar appears in active users list
  ↓
Real-time sync begins
  ↓
User sees others' cursors and edits
  ↓
User makes changes (synced immediately)
  ↓
User leaves (graceful disconnect)
```

#### 3. Sharing a Card on Canvas

```
User selects card from library
  ↓
User drags card onto canvas
  ↓
Card instance created at drop location
  ↓
User can resize, rotate, annotate card
  ↓
User clicks "Share" on card
  ↓
Card visibility changes to "shared"
  ↓
Other participants see the card
```

### UI Components

**Toolbar**:
- Selection tool
- Hand tool (pan)
- Zoom controls
- Drawing tools (pen, highlighter, eraser)
- Shape tools
- Text tool
- Comment tool
- Undo/redo buttons

**Left Sidebar**:
- Element library (cards, shapes, icons)
- Template browser
- Layers panel
- Version history

**Right Sidebar**:
- Properties panel (selected element)
- Comments panel
- Active users list
- Canvas settings

**Top Bar**:
- Canvas name (editable)
- Save status indicator
- Share button
- Export button
- Collaboration mode selector
- User avatar and menu

**Context Menus**:
- Right-click element: Edit, Duplicate, Delete, Lock, Layer order
- Right-click canvas: Paste, Select all, Grid options
- Right-click connection: Edit label, Change style, Delete

### Keyboard Shortcuts

**Navigation**:
- `Space + Drag`: Pan canvas
- `Ctrl/Cmd + +/-`: Zoom in/out
- `Ctrl/Cmd + 0`: Reset zoom to 100%
- `Ctrl/Cmd + 1`: Fit canvas to window

**Editing**:
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo
- `Ctrl/Cmd + C`: Copy selected elements
- `Ctrl/Cmd + V`: Paste
- `Ctrl/Cmd + D`: Duplicate
- `Delete/Backspace`: Delete selected elements
- `Ctrl/Cmd + A`: Select all
- `Ctrl/Cmd + G`: Group selected elements
- `Ctrl/Cmd + Shift + G`: Ungroup

**Tools**:
- `V`: Selection tool
- `H`: Hand tool (pan)
- `P`: Pen tool
- `T`: Text tool
- `R`: Rectangle tool
- `O`: Circle tool
- `L`: Line tool
- `Esc`: Cancel current action

**Saving**:
- `Ctrl/Cmd + S`: Save canvas
- `Ctrl/Cmd + Shift + S`: Save as new version
- `Ctrl/Cmd + E`: Export canvas

### Mobile Experience

**Touch Gestures**:
- Single tap: Select element
- Double tap: Edit element (text/card)
- Long press: Context menu
- Two-finger pinch: Zoom in/out
- Two-finger drag: Pan canvas
- Two-finger rotate: Rotate selected element

**Mobile Toolbar**:
- Simplified toolbar with essential tools
- Collapsible sidebars
- Bottom action sheet for properties
- Floating action button for add element

**Responsive Design**:
- Canvas scales to screen size
- Touch-friendly hit areas (44px minimum)
- Simplified UI for smaller screens
- Portrait and landscape modes

---

## Integration Points

### 1. Cards Integration

**Thematic Cards**:
- Drag from card library onto canvas
- Maintain card metadata (title, description, themes)
- Card interactivity preserved (click to view details)
- Visual representation matches card design
- Link to original card content

**Question Cards**:
- Place question cards to prompt reflection
- Participants can respond to questions on canvas
- Group questions by theme or topic
- Track question-response relationships

**Word Cards**:
- Use as conceptual anchors
- Create word clusters and mind maps
- Connect words to show relationships
- Visual hierarchy of concepts

**Implementation**:
```typescript
// Card library component passes card data
<CardLibrary onCardDrag={(card) => {
  const cardElement = createCardElement(card);
  addElementToCanvas(cardElement);
}} />

// Card element on canvas
interface CardElement extends CanvasElement {
  content: {
    card_reference_id: string;
    card_type: 'thematic' | 'question' | 'word';
    card_data: {
      title: string;
      description: string;
      image_url: string;
      themes: string[];
      // ... other card properties
    };
  };
}
```

### 2. ClicKit Toolkit Integration

**Physical-Digital Bridge**:
- Digital canvas mirrors physical ClicKit canvas
- Export digital canvas as printable template
- Scan physical canvas to digitize
- Sync between physical and digital workflows

**QR Code Integration**:
- Generate QR code for canvas
- Scan QR to open canvas on mobile
- Link canvas to ClicKit feedback system
- Track canvas usage in certification

**Implementation**:
```typescript
interface ClicKitCanvas {
  clickit_id: string;
  canvas_id: string;
  physical_canvas_completed: boolean;
  scan_timestamp?: Date;
  digitization_method: 'qr_scan' | 'manual' | 'auto';
}
```

### 3. Session Integration

**Session Canvas**:
- Canvas as part of session protocol
- Facilitator controls canvas access
- Real-time participant collaboration
- Session-scoped canvases (auto-delete after session)

**Session Analytics**:
- Track canvas usage during sessions
- Monitor participant engagement
- Measure collaboration patterns
- Identify popular canvas activities

**Implementation**:
```typescript
interface SessionCanvas extends VisualCanvas {
  session_id: string;
  session_start: Date;
  session_end?: Date;
  auto_delete: boolean;
  retention_days: number;
  participant_canvases: {
    user_id: string;
    canvas_id: string;
    created_at: Date;
  }[];
}
```

### 4. Journey Elements Integration

**Canvas as Journey Element**:
- Add canvas to journey phases
- Template canvases for specific activities
- Canvas work tracked in journey progress
- Export canvas results for journey documentation

**Journey Canvas Templates**:
- Pause: Reflection canvas
- Expand: Brainstorming canvas
- Focus: Decision-making canvas
- Doing: Action planning canvas

**Implementation**:
```typescript
interface JourneyElement {
  element_type: 'canvas' | 'card' | 'prompt' | ...;
  canvas_template_id?: string;
  canvas_instructions: string;
  required_duration: number;
  completion_criteria: {
    min_elements: number;
    min_connections: number;
    required_card_types: string[];
  };
}
```

### 5. Training Templates Integration

**Click & Connect**:
- Vision board canvas in Round 3
- Pre-configured canvas template
- Participant creates personal vision
- Share and discuss vision boards

**Team Fusion**:
- Team mapping canvas
- Strength identification layout
- Role visualization framework

**Culture Compass**:
- Organizational culture mapping
- Values alignment canvas
- Strategic planning layout

**Implementation**:
```typescript
interface TrainingTemplateCanvas {
  template_id: string;
  canvas_template_id: string;
  phase: string; // e.g., "Round 3 - Vision Board"
  instructions: string;
  suggested_duration: number;
  example_canvas_id?: string; // Sample canvas for reference
}
```

### 6. Building Blocks Integration

**Focus & Action Phase**:
- Action planning canvas
- Goal setting layout
- Priority matrix canvas
- Timeline visualization

**Pause Phase**:
- Reflection canvas
- Mindmap for thoughts
- Gratitude board

**Implementation**:
- Canvas templates mapped to building blocks
- Auto-suggest canvas when building block selected
- Canvas usage tracked per building block

### 7. AI Analytics Integration

**Pattern Recognition**:
- Analyze card arrangements
- Identify clustering patterns
- Detect common relationships
- Suggest improvements

**Insights Generation**:
- Most used elements
- Common canvas layouts
- Collaboration effectiveness
- Engagement metrics

**Implementation**:
```typescript
interface CanvasAnalytics {
  canvas_id: string;
  element_count: number;
  connection_count: number;
  drawing_count: number;
  collaboration_score: number;
  layout_patterns: string[];
  card_clusters: CardCluster[];
  suggested_improvements: string[];
  ai_insights: string[];
}
```

---

## API Specifications

### REST API Endpoints

#### Canvas CRUD

```
POST   /api/v1/canvases
GET    /api/v1/canvases/:id
PUT    /api/v1/canvases/:id
DELETE /api/v1/canvases/:id
GET    /api/v1/canvases (list with filters)
POST   /api/v1/canvases/:id/duplicate
POST   /api/v1/canvases/:id/export
```

#### Elements

```
POST   /api/v1/canvases/:canvas_id/elements
GET    /api/v1/canvases/:canvas_id/elements
PUT    /api/v1/canvases/:canvas_id/elements/:element_id
DELETE /api/v1/canvases/:canvas_id/elements/:element_id
POST   /api/v1/canvases/:canvas_id/elements/bulk (batch operations)
```

#### Connections

```
POST   /api/v1/canvases/:canvas_id/connections
GET    /api/v1/canvases/:canvas_id/connections
PUT    /api/v1/canvases/:canvas_id/connections/:connection_id
DELETE /api/v1/canvases/:canvas_id/connections/:connection_id
```

#### Drawings

```
POST   /api/v1/canvases/:canvas_id/drawings
GET    /api/v1/canvases/:canvas_id/drawings/:drawing_id
DELETE /api/v1/canvases/:canvas_id/drawings/:drawing_id
POST   /api/v1/canvases/:canvas_id/drawings/bulk
```

#### Templates

```
GET    /api/v1/canvas-templates
GET    /api/v1/canvas-templates/:template_id
POST   /api/v1/canvases/from-template/:template_id
POST   /api/v1/canvas-templates (create custom template)
```

#### Sharing & Permissions

```
POST   /api/v1/canvases/:canvas_id/share
GET    /api/v1/canvases/:canvas_id/permissions
PUT    /api/v1/canvases/:canvas_id/permissions/:user_id
DELETE /api/v1/canvases/:canvas_id/permissions/:user_id
POST   /api/v1/canvases/:canvas_id/share-link
```

#### Versions

```
GET    /api/v1/canvases/:canvas_id/versions
GET    /api/v1/canvases/:canvas_id/versions/:version_id
POST   /api/v1/canvases/:canvas_id/versions (create checkpoint)
POST   /api/v1/canvases/:canvas_id/restore/:version_id
```

#### Export

```
POST   /api/v1/canvases/:canvas_id/export/png
POST   /api/v1/canvases/:canvas_id/export/pdf
POST   /api/v1/canvases/:canvas_id/export/json
GET    /api/v1/exports/:export_id/status
GET    /api/v1/exports/:export_id/download
```

### WebSocket Events

#### Client → Server

```typescript
// Join canvas collaboration
{
  event: 'canvas:join',
  data: {
    canvas_id: string;
    user_id: string;
  }
}

// Update element
{
  event: 'element:update',
  data: {
    canvas_id: string;
    element_id: string;
    changes: Partial<CanvasElement>;
  }
}

// Cursor move
{
  event: 'cursor:move',
  data: {
    canvas_id: string;
    user_id: string;
    position: { x: number; y: number };
  }
}

// Lock element
{
  event: 'element:lock',
  data: {
    canvas_id: string;
    element_id: string;
    user_id: string;
  }
}

// Add drawing stroke
{
  event: 'drawing:stroke',
  data: {
    canvas_id: string;
    drawing: HandDrawing;
  }
}
```

#### Server → Client

```typescript
// User joined
{
  event: 'user:joined',
  data: {
    canvas_id: string;
    user: ActiveUser;
  }
}

// Element updated
{
  event: 'element:updated',
  data: {
    canvas_id: string;
    element: CanvasElement;
    updated_by: string;
  }
}

// Cursor moved
{
  event: 'cursor:moved',
  data: {
    canvas_id: string;
    user_id: string;
    position: { x: number; y: number };
  }
}

// Sync full state (on join)
{
  event: 'canvas:sync',
  data: {
    canvas: VisualCanvas;
    active_users: ActiveUser[];
  }
}
```

### API Response Formats

**Success Response**:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful",
  "timestamp": "2025-10-16T12:00:00Z"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "CANVAS_NOT_FOUND",
    "message": "Canvas not found",
    "details": "Canvas with ID xyz does not exist"
  },
  "timestamp": "2025-10-16T12:00:00Z"
}
```

---

## Zoom Integration Strategy (Phase 1)

### Parallel Operation Approach

**Architecture Overview**:
- Canvas shared through Zoom's screen sharing feature
- Facilitator shares canvas workspace via Zoom
- Participants view canvas through Zoom video feed
- Participant web interface for individual canvas access (when shared)

**Presentation Mode**:
```typescript
interface CanvasPresentationMode {
  // Optimized for Zoom screen sharing
  presentation_settings: {
    hide_sidebars: boolean;
    hide_toolbar: boolean;
    fullscreen_canvas: boolean;
    high_contrast_elements: boolean;
    pointer_highlighting: boolean;
    zoom_indicators: boolean;
  };
  
  // Screen share quality
  quality_settings: {
    resolution: '1080p' | '720p';
    frame_rate: 15 | 30;
    content_type: 'text' | 'motion';
  };
}
```

**Benefits of Zoom Screen Sharing**:
- Immediate deployment (no SDK integration needed)
- Works with free and paid Zoom accounts
- Reliable video quality and performance
- Familiar workflow for facilitators
- Reduces development complexity

**See**: [FEATURES_ZOOM_INTEGRATION.md](./FEATURES_ZOOM_INTEGRATION.md) for complete Zoom integration specifications.

---

## Privacy Modes and Participant Access

### Canvas Privacy Modes

```typescript
interface CanvasPrivacyMode {
  canvas_id: string;
  
  // Privacy mode
  privacy_mode: 'private' | 'shared';
  
  // Owner controls
  owner_id: string;
  owner_permissions: {
    change_privacy_mode: true;
    select_participants: true;
    set_access_levels: true;
    revoke_access: true;
  };
  
  // Participant access
  shared_with_participants: {
    participant_id: string;
    access_level: 'viewer' | 'editor';
    granted_at: Date;
    expires_at?: Date;
  }[];
}
```

### Privacy Mode: Private

**Characteristics**:
- Only canvas owner can view and edit
- Not visible to other participants
- Not shared in Zoom screen share (unless owner chooses)
- Ideal for personal work and preparation

**Use Cases**:
- Facilitator preparation before session
- Participant personal reflection canvases
- Draft work before sharing with group
- Sensitive content requiring privacy

### Privacy Mode: Shared

**Characteristics**:
- Owner selects specific participants to share with
- Can be shared via Zoom screen sharing
- Participants access through web interface
- Owner controls access levels (viewer/editor)

**Use Cases**:
- Collaborative group work
- Facilitator-led exercises
- Breakout room canvases
- Team brainstorming sessions

### Participant Selection Interface

```typescript
interface ParticipantSharingInterface {
  // Select participants
  participant_selector: {
    available_participants: Participant[];
    selected_participants: string[];
    select_all: boolean;
    search_participants: boolean;
  };
  
  // Access level per participant
  access_controls: {
    default_access: 'viewer' | 'editor';
    per_participant_override: boolean;
    time_limited_access: boolean;
  };
  
  // Sharing options
  sharing_options: {
    share_immediately: boolean;
    notify_participants: boolean;
    allow_download: boolean;
    allow_copy: boolean;
  };
}
```

**UI Flow**:
1. Canvas owner clicks "Share" button
2. Modal shows list of session participants
3. Owner selects participants (checkboxes)
4. Owner sets access level (viewer/editor)
5. Optional: Set expiration time
6. Click "Share" to grant access
7. Selected participants receive notification
8. Participants see canvas in their interface

### Participant Canvas Viewer

**Participant Interface**:
```typescript
interface ParticipantCanvasViewer {
  // Shared canvases
  shared_canvases: {
    canvas_id: string;
    canvas_name: string;
    shared_by: string;
    access_level: 'viewer' | 'editor';
    shared_at: Date;
    expires_at?: Date;
  }[];
  
  // Viewer capabilities
  viewer_features: {
    zoom: boolean;
    pan: boolean;
    view_elements: boolean;
    read_annotations: boolean;
    export: boolean; // If allowed by owner
  };
  
  // Editor capabilities (if access level = editor)
  editor_features: {
    add_elements: boolean;
    edit_elements: boolean;
    delete_own_elements: boolean;
    draw: boolean;
    comment: boolean;
    create_connections: boolean;
  };
}
```

**Participant Experience**:
- Participants see "Shared Canvases" section in their interface
- List of canvases shared with them by facilitators/peers
- Click canvas to open in viewer/editor mode
- Real-time updates from other editors
- Can switch between viewing facilitator's Zoom share and personal interface

---

## Implementation Roadmap

**Goal**: Launch basic canvas with essential features including Zoom integration and privacy controls.

**Features**:
- ✅ Basic canvas workspace with zoom/pan
- ✅ Save, share, delete operations
- ✅ Card placement (thematic, question, word cards)
- ✅ Simple drawing tools (pen, eraser)
- ✅ Basic shapes (circle, rectangle, text)
- ✅ Export to PNG
- ✅ Basic permission system
- ✅ Auto-save (every 30 seconds)
- ✅ **Zoom screen sharing integration** for canvas presentation
- ✅ **Privacy modes**: Private and Shared canvas modes
- ✅ **Participant selection** for canvas sharing
- ✅ **Presentation mode** optimized for Zoom screen sharing

**Technical Deliverables**:
- Canvas React component
- PostgreSQL schema for canvases/elements
- Basic REST API
- S3 storage for exports
- PNG export generation

**Success Criteria**:
- Canvas loads in < 2 seconds
- Support 100+ elements per canvas
- Successful PNG export
- Save operations complete in < 500ms

### Phase 2: Collaboration & Advanced Features (Months 4-6)

**Goal**: Enable real-time collaboration, advanced tools, and basic analytics.

**Features**:
- ✅ Real-time multi-user collaboration
- ✅ WebSocket infrastructure
- ✅ Canvas interconnections (arrows, lines)
- ✅ Canvas templates library (6 categories)
- ✅ Advanced drawing tools (highlighter, shapes)
- ✅ Version control and history
- ✅ Export to PDF and JSON
- ✅ Canvas session management
- ✅ Conflict resolution
- ✅ **Participant canvas viewer** (read-only and edit access)
- ✅ **Canvas operation tracking** for analytics
- ✅ **Basic engagement metrics** from canvas activity
- ✅ **Real-time event collection** infrastructure

**Technical Deliverables**:
- WebSocket server with Socket.io
- Redis for real-time state
- Operational Transformation implementation
- Template system
- PDF export generation
- Version control system

**Success Criteria**:
- Support 50+ concurrent users per canvas
- Real-time sync latency < 100ms
- Version restore in < 1 second
- Smooth collaboration experience

### Phase 3: Mobile & Templates (Months 7-9)

**Goal**: Mobile experience and rich template library.

**Features**:
- ✅ Mobile-optimized interface
- ✅ Touch gesture support
- ✅ Tablet stylus support
- ✅ 20+ official canvas templates
- ✅ Template customization
- ✅ Template discovery and search
- ✅ Offline canvas editing
- ✅ Sync on reconnect

**Technical Deliverables**:
- Mobile-responsive canvas component
- Touch event handling
- Template management system
- Offline storage (IndexedDB)
- Sync queue for offline edits

**Success Criteria**:
- Smooth drawing on tablets
- Template library with 20+ templates
- Offline editing works seamlessly
- Mobile load time < 3 seconds

### Phase 4: AI & Analytics (Months 10-12)

**Goal**: AI-powered insights and advanced analytics for facilitators.

**Features**:
- ✅ AI pattern recognition in canvas operations
- ✅ Canvas analytics dashboard for facilitators
- ✅ Smart suggestions based on participant behavior
- ✅ Auto-clustering of cards by theme
- ✅ Collaboration insights and team dynamics
- ✅ Canvas search and discovery
- ✅ AI-generated templates
- ✅ Accessibility improvements (WCAG 2.1 AA)
- ✅ **AI facilitator insights from participant canvas operations**
- ✅ **Engagement scoring based on canvas activity**
- ✅ **Pattern detection in card placement and drawing**
- ✅ **Real-time intervention recommendations**
- ✅ **Personalized facilitation guidance**
- ✅ **Learning indicators from canvas evolution**

**See**: [FEATURES_AI_FACILITATOR_INSIGHTS.md](./FEATURES_AI_FACILITATOR_INSIGHTS.md) for complete AI insights specifications.

**Technical Deliverables**:
- ML model for pattern recognition
- Analytics pipeline
- Elasticsearch for canvas search
- AI recommendation engine
- Screen reader support

**Success Criteria**:
- AI insights generate in < 5 seconds
- Pattern recognition accuracy > 80%
- Search returns relevant results
- WCAG 2.1 AA compliance

---

## Quality Standards

### Performance

**Load Time**:
- Initial canvas load: < 2 seconds (500 elements)
- Large canvas load: < 5 seconds (2000 elements)
- Template load: < 1 second

**Rendering**:
- Smooth drawing at 60 FPS
- No lag with 50+ concurrent users
- Zoom/pan at 60 FPS

**Network**:
- Real-time sync latency: < 100ms
- Auto-save completes in < 500ms
- Export generation: < 10 seconds for PNG, < 30 seconds for PDF

**Optimization**:
- Lazy load elements outside viewport
- Compress drawing strokes
- Throttle cursor updates to 60 FPS
- Batch element updates
- Cache frequently accessed canvases

### Usability

**Ease of Use**:
- New users can create canvas in < 2 minutes
- Intuitive drag-and-drop
- Clear visual feedback
- Helpful tooltips and onboarding
- Keyboard shortcuts for power users

**Accessibility**:
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- High contrast mode
- Adjustable font sizes

**Responsive Design**:
- Works on desktop, tablet, mobile
- Touch-friendly on tablets
- Adapts to different screen sizes
- Portrait and landscape modes

### Reliability

**Uptime**:
- 99.9% uptime SLA
- Graceful degradation on failures
- Auto-reconnect on disconnect
- Data integrity guarantees

**Data Safety**:
- Auto-save every 30 seconds
- Version history (last 50 versions)
- Soft delete with 30-day retention
- Backup and disaster recovery
- Conflict resolution for simultaneous edits

**Security**:
- Permission-based access control
- Encrypted data in transit (TLS)
- Encrypted data at rest
- Secure sharing links with expiration
- Audit logs for sensitive operations

---

## Use Cases

### 1. Vision Board Creation (Click & Connect)

**Scenario**: Participant creates personal vision board during training.

**Steps**:
1. Facilitator shares vision board canvas template
2. Participant opens template (pre-configured layout)
3. Participant selects meaningful cards from library
4. Participant drags cards onto canvas
5. Participant adds drawings, shapes, text
6. Participant annotates cards with personal reflections
7. Participant saves and shares vision board with group
8. Group discusses vision boards in breakout

**Benefits**:
- Visual representation of goals
- Personal expression through drawing
- Easy sharing with facilitator/peers
- Exportable for later reference

### 2. Team Mapping (Team Fusion)

**Scenario**: Team maps strengths and relationships.

**Steps**:
1. Facilitator shares team mapping template
2. Each team member adds their name/avatar
3. Members place cards representing their strengths
4. Members connect cards showing collaboration
5. Team draws relationship lines
6. Team identifies gaps and opportunities
7. Team exports map for documentation

**Benefits**:
- Visual team structure
- Clear strength identification
- Relationship mapping
- Collaborative understanding

### 3. Journey Visualization

**Scenario**: Participant visualizes their journey progress.

**Steps**:
1. Participant opens journey canvas template
2. Template shows 4 phases: Pause, Expand, Focus, Doing
3. Participant places cards in each phase
4. Participant draws connections between phases
5. Participant adds notes and reflections
6. Participant tracks progress over time
7. AI analyzes journey patterns

**Benefits**:
- Clear journey visualization
- Progress tracking
- Pattern recognition
- Personalized insights

### 4. Real-time Brainstorming

**Scenario**: Team brainstorms ideas in real-time.

**Steps**:
1. Facilitator creates blank canvas
2. Facilitator shares canvas link with team
3. Team members join simultaneously
4. Everyone adds sticky notes with ideas
5. Team groups similar ideas
6. Team votes on top ideas (using emojis)
7. Team creates action plan
8. Export canvas as PDF for documentation

**Benefits**:
- All voices heard simultaneously
- Visual idea clustering
- Democratic decision making
- Documented outcomes

### 5. Problem-Solving Framework

**Scenario**: Individual uses canvas to solve complex problem.

**Steps**:
1. User selects problem-solving template
2. Template has sections: Problem, Causes, Solutions, Actions
3. User places cards representing problem aspects
4. User draws cause-and-effect connections
5. User brainstorms solutions
6. User prioritizes solutions
7. User creates action plan
8. AI suggests additional perspectives

**Benefits**:
- Structured problem-solving
- Visual cause-and-effect
- Solution generation
- AI-powered insights

---

## Success Metrics

### Usage Metrics

**Adoption**:
- 80% of facilitators use canvas in trainings within 3 months
- 60% of participants create at least one canvas
- 40% of sessions include canvas activity
- 1000+ canvases created per month

**Engagement**:
- Average session duration: 15+ minutes
- Elements per canvas: 20+ average
- Connections per canvas: 5+ average
- Return users: 70% create 2+ canvases

**Collaboration**:
- 50% of canvases are collaborative (2+ users)
- Average collaborators per canvas: 3-5
- Real-time sessions: 30% of all canvas usage
- Comments/annotations: 5+ per collaborative canvas

### Quality Metrics

**Performance**:
- Page load time: < 2 seconds (P95)
- Real-time sync latency: < 100ms (P95)
- Export generation time: < 10 seconds (P95)
- Zero data loss incidents

**Reliability**:
- 99.9% uptime
- < 1% failed save operations
- Auto-recover from 95% of disconnects
- Zero critical bugs in production

**User Satisfaction**:
- NPS score: 50+
- Feature satisfaction: 4.5/5 stars
- Ease of use rating: 4.5/5
- 80% recommend to others

### Business Metrics

**Value**:
- Increased session engagement: +40%
- Higher completion rates: +25%
- More return participants: +30%
- Premium feature driver: 15% conversion

**Growth**:
- Canvas usage grows 20% month-over-month
- Template usage grows 30% month-over-month
- Shared canvases grow 25% month-over-month
- Export feature used by 60% of users

---

## Appendix

### Glossary

- **Canvas**: Digital whiteboard workspace
- **Element**: Any visual object on canvas (card, shape, text, etc.)
- **Connection**: Visual line connecting two elements
- **Stroke**: Hand-drawn line or path
- **Template**: Pre-configured canvas layout
- **Session**: Real-time collaborative editing session
- **Version**: Snapshot of canvas state at point in time
- **Export**: Download canvas as image or file
- **Permission**: Access level for user (view/comment/edit/admin)
- **Viewport**: Visible area of canvas

### Related Documents

- [PROPRIETARY_CONTENT_DICTIONARY.md](./PROPRIETARY_CONTENT_DICTIONARY.md) - Main content dictionary
- [BTC24 Training Documentation](../Trainings/BTC24/) - Business Trainer Certification materials
- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [System Architecture](./SYSTEM_ARCHITECTURE.md) - Overall system design

### Version History

- **v1.0** (October 2025): Initial feature specification
  - Core canvas functionality
  - Real-time collaboration
  - Drawing tools
  - Template system
  - Export capabilities

---

**Document Status**: ✅ Complete  
**Next Review**: January 2026  
**Maintained By**: Product Team  
**Questions**: product@pointsofyou.com

