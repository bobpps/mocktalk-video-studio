# Local setup (Windows)

This is a 60-second, 1080p/30fps Remotion/FFmpeg demonstration with editable JSON timing, motion graphics, an illustrative news card and **avatar placeholders**. No real presenter or TTS integration is included.

## Requirements

- Node.js 22 LTS (or compatible current Node) and npm
- FFmpeg on PATH (Intel Arc A750 Quick Sync testing is optional)
- Disk space for npm dependencies and output; Internet for initial package installation

## Run in PowerShell

```powershell
npm install
npm run validate
npm run dev
```

The `prevalidate` / `predev` hooks create `public/audio/master.mp3` with 60 seconds of **silence**, using local FFmpeg, if it does not exist. Nothing is downloaded for that audio. Existing `master.mp3` is not overwritten.

In Remotion Studio select `MockTalkDemo` and preview scenes. Render:

```powershell
npm run preview  # first ten seconds
npm run render   # full minute
powershell -ExecutionPolicy Bypass -File .\scripts\benchmark.ps1
```

Output is `out/demo.mp4`. Optional Intel H.264 QSV re-encoding of that MP4:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\encode-qsv.ps1
```

**Important:** QSV re-encoding happens *after* Remotion generates frames with Chromium. It does not accelerate React frame generation.

## Files

- `src/timeline.json`: clip order, frame counts, master audio path.
- `src/Movie.tsx`: one continuous audio track and ordered Remotion sequences.
- `src/Scenes.tsx`: React animations, fictional news mockup and avatar placeholders.
- `scripts/validate-timeline.mjs`: basic timeline consistency checks.
- `scripts/ensure-demo-audio.mjs`: creates missing silence with FFmpeg.
- `scripts/benchmark.ps1`: checks end-to-end render speed.
- `docs/AGENT_BRIEF.md`: future director/agent responsibilities.

## Using actual narration

Replace `public/audio/master.mp3` with approved TTS audio and update `src/timeline.json` manually: `durationFrames`, clip spans and phrase IDs. Keep clips contiguous. The current starter does **not** automatically synchronize to new audio; word/phrase forced alignment is a future integration.

## Using images

Put authorized images in `public/assets/` and add an image clip to `src/timeline.json`, for example:

```json
{"id":"figure-1","kind":"image","startFrame":360,"durationFrames":300,
 "phraseId":"example","imageFile":"assets/example.jpg"}
```

Adjust neighboring spans so the project still covers all frames without gaps. The validator confirms referenced images exist.

## Limitations

Demo contents are illustrative, with no real news citations and no true avatar. The silence/audio file is generated locally, deliberately excluded from Git. Real voice, alignment, media sourcing, licensing, AI editing, avatars, MCP and publishing are **not yet implemented**.

Official docs: https://www.remotion.dev/docs/ · https://ffmpeg.org/documentation.html
