export type SceneKind = 'avatar' | 'headline' | 'comparison' | 'workflow' | 'image';

export type TimelineClip = {
  id: string;
  kind: SceneKind;
  startFrame: number;
  durationFrames: number;
  phraseId: string;
  headline?: string;
  subheading?: string;
  imageFile?: string;
};

export type Timeline = {
  project: string;
  width: number;
  height: number;
  fps: number;
  durationFrames: number;
  masterAudio: string;
  clips: TimelineClip[];
};
