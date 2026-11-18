import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';

const filename = path.resolve('src/timeline.json');
const timeline = JSON.parse(readFileSync(filename, 'utf8'));
const errors = [];
const supported = new Set(['avatar', 'headline', 'comparison', 'workflow', 'image']);
if (!Number.isInteger(timeline.fps) || timeline.fps <= 0) errors.push('fps must be a positive integer');
if (!Number.isInteger(timeline.durationFrames) || timeline.durationFrames <= 0) errors.push('durationFrames must be positive');
let cursor = 0;
const ids = new Set();
for (const clip of timeline.clips ?? []) {
  if (ids.has(clip.id)) errors.push(`duplicate clip id ${clip.id}`);
  ids.add(clip.id);
  if (!supported.has(clip.kind)) errors.push(`${clip.id}: unsupported kind ${clip.kind}`);
  if (!Number.isInteger(clip.startFrame) || !Number.isInteger(clip.durationFrames) || clip.durationFrames <= 0) {
    errors.push(`${clip.id}: startFrame and durationFrames must be integers, durationFrames > 0`);
    continue;
  }
  if (clip.startFrame !== cursor) errors.push(`${clip.id}: expected startFrame ${cursor}, got ${clip.startFrame} (gap/overlap)`);
  cursor = clip.startFrame + clip.durationFrames;
  if (!clip.phraseId) errors.push(`${clip.id}: missing phraseId`);
  if (clip.kind === 'image' && clip.imageFile && !existsSync(path.resolve('public', clip.imageFile))) {
    errors.push(`${clip.id}: missing public/${clip.imageFile}`);
  }
}
if (cursor !== timeline.durationFrames) errors.push(`timeline ends at frame ${cursor}, expected ${timeline.durationFrames}`);
if (!existsSync(path.resolve('public', timeline.masterAudio))) errors.push(`missing public/${timeline.masterAudio}`);
if (errors.length) {
  console.error('Timeline FAILED:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`Timeline OK: ${timeline.clips.length} clips, ${timeline.durationFrames / timeline.fps}s, ${timeline.fps} fps`);
console.log(`Audio: ${timeline.masterAudio}; avatar placeholder coverage: ${timeline.clips.filter((c) => c.kind === 'avatar').reduce((n,c)=>n+c.durationFrames/timeline.fps,0)} seconds`);
