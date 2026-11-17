import React, { useEffect, useState } from 'react';
import { formatTime } from './GameTimer';
import { Coffee, Play, Wind, Brain } from 'lucide-react';

interface BreakOverlayProps {
  breakTimeLeft: number;
  totalBreakDuration: number;
  quote: string;
  onSkipBreak: () => void;
}

const SVG_RADIUS = 92;
const SVG_CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS;

const BreakOverlay: React.FC<BreakOverlayProps> = React.memo(
  ({ breakTimeLeft, totalBreakDuration, quote, onSkipBreak }) => {
    const [isInhalePhase, setIsInhalePhase] = useState(true);

    // 4-second inhale / 4-second exhale guided breathing rhythm synced with 8s CSS breath halo
    useEffect(() => {
      setIsInhalePhase(true);
      const interval = window.setInterval(() => {
        setIsInhalePhase((prev) => !prev);
      }, 4000);
      return () => window.clearInterval(interval);
    }, []);

    const safeTotal = Math.max(1, totalBreakDuration);
    const ratio = Math.max(0, Math.min(1, breakTimeLeft / safeTotal));
    const dashOffset = SVG_CIRCUMFERENCE * (1 - ratio);

    return (
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50/95 to-sky-50 p-4 sm:p-6 overflow-y-auto animate-break-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="break-title"
      >
        {/* Serene Soft Daylight Mist Orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full bg-teal-200/45 blur-3xl animate-normal-orb" />
          <div className="absolute -bottom-28 -right-24 w-[480px] h-[480px] rounded-full bg-sky-200/45 blur-3xl animate-normal-orb-alt" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-emerald-100/50 blur-3xl animate-break-breathe" />
        </div>

        {/* Sanctuary Break Card */}
        <div className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md border border-teal-200/75 rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.08)] p-6 sm:p-9 text-center animate-break-card">
          {/* Quiet Metadata Kicker */}
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700/80 mb-1.5">
            Mental Reset · {safeTotal}s Break
          </p>

          <h2
            id="break-title"
            className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900"
          >
            Break Time
          </h2>

          <p className="mt-2 text-base sm:text-lg font-medium text-slate-600 max-w-md mx-auto leading-snug">
            {quote}
          </p>

          {/* Guided Breathing Halo + SVG Progress Countdown */}
          <div className="relative my-7 sm:my-8 flex items-center justify-center">
            {/* Outer Breathing Wave Halos */}
            <div
              className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-teal-200/45 via-emerald-100/40 to-sky-200/45 animate-break-breathe pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-teal-300/60 animate-break-ring-ripple pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center">
              <svg
                className="w-full h-full -rotate-90 drop-shadow-[0_6px_18px_rgba(13,148,136,0.12)]"
                viewBox="0 0 220 220"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="breakRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="55%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
                <circle
                  cx="110"
                  cy="110"
                  r={SVG_RADIUS}
                  fill="rgba(255,255,255,0.92)"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="110"
                  cy="110"
                  r={SVG_RADIUS}
                  fill="none"
                  stroke="url(#breakRingGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={SVG_CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                />
              </svg>

              {/* Centerpiece Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/70 text-teal-600 flex items-center justify-center mb-1.5">
                  <Coffee size={18} />
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 tabular-nums leading-none">
                  {formatTime(breakTimeLeft)}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-teal-700 tracking-wide">
                  <Wind size={13} className="shrink-0" />
                  <span>{isInhalePhase ? 'Breathe in slowly' : 'Exhale gently'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action */}
          <div className="flex justify-center">
            <button
              onClick={onSkipBreak}
              className="min-h-[44px] px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wide shadow-md shadow-teal-600/20 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <Play size={16} fill="currentColor" />
              <span>Resume Game</span>
            </button>
          </div>

          {/* Restorative Science Footnote */}
          <div className="mt-7 rounded-2xl bg-slate-50/90 border border-slate-200/80 p-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                <Brain size={16} />
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                During rest, neural activity shifts away from constant task-focused processing,
                allowing neurotransmitter systems like dopamine and norepinephrine to rebalance.
                Brief pauses clear mental noise, strengthen working memory, and help you return at
                peak performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BreakOverlay.displayName = 'BreakOverlay';

export default BreakOverlay;
