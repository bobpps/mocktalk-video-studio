# Motion Design Engine — Remotion + coding agents

> **Design proposal.** Existing prototype already has basic React animated comparison bars and a workflow diagram in `src/Scenes.tsx`. It does **not** yet have automatic LLM-to-TSX generation or a production template catalog.

## Role in the studio

Remotion is **both** the timeline/compositing engine **and** a programmatic motion-graphics engine. Claude Code (or another coding agent) can produce reusable React/TypeScript compositions and parameterized animations, which Remotion renders deterministically. FFmpeg handles media prep and final encoding as appropriate.

Use cases:
- Branding: Patrick's channel opener/closer, logo reveal, lower-thirds, callouts, subscribe/end-screen elements.
- Topic structure: animated chapter cards, section separators, transitions and progress/timeline markers.
- Explanation: flowcharts, architecture diagrams, animated arrows, process steps, comparison layouts, data charts, timelines.
- Speech-linked: kinetic typography, highlighted keywords, quotes and synchronized on-screen labels.
- Real source treatment: zoom/pan/scroll and highlight overlays on authentic captured screenshots (never alter their meaning).
- Locale variants: RU/EN labels with reusable layout, animations and assets.

## Two complementary creation modes

### A. Template-first — default, low-cost, reliable

The director picks a known component ID (e.g. `chapter_title`, `animated_bars`, `quote`, `diagram_nodes`, `source_highlight`), supplies typed parameters, locale, data, durations and phrase IDs. A deterministic renderer turns them into frames. Prefer this for intros/transitions and recurring visual motifs.

### B. Agent-generated component — exceptional, higher flexibility

When templates cannot illustrate the concept, the director produces a visual brief with factual inputs and desired timing. A coding agent generates **a new TSX component** in a sandboxed workspace, not by directly changing the published library. Require:
1. A typed component contract, approved fonts/colors/motion primitives and allowed data/assets.
2. Static and dependency inspection; no untrusted executable code, arbitrary network access or secrets in render environment.
3. Typecheck/build and deterministic rendering with representative props.
4. Preview frames or short MP4; programmatic checks plus visual QA, then review/approval.
5. Promote useful scenes into versioned templates for future reuse.

Do **not** generate brand-new animation code for every episode; it is harder to QA, slower, inconsistent and more expensive than filling stable templates.

## Inputs and output contract (proposed)

- Inputs: semantic beat, voice word/phrase timings, locale, approved data/asset IDs, template ID or visual brief, scene duration and explicit layout constraints.
- Output: component reference/version, props, scene frame count, required media, design tokens, preview artifact and validation result.
- Durations use frames; animations must be functions of Remotion frame/time, not wall-clock timers. For multilingual videos, recompute durations per narration while reusing underlying scene/props.
- Generated charts must use **real attributed data** or be conspicuously labeled illustrative; never turn invented numbers into apparent research.
- Screenshots are real source media; motion overlay may emphasize but should not counterfeit or deceptively edit original posts.

## Style and visual consistency

Create a small **Patrick design system**: palette, typography (including Cyrillic), type scales and safe margins, lower-third geometry, camera motion curves, transition lengths, logo treatments and source citation treatment. Reuse across both channels while permitting localized copy.

Preserve the identity of a **realistic, relaxed podcast**: restrained animations and informative visuals rather than flashy motion on every sentence. Optimize for legibility on mobile as well as desktop.

## Suggested MVP acceptance tests

1. Render a branded 3–5-second intro and chapter transition from typed template props.
2. Render a data-driven chart with verifiable numbers, source and RU/EN labels.
3. Generate a novel short explainer animation from a text brief, compile, preview and approve it before use.
4. Animate a saved public-source screenshot with crop/zoom/highlight, showing persistent attribution.
5. Re-render one modified scene without generating an entirely new avatar or new media elsewhere.

## Phasing

Template catalog and design tokens first; screenshot treatments next; controlled code-generation and template promotion only after isolated test/QA tools exist.
