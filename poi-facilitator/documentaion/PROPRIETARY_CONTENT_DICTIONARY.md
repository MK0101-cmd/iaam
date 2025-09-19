# Points of You AI Studio - Proprietary Content Dictionary

## Document Overview

This comprehensive dictionary documents all proprietary content types used in the Points of You AI Studio platform. Each content type is defined with its purpose, dependencies, use cases, and technical specifications to guide development and implementation.

## Table of Contents

1. [Core Content Categories](#core-content-categories)
2. [Thematic Cards](#thematic-cards)
3. [Journey Elements](#journey-elements)
4. [Session Content Types](#session-content-types)
5. [AI-Generated Content](#ai-generated-content)
6. [Multilingual Content](#multilingual-content)
7. [Analytics and Metadata](#analytics-and-metadata)
8. [Content Licensing and Access](#content-licensing-and-access)

---

## Core Content Categories

### 1. Thematic Cards
**Type**: `thematic_card`  
**Purpose**: Core visual and conceptual elements that represent fundamental life themes in the Points of You methodology.

#### Structure
```typescript
interface ThematicCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'visual' | 'concept' | 'action' | 'reflection';
  themes: string[];
  gradient: string;
  keywords: string[];
  inspirationStory?: string;
}
```

#### 14 Core Thematic Cards
1. **Solutions** - Problem-solving and creative answers
2. **Learning** - Growth through curiosity and experience
3. **Everything is Possible** - Unlimited potential and opportunities
4. **Should Be** - Expectations and ideals we hold
5. **Choice** - The power of decision and responsibility
6. **Calling** - Discovering true purpose and inner voice
7. **Just Be** - The art of presence and mindful existence
8. **Pause** - Taking time to reflect and breathe
9. **Devotion** - Deep commitment and dedication
10. **Leadership** - Guiding others and taking initiative
11. **Points of View** - Multiple perspectives and open-mindedness
12. **Intimacy** - Deep connection and authentic relationships
13. **Balance** - Finding equilibrium between life aspects
14. **Success** - Achievement and reaching goals

#### Dependencies
- Image assets in `/cards/` directory
- Multilingual translation files
- AI semantic embeddings for recommendations
- Usage analytics tracking

#### Use Cases
- Participant card selection in live sessions
- Journey building and phase construction
- AI coach content recommendations
- Reflection prompts and exercises
- Visual storytelling and metaphor exploration

---

### 2. Content Items
**Type**: `content_item`  
**Purpose**: Individual pieces of content associated with thematic cards, including stories, questions, quotes, and supplementary material.

#### Structure
```typescript
interface POYContentItem {
  id: string;
  card_title: string;
  content_kind: ContentKind;
  content_text: string;
  author_or_source?: string;
  image_file?: string;
  themes: string[];
  emotional_resonance: string[];
  usage_context: string[];
  license: ContentLicense;
  access_tier: ContentTier;
  creator_attribution: string;
  usage_analytics: ContentUsageAnalytics;
}
```

#### Content Kinds
1. **reflection_or_quote** - Inspirational stories, quotes, and reflective statements
2. **story_source** - Attribution for stories (Folk tale, Zen story, Sufi tale, etc.)
3. **citation_or_author** - Author attributions and sources
4. **question** - Reflective questions for self-inquiry
5. **other** - Continuation text and supplementary content

#### Dependencies
- Thematic card associations
- Licensing and attribution requirements
- Multilingual content translation
- AI processing for semantic analysis

#### Use Cases
- AI coach conversation content
- Reflection prompts generation
- Story-based learning experiences
- Quote and inspiration delivery
- Contextual content recommendations

---

## Journey Elements

### 3. Journey Phases
**Type**: `journey_phase`  
**Purpose**: Structural framework for organizing session content into meaningful progression stages.

#### Four Core Phases
1. **Pause** - Initial reflection and centering
2. **Expand** - Broadening perspectives and exploration
3. **Focus** - Narrowing down to key insights
4. **Doing** - Action planning and implementation

#### Structure
```typescript
interface JourneyPhase {
  name: "Pause" | "Expand" | "Focus" | "Doing";
  description: string;
  elements: JourneyElement[];
  duration?: number; // in minutes
  objectives: string[];
  facilitation_notes?: string;
}
```

#### Dependencies
- Element library for phase content
- Time management system
- Progress tracking
- Phase transition logic

#### Use Cases
- Journey builder interface
- Session flow management
- Progress monitoring
- Facilitator guidance

---

### 4. Journey Elements
**Type**: `journey_element`  
**Purpose**: Individual components that can be added to journey phases to create structured learning experiences.

#### Six Element Types
1. **Word** - Single words or concepts for reflection
2. **Prompt** - Questions or statements to stimulate thinking
3. **Exercise** - Structured activities or practices
4. **Deck** - Collections of cards or materials
5. **Template** - Reusable frameworks or structures
6. **Visual** - Images, diagrams, or visual aids

#### Structure
```typescript
interface JourneyElement {
  id: string;
  type: "word" | "prompt" | "exercise" | "deck" | "template" | "visual";
  title: string;
  description: string;
  content: ElementContent;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  created_by: string;
  organization_id?: string;
  is_public: boolean;
}
```

#### Dependencies
- Content library system
- User permissions and access control
- Multilingual support
- Element validation and testing

#### Use Cases
- Drag-and-drop journey building
- Element library browsing
- Session customization
- Template creation and sharing

---

## Session Content Types

### 5. Session Protocols
**Type**: `session_protocol`  
**Purpose**: Structured frameworks for conducting Points of You sessions with specific methodologies and approaches.

#### Structure
```typescript
interface SessionProtocol {
  id: string;
  name: string;
  description: string;
  methodology: string;
  phases: ProtocolPhase[];
  duration: number;
  participant_limit: number;
  requirements: string[];
  outcomes: string[];
  facilitator_notes: string;
}
```

#### Dependencies
- Journey phase definitions
- Element library
- Participant management
- Time tracking system

#### Use Cases
- Session planning and preparation
- Facilitator training and guidance
- Methodology standardization
- Quality assurance

---

### 6. Participant Data
**Type**: `participant_data`  
**Purpose**: Real-time information about participant engagement, selections, and reflections during live sessions.

#### Structure
```typescript
interface ParticipantCard {
  id: string;
  name: string;
  status: "selecting" | "reflecting" | "completed" | "away";
  selectedCard?: ThematicCard;
  reflection?: string;
  avatar: string;
  lastActivity: string;
  engagement_level: number;
  breakout_room?: string;
}
```

#### Dependencies
- Real-time communication system
- Card selection interface
- Avatar generation system
- Engagement analytics

#### Use Cases
- Live session monitoring
- Breakout room management
- Engagement tracking
- Progress assessment

---

### 7. Session Analytics
**Type**: `session_analytics`  
**Purpose**: Data collection and analysis of session effectiveness, participant engagement, and learning outcomes.

#### Structure
```typescript
interface SessionAnalytics {
  session_id: string;
  talk_time_balance: { name: string; percentage: number }[];
  open_question_ratio: number;
  emotional_valence: number;
  arousal_level: number;
  participation_rate: number;
  engagement_score: number;
  card_selection_patterns: CardSelectionPattern[];
  reflection_insights: ReflectionInsight[];
  facilitator_effectiveness: number;
}
```

#### Dependencies
- Real-time data collection
- AI analysis algorithms
- Participant tracking
- Video/audio processing

#### Use Cases
- Session improvement
- Facilitator feedback
- Learning outcome measurement
- Platform optimization

---

## AI-Generated Content

### 8. AI Coach Responses
**Type**: `ai_coach_response`  
**Purpose**: Contextual, intelligent responses generated by AI to support participant reflection and learning.

#### Structure
```typescript
interface AICoachResponse {
  id: string;
  participant_id: string;
  session_id?: string;
  input_text: string;
  response_text: string;
  response_type: 'question' | 'insight' | 'encouragement' | 'guidance';
  confidence_score: number;
  content_sources: string[];
  emotional_tone: string;
  generated_at: Date;
}
```

#### Dependencies
- Large Language Model integration
- POY content database
- Participant context
- Response validation system

#### Use Cases
- Real-time coaching support
- Reflection guidance
- Personalized learning
- 24/7 participant support

---

### 9. Content Recommendations
**Type**: `content_recommendation`  
**Purpose**: AI-powered suggestions for cards, exercises, and content based on participant behavior and context.

#### Structure
```typescript
interface ContentRecommendation {
  id: string;
  participant_id: string;
  recommended_content: ContentItem[];
  recommendation_type: 'card' | 'exercise' | 'prompt' | 'story';
  confidence_score: number;
  reasoning: string;
  context_factors: string[];
  generated_at: Date;
}
```

#### Dependencies
- Machine learning algorithms
- User behavior data
- Content similarity analysis
- Recommendation engine

#### Use Cases
- Personalized content discovery
- Learning path optimization
- Engagement enhancement
- Content library navigation

---

### 10. Reflection Prompts
**Type**: `reflection_prompt`  
**Purpose**: AI-generated questions and prompts designed to stimulate deep reflection and self-inquiry.

#### Structure
```typescript
interface ReflectionPrompt {
  id: string;
  prompt_text: string;
  prompt_type: 'open_ended' | 'scenario' | 'metaphor' | 'challenge';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  themes: string[];
  emotional_resonance: string[];
  usage_context: string[];
  generated_by: 'ai' | 'human' | 'hybrid';
  effectiveness_score?: number;
}
```

#### Dependencies
- POY methodology knowledge
- Participant context
- Prompt effectiveness tracking
- Multilingual generation

#### Use Cases
- Journal writing prompts
- Session discussion starters
- Personal reflection exercises
- Group facilitation tools

---

## Multilingual Content

### 11. Translation Keys
**Type**: `translation_key`  
**Purpose**: Hierarchical keys for organizing and managing multilingual content across all supported languages.

#### Structure
```typescript
interface TranslationKey {
  key: string; // e.g., "common.save", "facilitator.console.title"
  namespace: string;
  hierarchy: string[];
  context: string;
  description: string;
  is_required: boolean;
  fallback_value: string;
}
```

#### Supported Languages
- English (en) - Default
- Spanish (es) - Español
- French (fr) - Français
- German (de) - Deutsch
- Hebrew (he) - עברית (RTL support)

#### Dependencies
- i18next configuration
- Translation management system
- RTL layout support
- Locale-specific formatting

#### Use Cases
- UI internationalization
- Content localization
- Cultural adaptation
- Accessibility compliance

---

### 12. Localized Content
**Type**: `localized_content`  
**Purpose**: Language-specific versions of content that respect cultural nuances and linguistic patterns.

#### Structure
```typescript
interface LocalizedContent {
  content_id: string;
  language: string;
  translated_text: string;
  cultural_adaptations: string[];
  rtl_support: boolean;
  locale_specific_formatting: LocaleFormatting;
  translation_quality: number;
  last_updated: Date;
}
```

#### Dependencies
- Professional translation services
- Cultural consultation
- RTL layout system
- Quality assurance processes

#### Use Cases
- Global user experience
- Cultural sensitivity
- Legal compliance
- Market expansion

---

## Analytics and Metadata

### 13. Content Usage Analytics
**Type**: `content_usage_analytics`  
**Purpose**: Tracking and analysis of how content is used, accessed, and effective across the platform.

#### Structure
```typescript
interface ContentUsageAnalytics {
  content_id: string;
  content_type: string;
  total_views: number;
  unique_users: number;
  engagement_time: number;
  completion_rate: number;
  user_feedback_score: number;
  most_effective_contexts: string[];
  usage_trends: UsageTrend[];
  last_accessed: Date;
}
```

#### Dependencies
- Analytics collection system
- User behavior tracking
- Data processing pipeline
- Reporting dashboard

#### Use Cases
- Content optimization
- Usage pattern analysis
- ROI measurement
- Feature development

---

### 14. Semantic Embeddings
**Type**: `semantic_embedding`  
**Purpose**: Vector representations of content for AI-powered similarity matching and recommendations.

#### Structure
```typescript
interface SemanticEmbedding {
  content_id: string;
  embedding_vector: number[];
  model_version: string;
  dimensions: number;
  created_at: Date;
  similarity_threshold: number;
  related_content: string[];
}
```

#### Dependencies
- Machine learning models
- Vector database
- Similarity algorithms
- Content preprocessing

#### Use Cases
- Content recommendations
- Similarity search
- Clustering and categorization
- AI-powered discovery

---

## Content Licensing and Access

### 15. Content Licenses
**Type**: `content_license`  
**Purpose**: Legal and usage rights management for all proprietary content types.

#### License Types
1. **OPEN** - Public domain or open source
2. **ATTRIBUTION** - Requires attribution
3. **COMMERCIAL** - Commercial use allowed
4. **PROPRIETARY** - Restricted proprietary use
5. **POY_LICENSED** - Points of You licensed content

#### Structure
```typescript
interface ContentLicense {
  license_type: LicenseType;
  attribution_required: boolean;
  commercial_usage: boolean;
  modification_allowed: boolean;
  redistribution_allowed: boolean;
  ai_training_allowed: boolean;
  api_access_allowed: boolean;
  expiration_date?: Date;
  usage_restrictions: string[];
}
```

#### Dependencies
- Legal compliance system
- Usage tracking
- Attribution management
- Revenue sharing

#### Use Cases
- Content protection
- Legal compliance
- Revenue management
- Usage monitoring

---

### 16. Access Tiers
**Type**: `access_tier`  
**Purpose**: Hierarchical access control system for different user types and subscription levels.

#### Tier Levels
1. **FREE** - Basic access to limited content
2. **PROFESSIONAL** - Full access to POY content
3. **ENTERPRISE** - Organization-wide access
4. **OFFICIAL_POY** - Licensed POY facilitator access

#### Structure
```typescript
interface AccessTier {
  tier_name: string;
  content_access: string[];
  feature_permissions: string[];
  usage_limits: UsageLimits;
  pricing: PricingTier;
  benefits: string[];
}
```

#### Dependencies
- User authentication
- Subscription management
- Permission system
- Billing integration

#### Use Cases
- Revenue generation
- Content protection
- User segmentation
- Feature gating

---

## Content Relationships and Dependencies

### Content Hierarchy
```
Thematic Cards (14 core cards)
├── Content Items (stories, questions, quotes)
├── Journey Elements (6 types)
├── Session Protocols
└── AI-Generated Content
    ├── Coach Responses
    ├── Recommendations
    └── Reflection Prompts

Multilingual Layer
├── Translation Keys
└── Localized Content

Analytics Layer
├── Usage Analytics
└── Semantic Embeddings

Legal Layer
├── Content Licenses
└── Access Tiers
```

### Cross-Content Dependencies
- **Cards ↔ Elements**: Cards can be used as elements in journeys
- **Content ↔ AI**: All content feeds into AI recommendation systems
- **Multilingual ↔ All**: All content types require translation support
- **Analytics ↔ All**: All content generates usage and engagement data
- **Licensing ↔ All**: All content requires appropriate licensing

---

## Implementation Guidelines

### Content Creation Workflow
1. **Content Planning** - Define purpose, audience, and objectives
2. **Content Development** - Create content following POY methodology
3. **Multilingual Translation** - Translate and culturally adapt
4. **AI Integration** - Generate embeddings and prepare for AI processing
5. **Licensing Review** - Ensure proper rights and attribution
6. **Quality Assurance** - Test across all supported languages and contexts
7. **Deployment** - Release with appropriate access controls

### Technical Requirements
- **Database Schema** - Normalized structure supporting all content types
- **API Design** - RESTful endpoints for content access and management
- **Caching Strategy** - Efficient content delivery and performance
- **Search Capabilities** - Full-text and semantic search across all content
- **Version Control** - Content versioning and change management
- **Backup and Recovery** - Comprehensive data protection

### Quality Standards
- **Content Accuracy** - Factual correctness and methodological alignment
- **Translation Quality** - Professional translation with cultural sensitivity
- **AI Integration** - Accurate embeddings and effective recommendations
- **Performance** - Fast loading and responsive user experience
- **Accessibility** - WCAG compliance and inclusive design
- **Security** - Proper access controls and data protection

---

## Conclusion

This comprehensive dictionary provides the foundation for implementing and managing all proprietary content types in the Points of You AI Studio platform. Each content type is designed to support the core POY methodology while enabling AI-powered personalization and multilingual accessibility.

The content architecture supports scalable growth, maintains intellectual property rights, and ensures high-quality user experiences across all supported languages and cultural contexts.

Regular updates to this dictionary will ensure it remains aligned with evolving platform requirements and user needs.
