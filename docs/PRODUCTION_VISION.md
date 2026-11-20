# MockTalk Video Studio — vision, architecture and production pipeline

> **Target design, not shipped functionality.** See README and SETUP for the actual 60-second demonstration. This document captures decisions from the November 2026 planning discussions.

## Purpose and audience

Create a local-first, AI-directed production studio for a **realistic virtual host, Patrick**, associated with MockTalk.ai. Launch separate **Russian- and English-language YouTube channels** (with potential short-form reuse on other platforms). The content looks like an approachable video podcast: a believable man at a desk with a suspended microphone, talking naturally about AI, software, career development, interviews, labor-market changes and adjacent topics. The host is fictional; no invented real-life biography or fake first-hand experience.

Marketing objective: grow a recognizable personality and an audience around Patrick, with natural, appropriately disclosed connections to MockTalk.ai. Patrick's core promise for the underlying product is **helping people feel confident in interviews**. Don't turn every episode into a product advertisement. Favor authenticity and useful content.

The production goal is **high-quality, repeatable, low-marginal-cost RU/EN videos with minimal manual editing**, not a typical AI slideshow. Longer 20–30-minute episodes and high publishing volume are scaling ambitions, **not proven throughput or MVP requirements**.

## Design decisions

- **Master audio first:** script and approved TTS narration determine timing; visuals never silently retime or replace the narration.
- **Visual storytelling instead of nonstop talking head:** show Patrick when his presence matters; cover evidence, concepts and stories with media, diagrams and motion design otherwise.
- **Avatar-last economics:** generate paid HeyGen footage only for confirmed `AVATAR_REQUIRED` timeline gaps after the first rough cut/approval. The exported avatar's audio is removed; the original master audio remains the single source in final mix.
- **Real-world evidence when possible:** actual licensed screenshots/articles/posts before fabricated generic illustrations; document the source and rights.
- **Prefer reusable assets and Remotion templates:** generate new visuals (Veo/Nano Banana) or new React animation code only when they add material value.
- **Semantic decisions by LLM; deterministic time and rendering in code:** the director proposes *what* to show; a validator/compiler computes frame-accurate edits and rejects overlaps, missing assets and unsupported kinds.
- **Editable structured timeline as source of truth:** not opaque GUI editing or destructive editing of a rendered MP4.
- **Language-localized outputs:** share topic, evidence, branding, scene intent and source assets; write and time RU/EN audio and onscreen copy independently.
- **Human approval gates:** research/source provenance, rough cut before credit-heavy generation, and final QA before publishing.

## Target agents and responsibilities

| Role | Responsibility |
| --- | --- |
| Researcher | Propose topics; verify claims; find articles, public Telegram/X/Reddit posts, screenshots and usable source media; record URLs/dates/rights |
| Writer / localization agent | Produce a natural speech-first outline and script, in Patrick's voice, adapted for RU/EN |
| TTS / alignment service | Generate approved language-specific audio and word/phrase timestamps (Gemini TTS candidates; ElevenLabs Forced Alignment or other tested service) |
| AI Director | Choose visual purpose for each speech span: presenter, evidence screenshot, illustration, diagram, title, transition or motion design; propose edits |
| Asset / screenshot tools | Retrieve approved assets, capture actual pages/posts with Playwright where accessible, normalize imagery and metadata |
| Motion Designer / coding agent | Fill typed Remotion templates or author/test new React/TS motion components |
| Timeline Compiler / Validator | Convert semantic beats to precise frames, enforce timing and scene contracts, build an editable render plan |
| Renderer / QA | Render scene previews and final output in Remotion/FFmpeg, inspect timing, source fidelity, audio, costs and credits |

Provider choices (Gemini, Claude, HeyGen, Nano Banana, Veo, FFmpeg) are **planned integrations**, not evidence they already work in this repo.

## End-to-end workflow (nine stages)

1. **Research and outline:** pick a topic; gather primary sources and factual claims; propose narrative arc and scenes.
2. **Visual feasibility:** check whether evidence/screenshots, reusable motion templates and licensed footage actually exist; avoid writing scenes we cannot illustrate reliably.
3. **Final scripts:** adapt speech to Patrick's casual style; create independent RU/EN scripts with stable semantic beat IDs.
4. **TTS and timing:** synthesize and approve master audio per language, then align words/phrases to audio. Lock audio before visual timing is finalized.
5. **Director plan:** for each beat decide its visual purpose and asset candidates; mark uncovered spans `AVATAR_REQUIRED`, then produce a structured proposal.
6. **Asset production:** reuse existing library; capture source screenshots; create Remotion animations; call image/video generation only where justified. Preserve provenance for every asset.
7. **Rough cut and approval:** compile exact timing and render preview with avatar placeholders; check narrative quality, transitions, factual references and legal/usage suitability.
8. **Avatar fill:** generate only approved presenter gaps (HeyGen or tested alternative); verify lip sync, continuity and cut handles; compose the silent avatar clips over the locked narration.
9. **Final QA and distribution:** check rendered output, speech and sources, rights, subtitles and metadata; publish to the approved language channel **only with explicit approval**.

This is the target flow; the **current prototype** has only a fixed one-minute timeline, demo scenes and silent audio.

## Visual source types and decision policy

| Scene/source | Primary use | Preferred production path |
| --- | --- | --- |
| `avatar` | Direct address, personality, pauses, transitions | Reusable/approved presenter shots, HeyGen for required gaps |
| `source_screenshot` | Verifiable news, original posts, on-screen evidence | Search + page/post capture, provenance + rights review |
| `motion_template` | Charts, titles, lower thirds, transitions, explainers | Parameterized Remotion React/TS components |
| `motion_generated` | Nonstandard custom visualization | LLM-authored Remotion component, type/build/render/visual QA |
| `image` / `video` | Atmosphere, illustrative B-roll, visual metaphor | Approved existing media first, optional Nano Banana / Veo |

Rule of thumb: **proof → evidence; explanation → motion design; atmosphere → illustration/B-roll; personality → avatar**. The AI Director may combine the categories but must avoid gratuitous cuts and misleading visual claims.

## Structured timeline and agent edit contract

Current `src/timeline.json` implements a **minimal five-kind demo schema**. The following is a **future concept**, not a compatible drop-in JSON example:

- Project and language identifiers; 1920×1080, 30 FPS (or explicit per-project settings), approved master audio hash.
- Stable semantic beat/phrase IDs; each scene's start/end frame, purpose, kind, parameters, asset IDs, locale and source IDs.
- Source provenance and right-to-use status, cached output hashes, avatar-required status, cost estimates and QA flags.
- Director proposes changes via `get_timeline` / `search_assets` / `propose_edit`; code `validate_edit` and `apply_edit` updates the source of truth.
- `get_gaps` identifies uncovered presenter segments; `render_preview` / `inspect_preview` provide feedback; `render_final` requires approved timeline.
- Possible supporting tools: `searchWebMedia` and `captureScreenshot`, plus asset ingest, TTS alignment, localization and render/QA operations.
- Use a self-owned high-level MCP **only when helpful**; start with ordinary typed TypeScript functions. Shotstack was considered for a fast prototype, but **Remotion + FFmpeg + our own higher-level control layer is the chosen direction**.

**Compiler invariants:** every render frame covered; no accidental clip overlap or audio duplication; referenced files exist; valid dimensions; language-specific title width and clip timing; no external/private media without source/rights metadata; no edits to locked master narration without re-alignment.

## Storage, caching and quality

Potential media library: local-first files and metadata initially; object storage (S3/Supabase) plus Postgres/pgvector search later if justified. Track SHA/content hash, source URL, capture date, article/post author, license/permission, attribution, locale, generated-vs-real status, model/provider/credit cost and review status.

Cache by script/audio version, source asset and render parameters. Re-render modified scenes or language tracks rather than a full 30-minute video when feasible. Record failures and retry without duplicate paid generation.

Automatic QA proposals: audible narration and consistent master mix; word and subtitle timing; crop/text safe areas; font coverage for Cyrillic; no black gaps, flash frames or awkward avatar cuts; source claims match onscreen evidence; release approval for rights, personal data and final publication.

## Implementation links

- [Roadmap](ROADMAP.md)
- [Motion design](MOTION_DESIGN.md)
- [Real-world source media](REAL_WORLD_MEDIA.md)
- [Multilingual and avatar workflow](MULTILINGUAL_AVATAR.md)
- [Patrick's voice bible](VOICE_BIBLE.md)
- [Agent contract](AGENT_BRIEF.md)
