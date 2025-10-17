# Dual-Mode Journal Architecture Feature
## Points of You AI Studio

## Document Overview

This document specifies the dual-mode journal architecture that enables the journal to function both as a standalone web application and as an integrated component during live sessions, with unified authentication and seamless context switching.

**Feature Status**: Phase 1 Priority Implementation  
**Version**: 1.0  
**Last Updated**: October 2025  
**Priority**: High

---

## Table of Contents

1. [Feature Overview](#feature-overview)
2. [Architecture Design](#architecture-design)
3. [Unified Authentication](#unified-authentication)
4. [Journal Modes](#journal-modes)
5. [Technical Implementation](#technical-implementation)
6. [User Experience](#user-experience)
7. [Success Metrics](#success-metrics)

---

## Feature Overview

### Purpose

The dual-mode journal architecture enables participants to:
1. **Access their journal independently** outside of training sessions for personal reflection
2. **Use their journal seamlessly during live sessions** without re-authentication
3. **Maintain context continuity** between standalone and in-session usage
4. **Sync data automatically** across both modes

### Key Benefits

- **Unified Identity**: Single sign-on across standalone and in-session contexts
- **Seamless Experience**: No authentication barriers when switching contexts
- **Data Continuity**: Journal entries accessible in both modes
- **Session Awareness**: Journal adapts UI based on active session status
- **Privacy Control**: Separate sharing controls for standalone vs. in-session content

---

## Architecture Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Unified Authentication Layer                    │
│           (Single Sign-On / JWT Token System)               │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────────┐
│  Standalone     │    │   In-Session        │
│  Journal Mode   │    │   Journal Mode      │
├─────────────────┤    ├─────────────────────┤
│ - Personal      │    │ - Session Context   │
│   Reflection    │    │ - Live Updates      │
│ - Full Access   │    │ - Facilitator       │
│ - All Features  │    │   Visibility        │
│ - Private       │    │ - Quick Access      │
│   by Default    │    │ - Session Cards     │
└─────────────────┘    └─────────────────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Shared Data Layer   │
         │ - Journal Entries     │
         │ - User Preferences    │
         │ - Cards & Reflections │
         │ - Session History     │
         └───────────────────────┘
```

### Component Architecture

```typescript
interface DualModeJournalArchitecture {
  // Core components
  authenticationService: UnifiedAuthService;
  journalDataService: JournalDataService;
  modeManager: JournalModeManager;
  syncService: DataSyncService;
  
  // Mode-specific components
  standaloneInterface: StandaloneJournalUI;
  inSessionInterface: InSessionJournalUI;
  
  // Shared components
  entryEditor: JournalEntryEditor;
  cardLibrary: CardLibraryAccess;
  aiCoach: AICoachIntegration;
  
  // Context management
  sessionContext: SessionContextManager;
  userContext: UserContextManager;
}
```

---

## Unified Authentication

### Authentication Flow

#### 1. Initial Authentication

```typescript
interface UnifiedAuthFlow {
  // Single authentication for both modes
  authentication: {
    method: 'email_password' | 'sso' | 'social_auth';
    token_type: 'jwt';
    token_lifetime: {
      access_token: '15 minutes';
      refresh_token: '7 days';
    };
  };
  
  // Token structure
  auth_token: {
    user_id: string;
    email: string;
    role: 'participant' | 'facilitator';
    session_context?: {
      active_session_id: string;
      session_role: string;
      permissions: string[];
    };
    issued_at: number;
    expires_at: number;
  };
}
```

#### 2. Session Context Addition

```typescript
// When joining a session, context is added to existing token
interface SessionContextAddition {
  existing_auth: AuthToken;
  session_join: {
    session_id: string;
    session_code: string;
    facilitator_id: string;
  };
  
  // Updated token with session context
  updated_auth: {
    ...existing_auth;
    session_context: {
      active_session_id: string;
      joined_at: number;
      permissions: string[];
      facilitator_visibility: boolean;
    };
  };
}
```

#### 3. Context Switching

```typescript
// Seamless switching between standalone and in-session
interface ContextSwitch {
  // No re-authentication required
  switch_trigger: 'session_join' | 'session_leave' | 'manual_switch';
  
  // Automatic mode detection
  mode_detection: {
    active_session: boolean;
    current_mode: 'standalone' | 'in_session';
    auto_switch: boolean;
  };
  
  // State preservation
  preserve_state: {
    draft_entries: boolean;
    scroll_position: boolean;
    selected_cards: boolean;
    ai_conversation: boolean;
  };
}
```

### Authentication Implementation

#### Django Backend

```python
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()

class DualModeAuthenticationService:
    """
    Unified authentication service for standalone and in-session modes
    """
    
    @staticmethod
    def generate_unified_token(user, session_context=None):
        """
        Generate JWT token with optional session context
        """
        token = AccessToken.for_user(user)
        
        # Add custom claims
        token['role'] = user.profile.role
        token['email'] = user.email
        
        # Add session context if present
        if session_context:
            token['session_context'] = {
                'active_session_id': str(session_context.session_id),
                'session_role': session_context.role,
                'permissions': session_context.permissions,
                'joined_at': session_context.joined_at.timestamp()
            }
        
        return str(token)
    
    @staticmethod
    def add_session_context_to_token(current_token, session):
        """
        Add session context to existing token without re-authentication
        """
        # Decode existing token
        token = AccessToken(current_token)
        
        # Add session context
        token['session_context'] = {
            'active_session_id': str(session.id),
            'joined_at': timezone.now().timestamp(),
            'permissions': get_session_permissions(session)
        }
        
        return str(token)
```

---

## Journal Modes

### Standalone Mode

#### Features

```typescript
interface StandaloneJournalMode {
  // Full journal functionality
  features: {
    create_entries: true;
    edit_entries: true;
    delete_entries: true;
    search_entries: true;
    tag_management: true;
    export_journal: true;
    ai_coach_chat: true;
    card_exploration: true;
    goal_tracking: true;
    progress_analytics: true;
  };
  
  // Privacy settings
  privacy: {
    default_visibility: 'private';
    share_with_facilitator: false; // Unless explicitly shared
    public_sharing: false;
  };
  
  // UI characteristics
  interface: {
    full_screen: true;
    all_sidebars: true;
    complete_navigation: true;
    dashboard_access: true;
  };
}
```

#### User Journey

1. **Access**: Visit journal URL directly or from dashboard
2. **Authentication**: Single sign-on with existing credentials
3. **Experience**: Full journal interface with all features
4. **Privacy**: Complete control over content sharing
5. **Persistence**: All data saved and synced to cloud

### In-Session Mode

#### Features

```typescript
interface InSessionJournalMode {
  // Session-aware functionality
  features: {
    quick_entry: true; // Rapid reflection during session
    session_cards: true; // Cards selected during session
    facilitator_prompts: true; // Prompts from facilitator
    real_time_reflection: true; // Live session reflection
    
    // Limited features for focus
    full_search: false; // Simplified search
    export: false; // Available post-session
    analytics: false; // Focus on current session
  };
  
  // Session context
  session_awareness: {
    active_session_id: string;
    session_phase: 'pause' | 'expand' | 'focus' | 'doing';
    facilitator_visibility: boolean;
    current_exercise: string;
  };
  
  // Privacy settings
  privacy: {
    default_visibility: 'shared_with_facilitator';
    toggle_private_mode: true; // Can mark entries private
  };
  
  // UI characteristics
  interface: {
    compact_mode: true;
    minimal_navigation: true;
    session_focused: true;
    quick_access_toolbar: true;
  };
}
```

#### User Journey

1. **Access**: Join session via link, journal automatically opens in session mode
2. **Authentication**: Uses existing authenticated session (no re-login)
3. **Experience**: Streamlined interface focused on session activities
4. **Visibility**: Facilitator can see reflections (with participant consent)
5. **Post-Session**: Entries automatically available in standalone mode

---

## Technical Implementation

### Mode Detection and Switching

```typescript
class JournalModeManager {
  private currentMode: 'standalone' | 'in_session';
  private sessionContext: SessionContext | null;
  
  /**
   * Detect and set appropriate journal mode
   */
  detectMode(): JournalMode {
    // Check for active session
    const activeSession = this.getActiveSession();
    
    if (activeSession) {
      this.currentMode = 'in_session';
      this.sessionContext = activeSession;
      this.loadInSessionInterface();
    } else {
      this.currentMode = 'standalone';
      this.sessionContext = null;
      this.loadStandaloneInterface();
    }
    
    return this.currentMode;
  }
  
  /**
   * Switch between modes without re-authentication
   */
  async switchMode(targetMode: JournalMode) {
    // Preserve current state
    const currentState = this.captureState();
    
    // Switch interface
    if (targetMode === 'in_session') {
      await this.transitionToInSession(currentState);
    } else {
      await this.transitionToStandalone(currentState);
    }
    
    // Restore preserved state
    this.restoreState(currentState);
  }
  
  /**
   * Capture current state for preservation
   */
  private captureState(): JournalState {
    return {
      draftEntries: this.getDraftEntries(),
      scrollPosition: window.scrollY,
      selectedCards: this.getSelectedCards(),
      aiConversation: this.getAIConversation(),
    };
  }
}
```

### Data Synchronization

```typescript
interface JournalDataSync {
  // Sync strategy
  sync_mode: 'real_time' | 'interval' | 'on_change';
  
  // Sync operations
  operations: {
    create: (entry: JournalEntry) => Promise<void>;
    update: (entry: JournalEntry) => Promise<void>;
    delete: (entryId: string) => Promise<void>;
    sync_all: () => Promise<void>;
  };
  
  // Conflict resolution
  conflict_resolution: {
    strategy: 'last_write_wins' | 'merge' | 'prompt_user';
    backup_on_conflict: boolean;
  };
  
  // Offline support
  offline_queue: {
    pending_operations: SyncOperation[];
    auto_sync_on_reconnect: boolean;
  };
}
```

### API Integration

#### REST API Endpoints

```typescript
// Journal API endpoints supporting both modes

// Get journal entries
GET /api/v1/journal/entries
  Query params:
    - mode: 'standalone' | 'in_session'
    - session_id: string (if in_session mode)
    - limit: number
    - offset: number

// Create journal entry
POST /api/v1/journal/entries
  Body: {
    content: string;
    mode: 'standalone' | 'in_session';
    session_id?: string;
    visibility: 'private' | 'shared_with_facilitator';
    tags: string[];
    card_references: string[];
  }

// Update journal entry
PUT /api/v1/journal/entries/:id
  Body: {
    content: string;
    visibility: 'private' | 'shared_with_facilitator';
    tags: string[];
  }

// Get session context
GET /api/v1/journal/session-context
  Returns: {
    active_session: boolean;
    session_id: string;
    facilitator_visibility: boolean;
    current_phase: string;
  }
```

---

## User Experience

### Standalone Interface

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard  Journal  Sessions  Progress  Settings │ 
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌─────────────────────────────────────┐   │
│  │          │  │                                       │   │
│  │ Sidebar  │  │        Journal Entries                │   │
│  │          │  │                                       │   │
│  │ - Search │  │  [Entry 1]                            │   │
│  │ - Tags   │  │  [Entry 2]                            │   │
│  │ - Recent │  │  [Entry 3]                            │   │
│  │ - Goals  │  │                                       │   │
│  │          │  │  [+ New Entry]                        │   │
│  └──────────┘  └─────────────────────────────────────┘   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### In-Session Interface

#### Layout

```
┌────────────────────────────────────────────────────────────┐
│  [Session: "Personal Growth Journey"]  [Leave Session]     │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase: Expand                         🟢 Live Session     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Facilitator Prompt:                                 │  │
│  │  "Select a card that represents your current         │  │
│  │   challenge and reflect on its meaning."             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Your Reflection (Visible to Facilitator)           │  │
│  │  ┌─────────────────────────────────────────────────┐│  │
│  │  │                                                   ││  │
│  │  │  [Text editor for reflection]                    ││  │
│  │  │                                                   ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │  [🔒 Make Private]  [Save Reflection]               │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Session Cards                                       │  │
│  │  [Card 1] [Card 2] [Card 3]                         │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Context Switching Experience

#### Automatic Mode Switching

```typescript
// When participant joins a session
onSessionJoin(sessionId: string) {
  // Detect session context
  const sessionContext = await this.getSessionContext(sessionId);
  
  // Show transition notification
  this.showNotification({
    type: 'info',
    message: 'Switching to in-session journal mode',
    duration: 2000
  });
  
  // Smooth transition
  await this.animateTransition('standalone', 'in_session');
  
  // Load session-specific data
  await this.loadSessionData(sessionContext);
  
  // Update UI
  this.renderInSessionInterface();
}

// When session ends
onSessionLeave(sessionId: string) {
  // Show transition notification
  this.showNotification({
    type: 'success',
    message: 'Session ended. Returning to your personal journal',
    duration: 3000
  });
  
  // Smooth transition
  await this.animateTransition('in_session', 'standalone');
  
  // Session entries now visible in standalone
  this.highlightNewEntries();
  
  // Update UI
  this.renderStandaloneInterface();
}
```

---

## Success Metrics

### User Experience Metrics

**Seamless Switching**:
- 100% of users can switch modes without re-authentication
- <2 second transition time between modes
- 0% data loss during mode switching
- 95% user satisfaction with transition smoothness

**Mode Adoption**:
- 80% of participants use standalone journal outside sessions
- 90% of in-session participants create journal entries
- Average 5+ entries per participant per session
- 70% of session entries marked for facilitator visibility

### Technical Performance Metrics

**Authentication**:
- Single token works for both modes
- Token refresh seamless across mode switches
- 99.9% authentication success rate

**Data Synchronization**:
- <500ms sync latency for journal entries
- 99% sync success rate
- <1% conflict rate requiring manual resolution
- Zero data loss incidents

### Business Impact Metrics

**Engagement**:
- 50% increase in journal usage with dual-mode
- 40% increase in session participation
- 60% of participants continue journaling post-session
- 4.5/5 average satisfaction rating

---

## Conclusion

The dual-mode journal architecture provides a unified, seamless experience that supports both independent reflection and live session participation. Key achievements:

1. **Single Authentication**: No barriers between standalone and in-session use
2. **Context Awareness**: Journal adapts intelligently to current context
3. **Data Continuity**: Seamless access to all journal data across modes
4. **Privacy Control**: Granular control over content sharing
5. **Optimal UX**: Each mode optimized for its specific use case

This architecture ensures that the journal serves as a continuous companion for participants' personal growth journey, whether they're in a live training session or reflecting independently.

---

**Document Status**: ✅ Complete  
**Next Review**: January 2026  
**Maintained By**: Product & Engineering Teams  
**Questions**: product@pointsofyou.com

