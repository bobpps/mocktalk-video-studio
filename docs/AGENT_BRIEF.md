# Agent brief — future editor/director

Objective: take a finished script and master voice-over, select suitable media, produce a validated editable timeline and a preview video.

- Inspect `src/timeline.json` and `src/types.ts` before editing. Prefer changing structured timeline data over modifying working Remotion components.
- In the demo, `startFrame` and `durationFrames` are integers at 30 FPS; clips must be gap-free for exactly 1800 frames.
- Master audio is continuous and authoritative. Only one clean original audio track belongs in final mix.
- `avatar` is currently a **placeholder**, not generated footage. Do not present it as a real AI host.
- Article cards and comparison bar values in the demo are illustrative, not factual news or statistics.
- External screenshots/videos need verified usage rights or documented legal basis, attribution, authentic source provenance and privacy review before publication. Public visibility is not automatic permission; do not bypass login restrictions or present AI-made mock screenshots as real posts.
- Validate with `npm run validate`, then test render via `powershell -ExecutionPolicy Bypass -File .\scripts\benchmark.ps1`.
- Propose meaningful, evidence-aware B-roll; favor real articles/public X/Telegram/Reddit/product screenshots for verifiable claims, Remotion motion graphics for explanations, and Avatar only for presenter-needed gaps.
- Keep generated media distinguishable from actual footage. Seek approval before spending credits or publishing.

**Target editing policy:** a research-backed semantic director proposes source IDs and scene intents; the compiler/validator owns exact frame math. Prefer parameterized React motion templates. For novel animations, generate TSX in isolation and typecheck/preview/QA before use. Use Playwright for permitted browser captures; store original screenshot plus animated derivative, canonical URL and rights/privacy review. For RU/EN, each master audio and timeline is separate, but reusable evidence and visual templates are shared.

**Proposed tool names (not yet implemented):** `searchWebMedia`, `captureScreenshot`, `get_timeline`, `search_assets`, `propose_edit`, `validate_edit`, `apply_edit`, `get_gaps`, `render_preview`, `inspect_preview`, `render_final`. Use ordinary typed TypeScript tools before wrapping in a high-level MCP.

Next: build typed tools for alignment, asset discovery, source capture, edits, gap detection, isolated motion-generation and previews. Only later expose these through an MCP layer.

Additional target design: [Production vision](PRODUCTION_VISION.md) · [Motion design](MOTION_DESIGN.md) · [Real-world sources](REAL_WORLD_MEDIA.md) · [Multilingual avatar](MULTILINGUAL_AVATAR.md).
