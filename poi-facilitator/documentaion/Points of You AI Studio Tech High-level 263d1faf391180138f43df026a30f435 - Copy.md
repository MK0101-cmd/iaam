# Points of You AI Studio Tech High-level

Owner: Miron Krokhmal

## 0) High-level goals

- **Improve facilitation quality** with AI nudges grounded in **emotional sensing**, **active listening**, **open questions**, and **reflective prompts**—without hijacking the human flow.
- **Make outcomes measurable** (open-Q ratio, talk-time balance, affect, completed reflections/actions).
- **Meet enterprise needs** (privacy, consent, auditability, future on-prem option).
- **Span contexts**: solo facilitator prep & reporting, live sessions (facilitator + participants), participant homework/journaling, and mobile inspiration.

---

## 1) Core Modules (product & platform)

### A. Client Apps

1. **Facilitator Web Console**
    - Views: **Session**, **Library**, **Reports**, **Participant**.
    - Controls: Meeting pill (Zoom/Meet), agenda, timer, breakout rooms (2–4), AI Copilot/nudges, signals, safety/consent.
    - Assets: Prompt & content library; broadcast prompts; in-room help; transcript import.
2. **Participant Web**
    - Live session surface (minimal controls), **homework**, **shared journal**, guided reflections, AI assistance for open questions and reframes.
3. **Mobile Apps (iOS/Android)**
    - **Personal journaling**, micro-reflections, **AI inspiration** (word of the day, reframes), offline drafts → sync, push reminders.
4. **Facilitator Companion**
    - Quick actions during live facilitation (open prompt, start breakouts, broadcast, mark off-record, accept/dismiss nudge).

### B. Session & Content

1. **Protocol Engine**
    - Encodes **POI legacy protocols** (e.g., Warm-up → Pick a card → Share → Reflection → Action) and **goal-oriented protocols** (e.g., GROW-style coaching; HR check-ins; conflict mediation).
    - Represents steps, timers, instructions, rubrics, **automations** (e.g., schedule breakouts; trigger prompts when signal drops).
    - Supports **variants** for social/personal/HR contexts.
2. **Prompt & Library Service**
    - Typed items: word, image, prompt, exercise, deck; **tags** and **templates**.
    - Search, curation, versioning; **Use in session** injection.
3. **Homework & Journal Service**
    - Homework items (title, due, notes, status), **shared journal** entries (date, text, visibility).
    - Per-participant summaries for facilitators; export to CSV/PDF.

### C. Realtime AI & Signals

1. **ASR Gateway**
    - Pluggable providers (e.g., Whisper/NeMo/Vosk/private vendor), **speaker diarization**, timestamps.
    - Consent gating & PII redaction policies.
2. **Signals Engine**
    - Computes **open-question ratio**, **talk-time balance**, **valence/arousal proxy** (from paralinguistic cues and language), overlap/interruptions, sentiment shifts.
    - Emits normalized metrics and thresholds (e.g., “open-Q < 20% for 2 min”).
3. **Nudge Orchestrator**
    - Uses metrics + **Protocol context** + **Prompt Library** + LLM to generate **contextual nudges**:
        - Facilitator: “Invite a ‘how’ question,” “Reflect & validate,” “Brief silence.”
        - Participant: reflective prompt; scaling question; values alignment.
        - Group: “Share one insight from your card,” timed pauses, poll.
    - Controls: **Accept / Edit / Dismiss**; cooldowns; difficulty levels.
4. **LLM Layer**
    - **Guardrails** (tone, safety), **few-shot** prompt packs per protocol, **tool use** (insert prompts, start timer, create homework).
    - **Small models** for fast classification/routing; **general LLM** for generation; optional **RAG** over past sessions/journals.

### D. Integrations

- **Zoom / Google Meet** (create/attach, start/join, captions toggle, recording import).
- **Google Calendar** (scheduling with Meet links), **Drive/Zoom cloud** for recordings.
- **SSO / SCIM** for enterprise identity & provisioning.
- **Notifications**: email, mobile push.

### E. Analytics & Reporting

- **KPI store**: session- and participant-level time series.
- Dashboards: **Session insights**, **cohort trends**, **per-participant report** (as in canvas).
- Export: CSV/PDF; admin audit logs.

### F. Safety, Consent, Compliance

- **Consent Manager** (per session, per track: audio, captions, nudges).
- **Privacy zones**: off-record segments; redact or exclude from models.
- **Policy checks**: distress, harassment, sensitive content flags; escalation workflows.

---

## 2) Data Model (high-level entities)

- **User**(role: facilitator, participant, org admin)
- **Org / Cohort**
- **Protocol** (steps, timers, triggers, rubrics)
- **Session** (agenda, provider links, consent records, breakouts)
- **BreakoutRoom** (members, timer)
- **LibraryItem** (word/image/prompt/exercise, tags)
- **Nudge** (title, reason, suggestion, difficulty, cooldown, status)
- **SignalSnapshot** (open-Q %, talk-time, affect, overlap, timestamp)
- **HomeworkItem** (title, due, notes, done)
- **JournalEntry** (text, date, visibility)
- **TranscriptSegment** (speaker, text, time, redaction flags)
- **Insight** (LLM-generated summary/action)
- **Report** (rollups, exports)

---

## 3) Operation Modes (capabilities & flows)

### Mode 1 — **Facilitator alone**

*(Planning, Reporting, Homework review, AI assistance & insights)*

- **Planning**
    - Pick a **protocol** (legacy or goal-oriented) → configure agenda, timers, prompts.
    - Build a **content set** from the Library (words, images, exercises).
    - Schedule with **Zoom/Meet**; attach roster; pre-consent brief.
- **AI co-planning**
    - Suggest agenda timings, open questions aligned with goals.
    - Risk scan: sensitive segments to handle with care; suggested language.
- **Reporting**
    - Pull **signals**: open-Q ratio, talk-time equity, valence/arousal trend.
    - Auto-summaries by step; highlight turning points.
    - Export **participant homework** status and **shared journal** highlights.
- **Homework review & analysis**
    - Per-participant dashboard (completion %, insight density, themes).
    - AI flags patterns (“values language ↑; avoidance terms ↓”).
- **Outcomes insights**
    - Protocol-specific rubrics → “evidence of progress” snippets; suggested next steps.

### Mode 2 — **Facilitator + Participants in session**

*(AI assistance to Facilitator, Participant, and Working Group)*

- **Facilitator assistance**
    - Realtime **nudges** driven by signals + protocol context.
    - One-click broadcast prompts; manage **breakouts** (2–4 members).
- **Participant assistance**
    - Private micro-prompts (“Start with ‘I notice…’”), scaling questions, reframes.
    - Accessibility: captions; simple UI (mute/video/share).
- **Working group assistance**
    - Breakout room assignment prompt; timer; in-room chat with suggested open questions.
    - Group-level cues: invite silence, rotate speaking, reflect themes.
- **Artifacts**
    - Consent-aware transcript; off-record parts excluded.
    - End-of-session summary; suggested **homework** prefilled; capture **shared actions**.

### Mode 3 — **Participant homework & personal journaling (with AI)**

- **Homework**
    - See tasks, due dates; mark done; submit reflections; AI feedback (“What makes it a point higher than before?”).
    - Facilitator sees rollup and can comment.
- **Personal journal**
    - Freeform entries; **AI reflective prompts** and **inspiration**.
    - Controls for **privacy** (private vs shared with facilitator).
- **Insights to facilitator**
    - With consent, themes and progress markers surface in the next plan.

### Mode 4 — **Mobile Apps (iOS/Android)**

*(Personal journaling, AI assistance, inspiration)*

- **Quick capture**
    - 30-second micro-reflections, voice-to-text (on-device ASR if available, else cloud).
- **Inspiration feed**
    - Daily word/image/prompt aligned with active protocol (“Values”, “Action”).
- **Offline-first**
    - Local drafts; encrypted sync; push nudges aligned to goals & due homework.

---

## 4) POI Protocols — Legacy & Goal-Oriented

### Legacy POI Protocols (heritage, human-centered)

- **Structure**: *Warm-up → Pick a card → Share → Reflection → Action.*
- **Use cases**
    - **Social**: community circles, team bonding, retrospectives.
    - **Personal**: life transitions, relationship check-ins.
- **AI augmentation**
    - Curate cards/words/images; propose **reflective prompts** and **validations**.
    - Encourage **open questions** and moments of **silence**; measure open-Q ratio and affect drift.

### Goal-Oriented Protocols (outcome-driven, HR-ready)

- **Structure**: goal definition → options → obstacles → next action → commitment (GROW-like).
- **Use cases**
    - **HR / Org**: 1:1s, onboarding, performance/OKR check-ins, conflict mediation, change management.
    - **Personal**: habit formation, career planning, resilience training.
- **AI augmentation**
    - Map conversation to **goal frames**; generate **SMART** actions; track confidence (1–10 scaling); recommend **next micro-step**.
    - Produce **HR-grade summaries** with **evidence** snippets and **follow-up tasks**.

> The Protocol Engine makes both families first-class: each protocol is a versioned artifact with steps, timing, prompts, rubrics, safety notes, and automation triggers that the Nudge Orchestrator can call.
> 

---

## 5) Interfaces & Events (sketch)

- **GraphQL/REST**
    - `GET /protocols`, `POST /sessions`, `POST /sessions/{id}/breakouts`
    - `POST /sessions/{id}/nudge:accept|dismiss`
    - `POST /participants/{id}/homework`, `POST /participants/{id}/journal`
    - `GET /reports/session/{id}`, `GET /reports/participant/{id}`
- **WebSocket/RTC (realtime)**
    - Channels: `session:{id}:signals`, `session:{id}:nudges`, `room:{id}:chat`.
- **Event bus (pub/sub)**
    - `asr.segment.created`, `signal.snapshot.ready`, `nudge.created`, `homework.updated`, `journal.created`, `recording.imported`, `consent.updated`.

---

## 6) Architecture & Deployment

### Services

- **Gateway/API** (authN/authZ, rate limits).
- **Session Orchestrator** (state machine per session; breakouts).
- **ASR Gateway** (provider plugins; diarization; redaction).
- **Signals Engine** (stream processing; feature extraction).
- **Nudge Orchestrator** (LLM tools; policy guardrails).
- **Protocol/Library Service** (CRUD, search).
- **Participant Data** (homework/journal).
- **Reporting** (rollups; exports).
- **Integration Hub** (Zoom/Meet/Calendar/Drive; webhooks).
- **Safety & Consent** (policies, audits).

### Data

- **Relational DB** (sessions, users, protocols, homework, journal).
- **Vector DB** (semantic search over transcripts/journals/library).
- **Object Store** (media, recordings, exports).
- **Stream** (Kafka/PubSub) for realtime pipelines.

### Enterprise & On-prem Ready

- **Isolation**: single-tenant DB option, private object store, dedicated LLM endpoints.
- **BYOK** (customer-managed keys), **VPC peering**, **no egress** mode.
- **LLM flexibility**: cloud (OpenAI/Azure) vs **self-hosted** (Llama, Mistral) with retrieval.
- **IaC**: Terraform/Helm; **observability**: OpenTelemetry + SIEM hooks.

---

## 7) Privacy, Safety, Ethics

- **Consent first** (recording, captions, AI analysis). Off-record respected end-to-end.
- **Data minimization** + **PII redaction** in transcripts.
- **Role-based visibility** (participant’s private journal stays private unless explicitly shared).
- **Transparent AI** (nudges are suggestions; editable; logged).
- **Compliance hooks** (SOC2 path; data residency options).

---

## 8) KPIs & Quality Loops

- **In-session**: open-Q %, talk-time equity, affect drift, interruption rate, nudge acceptance.
- **Participant**: homework completion, journal cadence, “confidence delta” (scaling).
- **Program**: goal attainment signals, retention, satisfaction (CSAT), manager feedback (HR).

**Continuous improvement**: human feedback on nudges/prompts → retrain prompt packs & selectors; protocol A/B (legacy vs goal-oriented variants).

---

## 9) Example End-to-End Flows

1. **Live nudge loop (facilitator)**
    - Audio → ASR → Segments + diarization → Signals (open-Q low) → Nudge Orchestrator chooses **“Invite a ‘how’”** → UI shows nudge → Accept → Broadcast prompt → Signals improve.
2. **Participant homework**
    - Session end → auto-proposed tasks from protocol rubric → participant refines in app → mobile reminders → journal reflections → facilitator sees trend before next session.
3. **HR check-in protocol**
    - Goal-oriented protocol selected → agenda & prompts tailored to 1:1 → LLM drafts summary with **evidence** (quotes) + **actions** → export to HRIS ticket or PDF.

---

## 10) What to build next (low-lift, high impact)

- **“Use in session” wiring** (from Library to live Stage).
- **Reports → drilldown** for single session and per-participant trend.
- **CSV/PDF exports** for homework/journal/reports.
- **Local persistence** (mobile & web) for journal/homework; optional org retention controls.
- **Admin center** (SSO/SCIM, data residency, on-prem toggles, BYOK).

## 11) System additions (tech)

- **New services**
    - **Partner API Gateway** (quotas, analytics per tenant, API keys/OAuth clients).
    - **Embed Service** for signed widget tokens + theming.
    - **Consumer Engine** runtime (mobile sync, inspiration scheduler, on-device inference adapters).
- **Data model extensions**
    - `Tenant`, `ApiClient`, `UsageMeter`, `EmbedTheme`, `MobileDevice`, `GoalTrack`.
- **Policies**
    - **FERPA/GDPR aware** modes for education; HR privacy constraints; consumer app “local-only” mode.
    - **Protocol packs per vertical** (education, HR, personal wellness), versioned with migrations.