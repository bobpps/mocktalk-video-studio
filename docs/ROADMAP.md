# Implementation roadmap

Build in small, measurable phases. The 60-second Remotion demo is already rendered and validated on a Windows/Intel Arc A750 machine.

## Vision and scope

The intended product is a **Patrick-led, realistic podcast production system** with two localized YouTube outputs (RU/EN), authentic public-source cutaways, script-aware motion design and sparse paid avatar segments. See [production vision](PRODUCTION_VISION.md), [motion design](MOTION_DESIGN.md), [source screenshots](REAL_WORLD_MEDIA.md) and [multilingual/avatar design](MULTILINGUAL_AVATAR.md). These are **planned capabilities**, not shipped features.

## Phase 1 — Audio-first editing

- Replace silent `public/audio/master.mp3` with approved TTS; start with English and Russian versions of "Three Mistakes People Make in Tech Interviews". Evaluate Gemini voices Algieba / Algenib, and ElevenLabs Forced Alignment as a candidate timing service.
- Generate word/phrase timestamps from TTS metadata or forced alignment. Give each semantic phrase a stable ID.
- Reconcile the final approved audio length and the frame-based timeline; visual edits must not change the master audio.
- Support `AVATAR_REQUIRED` gaps while keeping visual timeline coverage intact.

## Phase 2 — AI director

- Agent tools: `get_timeline`, `search_assets`, `propose_edit`, `validate_edit`, `apply_edit`, `get_gaps`, `render_preview`, `inspect_preview`.
- The director selects visual *purpose* (`explain`, `evidence`, `illustrate`, `transition`, `presenter`) for semantic spans; code derives precise timestamps. Explicitly treat screenshots, Remotion motion design, generated B-roll and avatar as different types.
- Add brand-consistent Remotion templates for chapter cards, intros/outros, typography, charts and transitions. Generate new React/TypeScript animations with a coding agent **only when necessary**; test/preview in isolation before promotion to the template library.
- Human approval of rough cut before avatar generation.

## Phase 3 — Assets and presenter

- Search approved local asset library before external sources. Store license, attribution, origin and privacy review metadata for each item.
- Implement `searchWebMedia` and `captureScreenshot` (Playwright) for **real** public website articles, X/Twitter posts, public Telegram posts, Reddit discussions and product pages. Persist original screenshots, canonical URLs, author/dates and rights/privacy/attribution metadata; animate crops/zoom/highlights via Remotion.
- Generate Patrick/avatar fragments only for otherwise uncovered periods. Pad audio around cuts where necessary, and discard returned avatar audio in final mix.
- Handle consistent appearance, scene transitions and multilingual timing differences; after one approved language render, use language-specific audio/alignment and evaluate reusable HeyGen lip-sync versus separate presenter clips.

## Phase 4 — Production

- Cache by content, selectively rerender changed sections, retry failed jobs, record costs.
- Typed timeline and validation tests; preview/QA checks including silence, artifacts, rights and semantic correctness.
- Optional high-level MCP server (TypeScript tools first), storage, job queue and YouTube publishing **only after explicit approval**. Keep same-topic RU/EN episode manifest with separate locale timelines.

## Small vertical pilot before scaling

- Ship **one 3–5-minute, research-backed RU/EN episode** with a real screenshot, an animated chart/transition and paid avatar segments only at approved gaps.
- Prove audio-aligned timing, editable timeline, screenshot provenance and approval gates.
- Track source-reuse ratio, cost of TTS/HeyGen/Veo and render duration; do not promise 20–30-minute throughput until measured.
- Demonstrate generation of one novel Remotion explainer from a text brief with static checks, preview and review.

## Main risks

- Avatar discontinuities at cut boundaries.
- TTS alignment drift when editing scripts or switching language.
- Decorative/misleading B-roll and weak evidence relevance.
- Copyright/privacy, terms of access and provenance of reused media, especially public social posts/screenshots; public visibility is not automatic permission.
- Real throughput for long, layered 20–30 minute productions and language-specific rework; model credits and rerenders.
