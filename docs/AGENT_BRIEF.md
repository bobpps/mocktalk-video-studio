# Agent brief — future editor/director

Objective: take a finished script and master voice-over, select suitable media, produce a validated editable timeline and a preview video.

- Inspect `src/timeline.json` and `src/types.ts` before editing. Prefer changing structured timeline data over modifying working Remotion components.
- In the demo, `startFrame` and `durationFrames` are integers at 30 FPS; clips must be gap-free for exactly 1800 frames.
- Master audio is continuous and authoritative. Only one clean original audio track belongs in final mix.
- `avatar` is currently a **placeholder**, not generated footage. Do not present it as a real AI host.
- Article cards and comparison bar values in the demo are illustrative, not factual news or statistics.
- External screenshots/videos need verified usage rights, attribution, source and privacy review before publication.
- Validate with `npm run validate`, then test render via `powershell -ExecutionPolicy Bypass -File .\scripts\benchmark.ps1`.
- Propose meaningful, evidence-aware B-roll; favor real product screenshots for verifiable claims and motion graphics for explanations.
- Keep generated media distinguishable from actual footage. Seek approval before spending credits or publishing.

Next: build typed tools for alignment, asset discovery, edits, gap detection and previews. Only later expose these through an MCP layer.
