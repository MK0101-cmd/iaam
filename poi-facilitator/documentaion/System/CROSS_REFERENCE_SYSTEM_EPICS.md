# Cross-Reference: System Functional Description ↔ Epic Stories

## Document Overview

This document provides a comprehensive cross-reference between the **System Functional Description** and the **Epic Stories** documents, mapping functional requirements to development epics and vice versa. This enables teams to:

1. Trace functional requirements to their implementing epics
2. Understand which system components are addressed by each epic
3. Ensure complete coverage of all functional requirements
4. Identify dependencies between system components and development phases

---

## Table of Contents

1. [Executive Summary Mapping](#executive-summary-mapping)
2. [Core Functional Modules to Epics](#core-functional-modules-to-epics)
3. [Architectural Decisions to Epics](#architectural-decisions-to-epics)
4. [Technology Stack to Technical Epics](#technology-stack-to-technical-epics)
5. [Development Roadmap Alignment](#development-roadmap-alignment)
6. [Epic to System Component Reverse Mapping](#epic-to-system-component-reverse-mapping)

---

## Executive Summary Mapping

### Key Architectural Decisions (Phase 1) → Related Epics

| Architectural Decision | System Reference | Related Epics |
|------------------------|------------------|---------------|
| **Dual-Mode Journal Architecture** | SYSTEM_FUNCTIONAL_DESCRIPTION.md §9-11 | Epic 7 (PAR-002), Epic 30 (AUTH-001) |
| **Hybrid Video Strategy** | SYSTEM_FUNCTIONAL_DESCRIPTION.md §13 | Epic 23 (SESS-001) |
| **Privacy-First Canvas Design** | SYSTEM_FUNCTIONAL_DESCRIPTION.md §15 | Epic 13 (CANVAS-005), Epic 16 (CANVAS-008) |
| **AI-Driven Facilitator Insights** | SYSTEM_FUNCTIONAL_DESCRIPTION.md §17 | Epic 19 (CANVAS-011), Epic 22 (AI-003) |

---

## Core Functional Modules to Epics

### 1. Studio Console (Facilitator Interface)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §80-105

| Functional Component | Description | Related Epics |
|---------------------|-------------|---------------|
| Journey Builder | Interactive phase construction with drag-and-drop | Epic 3 (FAC-001) |
| Phase Management | Four-phase structure (Pause, Expand, Focus, Doing) | Epic 3 (FAC-001), Epic 14 (CANVAS-006) |
| Element Library | Six element types management | Epic 3 (FAC-001) |
| Live Session Management | Participant monitoring and status display | Epic 4 (FAC-002) |
| AI Co-Pilot | Chat interface with contextual suggestions | Epic 5 (FAC-003) |
| Breakout Rooms | Room creation and participant assignment | Epic 24 (SESS-002) |
| Session Analytics | Engagement metrics and insights | Epic 26 (ANAL-001) |

**Phase 1 Implementation**: Weeks 1-4 (Backend foundation), Weeks 13-24 (Core features)

---

### 2. Participant Experience

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §107-156

| Functional Component | Description | Related Epics |
|---------------------|-------------|---------------|
| **Dual-Mode Journal** | Standalone webapp + in-session integration | Epic 7 (PAR-002) |
| Unified Authentication | SSO across standalone and in-session modes | Epic 30 (AUTH-001) |
| Personal Dashboard | Stats, sessions, progress overview | Epic 6 (PAR-001) |
| Journal System | Rich text entries with AI prompts | Epic 7 (PAR-002) |
| Offline Journal Writing | PWA with IndexedDB and sync | Epic 7 (PAR-002), Epic 36 (TECH-003) |
| Goals & Achievements | Progress tracking with visual indicators | Epic 6 (PAR-001) |
| Live Session Participation | Card selection, reflection, canvas viewing | Epic 8 (PAR-003) |
| Canvas Viewer Interface | View/edit shared canvases | Epic 13 (CANVAS-005) |

**Phase 1 Implementation**: Weeks 1-12 (Authentication), Weeks 13-24 (Journal and dashboard)

---

### 3. Session Management System

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §158-186

| Functional Component | Description | Related Epics |
|---------------------|-------------|---------------|
| **Zoom Integration (Phase 1)** | Parallel operation with screen sharing | Epic 23 (SESS-001) |
| Canvas Screen Sharing | Share canvas through Zoom | Epic 23 (SESS-001), Epic 13 (CANVAS-005) |
| Breakout Rooms | Automated group assignment | Epic 24 (SESS-002) |
| Participant Monitoring | Real-time card sharing and status | Epic 4 (FAC-002) |
| Content Library | Searchable library with filtering | Epic 29 (ENT-002) |
| Calendar Integration | Session scheduling | Phase 4 requirement |
| Canvas Sharing Controls | Participant access management | Epic 16 (CANVAS-008) |

**Phase 1 Implementation**: Weeks 1-12 (Zoom parallel operation), Weeks 13-24 (Session features)

---

### 4. Visual Canvas/Whiteboard System (Priority Feature)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §188-318

| Functional Component | Description | Related Epics |
|---------------------|-------------|---------------|
| **Infinite Canvas Workspace** | Zoom, pan, grid, minimap | Epic 9 (CANVAS-001) |
| **Element Library** | Cards, shapes, text, images, frames | Epic 10 (CANVAS-002) |
| **Drawing Tools** | Pen, highlighter, eraser, shape recognition | Epic 11 (CANVAS-003) |
| **Interconnections** | Lines, arrows, connections with labels | Epic 12 (CANVAS-004) |
| **Real-time Collaboration** | 50+ concurrent users with privacy modes | Epic 13 (CANVAS-005) |
| **Privacy Modes** | Private/shared with participant selection | Epic 13 (CANVAS-005), Epic 16 (CANVAS-008) |
| **Participant Canvas Viewer** | View/edit through participant interface | Epic 13 (CANVAS-005) |
| **Zoom Screen Sharing** | Canvas sharing via Zoom (Phase 1) | Epic 23 (SESS-001) |
| **Version Control** | Auto-version, manual checkpoints, undo/redo | Epic 15 (CANVAS-007) |
| **Save, Share, Delete** | Auto-save, participant-specific sharing | Epic 16 (CANVAS-008) |
| **Export and Download** | PNG, PDF, JSON export | Epic 17 (CANVAS-009) |
| **Templates** | Journey integration and training templates | Epic 14 (CANVAS-006) |
| **Mobile Canvas** | Touch gestures, stylus support, offline | Epic 18 (CANVAS-010) |
| **AI Canvas Analytics** | Pattern recognition, facilitator insights | Epic 19 (CANVAS-011) |

**Implementation Roadmap**:
- **Phase 1 (Months 1-3)**: Epic 9 (MVP), Epic 23 (Zoom integration), Privacy modes
- **Phase 2 (Months 4-6)**: Epic 10-12 (Elements, drawing, connections), Epic 19 (AI foundation)
- **Phase 3 (Months 7-9)**: Epic 13-16 (Collaboration, templates, version control, sharing)
- **Phase 4 (Months 10-12)**: Epic 17-19 (Export, mobile, full AI insights)

---

### 5. AI Coach Integration

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §320-344

| Functional Component | Description | Related Epics |
|---------------------|-------------|---------------|
| Conversational Interface | Chat-style AI interaction | Epic 20 (AI-001) |
| Response Generation | Context-aware responses | Epic 20 (AI-001) |
| Inspirational Content | Quotes and motivational messages | Epic 20 (AI-001) |
| Voice Controls | Voice interaction capabilities | Epic 20 (AI-001) |
| Content Recommendations | Personalized card and exercise suggestions | Epic 21 (AI-002) |

**Phase Implementation**: Weeks 25-36 (AI Integration phase)

---

### 6. Account Management and Onboarding

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §346-375

| Functional Component | Description | Related Epics |
|---------------------|-------------|---------------|
| **User Authentication** | Django AbstractUser with unified SSO | Epic 30 (AUTH-001) |
| Email Verification | Token-based verification | Epic 30 (AUTH-001) |
| Role-Based Onboarding | Customized flows per user type | Epic 33 (AUTH-004) |
| **Unified SSO** | Authentication across all platform modes | Epic 30 (AUTH-001) |
| Multi-Tenant Support | Organization-level data isolation | Epic 32 (AUTH-003), Epic 28 (ENT-001) |
| Privacy Controls | Participant data sharing controls | Epic 31 (AUTH-002) |
| Participant-Facilitator Relationships | Session-level access management | Epic 31 (AUTH-002) |

**Phase 1 Implementation**: Weeks 1-12 (Foundation and authentication)

---

## Architectural Decisions to Epics

### Dual-Mode Journal Architecture

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §9-11, §127-140

| Requirement | Implementation | Related Epics |
|-------------|----------------|---------------|
| Standalone webapp mode | Independent journal application | Epic 7 (PAR-002) |
| In-session integration | Journal access during live sessions | Epic 7 (PAR-002), Epic 8 (PAR-003) |
| Unified authentication | Single SSO for both modes | Epic 30 (AUTH-001) |
| Seamless context switching | No re-authentication required | Epic 30 (AUTH-001) |
| Session-aware interface | Adaptive UI based on context | Epic 7 (PAR-002) |
| Offline capabilities | PWA with IndexedDB and sync | Epic 7 (PAR-002), Epic 36 (TECH-003) |

**Development Timeline**:
- Phase 1 (Weeks 1-12): Epic 30 (Unified SSO)
- Phase 2 (Weeks 13-24): Epic 7 (Dual-mode journal implementation)

---

### Hybrid Video Strategy (Phase 1)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §13, §515-520

| Requirement | Implementation | Related Epics |
|-------------|----------------|---------------|
| Zoom parallel operation | Platform runs alongside Zoom | Epic 23 (SESS-001) Phase 1 |
| Canvas screen sharing | Share canvas via Zoom screen share | Epic 23 (SESS-001), Epic 13 (CANVAS-005) |
| Facilitator workflow | Coordination between Zoom and platform | Epic 23 (SESS-001) |
| Participant dual-access | Zoom for video, web for canvas/journal | Epic 23 (SESS-001), Epic 8 (PAR-003) |
| Native video integration | Future Zoom/Teams SDK integration | Epic 23 (SESS-001) Phase 2 |

**Development Timeline**:
- Phase 1 (Weeks 1-12): Zoom parallel operation, screen sharing workflow
- Phase 5 (Weeks 49-60): Native Zoom/Teams SDK integration

---

### Privacy-First Canvas Design

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §15, §220-236

| Requirement | Implementation | Related Epics |
|-------------|----------------|---------------|
| Private mode | Canvas visible only to owner | Epic 13 (CANVAS-005) |
| Shared mode | Canvas shared with selected participants | Epic 13 (CANVAS-005) |
| Participant selection | Owner controls access per participant | Epic 13 (CANVAS-005), Epic 16 (CANVAS-008) |
| Participant canvas viewer | View/edit through participant interface | Epic 13 (CANVAS-005) |
| Permission levels | View, comment, edit, admin access | Epic 16 (CANVAS-008) |
| Privacy toggle | Switch between private and shared modes | Epic 13 (CANVAS-005) |

**Development Timeline**:
- Phase 1 (Months 1-3): Privacy modes foundation in canvas MVP
- Phase 3 (Weeks 25-36): Full collaboration and permission system

---

### AI-Driven Facilitator Insights

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §17, §556-562

| Requirement | Implementation | Related Epics |
|-------------|----------------|---------------|
| Canvas operation tracking | Log all participant canvas actions | Epic 19 (CANVAS-011) |
| Card selection analysis | Pattern recognition in card choices | Epic 19 (CANVAS-011) |
| Drawing behavior metrics | Engagement scoring from drawing activity | Epic 19 (CANVAS-011) |
| Collaboration patterns | Interaction frequency and quality analysis | Epic 19 (CANVAS-011) |
| Emotional indicators | Sentiment inference from visual choices | Epic 19 (CANVAS-011), Epic 22 (AI-003) |
| Progress tracking | Canvas evolution over time | Epic 19 (CANVAS-011) |
| Facilitation recommendations | AI-driven suggestions for facilitators | Epic 19 (CANVAS-011), Epic 5 (FAC-003) |
| Privacy-compliant tracking | Consent management and anonymization | Epic 19 (CANVAS-011), Epic 35 (TECH-002) |

**Development Timeline**:
- Phase 2 (Weeks 5-8): Canvas AI foundation, data collection infrastructure
- Phase 3 (Weeks 25-36): Basic operation tracking and analytics
- Phase 4 (Weeks 37-48): Advanced pattern recognition
- Phase 5 (Weeks 49-60): Full AI insights with facilitator recommendations

---

## Technology Stack to Technical Epics

### Frontend Architecture

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §21-37

| Technology Component | Purpose | Related Epics |
|---------------------|---------|---------------|
| React 19.1.1 + TypeScript | Frontend framework | Epic 34 (TECH-001) |
| TailwindCSS | Styling and responsive design | Epic 37 (ACC-001), Epic 38 (ACC-002) |
| Vite Build System | Development and production builds | Epic 36 (TECH-003) |
| PWA Configuration | Offline capabilities | Epic 36 (TECH-003), Epic 7 (PAR-002) |
| IndexedDB + Service Worker | Offline storage and sync | Epic 7 (PAR-002), Epic 36 (TECH-003) |

---

### Backend Architecture (Planned)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §39-41

| Technology Component | Purpose | Related Epics |
|---------------------|---------|---------------|
| Django + Django Channels | Backend framework with WebSocket | Epic 34 (TECH-001) |
| PostgreSQL | Database with vector extensions | Epic 34 (TECH-001) |
| Redis | Real-time state and caching | Epic 13 (CANVAS-005), Epic 36 (TECH-003) |
| Django Admin + django-cms | Content management | Epic 29 (ENT-002) |
| Django i18n | Internationalization | Epic 1 (ML-001), Epic 2 (ML-002) |
| django-allauth | SSO and social authentication | Epic 30 (AUTH-001), Epic 32 (AUTH-003) |
| rest_framework_simplejwt | JWT authentication | Epic 30 (AUTH-001) |

---

### Canvas Technology

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §250-257

| Technology Component | Purpose | Related Epics |
|---------------------|---------|---------------|
| Fabric.js or Konva.js | Canvas rendering engine | Epic 9 (CANVAS-001) |
| Socket.io | Real-time collaboration | Epic 13 (CANVAS-005) |
| S3 Storage | Drawing strokes and exports | Epic 9 (CANVAS-001), Epic 17 (CANVAS-009) |
| Elasticsearch | Canvas discovery and search | Epic 9 (CANVAS-001) |
| OT or CRDT | Conflict-free collaborative editing | Epic 13 (CANVAS-005) |

---

### AI/ML Technology

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §550-562

| Technology Component | Purpose | Related Epics |
|---------------------|---------|---------------|
| OpenAI API | Conversational AI and insights | Epic 20 (AI-001), Epic 21 (AI-002) |
| ML Pattern Recognition | Canvas pattern analysis | Epic 19 (CANVAS-011) |
| Sentiment Analysis | Emotion detection | Epic 22 (AI-003), Epic 19 (CANVAS-011) |
| Clustering Algorithms | Card and theme clustering | Epic 19 (CANVAS-011) |

---

## Development Roadmap Alignment

### Phase 1: Foundation and Authentication (Weeks 1-12)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §626-635

| System Component | Epic | Priority |
|------------------|------|----------|
| Unified Authentication (SSO) | Epic 30 (AUTH-001) | Critical |
| Participant-Facilitator Relationships | Epic 31 (AUTH-002) | High |
| Multilingual Support | Epic 1 (ML-001) | High |
| Backend Architecture | Epic 34 (TECH-001) | Critical |
| Security and Compliance | Epic 35 (TECH-002) | Critical |
| Accessibility | Epic 37 (ACC-001) | High |
| Canvas Workspace Foundation | Epic 9 (CANVAS-001) | Critical |
| Canvas Privacy Modes | Epic 13 (CANVAS-005) | Critical |
| Zoom Parallel Operation | Epic 23 (SESS-001) Phase 1 | Critical |

**Key Deliverables**:
- Unified SSO for dual-mode journal and canvas access
- Canvas MVP with privacy modes (private/shared)
- Zoom parallel operation with screen sharing workflow
- Django backend with authentication and security

---

### Phase 2: Core Features and Onboarding (Weeks 13-24)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §637-644

| System Component | Epic | Priority |
|------------------|------|----------|
| Multi-Tenant Organizations | Epic 32 (AUTH-003) | High |
| Role-Based Onboarding | Epic 33 (AUTH-004) | High |
| Journey Builder | Epic 3 (FAC-001) | Critical |
| Dual-Mode Journal | Epic 7 (PAR-002) | High |
| Personal Dashboard | Epic 6 (PAR-001) | High |
| Live Session Participation | Epic 8 (PAR-003) | Critical |
| Canvas Elements and Library | Epic 10 (CANVAS-002) | Critical |
| Drawing Tools | Epic 11 (CANVAS-003) | High |
| Element Connections | Epic 12 (CANVAS-004) | High |
| Canvas AI Foundation | Epic 19 (CANVAS-011) Phase 1 | High |

**Key Deliverables**:
- Dual-mode journal (standalone + in-session) with unified authentication
- Canvas with cards, drawing tools, and connections
- Journey builder and participant dashboard
- Canvas AI data collection infrastructure

---

### Phase 3: AI Integration and Canvas Collaboration (Weeks 25-36)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §646-654

| System Component | Epic | Priority |
|------------------|------|----------|
| Conversational AI Coach | Epic 20 (AI-001) | High |
| Content Recommendations | Epic 21 (AI-002) | Medium |
| Emotion Analysis | Epic 22 (AI-003) | Medium |
| Live Session Management | Epic 4 (FAC-002) | Critical |
| Real-time Canvas Collaboration | Epic 13 (CANVAS-005) | Critical |
| Participant Selection/Sharing | Epic 16 (CANVAS-008) | High |
| Canvas Templates | Epic 14 (CANVAS-006) | High |
| Canvas Version Control | Epic 15 (CANVAS-007) | High |
| Canvas Operation Tracking | Epic 19 (CANVAS-011) Phase 2 | High |

**Key Deliverables**:
- Real-time canvas collaboration with participant selection
- Participant canvas viewer in participant interface
- AI coach and content recommendations
- Canvas operation tracking for facilitator insights

---

### Phase 4: Advanced Features and Canvas Export (Weeks 37-48)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §656-668

| System Component | Epic | Priority |
|------------------|------|----------|
| Session Analytics Dashboard | Epic 26 (ANAL-001) | High |
| Content Library and Marketplace | Epic 29 (ENT-002) | Medium |
| Performance Optimization | Epic 36 (TECH-003) | High |
| Canvas Export and Download | Epic 17 (CANVAS-009) | Medium |
| Breakout Room Management | Epic 24 (SESS-002) | High |
| Session Recording | Epic 25 (SESS-003) | Medium |
| AI Facilitator Insights | Epic 19 (CANVAS-011) Phase 3 | High |

**Key Deliverables**:
- Advanced facilitator AI insights from participant canvas operations
- Pattern recognition, engagement scoring, emotional inference
- Canvas export (PNG, PDF, JSON)
- Comprehensive analytics dashboard

---

### Phase 5: Polish, Mobile, and AI Canvas (Weeks 49-60)

**System Reference**: SYSTEM_FUNCTIONAL_DESCRIPTION.md §637-668

| System Component | Epic | Priority |
|------------------|------|----------|
| Translation Management | Epic 2 (ML-002) | Medium |
| AI Co-Pilot for Facilitators | Epic 5 (FAC-003) | High |
| Cross-Platform Compatibility | Epic 38 (ACC-002) | Medium |
| Mobile Canvas Experience | Epic 18 (CANVAS-010) | Medium |
| Full AI Canvas Analytics | Epic 19 (CANVAS-011) Phase 4 | High |
| Participant Progress Analytics | Epic 27 (ANAL-002) | Medium |
| Native Video Integration | Epic 23 (SESS-001) Phase 2 | Medium |

**Key Deliverables**:
- Full facilitator AI insights with personalized recommendations
- Mobile canvas with touch gestures and offline support
- Native Zoom/Teams SDK integration
- Complete translation management system

---

## Epic to System Component Reverse Mapping

### Facilitator Experience Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 3 (FAC-001) | Journey Builder, Phase Management, Element Library | §80-105 |
| Epic 4 (FAC-002) | Live Session Management, Participant Monitoring | §80-105, §158-186 |
| Epic 5 (FAC-003) | AI Co-Pilot | §80-105, §320-344 |

---

### Participant Experience Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 6 (PAR-001) | Personal Dashboard, Progress Tracking | §107-156 |
| Epic 7 (PAR-002) | **Dual-Mode Journal System**, Offline Capabilities | §107-156, §9-11, §424-511 |
| Epic 8 (PAR-003) | Live Session Participation, Canvas Viewer | §107-156, §150-156 |

---

### Visual Canvas/Whiteboard Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 9 (CANVAS-001) | Infinite Canvas Workspace | §188-318, §196-200 |
| Epic 10 (CANVAS-002) | Element Library | §188-318, §202-205 |
| Epic 11 (CANVAS-003) | Drawing Tools | §188-318, §207-212 |
| Epic 12 (CANVAS-004) | Interconnections | §188-318, §214-218 |
| Epic 13 (CANVAS-005) | **Real-time Collaboration**, **Privacy Modes** | §188-318, §220-228, §15 |
| Epic 14 (CANVAS-006) | Templates, Journey Integration | §188-318, §287-296 |
| Epic 15 (CANVAS-007) | Version Control | §188-318, §238-243 |
| Epic 16 (CANVAS-008) | Sharing and Permissions | §188-318, §230-236 |
| Epic 17 (CANVAS-009) | Export and Download | §188-318, §245-248 |
| Epic 18 (CANVAS-010) | Mobile Canvas Experience | §188-318 |
| Epic 19 (CANVAS-011) | **AI Canvas Analytics**, **Facilitator Insights** | §188-318, §294, §556-562, §17 |

---

### AI-Powered Features Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 20 (AI-001) | Conversational AI Coach | §320-344 |
| Epic 21 (AI-002) | Content Recommendations | §550-562 |
| Epic 22 (AI-003) | Emotion and Engagement Analysis | §550-562 |

---

### Session Management Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 23 (SESS-001) | **Zoom Integration (Phase 1)**, Video Conferencing | §158-186, §515-520, §13 |
| Epic 24 (SESS-002) | Breakout Room Management | §158-186 |
| Epic 25 (SESS-003) | Session Recording and Playback | §158-186 |

---

### Analytics and Insights Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 26 (ANAL-001) | Session Analytics Dashboard | §536-548 |
| Epic 27 (ANAL-002) | Participant Progress Analytics | §536-548 |

---

### Enterprise and Admin Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 28 (ENT-001) | Multi-Tenant Organization Management | §346-375 |
| Epic 29 (ENT-002) | Content Library and Marketplace | §522-526 |

---

### Authentication and Account Management Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 30 (AUTH-001) | **User Authentication**, **Unified SSO** | §346-375, §9-11, §626-635 |
| Epic 31 (AUTH-002) | Participant-Facilitator Relationships | §346-375 |
| Epic 32 (AUTH-003) | Multi-Tenant Organizations | §346-375 |
| Epic 33 (AUTH-004) | Role-Based Onboarding | §346-375 |

---

### Technical Infrastructure Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 34 (TECH-001) | Backend Architecture | §19-41, §672-702 |
| Epic 35 (TECH-002) | Security and Compliance | §564-580 |
| Epic 36 (TECH-003) | Performance Optimization, PWA | §582-601, §424-511 |

---

### Accessibility and Compliance Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 37 (ACC-001) | Universal Accessibility | §564-580 |
| Epic 38 (ACC-002) | Cross-Platform Compatibility | §582-601 |

---

### Multilingual Platform Epics → System Components

| Epic | System Component(s) | Functional Description Reference |
|------|---------------------|----------------------------------|
| Epic 1 (ML-001) | Global Language Support | §21-37 (i18n framework) |
| Epic 2 (ML-002) | Translation Management | §21-37 (i18n framework) |

---

## Key Dependencies and Integration Points

### Critical Path Dependencies

| Dependency | Blocking Epic(s) | Blocked Epic(s) | Rationale |
|------------|------------------|-----------------|-----------|
| **Unified SSO** | Epic 30 (AUTH-001) | Epic 7 (PAR-002), Epic 8 (PAR-003), Epic 13 (CANVAS-005) | Dual-mode journal and canvas access require unified authentication |
| **Canvas MVP** | Epic 9 (CANVAS-001) | Epic 10-19 (All canvas epics) | Foundation workspace required for all canvas features |
| **Zoom Parallel Operation** | Epic 23 (SESS-001) Phase 1 | Epic 13 (CANVAS-005), Epic 4 (FAC-002) | Canvas screen sharing requires Zoom integration |
| **Privacy Modes** | Epic 13 (CANVAS-005) | Epic 16 (CANVAS-008), Epic 19 (CANVAS-011) | Privacy infrastructure required for sharing and analytics |
| **Backend Architecture** | Epic 34 (TECH-001) | All backend-dependent epics | Core infrastructure required for all server-side features |
| **Canvas Operation Tracking** | Epic 19 (CANVAS-011) Phase 1 | Epic 19 (CANVAS-011) Phase 2-4 | Data collection infrastructure required for AI insights |

---

### Integration Points Across Epics

| Integration Point | System Reference | Epic 1 | Epic 2 | Integration Details |
|-------------------|------------------|--------|--------|---------------------|
| **Journal-Session Integration** | §127-140, §150-156 | Epic 7 (PAR-002) | Epic 8 (PAR-003) | Journal accessible during live sessions with session-aware interface |
| **Canvas-Participant Integration** | §220-228 | Epic 13 (CANVAS-005) | Epic 8 (PAR-003) | Participant canvas viewer in participant interface |
| **Canvas-Zoom Integration** | §295, §515-520 | Epic 13 (CANVAS-005) | Epic 23 (SESS-001) | Canvas screen sharing through Zoom in Phase 1 |
| **Canvas-AI Integration** | §294, §556-562 | Epic 13 (CANVAS-005) | Epic 19 (CANVAS-011) | Canvas operations tracked for AI insights |
| **Authentication-Journal Integration** | §127-131 | Epic 30 (AUTH-001) | Epic 7 (PAR-002) | Unified SSO enables dual-mode journal access |
| **Authentication-Canvas Integration** | Epic 30, Epic 13 | Epic 30 (AUTH-001) | Epic 13 (CANVAS-005) | SSO enables seamless canvas access across contexts |

---

## Success Metrics Mapping

### System Metrics → Epic Success Criteria

| System Metric | System Reference | Related Epic(s) | Epic Success Criteria |
|---------------|------------------|-----------------|----------------------|
| 80% facilitators use canvas within 3 months | §311-316 | Epic 9-19 (Canvas epics) | Canvas adoption rates, feature usage |
| 60% participants create at least one canvas | §311-316 | Epic 13 (CANVAS-005) | Participant engagement with canvas |
| 50% canvases are collaborative (2+ users) | §311-316 | Epic 13 (CANVAS-005) | Collaboration feature adoption |
| Canvas sync latency < 100ms (P95) | §311-316 | Epic 13 (CANVAS-005) | Real-time performance metrics |
| 99.9% uptime, < 1% failed save operations | §311-316 | Epic 9 (CANVAS-001) | System reliability metrics |
| Page load times < 2 seconds | Epic 36 success metrics | Epic 36 (TECH-003) | Performance optimization |
| PWA offline functionality | §424-511 | Epic 7 (PAR-002), Epic 36 (TECH-003) | Offline journal writing success rate |

---

## Conclusion

This cross-reference document provides comprehensive mapping between the System Functional Description and Epic Stories, enabling:

1. **Traceability**: Every functional requirement is mapped to implementing epics
2. **Completeness**: All system components have corresponding development epics
3. **Dependencies**: Clear understanding of epic dependencies and critical paths
4. **Validation**: Teams can verify that all functional requirements are addressed

### Key Architectural Mappings

- **Dual-Mode Journal**: Epic 7 (PAR-002) + Epic 30 (AUTH-001)
- **Hybrid Video Strategy**: Epic 23 (SESS-001) Phase 1 → Phase 2
- **Privacy-First Canvas**: Epic 13 (CANVAS-005) + Epic 16 (CANVAS-008)
- **AI Facilitator Insights**: Epic 19 (CANVAS-011) across 4 phases

### Critical Path

1. **Phase 1**: Epic 30 (Unified SSO) → Epic 9 (Canvas MVP with privacy) → Epic 23 (Zoom parallel)
2. **Phase 2**: Epic 7 (Dual-mode journal) → Epic 10-12 (Canvas elements/drawing) → Epic 19 Phase 1 (AI foundation)
3. **Phase 3**: Epic 13 (Canvas collaboration) → Epic 19 Phase 2 (Operation tracking)
4. **Phase 4-5**: Epic 19 Phase 3-4 (Full AI insights) → Epic 23 Phase 2 (Native video)

This mapping ensures aligned development between functional specifications and implementation epics.

