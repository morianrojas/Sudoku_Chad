import React, { useEffect, useState } from 'react';
import { RANKS } from '../data/gameData';
import { Crown, FastForward, Flame } from 'lucide-react';

interface RewardOverlayProps {
  gifUrl: string;
  quote: string;
  xp: number;
  totalXp?: number;
  rankIndex?: number;
  rewardDurationMs: number;
  showTimerBar?: boolean;
  onClose: () => void;
}

type NormalRewardPresetId =
  | 'titan-surge'
  | 'war-glitch'
  | 'monolith-flip'
  | 'blitz-strike'
  | 'anvil-stamp'
  | 'valhalla-mist';

const PRESET_IDS: NormalRewardPresetId[] = [
  'titan-surge',
  'war-glitch',
  'monolith-flip',
  'blitz-strike',
  'anvil-stamp',
  'valhalla-mist',
];

let presetBag: NormalRewardPresetId[] = [];
let lastPresetId: NormalRewardPresetId | null = null;

function popNextRewardPreset(): NormalRewardPresetId {
  if (presetBag.length === 0) {
    const nextBag = [...PRESET_IDS];
    for (let i = nextBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nextBag[i], nextBag[j]] = [nextBag[j], nextBag[i]];
    }
    // Since we pop() from the end, swap last element with index 0 if it matches previous preset
    if (nextBag.length > 1 && nextBag[nextBag.length - 1] === lastPresetId) {
      [nextBag[0], nextBag[nextBag.length - 1]] = [nextBag[nextBag.length - 1], nextBag[0]];
    }
    presetBag = nextBag;
  }
  const picked = presetBag.pop()!;
  lastPresetId = picked;
  return picked;
}

type ParticleVariant =
  | 'embers'
  | 'hud-bars'
  | 'diamonds'
  | 'slashes'
  | 'radial-burst'
  | 'cinders';

interface PresetTheme {
  textEntryClass: string;
  textIdleClass: string;
  gifEntryClass: string;
  gifIdleClass: string;
  titleGradient: string;
  titleGlow: string;
  gifFrameClass: string;
  xpCardClass: string;
  xpBadgeColor: string;
  countdownClass: string;
  spotlightStyle: string;
  particleVariant: ParticleVariant;
}

const PRESET_THEMES: Record<NormalRewardPresetId, PresetTheme> = {
  'titan-surge': {
    textEntryClass: 'anim-text-titan-surge',
    textIdleClass: 'anim-idle-levitate',
    gifEntryClass: 'anim-gif-surge-zoom',
    gifIdleClass: 'anim-idle-levitate',
    titleGradient: 'from-amber-300 via-orange-400 to-yellow-100',
    titleGlow: 'drop-shadow-[0_0_22px_rgba(245,158,11,0.55)]',
    gifFrameClass: 'border-amber-400/70 shadow-[0_0_38px_rgba(245,158,11,0.38)]',
    xpCardClass: 'border-amber-400/45 bg-slate-900/85 shadow-[0_0_26px_rgba(245,158,11,0.28)]',
    xpBadgeColor: 'text-amber-300',
    countdownClass: 'from-amber-400 via-orange-500 to-yellow-300',
    spotlightStyle:
      'radial-gradient(circle at 50% 45%, rgba(245,158,11,0.18), rgba(234,88,12,0.08) 42%, transparent 72%)',
    particleVariant: 'embers',
  },
  'war-glitch': {
    textEntryClass: 'anim-text-war-glitch',
    textIdleClass: 'anim-idle-glitch',
    gifEntryClass: 'anim-gif-war-glitch',
    gifIdleClass: '',
    titleGradient: 'from-slate-100 via-sky-400 to-red-500',
    titleGlow: 'drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]',
    gifFrameClass: 'border-sky-400/70 shadow-[0_0_36px_rgba(56,189,248,0.35),0_0_60px_rgba(239,68,68,0.2)]',
    xpCardClass: 'border-sky-400/45 bg-slate-900/85 shadow-[0_0_24px_rgba(56,189,248,0.25)]',
    xpBadgeColor: 'text-sky-300',
    countdownClass: 'from-sky-400 via-slate-200 to-red-500',
    spotlightStyle:
      'radial-gradient(circle at 50% 45%, rgba(56,189,248,0.16), rgba(239,68,68,0.1) 42%, transparent 72%)',
    particleVariant: 'hud-bars',
  },
  'monolith-flip': {
    textEntryClass: 'anim-text-monolith-flip',
    textIdleClass: 'anim-idle-tilt',
    gifEntryClass: 'anim-gif-monolith-turn',
    gifIdleClass: '',
    titleGradient: 'from-slate-100 via-amber-300 to-orange-400',
    titleGlow: 'drop-shadow-[0_0_20px_rgba(251,191,36,0.45)]',
    gifFrameClass: 'border-slate-200/70 shadow-[0_0_38px_rgba(226,232,240,0.28),0_0_64px_rgba(245,158,11,0.25)]',
    xpCardClass: 'border-slate-300/45 bg-slate-900/85 shadow-[0_0_24px_rgba(226,232,240,0.2)]',
    xpBadgeColor: 'text-amber-200',
    countdownClass: 'from-slate-200 via-amber-400 to-orange-500',
    spotlightStyle:
      'radial-gradient(circle at 50% 45%, rgba(226,232,240,0.15), rgba(245,158,11,0.1) 42%, transparent 72%)',
    particleVariant: 'diamonds',
  },
  'blitz-strike': {
    textEntryClass: 'anim-text-blitz-left',
    textIdleClass: 'anim-idle-sway',
    gifEntryClass: 'anim-gif-blitz-right',
    gifIdleClass: '',
    titleGradient: 'from-red-500 via-amber-400 to-slate-100',
    titleGlow: 'drop-shadow-[0_0_22px_rgba(239,68,68,0.55)]',
    gifFrameClass: 'border-red-500/75 shadow-[0_0_40px_rgba(239,68,68,0.38)]',
    xpCardClass: 'border-red-500/50 bg-slate-900/85 shadow-[0_0_26px_rgba(239,68,68,0.28)]',
    xpBadgeColor: 'text-red-300',
    countdownClass: 'from-red-500 via-amber-400 to-white',
    spotlightStyle:
      'radial-gradient(circle at 50% 45%, rgba(239,68,68,0.2), rgba(245,158,11,0.08) 42%, transparent 72%)',
    particleVariant: 'slashes',
  },
  'anvil-stamp': {
    textEntryClass: 'anim-text-anvil-stamp',
    textIdleClass: 'anim-idle-pulse-tilt',
    gifEntryClass: 'anim-gif-recoil',
    gifIdleClass: '',
    titleGradient: 'from-yellow-300 via-orange-500 to-red-500',
    titleGlow: 'drop-shadow-[0_0_24px_rgba(249,115,22,0.55)]',
    gifFrameClass: 'border-orange-400/75 shadow-[0_0_42px_rgba(249,115,22,0.38)]',
    xpCardClass: 'border-orange-400/50 bg-slate-900/85 shadow-[0_0_26px_rgba(249,115,22,0.3)]',
    xpBadgeColor: 'text-orange-300',
    countdownClass: 'from-yellow-400 via-orange-500 to-red-600',
    spotlightStyle:
      'radial-gradient(circle at 50% 45%, rgba(249,115,22,0.22), rgba(220,38,38,0.1) 42%, transparent 72%)',
    particleVariant: 'radial-burst',
  },
  'valhalla-mist': {
    textEntryClass: 'anim-text-valhalla-rise',
    textIdleClass: 'anim-idle-levitate',
    gifEntryClass: 'anim-gif-pendulum',
    gifIdleClass: 'anim-idle-levitate',
    titleGradient: 'from-violet-300 via-slate-100 to-sky-300',
    titleGlow: 'drop-shadow-[0_0_22px_rgba(168,85,247,0.48)]',
    gifFrameClass: 'border-violet-400/65 shadow-[0_0_38px_rgba(168,85,247,0.32),0_0_58px_rgba(56,189,248,0.22)]',
    xpCardClass: 'border-violet-400/45 bg-slate-900/85 shadow-[0_0_24px_rgba(168,85,247,0.25)]',
    xpBadgeColor: 'text-violet-300',
    countdownClass: 'from-violet-400 via-slate-200 to-sky-400',
    spotlightStyle:
      'radial-gradient(circle at 50% 45%, rgba(168,85,247,0.18), rgba(56,189,248,0.1) 44%, transparent 74%)',
    particleVariant: 'cinders',
  },
};

// 16 deterministic ember drift points (negative delays so embers are already moving on frame 0)
const EMBER_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 6.1) % 88)}%`,
  top: `${24 + ((i * 13) % 68)}%`,
  x1: `${(i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 6)}px`,
  y1: `${-20 - (i % 3) * 10}px`,
  x2: `${(i % 2 === 0 ? -1 : 1) * (16 + (i % 5) * 5)}px`,
  y2: `${-46 - (i % 4) * 10}px`,
  x3: `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8)}px`,
  y3: `${-78 - (i % 3) * 14}px`,
  duration: `${2.2 + (i % 5) * 0.35}s`,
  delay: `${-((i % 6) * 0.34)}s`,
  color:
    i % 3 === 0
      ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.95)]'
      : i % 3 === 1
        ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)]'
        : 'bg-yellow-200 shadow-[0_0_10px_rgba(254,240,138,0.9)]',
}));

// 16 tactical HUD glitch bars
const HUD_BAR_PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const reverse = i % 2 === 1;
  return {
    id: i,
    top: `${6 + ((i * 5.8) % 88)}%`,
    width: `${28 + (i % 4) * 18}px`,
    gx0: reverse ? '106vw' : '-14vw',
    gx1: reverse ? '68vw' : '22vw',
    gx2: reverse ? '28vw' : '64vw',
    gx3: reverse ? '-18vw' : '108vw',
    duration: `${1.1 + (i % 5) * 0.12}s`,
    delay: `${-((i % 6) * 0.18)}s`,
    color:
      i % 3 === 0
        ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
        : i % 3 === 1
          ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]'
          : 'bg-slate-100 shadow-[0_0_8px_rgba(241,245,249,0.85)]',
  };
});

// 16 diamond steel glints
const DIAMOND_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${7 + ((i * 6) % 86)}%`,
  top: `${8 + ((i * 11.5) % 84)}%`,
  duration: `${1.5 + (i % 5) * 0.28}s`,
  delay: `${-((i % 7) * 0.22)}s`,
  color:
    i % 3 === 0
      ? 'bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]'
      : i % 3 === 1
        ? 'bg-slate-100 shadow-[0_0_12px_rgba(241,245,249,0.9)]'
        : 'bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.85)]',
}));

// 16 diagonal speed slashes (-18deg bottom-left to top-right)
const SLASH_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${-14 + (i % 4) * 8}%`,
  top: `${16 + ((i * 5.2) % 76)}%`,
  width: `${56 + (i % 4) * 24}px`,
  duration: `${1.05 + (i % 4) * 0.14}s`,
  delay: `${-((i % 6) * 0.17)}s`,
  color:
    i % 3 === 0
      ? 'bg-gradient-to-r from-transparent via-red-500 to-amber-300'
      : i % 3 === 1
        ? 'bg-gradient-to-r from-transparent via-amber-400 to-white'
        : 'bg-gradient-to-r from-transparent via-orange-500 to-red-400',
}));

// 16 radial shrapnel sparks from center (50%, 50%) — tight burst stagger (first wave immediate)
const BURST_PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const angleRad = (i / 16) * Math.PI * 2 + (i % 2 === 0 ? 0.08 : -0.06);
  const dist = 210 + (i % 3) * 85;
  return {
    id: i,
    bx: `${Math.round(Math.cos(angleRad) * dist)}px`,
    by: `${Math.round(Math.sin(angleRad) * dist)}px`,
    duration: `${1.25 + (i % 4) * 0.18}s`,
    delay: `${i < 8 ? 0 : -(0.45 + (i % 4) * 0.12)}s`,
    color:
      i % 3 === 0
        ? 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.95)]'
        : i % 3 === 1
          ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.95)]'
          : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.95)]',
  };
});

// 16 falling cinders from top with sinusoidal sway
const CINDER_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 6.2) % 90)}%`,
  sway: `${(i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 8)}px`,
  duration: `${2.8 + (i % 5) * 0.22}s`,
  delay: `${-((i % 6) * 0.45)}s`,
  color:
    i % 3 === 0
      ? 'bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.9)]'
      : i % 3 === 1
        ? 'bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]'
        : 'bg-slate-200 shadow-[0_0_10px_rgba(226,232,240,0.85)]',
}));

// 24 ascending sparks for Level-Up / Rank-Up (instant wave + mid-flight negative phase)
const RANKUP_ASCENDING_SPARKS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${3 + ((i * 4.1) % 94)}%`,
  width: `${4 + (i % 3)}px`,
  height: `${12 + (i % 4) * 2}px`,
  drift: `${(i % 2 === 0 ? 1 : -1) * (12 + (i % 5) * 7)}px`,
  duration: `${1.55 + (i % 6) * 0.18}s`,
  delay: `${-((i % 8) * 0.22)}s`,
  color:
    i % 4 === 0
      ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.95)]'
      : i % 4 === 1
        ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.95)]'
        : i % 4 === 2
          ? 'bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]'
          : 'bg-slate-100 shadow-[0_0_10px_rgba(248,250,252,0.9)]',
}));

const NormalParticlesLayer: React.FC<{ variant: ParticleVariant }> = React.memo(({ variant }) => {
  switch (variant) {
    case 'embers':
      return (
        <>
          {EMBER_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`block absolute w-2 h-2 rounded-full anim-p-ember ${p.color}`}
              style={
                {
                  left: p.left,
                  top: p.top,
                  '--x1': p.x1,
                  '--y1': p.y1,
                  '--x2': p.x2,
                  '--y2': p.y2,
                  '--x3': p.x3,
                  '--y3': p.y3,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </>
      );
    case 'hud-bars':
      return (
        <>
          {HUD_BAR_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`block absolute left-0 h-[3px] rounded-full anim-p-glitch ${p.color}`}
              style={
                {
                  top: p.top,
                  width: p.width,
                  '--gx0': p.gx0,
                  '--gx1': p.gx1,
                  '--gx2': p.gx2,
                  '--gx3': p.gx3,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </>
      );
    case 'diamonds':
      return (
        <>
          {DIAMOND_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`block absolute w-2.5 h-2.5 rounded-[2px] anim-p-diamond ${p.color}`}
              style={{
                left: p.left,
                top: p.top,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </>
      );
    case 'slashes':
      return (
        <>
          {SLASH_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`block absolute h-[3px] rounded-full anim-p-slash ${p.color}`}
              style={{
                left: p.left,
                top: p.top,
                width: p.width,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </>
      );
    case 'radial-burst':
      return (
        <>
          {BURST_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`block absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-sm anim-p-burst ${p.color}`}
              style={
                {
                  '--bx': p.bx,
                  '--by': p.by,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </>
      );
    case 'cinders':
    default:
      return (
        <>
          {CINDER_PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`block absolute -top-5 w-2 h-2.5 rounded-sm anim-p-cinder ${p.color}`}
              style={
                {
                  left: p.left,
                  '--sway': p.sway,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </>
      );
  }
});

NormalParticlesLayer.displayName = 'NormalParticlesLayer';

const RewardOverlay: React.FC<RewardOverlayProps> = React.memo(
  ({ gifUrl, quote, xp, totalXp, rankIndex, rewardDurationMs, showTimerBar = false, onClose }) => {
    const isRankUp = rankIndex !== undefined;
    const rankDef = isRankUp ? RANKS[rankIndex] : null;
    const [crestImgFailed, setCrestImgFailed] = useState(false);
    const [activePreset] = useState<NormalRewardPresetId>(() =>
      isRankUp ? 'titan-surge' : popNextRewardPreset()
    );

    useEffect(() => {
      setCrestImgFailed(false);
    }, [rankDef?.img]);

    const animInstanceKey = `${isRankUp ? `rank-${rankIndex}` : activePreset}-${gifUrl}-${xp}`;

    if (isRankUp && rankDef) {
      return (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-4 overflow-hidden anim-reward-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Rank up reward notification"
        >
          {/* Golden-Crimson Forge Radial Aura */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 48%, rgba(245,158,11,0.24), rgba(185,28,28,0.16) 38%, transparent 72%)',
              }}
            />
            <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-amber-400/60 anim-rank-shockwave" />
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-red-500/45 anim-rank-shockwave-delayed" />
          </div>

          {/* Layer 1: 24 Ascending Energy Sparks */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
            {RANKUP_ASCENDING_SPARKS.map((spark) => (
              <span
                key={spark.id}
                className={`block absolute -bottom-[4vh] rounded-full anim-rank-spark ${spark.color}`}
                style={
                  {
                    left: spark.left,
                    width: spark.width,
                    height: spark.height,
                    '--spark-drift': spark.drift,
                    animationDuration: spark.duration,
                    animationDelay: spark.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Layer 2: Rank Crest + Impact Title */}
          <div
            key={`rank-title-${animInstanceKey}`}
            className="relative z-10 text-center max-w-3xl w-full px-2 mb-4 sm:mb-6 flex flex-col items-center anim-rank-text-entry"
          >
            <div className="anim-rank-text-idle flex flex-col items-center">
              <div className="relative mb-2.5 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-900 p-0.5 border-2 border-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.5)] flex items-center justify-center">
                  {!crestImgFailed ? (
                    <img
                      src={rankDef.img}
                      alt={rankDef.name}
                      referrerPolicy="no-referrer"
                      onError={() => setCrestImgFailed(true)}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <Crown size={26} className="text-amber-400" />
                  )}
                </div>
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-slate-950 border-2 border-slate-950 shadow-md flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Crown size={14} strokeWidth={2.6} />
                </div>
              </div>

              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] text-amber-300 mb-1">
                RANK ASCENSION
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-red-400 leading-none">
                {rankDef.name}
              </h2>
            </div>
          </div>

          {/* Layer 3: Heroic 3D GIF Stage */}
          <div
            key={`rank-gif-${animInstanceKey}`}
            className="relative z-10 anim-rank-gif-entry"
          >
            <div className="rounded-xl overflow-hidden border-2 border-amber-400/80 bg-slate-950 anim-rank-gif-pulse">
              {gifUrl && (
                <img
                  src={gifUrl}
                  alt="Rank Up Reward"
                  referrerPolicy="no-referrer"
                  className="block max-w-[85vw] max-h-[48vh] w-auto h-auto object-contain"
                />
              )}
              {showTimerBar && (
                <div className="w-full h-1.5 bg-slate-800 overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full animate-reward-countdown bg-gradient-to-r from-amber-400 via-red-500 to-amber-300"
                    style={{ animationDuration: `${rewardDurationMs}ms` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Layer 4: XP Summary Card + Skip */}
          <div
            key={`rank-xp-${animInstanceKey}`}
            className="relative z-10 mt-4 sm:mt-6 flex flex-col items-center gap-3.5"
          >
            <div className="anim-rank-text-entry">
              <div className="anim-rank-text-idle inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900/90 border border-amber-400/55 shadow-[0_0_24px_rgba(245,158,11,0.3)] text-sm sm:text-base font-extrabold tracking-wide text-slate-100 tabular-nums">
                <span className="text-amber-300">
                  {xp > 0 ? `+${xp} XP` : 'BOARD COMPLETE'}
                </span>
                {totalXp !== undefined && (
                  <>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-200">
                      Total: {totalXp.toLocaleString()} XP
                    </span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="pointer-events-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs sm:text-sm border border-amber-400/40 backdrop-blur-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap anim-rank-btn"
            >
              <span>Skip Reward</span>
              <FastForward size={15} />
            </button>
          </div>
        </div>
      );
    }

    const theme = PRESET_THEMES[activePreset];

    return (
      <div
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-950/90 p-4 overflow-hidden anim-reward-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="Reward notification"
      >
        {/* Preset Atmospheric Spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: theme.spotlightStyle }}
          aria-hidden="true"
        />

        {/* Layer 1: 16 Synchronized Theme Particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
          <NormalParticlesLayer variant={theme.particleVariant} />
        </div>

        {/* Layer 2: Upper Motivational Title (Entry + Continuous Preset Loop) */}
        <div
          key={`normal-title-${animInstanceKey}`}
          className={`relative z-10 text-center max-w-3xl w-full px-3 mb-4 sm:mb-6 ${theme.textEntryClass}`}
        >
          <div className={theme.textIdleClass}>
            <h2
              className={`text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${theme.titleGradient} ${theme.titleGlow} leading-tight`}
            >
              {quote}
            </h2>
          </div>
        </div>

        {/* Layer 3: Central GIF Stage */}
        <div
          key={`normal-gif-${animInstanceKey}`}
          className={`relative z-10 ${theme.gifEntryClass}`}
        >
          <div className={theme.gifIdleClass}>
            <div className={`rounded-xl overflow-hidden border-2 bg-slate-950 ${theme.gifFrameClass}`}>
              {gifUrl && (
                <img
                  src={gifUrl}
                  alt="Reward"
                  referrerPolicy="no-referrer"
                  className="block max-w-[85vw] max-h-[50vh] w-auto h-auto object-contain"
                />
              )}
              {showTimerBar && (
                <div className="w-full h-1.5 bg-slate-800 overflow-hidden" aria-hidden="true">
                  <div
                    className={`h-full animate-reward-countdown bg-gradient-to-r ${theme.countdownClass}`}
                    style={{ animationDuration: `${rewardDurationMs}ms` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Layer 4: Lower XP Card (Shares Active Preset Text Choreography) + Skip */}
        <div
          key={`normal-xp-${animInstanceKey}`}
          className="relative z-10 mt-4 sm:mt-6 flex flex-col items-center gap-3.5"
        >
          <div className={theme.textEntryClass}>
            <div className={theme.textIdleClass}>
              <div
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border backdrop-blur-sm text-sm sm:text-base font-extrabold tracking-wide text-slate-100 tabular-nums ${theme.xpCardClass}`}
              >
                <Flame size={17} className={`${theme.xpBadgeColor} shrink-0`} />
                <span className={theme.xpBadgeColor}>
                  {xp > 0 ? `+${xp} XP` : 'BOARD COMPLETE'}
                </span>
                {totalXp !== undefined && (
                  <>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-200">
                      Total: {totalXp.toLocaleString()} XP
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="pointer-events-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap anim-rank-btn"
          >
            <span>Skip Reward</span>
            <FastForward size={15} />
          </button>
        </div>
      </div>
    );
  }
);

RewardOverlay.displayName = 'RewardOverlay';

export default RewardOverlay;
