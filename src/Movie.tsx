import React from 'react';
import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {Scene} from './Scenes';
import rawTimeline from './timeline.json';
import type {Timeline} from './types';

const timeline = rawTimeline as Timeline;

export const Movie: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#0c1425'}}>
      <Audio src={staticFile(timeline.masterAudio)} />
      {timeline.clips.map((clip) => (
        <Sequence
          key={clip.id}
          from={clip.startFrame}
          durationInFrames={clip.durationFrames}
          name={`${clip.id} · ${clip.kind}`}
        >
          <Scene clip={clip}/>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
