# Real-world content and screenshots — sourcing and provenance

> **Target workflow; not yet integrated.** The current `headline` scene is an explicitly fictional demo article card, **not a real screenshot**.

## Why this is a first-class scene type

Patrick comments on real industry stories, hiring-market trends, product launches and public commentary. Instead of a generic AI illustration, the video can show **the original evidence**: a news article, a public X/Twitter post, a public Telegram channel post, a public Reddit discussion, a company announcement or a product page. The shot may show a zoom, scroll, highlight, citation and return to the presenter.

Such shots need independent capture, provenance, rights review and scene rendering. They are **not** a subtype of generative AI B-roll.

## Planned capture and verification flow

1. **Researcher** finds a relevant public primary source via web search, official page, accessible public Telegram/X/Reddit URL or approved media library. Record canonical URL, publication date, author, title, exact claim and locale.
2. **Verifier** checks current content and whether it actually supports the script. Resolve shortened links; avoid secondary paraphrase when primary evidence is available.
3. **Rights/privacy gate** checks reuse permission or a documented applicable exception, proper attribution, personal-data exposure and any platform access conditions. Publicly visible ≠ free of copyright or privacy concerns.
4. **Screenshot service** uses Playwright or an approved API/export to capture a browser-visible page, post or specified DOM element. Save original untouched capture, URL, capture timestamp, viewport and optional DOM/text snippet. Public pages may have dynamic widgets/login walls/anti-automation; **do not bypass authentication or platform restrictions**.
5. **Scene preparation** creates crops with high-resolution safe regions and a readable source label; preserve an original reference alongside the edited render.
6. **AI Director** places the screenshot only where narration references it, chooses focus/zoom/scroll/highlight beats, and ties them to aligned phrase IDs.
7. **Remotion** animates the capture, preserving truthful context. Final QA checks that highlighting and cropping do not misrepresent the author's meaning.

Suggested tools: `searchWebMedia(query, topic, locale)`, `captureScreenshot(url, selector?, viewport?)`, `ingestSourceAsset(...)`, `getSourceMetadata(assetId)`. These are *proposed tool contracts*, not existing implemented functions.

## Asset record (conceptual schema)

| Field | Purpose |
| --- | --- |
| `sourceUrl` / `canonicalUrl` | Original location and durable citation |
| `platform` / `author` / `publishedAt` | Identity and context of the claim |
| `capturedAt` / `screenshotOriginalHash` | Reproducible proof of what was captured |
| `licenseOrLegalBasis` / `permissionStatus` | Clear usage decision; unknown = blocked pending review |
| `privacyReview` / `attributionText` | Safe and properly credited on-screen use |
| `claimIds` / `transcriptSpanIds` | Links source evidence to the spoken argument |
| `editedDerivativeHash` / `treatment` | Traceability of crop, scroll, zoom, highlight |
| `locales` / `assetUri` | Reuse in Russian and English timelines |

Keep both the untouched original and edited derivative, with strong separation between screenshots, **synthetic mockups**, and AI-generated imagery. Never synthesize a fake quote/post and pass it off as a captured original.

## Rendering ideas

- Full article page → slow vertical scroll to highlighted paragraph.
- X/Telegram/Reddit card → zoom to quote; keep author/date/branding and source indicator visible as context permits.
- Side-by-side posts → compare two authentic statements with labeled dates.
- Product page → spotlight a feature and annotate with arrows or callouts.
- On-screen lower-third: source name and readable credit; persistent link/citation in video description as practical.

The same React/Remotion template can animate screenshots from different platforms and languages; only the captured asset and annotations change.

## Failure handling

- If public capture is blocked, gated, missing or too low resolution: request a licensed/exported copy or replace with an accurately attributed text summary or a different verifiable source.
- If use rights or privacy clearance are unresolved: do not publish the screenshot; flag it for human approval or replace it.
- If a post is deleted/edited: keep capture provenance, re-check claims and context before publication.
- If multilingual narration quotes a source: use language-localized overlay/translation **clearly marked as translation**, not as the original screenshot text.

## Release checklist

Verify source URL and claim, authenticity, legal basis/permission, privacy/redactions, attribution, legibility on mobile, and no deceptive cropping or generated-as-real imagery.
