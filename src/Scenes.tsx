import React from 'react';
import type {CSSProperties} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import type {TimelineClip} from './types';

const palette = {
  bg: '#0C1425',
  ink: '#F2F5FA',
  secondary: '#A3B1C8',
  blue: '#74B8D9',
  teal: '#67D8C2',
  gold: '#F1C078',
};

const full: CSSProperties = {
  background: 'radial-gradient(ellipse at 65% 30%, #17324A 0%, #0C1425 66%)',
  color: palette.ink,
  fontFamily: 'Arial, Helvetica, sans-serif',
  overflow: 'hidden',
};

const badge: CSSProperties = {
  position: 'absolute', top: 60, left: 100,
  border: '1px solid #45627D', borderRadius: 30,
  padding: '12px 20px', fontSize: 21, letterSpacing: 3,
  color: palette.teal, backgroundColor: '#0C1D2A',
};

const Footer: React.FC<{label: string}> = ({label}) => (
  <div style={{position: 'absolute', bottom: 58, left: 100, right: 100,
    display: 'flex', justifyContent: 'space-between', fontSize: 23,
    color: palette.secondary, letterSpacing: 1}}>
    <span>MOCKTALK.AI / VIDEO STUDIO</span>
    <span>{label}</span>
  </div>
);

const Pill: React.FC<{children: React.ReactNode; color?: string}> = ({children, color=palette.teal}) => (
  <div style={{fontSize: 24, fontWeight: 700, letterSpacing: 1.4, color,
    borderRadius: 24, padding: '12px 22px', background: '#102B3A',
    display: 'inline-block'}}>{children}</div>
);

const AvatarPlaceholder: React.FC<{clip: TimelineClip}> = ({clip}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 16) * 5;
  const opacity = interpolate(f, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={full}>
      <div style={badge}>AVATAR PLACEHOLDER</div>
      <div style={{position: 'absolute', left: 100, top: 240, width: 800, opacity}}>
        <h1 style={{fontSize: 80, lineHeight: 1.05, margin: 0, fontWeight: 800}}>{clip.headline}</h1>
        <p style={{fontSize: 32, marginTop: 34, color: palette.secondary}}>{clip.subheading}</p>
        <div style={{marginTop: 40}}><Pill>Ready for audio-driven generation</Pill></div>
      </div>
      {/* Deterministic stylized host placeholder: not a generated likeness. */}
      <div style={{position: 'absolute', width: 720, height: 740, right: 90, bottom: 70,
        transform: `translateY(${bob}px)`}}>
        <div style={{position: 'absolute', bottom: -10, left: 100, width: 530, height: 410,
          borderRadius: '260px 260px 40px 40px', background: '#294B66',
          boxShadow: '0 0 140px #214B7D65'}}/>
        <div style={{position: 'absolute', left: 253, bottom: 295, width: 192, height: 250,
          borderRadius: '100px 100px 90px 90px', background: '#C99E7D'}} />
        <div style={{position: 'absolute', left: 246, bottom: 450, width: 208, height: 104,
          borderRadius: '90px 90px 22px 22px', background: '#1B2635'}}/>
        <div style={{position: 'absolute', left: 300, bottom: 417, width: 12, height: 12, borderRadius: 9, background: '#25303D'}}/>
        <div style={{position: 'absolute', left: 394, bottom: 417, width: 12, height: 12, borderRadius: 9, background: '#25303D'}}/>
        <div style={{position: 'absolute', left: 339, bottom: 365, width: 45, height: 6, borderRadius: 7, background: '#8A5A51'}}/>
      </div>
      {/* Large stationary boom microphone in front of the host. */}
      <div style={{position: 'absolute', right: 70, top: 185, width: 550, height: 14,
        background: '#1C2630', transform: 'rotate(-23deg)', transformOrigin: 'right center'}}/>
      <div style={{position: 'absolute', right: 470, top: 300, width: 76, height: 210,
        borderRadius: 40, background: 'linear-gradient(90deg, #171B20, #475463, #15191D)',
        transform: 'rotate(10deg)', border: '5px solid #617282', boxShadow: '12px 14px 32px #0008'}}/>
      <Footer label="PRESENTER SCENE"/>
    </AbsoluteFill>
  );
};

const HeadlineCard: React.FC<{clip: TimelineClip}> = ({clip}) => {
  const f = useCurrentFrame();
  const slide = interpolate(f, [0, 25], [95, 0], {extrapolateRight: 'clamp'});
  const alpha = interpolate(f, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={full}>
      <div style={badge}>SCREENSHOT / NEWS</div>
      <div style={{position:'absolute', left: 190, top: 235, width: 1520, height: 655,
        transform: `translateY(${slide}px)`, opacity: alpha,
        background: '#F3F6FB', borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 25px 100px #000A'}}>
        <div style={{height: 72, background: '#DDE6EE', display: 'flex', alignItems: 'center', gap: 15, paddingLeft: 42}}>
          {['#F47779','#E5BD5E','#68C68E'].map((c) => <span key={c} style={{width: 17,height:17,borderRadius:17,background:c}}/>)}
          <span style={{color:'#435367',marginLeft:30,fontSize:21}}>demo-article.example / illustrative mockup</span>
        </div>
        <div style={{padding:'66px 90px', color:'#162438'}}>
          <div style={{fontSize:22, fontWeight:700,letterSpacing:2,color:'#168477'}}>ILLUSTRATIVE ARTICLE — NOT AN ACTUAL NEWS SOURCE</div>
          <h1 style={{fontSize:73,lineHeight:1.08,margin:'32px 0'}}>{clip.headline}</h1>
          <div style={{width:880,height:16,background:'#CCD8E4',borderRadius:6,marginBottom:18}}/>
          <div style={{width:1130,height:16,background:'#DCE5EE',borderRadius:6,marginBottom:18}}/>
          <div style={{width:730,height:16,background:'#DCE5EE',borderRadius:6}}/>
          <p style={{fontSize:29, color:'#566779',marginTop:48}}>{clip.subheading}</p>
        </div>
      </div>
      <Footer label="REPLACE WITH LICENSED SCREENSHOT"/>
    </AbsoluteFill>
  );
};

const Comparison: React.FC<{clip: TimelineClip}> = ({clip}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [5, 55], [0, 1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const bars = [{title: 'Traditional interview prep', value: 38, color: '#699CC5'},
    {title: 'AI coaching and practice', value: 87, color: '#5FD3BD'}];
  return (
    <AbsoluteFill style={full}>
      <div style={badge}>MOTION DESIGN / REMOTION</div>
      <h1 style={{position:'absolute',left:100,top:175,fontSize:78,maxWidth:1600}}>{clip.headline}</h1>
      <div style={{position:'absolute',left:140,top:425,right:140,display:'flex',flexDirection:'column',gap:100}}>
        {bars.map((b) => <div key={b.title}>
          <div style={{fontSize:36,marginBottom:23,fontWeight:600}}>{b.title}</div>
          <div style={{height:68,background:'#1F3349',borderRadius:18,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${b.value*p}%`, background:b.color,borderRadius:18}}/>
          </div>
        </div>)}
      </div>
      <div style={{position:'absolute',top:850,left:140,fontSize:23,color:palette.secondary}}>
        Demo bar lengths are arbitrary visual examples, not research data.
      </div>
      <Footer label="DETERMINISTIC REACT ANIMATION"/>
    </AbsoluteFill>
  );
};

const Workflow: React.FC<{clip: TimelineClip}> = ({clip}) => {
  const f = useCurrentFrame();
  const steps = ['Script','Voice','Assets','Timeline','Video'];
  return (
    <AbsoluteFill style={full}>
      <div style={badge}>ANIMATED WORKFLOW</div>
      <h1 style={{position:'absolute',left:100,top:190,fontSize:80}}>{clip.headline}</h1>
      <div style={{position:'absolute',left:90,top:450,right:90,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        {steps.map((s,i) => {
          const p = interpolate(f,[i*16,i*16+18],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
          return <React.Fragment key={s}>
            <div style={{width:290,height:180,background:i===4?'#14665D':'#213A54',
              border:'2px solid #4F7A90',borderRadius:22,display:'flex',justifyContent:'center',alignItems:'center',
              fontSize:36,fontWeight:700,opacity:p,transform:`translateY(${(1-p)*30}px)`}}>{s}</div>
            {i!==steps.length-1 && <div style={{fontSize:48,color:palette.gold,opacity:p}}>→</div>}
          </React.Fragment>;
        })}
      </div>
      <Footer label="AUTOMATED VIDEO ASSEMBLY"/>
    </AbsoluteFill>
  );
};

export const Scene: React.FC<{clip: TimelineClip}> = ({clip}) => {
  switch (clip.kind) {
    case 'avatar': return <AvatarPlaceholder clip={clip}/>;
    case 'headline': return <HeadlineCard clip={clip}/>;
    case 'comparison': return <Comparison clip={clip}/>;
    case 'workflow': return <Workflow clip={clip}/>;
    case 'image': return (
      <AbsoluteFill style={full}>
        <div style={badge}>IMAGE / MEDIA</div>
        {clip.imageFile ? <Img src={staticFile(clip.imageFile)} style={{width:'100%',height:'100%',objectFit:'contain'}}/> :
          <div style={{margin:'auto',fontSize:60}}>{clip.headline ?? 'Image placeholder'}</div>}
        <Footer label="IMAGE SCENE"/>
      </AbsoluteFill>
    );
  }
};
