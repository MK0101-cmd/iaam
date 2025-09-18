# Zoom Integration

Owner: Miron Krokhmal

# Where it fits in the current mockup

1. **Header (session toolbar) — “Meeting pill”**
- Add a compact control next to the timer:
    
    `Provider icon · Start/Join · status dot · overflow menu (…)`
    
- States: **Not scheduled** → **Scheduled** (link ready) → **Live** (recording on/off) → **Ended** (recordings available).
1. **Right rail → Copilot**
- Show a small card when a meeting is live: captions on/off, consent status, “Import transcript/recording” once ready.
1. **Left nav**
- Add **Integrations** (account-level): connect Zoom/Google, see connection health, choose default provider.
- Keep **Calendar**: one-click to add the session (with Meet/Zoom link auto-attached).
1. **Breakouts**
- Use your existing **Breakouts** modal; when provider=Zoom, offer “Sync to Zoom breakouts.”
- For Google Meet, show a note: “Breakouts require eligible Workspace edition; otherwise keep in-app breakouts.”

---

# Key facilitator flows

## A) Connect accounts (once)

- **Zoom**: OAuth install (user-level or account-level). Store tokens server-side.
- **Google Meet**: Use **Google Calendar API** to create events with `conferenceData` (type `hangoutsMeet`). Store tokens & refresh flow.

**UI:**

Left nav → **Integrations** page with “Connect Zoom” / “Connect Google” buttons and status badges.

## B) Create or attach a meeting to a session

- Click the **Meeting pill** → Modal:
    - **Provider**: Zoom | Google Meet (default = user preference)
    - **When**: Now | Schedule (date/time)
    - **Attendees**: pull from session roster
    - Toggles: “Recording on”, “Auto-transcribe (if supported)”, “Add to calendars”

**Back-end calls:**

- **Zoom**: POST `/users/me/meetings` → store `join_url`, `start_url`, `id`, `password`.
- **Meet**: POST Calendar Event with `conferenceData.createRequest` → read back `hangoutLink`, `eventId`.

## C) Start / Join during session

- **Host** sees **Start** (Zoom start_url) or “Open Meet” (event owner link).
- **Participants** see **Join** (join_url/hangoutLink).
- Always provide a **fallback**: “Open in app/new tab” if embed isn’t possible.

## D) Live captions & AI overlay

- **Zoom (Web SDK)** can be embedded; raw audio for external ASR is limited—use Zoom’s live transcription if allowed, or run a **companion mic** (lightweight WebRTC tab) to feed your ASR for AI nudges.
- **Meet** has no public, full **web embed**. Strategy: open Meet in a new tab/window, and use the **companion mic** overlay inside your app for live analytics, plus post-hoc ingestion (below).

## E) After the call: bring artifacts back

- **Zoom**: use webhooks (e.g., `recording.completed`) → fetch MP4/M4A/VTT/TTML → store in your bucket → attach to session summary.
- **Meet**: recordings drop into **Google Drive**; listen to Drive change notifications (or poll) → import MP4 + captions (if available). If no captions: run your own ASR offline.

# Technical integration notes (practical)

**Zoom**

- **Create**: `POST /users/me/meetings` (type=scheduled/instant).
- **Embed**: Zoom Web SDK for in-app view (best effort; still keep new-window fallback).
- **Transcripts/Recordings**: enable cloud recording+transcription; listen to `recording.completed` → pull assets.
- **Breakouts**: the host manages them in Zoom; you can pre-create via API for Pro+ accounts. Mirror your Breakouts panel and push assignments if host privilege allows.

**Google Meet**

- **Create**: Calendar API event with `conferenceData.createRequest.conferenceSolutionKey.type='hangoutsMeet'`.
- **Embed**: no reliable public web embed → deep-link to the Meet; keep your **companion mic** in-app for analytics.
- **Recordings**: arrive in Google Drive. Watch Drive changes (or poll) → import file + captions (if any).
- **Breakouts**: only in certain Workspace editions; don’t promise automation—show a “Manage in Meet” CTA.

**Companion mic (optional but powerful)**

- A tiny WebRTC tile in your app that participants can join (muted in main meeting). This feeds your **live ASR** for **emotional sensing + nudges**, regardless of provider limitations. Put a **consent banner** and make it opt-in.

---

# Consent & privacy UX (must-have)

- Show a **consent chip** on the header when recording/transcribing is enabled.
- Per-participant consent status in the **Participants** drawer.
- “Off-record” toggle (pauses your ASR + stops saving transcript chunks).

---

# Edge cases to handle

- Zoom license missing → disable “recording on” toggle with a tooltip.
- Meet created by someone else → you may only attach the link (no control).
- Token expired → Integrations page shows “Re-authenticate.”
- Air-gapped/on-prem → hide cloud options; use in-app WebRTC + your recorder.

---

# Minimal “happy-path” tests you’ll want (RTL/Vitest)

- Renders MeetingPill in all states (none/scheduled/live/ended).
- ScheduleMeetingModal: defaults to user provider; switches provider; returns correct payload.
- Copilot LiveMeetingCard toggles captions and fires import callback.
- Breakouts modal shows “Sync to Zoom” only when provider=Zoom.

---

If you want, I can **update the canvas code** to include:

- the **MeetingPill** in the header,
- a **ScheduleMeetingModal**,
- a **LiveMeetingCard** in the Copilot rail,
- and mock handlers (`createZoomMeeting`, `createMeetEvent`) you can later wire to your backend.