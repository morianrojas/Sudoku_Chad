import React, { useEffect, useState } from 'react';
import { Difficulty } from '../types';
import { RANKS, MAX_MISTAKES_FOR_MAX_RANK } from '../data/gameData';
import { formatTime } from './GameTimer';
import { Trophy, Crown, RotateCcw, Home, X, Zap, Clock, Target, ShieldCheck } from 'lucide-react';

interface VictoryModalProps {
  difficulty: Difficulty;
  score: number;
  hits: number;
  mistakes: number;
  rankIndex: number;
  completionTime: number;
  enableSound: boolean;
  volumePercent: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  onClose: () => void;
}

interface ConfettiPiece {
  id: number;
  tx: string;
  ty: string;
  rot: string;
  delay: string;
  colorClass: string;
  sizeClass: string;
}

const CONFETTI_PIECES: ConfettiPiece[] = [
  { id: 0, tx: '-160px', ty: '-130px', rot: '220deg', delay: '0.02s', colorClass: 'bg-amber-400', sizeClass: 'w-2.5 h-2.5 rounded-sm' },
  { id: 1, tx: '-120px', ty: '-170px', rot: '-260deg', delay: '0.05s', colorClass: 'bg-emerald-400', sizeClass: 'w-2 h-4 rounded-full' },
  { id: 2, tx: '-75px', ty: '-185px', rot: '310deg', delay: '0.08s', colorClass: 'bg-sky-400', sizeClass: 'w-3 h-2 rounded-sm' },
  { id: 3, tx: '-20px', ty: '-200px', rot: '-180deg', delay: '0.03s', colorClass: 'bg-yellow-300', sizeClass: 'w-2.5 h-2.5 rounded-full' },
  { id: 4, tx: '35px', ty: '-195px', rot: '290deg', delay: '0.06s', colorClass: 'bg-purple-400', sizeClass: 'w-2 h-3.5 rounded-sm' },
  { id: 5, tx: '90px', ty: '-180px', rot: '-320deg', delay: '0.04s', colorClass: 'bg-emerald-300', sizeClass: 'w-3 h-2 rounded-sm' },
  { id: 6, tx: '145px', ty: '-145px', rot: '240deg', delay: '0.09s', colorClass: 'bg-amber-300', sizeClass: 'w-2.5 h-2.5 rounded-full' },
  { id: 7, tx: '175px', ty: '-95px', rot: '-210deg', delay: '0.07s', colorClass: 'bg-rose-400', sizeClass: 'w-2 h-3 rounded-sm' },
  { id: 8, tx: '-185px', ty: '-60px', rot: '340deg', delay: '0.1s', colorClass: 'bg-cyan-400', sizeClass: 'w-3 h-2 rounded-full' },
  { id: 9, tx: '-150px', ty: '85px', rot: '-290deg', delay: '0.12s', colorClass: 'bg-yellow-400', sizeClass: 'w-2 h-3.5 rounded-sm' },
  { id: 10, tx: '-95px', ty: '140px', rot: '260deg', delay: '0.11s', colorClass: 'bg-emerald-400', sizeClass: 'w-2.5 h-2.5 rounded-sm' },
  { id: 11, tx: '105px', ty: '135px', rot: '-250deg', delay: '0.14s', colorClass: 'bg-amber-400', sizeClass: 'w-2 h-3 rounded-sm' },
  { id: 12, tx: '165px', ty: '80px', rot: '300deg', delay: '0.12s', colorClass: 'bg-violet-400', sizeClass: 'w-2.5 h-2.5 rounded-full' },
  { id: 13, tx: '190px', ty: '-15px', rot: '-330deg', delay: '0.08s', colorClass: 'bg-sky-300', sizeClass: 'w-3 h-2 rounded-sm' },
  { id: 14, tx: '-195px', ty: '20px', rot: '200deg', delay: '0.09s', colorClass: 'bg-orange-400', sizeClass: 'w-2.5 h-2.5 rounded-sm' },
  { id: 15, tx: '-55px', ty: '175px', rot: '-220deg', delay: '0.15s', colorClass: 'bg-cyan-300', sizeClass: 'w-2 h-3 rounded-full' },
  { id: 16, tx: '50px', ty: '170px', rot: '275deg', delay: '0.16s', colorClass: 'bg-emerald-300', sizeClass: 'w-2.5 h-2.5 rounded-sm' },
  { id: 17, tx: '0px', ty: '-220px', rot: '360deg', delay: '0.01s', colorClass: 'bg-amber-300', sizeClass: 'w-3 h-3 rounded-sm' },
];

const playVictoryChime = (volumePercent: number) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    const vol = Math.max(0.05, Math.min(0.4, (volumePercent / 100) * 0.35));
    master.gain.setValueAtTime(vol, ctx.currentTime);
    master.connect(ctx.destination);

    // Bright ascending victory fanfare: C5 - E5 - G5 - B5 - C6
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
    const offsets = [0, 0.09, 0.18, 0.27, 0.38];
    const durations = [0.22, 0.22, 0.22, 0.24, 0.7];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + offsets[idx];
      const end = start + durations[idx];

      osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(1, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, end);

      osc.connect(gain);
      gain.connect(master);
      osc.start(start);
      osc.stop(end + 0.02);
    });

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1500);
  } catch {
    // Audio playback safely skipped if blocked
  }
};

const VictoryModal: React.FC<VictoryModalProps> = React.memo(
  ({
    difficulty,
    score,
    hits,
    mistakes,
    rankIndex,
    completionTime,
    enableSound,
    volumePercent,
    onPlayAgain,
    onMainMenu,
    onClose,
  }) => {
    const [imgFailed, setImgFailed] = useState(false);

    useEffect(() => {
      setImgFailed(false);
    }, [rankIndex]);

    useEffect(() => {
      if (enableSound) {
        playVictoryChime(volumePercent);
      }
    }, [enableSound, volumePercent]);

    const rank = RANKS[rankIndex] || RANKS[0];
    const isMaxRank = rankIndex >= RANKS.length - 1;
    const totalAttempts = hits + mistakes;
    const accuracy = totalAttempts > 0 ? Math.round((hits / totalAttempts) * 100) : 100;
    const maxAllowedMistakes = MAX_MISTAKES_FOR_MAX_RANK[difficulty];

    let headline = 'Puzzle Conquered!';
    let subtitle = 'Every digit locked into harmony.';
    if (mistakes === 0 && isMaxRank) {
      headline = 'Absolute Perfection!';
      subtitle = 'Zero mistakes & Ultra Instinct mastery unlocked.';
    } else if (isMaxRank) {
      headline = 'Ultra Instinct Victory!';
      subtitle = `Max rank reached on ${difficulty} difficulty.`;
    } else if (mistakes === 0) {
      headline = 'Flawless Victory!';
      subtitle = 'Clean sweep with zero mistakes.';
    }

    return (
      <div
        className="fixed inset-0 z-[115] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-victory-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="victory-headline"
      >
        <div className="relative w-full max-w-md">
          {/* Confetti Burst Layer */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-0"
            aria-hidden="true"
          >
            {CONFETTI_PIECES.map((piece) => (
              <span
                key={piece.id}
                className={`block absolute animate-victory-confetti ${piece.colorClass} ${piece.sizeClass}`}
                style={
                  {
                    '--tx': piece.tx,
                    '--ty': piece.ty,
                    '--rot': piece.rot,
                    animationDelay: piece.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Main Victory Card */}
          <div className="relative z-10 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white p-6 sm:p-7 animate-victory-card">
            {/* Subtle Diagonal Shimmer */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
              aria-hidden="true"
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-200/40 to-transparent animate-victory-shimmer" />
            </div>

            {/* Close / Inspect Board Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Inspect finished board"
              title="Inspect finished board"
            >
              <X size={20} />
            </button>

            {/* Crown & Rank Halo Showcase */}
            <div className="relative flex flex-col items-center text-center pt-1">
              <div className="relative mb-4 flex items-center justify-center">
                {/* Rotating Radiant Halo */}
                <div
                  className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400/35 via-emerald-400/25 to-sky-400/35 blur-md animate-victory-halo"
                  aria-hidden="true"
                />
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-300/70 shadow-[0_0_32px_rgba(251,191,36,0.35)] bg-slate-800 flex items-center justify-center">
                  {!imgFailed ? (
                    <img
                      src={rank.img}
                      alt={rank.name}
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Trophy size={40} className="text-amber-400" />
                  )}
                </div>
                <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg animate-victory-trophy">
                  {isMaxRank ? <Crown size={18} strokeWidth={2.5} /> : <Trophy size={18} strokeWidth={2.5} />}
                </div>
              </div>

              <div
                className="animate-victory-stagger"
                style={{ animationDelay: '0.08s' }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
                  {difficulty} Mode · {isMaxRank ? 'Max Rank Achieved' : `Rank ${rankIndex + 1} / ${RANKS.length}`}
                </p>
                <h2
                  id="victory-headline"
                  className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight"
                >
                  {headline}
                </h2>
                <p className="text-sm text-slate-300 mt-1">{subtitle}</p>
              </div>

              {/* Final Rank Title */}
              <div
                className="mt-4 flex items-center gap-2 text-sm font-extrabold tracking-wide animate-victory-stagger"
                style={{ animationDelay: '0.14s' }}
              >
                <span className="text-slate-400 font-medium">Final Rank:</span>
                <span className={rank.color}>{rank.name}</span>
              </div>
            </div>

            {/* 4-Metric Summary Grid */}
            <div
              className="grid grid-cols-2 gap-3 mt-6 animate-victory-stagger"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 flex flex-col">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-400" /> Total XP
                </span>
                <span className="text-xl font-black text-white tabular-nums mt-1">
                  {score.toLocaleString()} XP
                </span>
                <span className="text-[11px] text-slate-400 tabular-nums">
                  {maxAllowedMistakes === 0
                    ? 'Max rank: 0 errors'
                    : `Max rank: ≤ ${maxAllowedMistakes} ${maxAllowedMistakes === 1 ? 'error' : 'errors'}`}
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 flex flex-col">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Clock size={14} className="text-sky-400" /> Time
                </span>
                <span className="text-xl font-black text-white tabular-nums font-mono mt-1">
                  {formatTime(completionTime)}
                </span>
                <span className="text-[11px] text-slate-400">Elapsed time</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 flex flex-col">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Target size={14} className="text-emerald-400" /> Accuracy
                </span>
                <span className="text-xl font-black text-emerald-400 tabular-nums mt-1">
                  {accuracy}%
                </span>
                <span className="text-[11px] text-slate-400 tabular-nums">
                  {hits} hits · {mistakes} mistakes
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 flex flex-col">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-purple-400" /> Status
                </span>
                <span className="text-xl font-black text-white mt-1">
                  {mistakes === 0 ? 'Flawless' : mistakes <= 2 ? 'Mastered' : 'Cleared'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isMaxRank ? 'Max level reached' : 'Board completed'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="mt-6 flex flex-col sm:flex-row gap-3 animate-victory-stagger"
              style={{ animationDelay: '0.26s' }}
            >
              <button
                onClick={onPlayAgain}
                className="flex-1 min-h-[44px] px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <RotateCcw size={17} strokeWidth={2.5} />
                Play Again
              </button>
              <button
                onClick={onMainMenu}
                className="flex-1 min-h-[44px] px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <Home size={17} />
                Main Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VictoryModal.displayName = 'VictoryModal';

export default VictoryModal;
