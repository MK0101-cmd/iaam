# “Daily Points” Tech High-level

Owner: Miron Krokhmal

# POI Engine for a Consumer Journaling & Reflection App

## 2.1 What the engine provides

- **Protocol-aware journaling flows** (legacy reflective cadence or goal-oriented GROW-like tracks).
- **AI reflective coaching**: open questions, reframes, scaling (“What would make it a 7/10?”), “values” prompts, weekly summaries.
- **Inspiration feed**: daily word/image/prompt from the Library, aligned to user goals.
- **Homework & habits**: small next steps, reminders, streaks; evidence capture.
- **Personal analytics (on-device first)**: mood trend, confidence delta, theme clustering (privacy-preserving).

## 2.2 Mobile architecture (iOS/Android)

- **Offline-first**: local encrypted store (SQLCipher/Keychain/Keystore); background sync.
- **On-device AI where possible** (classification, embedding) + **cloud LLM** for heavier generation (toggle by user).
- **Privacy controls**: per-entry visibility (private, shareable link, coach share in paid plan).
- **Push nudges** aligned to protocol step and homework due.
- **SDK hooks** from the engine:
    - `engine.startProtocol(trackId, goal?)`
    - `engine.reflect(promptId?)`
    - `engine.nextAction()`
    - `engine.summary(period)`
    - `engine.sync()`

## 2.3 Growth & retention loops

- **Weekly reflection pack** → AI summary + suggested next step.
- **Milestones** when moving from “share” → “reflection” → “action” steps.
- **Inspiration streaks** + gentle breaks: encourage silence days.

## 2.4 Monetization/tiers (example)

- Free: journaling, daily inspiration, basic prompts.
- Plus: goal-oriented protocols, homework planner, weekly AI summaries.
- Pro: share with a coach, export, advanced analytics, pin-protected spaces.