# Example integration flows

Owner: Miron Krokhmal

## **LMS adds reflection journaling to a course**

1. LMS launches LTI link → `POST /runs` with `protocol_id: legacy:reflection`.
2. Widget `<PoiJournalingWidget/>` renders for each learner; entries stored with `visibility:self`.
3. xAPI statements emitted; instructor sees cohort heatmap of reflection cadence.

**HR platform enriches 1:1s**

1. HRIS provisions users via SCIM; SSO enabled.
2. 1:1 agenda starts from **goal-oriented protocol**; signals collected (with consent).
3. AI summary with evidence + homework posted back to HRIS note.

**Consumer app daily loop**

1. Engine pushes “Inspiration” at 8am; user writes 30 seconds;
2. Evening: `engine.summary("day")` → short reflection + 1 action;
3. Weekly: goal check-in, confidence scaling, trend view.