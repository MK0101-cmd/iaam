# Training-Data Strategy (ethical, compounding, useful)

Owner: Miron Krokhmal

**What to collect (opt-in):**

- De-identified **transcripts**, **card selections**, prompt branches, engagement signals (talk time, reactions), pre/post micro-surveys.
- Facilitator **annotations** (what worked, what didn’t), selected **outcomes** (e.g., decision reached, conflict defused).

**Data quality loop**

- Prompt → **AI Suggestion** → Facilitator Accept/Edit → store as labeled example.
- Post-session quick label: “Which activities landed?” “Which card unlocked insight?”
- Build a taxonomy: *topic* (feedback, change, values), *population* (exec team, 9th graders), *setting* (remote/in-person), *outcome*.

**Privacy & consent**

- **Explicit opt-ins**, per-session recording toggles, automatic **PII scrubbing**, aggregation thresholds.
- Enterprise mode: data stays in tenant’s cloud; only **model gradients/embeddings** leave (or not at all with on-prem).

**KPIs for data**

- % sessions with consented capture, labeled suggestions per session, model “next-best-prompt” acceptance rate, outcome uplift vs. baseline.