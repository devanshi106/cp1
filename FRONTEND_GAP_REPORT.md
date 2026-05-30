# Frontend Gap Report — Reference Template vs. Current Implementation

**Reference (source of truth):** `FrontendReference/stitch_vibrant_dark_faq_hub/` — a Google Stitch design kit, theme **"Frozen Precision"** (8 HTML mockups + screenshots + `DESIGN.md`).
**Current implementation:** `client/src/` (React + Vite, 18 pages/components, `styles.css`).
**Date:** 2026-05-30 · **Purpose:** identify every feature/button present in the reference but **not** (or only partially) implemented in the current code.

> **How to read this:** Each gap is tagged with a **Backend status** because I audited the API in the previous task and can tell you exactly what the server already supports. That tells you which gaps are *pure frontend work* vs. which need new backend endpoints/fields.
> - 🟢 **Backend ready** — API/data already exists; this is frontend-only work.
> - 🟡 **Backend partial** — some data exists; needs a small endpoint/field or client-side derivation.
> - 🔴 **Backend missing** — a new model/endpoint is required.

---

## 1. The big picture (whole-app deltas)

| Dimension | Reference ("Frozen Precision") | Current | Gap |
|---|---|---|---|
| **Theme** | Light / "Glacial Light" — white canvas, glacial-blue accents (`#0284C7`/`#7DD3FC`), slate text (`#0F172A`) | **Dark** (`--bg:#0f1115`, blue `#4f7cff`) | Full re-theme to light + new color tokens |
| **Font** | **Inter** (display/headline/body/label scale) | `system-ui` | Add Inter + the type scale from `DESIGN.md` |
| **Navigation** | **Left sidebar** app shell (persistent nav + brand + "New Entry" + Settings/Support footer) + top bar | **Top navbar** only | Restructure layout into a sidebar shell |
| **Top bar** | Global knowledge-base search, centered logo, notification bell, **user avatar** | Brand + links + "Hi, name" + bell | Add global search + avatar |
| **Borders/elevation** | 1px hairline borders (`#E2E8F0`), no shadows, glassmorphic blur on modals | Dark surfaces + borders | New card/border styling, 8px spacing rhythm |
| **Shape** | 4px (controls) / 8px (cards) radius | 10px radius | Token change |
| **Avatars** | User avatars everywhere (forum, threads, top bar) | None (text names only) | 🔴 No `avatar`/image field on User — use initials or add field |

---

## 2. Net-new features in the reference (NOT in current code) — the headline list

These are the concrete **features/buttons** in the reference that have no equivalent in the current UI.

### App shell
1. **Left sidebar navigation** with branded header ("Knowledge Hub / Internal Repository") — 🟢 frontend.
2. **"+ New Entry" primary sidebar button** (create question/entry) — 🟢 maps to `/ask`.
3. **Sidebar footer: "Settings" + "Support" links** — 🔴 **no Settings or Support page exists.** A Settings page would need a **profile/notification-prefs update endpoint** (the `notification_prefs` field exists on the User model but there is **no API to read/update it**). Support has no backend (static/help page).
4. **Global top-bar search** across the whole knowledge base — 🟡 separate `/queries?q=` and `/faq/search` endpoints exist, but **no unified search**; combine client-side or add a search endpoint.
5. **User avatar in the top bar** (with menu) — 🔴 no avatar field (use initials).

### Home dashboard
6. **Three action cards** — "Ask the Assistant", "Browse the FAQ", "Ask the Community" — 🟢 link to chatbot/FAQ/forum (all exist).
7. **Reputation ring** — circular progress with point total — 🟢 `points` exists.
8. **Level / tier system** — "Senior Contributor · Level 12", "550 pts to Master" — 🟡 backend has **points + 4 badge tiers** (Helper/Contributor/Expert/Legend) but **no numeric "Level" or "Senior Contributor/Master" naming or "pts-to-next" calc** — derive client-side from points/thresholds, or add to the profile API.
9. **"Recent Badges" strip** on the dashboard — 🟢 badges exist (via profile/me).
10. **"N-day streak" chip** in the header — 🟢 `login_streak` exists (currently only shown in `GreetingBanner`).
11. **"Recent Activity" feed** (e.g. "Updated Server Migration Guide", tags: *Published / Comment / Saved*) — 🔴 **no activity-feed endpoint exists.** Needs a new endpoint that aggregates the user's recent queries/answers/saves (and a "saved" concept — see #16).

### FAQ browse
12. **Category accordions with per-category article counts** (e.g. "Data Integration & APIs · 24 Articles") — 🟢 `listFaqs` groups by category; counts derivable.
13. **"PROMOTED FROM Q&A" tag** on promoted entries — 🟢 `source === 'qa'` exists (current shows plain "From the community" text; restyle as a tag).
14. **"View all N articles" per-category expander** — 🟢 frontend (data already returned).
15. **"Still can't find the answer? → Open a Ticket" CTA** — 🟡 no ticket system; map to "Ask a Query" (`/ask`).
16. **Search "Semantic search is active" indicator** — 🟢 cosmetic; `searchFaqs` is already semantic.

### Community Forum (list)
17. **Filter bar: "All Categories" / "Any Tag" / "All Statuses" dropdowns** — 🟢 `listQueries` already accepts `category`, `tag`, `status` (just not surfaced in the UI).
18. **Sort dropdown ("Newest First", …)** — 🟡 backend only sorts newest-first; other sorts (most-voted/most-active) **not supported** — add sort params or limit to "Newest".
19. **Per-question vote count + answer count** in the card's left rail — 🔴 **`listQueries` does not return an answer count**, and **questions have no vote/score** (only answers have likes). Needs an aggregation (answer counts) and a decision on question voting (see #21).
20. **Pagination control (1, 2, 3, …)** — 🟢 API returns `total/page/limit`; **no pagination UI today** (current list shows only the first page).
21. **Body excerpt + author avatar + "time ago"** on each card — 🟡 body & `createdAt` exist; avatar missing (#5); relative-time is frontend.

### Question thread
22. **Upvote / downvote on the question itself** — 🔴 **queries have no voting model** (only answers have likes).
23. **Save / bookmark a question** (`bookmark_add`) — 🔴 **no "saved/bookmarks" model or endpoint** (also powers the home "Saved" activity, #11).
24. **Downvote on answers** — 🟡 current supports **like (upvote) only**; there is no downvote (the `Like` model is a single toggle, no score sign).
25. **Answer sort ("Sort by: Highest Voted")** — 🟢 backend already returns accepted-first then by `like_count`; add an explicit toggle.
26. **Reply / comment on an answer** (`reply` action) — 🔴 **answers are not threaded; no comments model.**
27. **Rich-text editor toolbar** (Bold / Italic / Code / Link) on the answer composer — 🟢 frontend; body is stored as text (placeholder already says "Markdown supported").
28. **Markdown + code-block rendering with syntax highlighting** in question/answer bodies — 🟡 bodies are stored fine, but **the current UI renders raw text (no Markdown/markup renderer)** — add a renderer (e.g. `react-markdown` + a highlighter).
29. **Author avatar + reputation shown on each answer** — 🟡 author name exists; **per-answer author reputation/avatar not returned**.

### Admin dashboard ("System Overview")
30. **Headline KPI cards** — Total Users 🟢, Open Questions 🟢, **Resolution Rate %** 🟡 (derive `resolved/total`), **Mod Queue Size + "High Load" indicator** 🟢 (`pending_moderation`; threshold is frontend), **AI Status "Operational / uptime"** 🟡 (`/health` reports mock/live but **no uptime metric**).
31. **"Needs Attention" actionable panel** — *Flagged Content Review → Review*, *Stale Documentation → Assign*, *Pending User Approvals → Manage* — 🟡 the **data exists** (reports in moderation queue, `is_outdated` answers/FAQs, `requires_approval` users) but there is **no single "needs attention" aggregation**; today these live in separate admin tabs.
32. **"Recent Audit Log" on the overview** (live feed with timestamps) — 🟢 `listAudit` exists (currently only on a separate Audit tab; surface the latest N on the overview).
33. **Per-card settings gear + "View All" links** — 🟢 frontend.

---

## 3. Per-screen feature parity matrix

Legend: ✅ present · ⚠️ partial/different · ❌ missing

### Home
| Reference feature | Current | Note |
|---|---|---|
| Time-of-day greeting | ✅ | `GreetingBanner` |
| Streak chip | ⚠️ | exists in greeting, not as a header chip |
| 3 action cards | ❌ | current Home is a static intro + emoji list |
| Reputation ring | ❌ | — |
| Level / pts-to-next | ❌ | needs derivation (#8) |
| Recent badges strip | ❌ | data exists |
| Recent activity feed | ❌ | no backend (#11) |

### FAQ
| Reference feature | Current | Note |
|---|---|---|
| Category accordion | ✅ | `Faq.jsx` |
| Article counts | ❌ | derivable |
| Promoted-from-Q&A tag | ⚠️ | shown as text, not a styled tag |
| Per-category "view all" | ❌ | — |
| Semantic search | ✅ | `searchFaqs` |
| "Open a Ticket" CTA | ❌ | map to /ask |

### Forum list
| Reference feature | Current | Note |
|---|---|---|
| Question list | ✅ | `QueryList.jsx` |
| Keyword search | ✅ | — |
| Category/Tag/Status filters | ❌ | backend supports it |
| Sort dropdown | ❌ | backend = newest only |
| Vote + answer counts per card | ❌ | no answer count / no query votes |
| Pagination UI | ❌ | API ready |
| Status badge | ✅ | — |
| Author avatar / time-ago | ⚠️ | name only, no avatar |
| "Ask a Question" button | ✅ | — |

### Question thread
| Reference feature | Current | Note |
|---|---|---|
| Question + body | ✅ | — |
| Edit / Delete (owner) | ✅ | — |
| Report | ✅ | — |
| Promote to FAQ (admin) | ✅ | — |
| Question upvote/downvote | ❌ | no query votes |
| Save / bookmark | ❌ | no backend |
| Answer list | ✅ | — |
| Accepted-answer marker | ✅ | "✓ Solution" |
| Mark as solution (owner) | ✅ | — |
| Answer upvote | ✅ | "like" |
| Answer downvote | ❌ | like is upvote-only |
| Answer sort toggle | ⚠️ | implicit sort exists |
| Reply/comment on answer | ❌ | not threaded |
| Rich-text toolbar | ❌ | plain textarea |
| Markdown / code rendering | ❌ | raw text |
| Author avatar/reputation on answer | ⚠️ | name only |

### Admin
| Reference feature | Current | Note |
|---|---|---|
| KPI metric cards | ⚠️ | current = plain counts (no rate %, AI status, load) |
| Resolution rate % | ❌ | derive resolved/total |
| AI status / uptime | ⚠️ | health has mock/live, no uptime |
| Mod-queue "high load" flag | ⚠️ | count exists |
| "Needs Attention" panel | ❌ | data spread across tabs |
| Recent audit log on overview | ⚠️ | exists on separate tab |
| Moderation queue tab | ✅ | `AdminModeration` |
| Users management | ✅ | `AdminUsers` |
| FAQ manager | ✅ | `AdminFaqManager` |
| Audit log tab | ✅ | `AdminAudit` |
| Maintenance/job runner | ✅ (current-only) | not in reference |

---

## 4. Features in the CURRENT app but NOT in the reference (don't lose these in the redesign)

The reference is a design kit and omits several working features. Preserve them when re-theming:

- **AI Chatbot floating widget** (`Chatbot.jsx`) — the reference shows an "Ask the Assistant" card but no chat UI mockup. Keep the working widget (or build the dedicated assistant screen the card implies).
- **Grammar-check ("Check grammar") flow** in Ask-a-Query, with an accept/keep diff modal.
- **Duplicate-detection modal** (warn + "View existing" / "Post anyway").
- **Spam/gibberish messaging** on submit.
- **Ban banner** with live countdown.
- **Notification bell dropdown** (the reference shows the bell icon; current has the working panel).
- **Edit Query** page.
- **Admin → Maintenance** (manual cron/job runner) and **Audit** detail tabs.
- **Leaderboard** page (reference has a Leaderboard *nav item* but no mockup).
- **Profile** admin moderation controls (ban/warn/restrict/suspend).

---

## 5. Backend work implied by the gaps (summary for planning)

If you want **full** parity (not just re-skin), these backend additions are required:

| # | Feature | New backend needed |
|---|---|---|
| 11 | Recent activity feed | New `GET /api/users/me/activity` (aggregate queries/answers/saves) |
| 16/23 | Save / bookmark questions | New `Bookmark` model + `POST/DELETE /api/queries/:id/save` + list |
| 19 | Answer counts on forum cards | Add `answer_count` to `listQueries` (aggregation/denormalized counter) |
| 22 | Question upvote/downvote | Voting on `Query` (new field/model) — *decision needed: do queries get votes?* |
| 24 | Answer downvote | Extend likes into signed votes (or accept upvote-only) |
| 26 | Reply/comment on answers | New `Comment` model + endpoints (threading) |
| 3 | Settings page | `GET/PATCH /api/users/me` for `notification_prefs` (field exists, no endpoint) |
| 5/21/29 | Avatars | `avatar_url` on User (or initials/Gravatar — no backend) |
| 8 | Levels / "pts to next" | Derive client-side, or add to profile API |
| 30 | Resolution rate / AI uptime | Add `resolution_rate` to metrics; uptime tracking for AI status |

Everything **not** in this table (sidebar shell, theme, filters, sort UI, pagination, accordions, KPI re-style, "needs attention" panel, rich-text toolbar, markdown rendering, promoted tags) is **frontend-only** — the data/endpoints already exist.

---

## 6. Suggested sequencing (if you proceed to implement)

1. **Design-system foundation** — add Inter, port the `DESIGN.md` color/spacing/type tokens into `styles.css`, switch to the light theme, build the **sidebar app-shell layout** (wraps all routes). *Pure frontend; unblocks everything.*
2. **Re-skin existing screens** to match (Home cards + reputation ring, FAQ accordion polish + promoted tags, Forum filters/sort/pagination, Thread voting/markdown/toolbar where backend allows, Admin KPI cards + needs-attention + audit feed). *Mostly frontend; uses existing APIs.*
3. **Backend-dependent features** (Table §5) — schedule separately: bookmarks, activity feed, answer counts, comments/replies, question votes, settings endpoint, avatars.

---

*This report identifies the gaps only — no frontend code has been changed yet. Tell me which sections to implement and I'll proceed (recommended start: step 1, the design-system + sidebar shell, since it's frontend-only and everything else builds on it).*
