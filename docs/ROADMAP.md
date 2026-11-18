# Implementation roadmap

Build in small, measurable phases. The 60-second Remotion demo is already rendered and validated on a Windows/Intel Arc A750 machine.

## Phase 1 — Audio-first editing

- Replace silent `public/audio/master.mp3` with approved TTS; start with English and Russian versions of "Three Mistakes People Make in Tech Interviews".
- Generate word/phrase timestamps from TTS metadata or forced alignment. Give each semantic phrase a stable ID.
- Reconcile the final approved audio length and the frame-based timeline; visual edits must not change the master audio.
- Support `AVATAR_REQUIRED` gaps while keeping visual timeline coverage intact.

## Phase 2 — AI director

- Agent tools: `get_timeline`, `search_assets`, `propose_edit`, `validate_edit`, `apply_edit`, `get_gaps`, `render_preview`, `inspect_preview`.
- The director selects visual *purpose* (`explain`, `evidence`, `illustrate`, `transition`) for semantic spans; code derives precise timestamps.
- Reuse safe Remotion motion templates; generate new TypeScript components only when needed and test in isolation.
- Human approval of rough cut before avatar generation.

## Phase 3 — Assets and presenter

- Search approved local asset library before external sources. Store license, attribution, origin and privacy review metadata for each item.
- Integrate screenshot capture, optional Nano Banana images and Veo AI cutaways, clearly marking generated visuals.
- Generate Patrick/avatar fragments only for otherwise uncovered periods. Pad audio around cuts where necessary, and discard returned avatar audio in final mix.
- Handle consistent appearance, scene transitions and multilingual timing differences.

## Phase 4 — Production

- Cache by content, selectively rerender changed sections, retry failed jobs, record costs.
- Typed timeline and validation tests; preview/QA checks including silence, artifacts, rights and semantic correctness.
- Optional MCP server, storage, job queue and YouTube publishing after explicit approval.

## Main risks

- Avatar discontinuities at cut boundaries.
- TTS alignment drift when editing scripts or switching language.
- Decorative/misleading B-roll and weak evidence relevance.
- Copyright/privacy and provenance of reused media.
- Real throughput for long, layered 20–30 minute productions.
