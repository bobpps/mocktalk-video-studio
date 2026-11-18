import React from 'react';
import {Composition} from 'remotion';
import {Movie} from './Movie';
import rawTimeline from './timeline.json';
import type {Timeline} from './types';

const timeline = rawTimeline as Timeline;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MockTalkDemo"
      component={Movie}
      durationInFrames={timeline.durationFrames}
      fps={timeline.fps}
      width={timeline.width}
      height={timeline.height}
      defaultProps={{}}
    />
  );
};
