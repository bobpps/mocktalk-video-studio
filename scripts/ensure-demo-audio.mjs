import {existsSync, mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';

const audioPath = path.resolve('public/audio/master.mp3');
if (existsSync(audioPath)) {
  console.log('Audio exists: public/audio/master.mp3');
  process.exit(0);
}

mkdirSync(path.dirname(audioPath), {recursive: true});
console.log('Generating silent 60-second demo audio via FFmpeg...');
const result = spawnSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-f', 'lavfi',
  '-i', 'anullsrc=channel_layout=mono:sample_rate=44100',
  '-t', '60', '-c:a', 'libmp3lame', '-b:a', '32k',
  '-y', audioPath
], {stdio: 'inherit'});
if (result.error || result.status !== 0) {
  console.error('FFmpeg is required to generate demo audio:', result.error?.message || result.status);
  process.exit(1);
}
console.log('Created public/audio/master.mp3 (silent demo)');
