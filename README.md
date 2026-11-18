# MockTalk Video Studio

Local-first, AI-directed video production for **MockTalk.ai**. An agent plans visual inserts for an approved voice-over; a deterministic renderer assembles the result. We render the AI presenter **only where no other visual is needed**.

## Current status: working 60-second prototype

- Remotion + React/TypeScript + FFmpeg, 1080p / 30 fps; five timeline-driven scenes and a continuous master-audio track.
- Editable `src/timeline.json`, motion graphics, article-style demo, avatar placeholders, Studio preview, validation and PowerShell benchmark.
- Tested on Windows with Intel Arc A750 and FFmpeg 8.1.1: H.264/AV1 QSV work; warmed-up demo render **40.3 s for 60 s** (**1.49× real-time**). Transitions reviewed.
- **Not implemented yet:** real TTS, alignment, AI director, asset retrieval, generated avatars and autonomous publishing. Demo audio is silence generated locally via FFmpeg.

## Target pipeline

`Research → Script → TTS → Word alignment → AI visual plan → Asset retrieval / motion design → Timeline preview → Generate avatar for remaining gaps → Render → QA / publish`

**Principles:** master audio is authoritative; clips align to phrases; an agent proposes edits but code validates timing; reuse licensed assets/templates before generating new video. Maintain provenance and human review.

## Technology

- **Remotion** creates motion graphics, compositing and preview. **FFmpeg** handles media and encoding (optional Intel QSV).
- **JSON timeline** is the editable project source of truth—not destructive edits to a finished MP4.
- Start with TypeScript agent tools; add a high-level **MCP** wrapper when useful.
- Pluggable future providers: Gemini / ElevenLabs (voice), Nano Banana (images), Veo (short video), HeyGen or others (presenter).
- Presenter **Patrick** speaks as a **Casual Unfiltered Expert**: natural, relaxed, occasionally ironic and mildly profane. Voice candidates: Gemini **Algieba / Algenib**. Adapt the personality to each language, not word-for-word dialogue.

## Quick start (Windows)

Requires Node.js, npm and FFmpeg:

```powershell
npm install
npm run validate
npm run dev
powershell -ExecutionPolicy Bypass -File .\scripts\benchmark.ps1
```

Output: `out/demo.mp4`. The first run generates a silent 60-second `public/audio/master.mp3` if missing. See [local setup](docs/SETUP.md).

## Next

1. Real English/Russian narration + word/phrase alignment and versioned scripts.
2. **AI director:** select visuals and propose `timeline.json` edits using precise speech timings.
3. Searchable licensed asset library, reusable Remotion templates, optional image/video generation.
4. Avatar-gap generation, stable cuts, multilingual re-timing and partial re-renders.
5. Agentic QA, optional MCP and approval-gated YouTube publishing.

More detail: [Roadmap](docs/ROADMAP.md) · [Voice Bible](docs/VOICE_BIBLE.md) · [Agent brief](docs/AGENT_BRIEF.md).

> Experimental source project, not a production-ready autonomous editor.
