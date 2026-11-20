# Patrick, multilingual channels and avatar economics

> **Proposed integrations.** The repo currently contains **no live voice, AI avatar or localization service**; `avatar` is a stylized placeholder over silent demo audio.

## Channel and identity

Patrick is the single, consistent **virtual host** for MockTalk.ai marketing: a believable, realistic adult male seated at a podcast table with a suspended microphone. Russian and English channels should feel like the same personality, **not two unrelated avatars**. Subjects include AI, IT, changing work opportunities, interviews, professional growth and the job market.

See [Voice Bible](VOICE_BIBLE.md) for tone: **Casual Unfiltered Expert**, relaxed, conversational, moderately ironic, never formal or corporate, occasional mild slang/profanity. Keep warmth and credibility. Do not claim Patrick is a real person or fabricate life experiences.

## Script, voice and synchronization

- One episode concept and shared factual evidence; separately adapted natural **RU and EN scripts**. Translate meaning and humor, not words mechanically. Spanish is a future optional locale, not an active channel requirement.
- Evaluate Gemini TTS first. Preferred **candidate voices**: **Algieba** and **Algenib**, low, calm male timbre and unhurried delivery; selection is not finalized. Provider should remain pluggable.
- Synthesize and approve **one master narration audio track per locale**, then align words/phrases (ElevenLabs Forced Alignment was discussed as a candidate). Keep stable semantic beat IDs across languages while allowing independent duration and frame counts.
- Do not reuse RU timings for EN. All transitions, motion titles, screenshots/callouts and captions follow *each* master track.
- Keep avatar render audio muted in the final composition; no lip-sync drift from a doubled or re-encoded voice track.

## Presenter generation strategy

1. First produce a visual rough cut with **placeholder** presenter segments.
2. Detect `AVATAR_REQUIRED` segments. Maintain shot continuity (face, clothing, room, camera, microphone, lighting and cadence) across all segments.
3. Send **approved language-specific master audio spans** and visual avatar specification to HeyGen or tested provider; use generated footage only for those required spans. Include a little editing handle at boundaries where possible.
4. Inspect lip sync, mouth artifacts, idle behavior, jumps and background stability. Keep original approved narration in final mix.
5. For RU/EN reuse, **approve one language version first**, then derive the second with updated narration and equivalent visual layout; evaluate HeyGen lip-sync precision/replacement for reusing shots where supported and visually acceptable.
6. **Batch jobs can coordinate requests**, but do **not** assume different-language avatar renders will have identical gestures, motion or framing. If dubbing/lip sync fails, create independent locale-specific segments while retaining shared avatar appearance.

## Model evaluation, not locked choices

- Prefer highest realistic photo-to-video avatar quality over artificial-looking cheap animation. Earlier comparison targets included **HeyGen Avatar 6 Pro** (quality candidate), **Turbo** (potential efficiency candidate) and **Avatar IV** (baseline). Availability, per-minute credit rates and documented support must be re-verified before buying/automating.
- Gemini/Claude: research, scripts, localization and AI Director. Gemini TTS and alignment services: narration. HeyGen: only required presenter video.
- Nano Banana and Veo: optional visuals, not presenter substitutes. Remotion/FFmpeg: deterministic assembly.
- Avoid assuming a fixed number of minutes per credit or pricing based on beta reports. Measure final billable usage, retries, failed batches and effects of language adaptation.

## RU/EN reuse policy

| Shared when accurate | Locale-specific |
| --- | --- |
| Episode concept, original source URLs, approved screenshots, generic illustrative B-roll, animation component code, layout/design tokens, visual evidence IDs | Speech-first script, approved master audio, word alignment, onscreen text/citations as translated, titles/subtitles, exact scene durations, mouth-synchronized presenter shots, release metadata |
| Generic motion structure and cached source assets | Language-sensitive typography, spacing and pacing |

Prefer one **episode manifest** with distinct locale timeline builds, rather than copying a finished MP4 and replacing audio without adjusting sync.

## Cost and QA gates

- Do not spend paid avatar/video credits until a factual/source-checked and editorially approved rough cut exists.
- Reuse unchanged assets and template renders. Cache per locale/audio hash; invalidate presenter footage after audio or script revisions.
- Measure per-episode and per-minute costs separately for research, TTS, alignment, HeyGen, image/video generation and rendering.
- Review RU and EN independently for pronunciation, subtitles, natural delivery, source fidelity and animation text overflow.
- Preserve explicit human approval before YouTube publication.

## Suggested next experiment

A single 3–5-minute podcast pilot: one RU and one EN approved narration, one shared real-source screenshot, one Remotion chart/chapter transition, one HeyGen presenter gap per language. Compare quality, credits, alignment, time-to-render and percent media reused. Scale toward 20–30-minute videos only after the shorter pilot works reliably.
