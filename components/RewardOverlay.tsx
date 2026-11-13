import React, { useEffect, useState } from 'react';
import { RANKS } from '../data/gameData';
import { Crown, FastForward, Sparkles } from 'lucide-react';

interface RewardOverlayProps {
  gifUrl: string;
  quote: string;
  xp: number;
  rankIndex?: number;
  rewardDurationMs: number;
  onClose: () => void;
}

const RANKUP_SPARKS = [
  { id: 0, tx: '-130px', ty: '-75px', rot: '180deg', delay: '0.02s', color: 'bg-amber-400', size: 'w-2.5 h-2.5 rounded-sm' },
  { id: 1, tx: '-95px', ty: '-115px', rot: '-210deg', delay: '0.06s', color: 'bg-sky-400', size: 'w-2 h-3 rounded-full' },
  { id: 2, tx: '-35px', ty: '-125px', rot: '260deg', delay: '0.04s', color: 'bg-emerald-400', size: 'w-2.5 h-2 rounded-sm' },
  { id: 3, tx: '40px', ty: '-125px', rot: '-240deg', delay: '0.05s', color: 'bg-amber-300', size: 'w-2.5 h-2.5 rounded-full' },
  { id: 4, tx: '100px', ty: '-110px', rot: '220deg', delay: '0.08s', color: 'bg-blue-400', size: 'w-2 h-3 rounded-sm' },
  { id: 5, tx: '135px', ty: '-70px', rot: '-190deg', delay: '0.03s', color: 'bg-orange-400', size: 'w-2.5 h-2.5 rounded-sm' },
  { id: 6, tx: '-145px', ty: '15px', rot: '280deg', delay: '0.09s', color: 'bg-yellow-400', size: 'w-2 h-2.5 rounded-full' },
  { id: 7, tx: '145px', ty: '20px', rot: '-270deg', delay: '0.07s', color: 'bg-emerald-400', size: 'w-2.5 h-2 rounded-sm' },
];

const RewardOverlay: React.FC<RewardOverlayProps> = React.memo(
  ({ gifUrl, quote, xp, rankIndex, rewardDurationMs, onClose }) => {
    const isRankUp = rankIndex !== undefined;
    const rankDef = isRankUp ? RANKS[rankIndex] : null;
    const [crestImgFailed, setCrestImgFailed] = useState(false);

    useEffect(() => {
      setCrestImgFailed(false);
    }, [rankDef?.img]);

    if (isRankUp && rankDef) {
      return (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50/95 via-amber-50/90 to-sky-50/95 backdrop-blur-md p-4 overflow-hidden animate-rankup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Rank up reward notification"
        >
          {/* Radiant Sunburst Rays & Expanding Prestige Halo Rings */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -top-24 -left-24 w-[440px] h-[440px] rounded-full bg-amber-200/45 blur-3xl animate-normal-orb" />
            <div className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full bg-sky-200/45 blur-3xl animate-normal-orb-alt" />
            <div
              className="w-[760px] h-[760px] rounded-full opacity-55 animate-rankup-sunburst"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(251,191,36,0.22) 0deg 15deg, transparent 15deg 45deg, rgba(56,189,248,0.16) 45deg 60deg, transparent 60deg 90deg, rgba(251,191,36,0.22) 90deg 105deg, transparent 105deg 135deg, rgba(16,185,129,0.14) 135deg 150deg, transparent 150deg 180deg, rgba(251,191,36,0.22) 180deg 195deg, transparent 195deg 225deg, rgba(56,189,248,0.16) 225deg 240deg, transparent 240deg 270deg, rgba(251,191,36,0.22) 270deg 285deg, transparent 285deg 315deg, rgba(16,185,129,0.14) 315deg 330deg, transparent 330deg 360deg)',
                maskImage: 'radial-gradient(circle, rgba(0,0,0,0.9) 15%, transparent 68%)',
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0.9) 15%, transparent 68%)',
              }}
            />
            <div className="absolute w-72 h-72 rounded-full border-2 border-amber-400/55 animate-rankup-ring" />
            <div className="absolute w-72 h-72 rounded-full border-2 border-sky-400/40 animate-rankup-ring-delayed" />
          </div>

          {/* Prestige Showcase Header */}
          <div className="mb-5 sm:mb-7 text-center z-10 relative max-w-2xl w-full px-2 flex flex-col items-center">
            {/* Confetti Sparks + New Rank Crest Portrait */}
            <div className="relative mb-3 flex items-center justify-center">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                {RANKUP_SPARKS.map((spark) => (
                  <span
                    key={spark.id}
                    className={`block absolute animate-victory-confetti ${spark.color} ${spark.size}`}
                    style={
                      {
                        '--tx': spark.tx,
                        '--ty': spark.ty,
                        '--rot': spark.rot,
                        animationDelay: spark.delay,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>

              <div className="relative animate-rankup-crest">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white p-1 border-2 border-amber-400 shadow-[0_10px_28px_rgba(245,158,11,0.28)] flex items-center justify-center">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                    {!crestImgFailed ? (
                      <img
                        src={rankDef.img}
                        alt={rankDef.name}
                        referrerPolicy="no-referrer"
                        onError={() => setCrestImgFailed(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Crown size={28} className="text-amber-500" />
                    )}
                  </div>
                </div>
                <div
                  className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-amber-400 text-slate-900 border-2 border-white shadow-md flex items-center justify-center animate-victory-trophy"
                  aria-hidden="true"
                >
                  <Crown size={15} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Ascending XP Callout */}
            <div className="animate-normal-xp-float mb-2.5 sm:mb-3">
              <div className="animate-rankup-xp inline-flex items-center justify-center">
                {xp > 0 ? (
                  <span className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-blue-600 animate-rankup-gradient drop-shadow-[0_6px_18px_rgba(245,158,11,0.22)] tabular-nums">
                    +{xp} XP
                  </span>
                ) : (
                  <span className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-600 animate-rankup-gradient drop-shadow-[0_6px_18px_rgba(245,158,11,0.2)]">
                    BOARD COMPLETE
                  </span>
                )}
              </div>
            </div>

            {/* Luminous Porcelain & Gold Rank Banner */}
            <div className="animate-rankup-banner">
              <div className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-white via-amber-50/80 to-white border border-amber-300/85 px-6 py-3 shadow-[0_14px_38px_rgba(245,158,11,0.16),0_4px_14px_rgba(15,23,42,0.06)]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  aria-hidden="true"
                >
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-200/50 to-transparent animate-victory-shimmer" />
                </div>

                <div className="relative z-10 flex items-center gap-2.5 text-lg sm:text-2xl font-black uppercase tracking-wide text-slate-800">
                  <span className="text-slate-600">NEW RANK:</span>
                  <span className={`${rankDef.color} drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]`}>
                    {rankDef.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Framed Prestige GIF Stage */}
          <div className="relative z-10 w-auto max-w-5xl max-h-[56vh] rounded-3xl bg-white p-1.5 sm:p-2 border-2 border-amber-300/85 shadow-[0_24px_60px_rgba(217,119,6,0.18),0_10px_28px_rgba(15,23,42,0.1)] animate-rankup-media">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
              <div className="relative w-full h-full flex justify-center items-center">
                {gifUrl && (
                  <img
                    src={gifUrl}
                    alt="Rank Up Reward"
                    referrerPolicy="no-referrer"
                    className="w-auto h-auto max-h-[50vh] object-contain"
                  />
                )}
              </div>

              <div className="w-full h-1.5 bg-slate-200 overflow-hidden" aria-hidden="true">
                <div
                  className="h-full animate-reward-countdown bg-gradient-to-r from-amber-500 via-orange-400 to-blue-500"
                  style={{ animationDuration: `${rewardDurationMs}ms` }}
                />
              </div>
            </div>
          </div>

          {/* Daylight Prestige Skip Button */}
          <button
            onClick={onClose}
            className="relative z-10 mt-5 sm:mt-7 min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-800 hover:text-slate-950 font-bold uppercase tracking-widest text-xs sm:text-sm border border-amber-300/90 shadow-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap animate-rankup-btn"
          >
            <span>Skip Reward</span>
            <FastForward size={15} />
          </button>
        </div>
      );
    }

    // Normal Reward: Bright Daylight Theme with Elastic Bounce + 3D Gallery Rise Animations
    return (
      <div
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50/95 via-sky-50/95 to-emerald-50/95 backdrop-blur-md p-4 overflow-hidden animate-normal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="Reward notification"
      >
        {/* Bright Pastel Floating Orbs */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-sky-200/55 blur-3xl animate-normal-orb" />
          <div className="absolute -bottom-24 -right-20 w-[440px] h-[440px] rounded-full bg-emerald-200/50 blur-3xl animate-normal-orb-alt" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-amber-100/60 blur-3xl animate-normal-orb" />
        </div>

        {/* Text Showcase */}
        <div className="mb-6 sm:mb-8 text-center z-10 relative max-w-2xl w-full px-2">
          {/* Playful Rubber-Band Bounce + Gentle Float */}
          <div className="animate-normal-xp-float mb-3 sm:mb-4">
            <div className="animate-normal-xp-bounce inline-flex items-center justify-center">
              {xp > 0 ? (
                <span className="text-6xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 drop-shadow-[0_6px_18px_rgba(16,185,129,0.22)] tabular-nums">
                  +{xp} XP
                </span>
              ) : (
                <span className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600 drop-shadow-[0_6px_18px_rgba(14,165,233,0.2)]">
                  BOARD COMPLETE
                </span>
              )}
            </div>
          </div>

          {/* Crisp Frosted White Quote Card */}
          <div className="animate-normal-quote">
            <div className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white/95 border border-slate-200/90 px-6 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <div className="relative z-10 flex items-center gap-2.5 text-lg sm:text-2xl font-extrabold uppercase tracking-wide text-slate-800">
                <Sparkles size={20} className="text-amber-500 shrink-0" />
                <span>{quote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean White Gallery GIF Card */}
        <div className="relative z-10 w-auto max-w-5xl max-h-[62vh] rounded-3xl bg-white p-1.5 sm:p-2 border border-slate-200/90 shadow-[0_22px_55px_rgba(15,23,42,0.14)] animate-normal-media">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
            <div className="relative w-full h-full flex justify-center items-center">
              {gifUrl && (
                <img
                  src={gifUrl}
                  alt="Reward"
                  referrerPolicy="no-referrer"
                  className="w-auto h-auto max-h-[58vh] object-contain"
                />
              )}
            </div>

            {/* Auto-close Progress Bar */}
            <div className="w-full h-1.5 bg-slate-200 overflow-hidden" aria-hidden="true">
              <div
                className="h-full animate-reward-countdown bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500"
                style={{ animationDuration: `${rewardDurationMs}ms` }}
              />
            </div>
          </div>
        </div>

        {/* Light Daylight Skip Button */}
        <button
          onClick={onClose}
          className="relative z-10 mt-6 sm:mt-8 min-h-[44px] px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold uppercase tracking-widest text-xs sm:text-sm border border-slate-300 shadow-sm transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap animate-normal-btn"
        >
          <span>Skip Reward</span>
          <FastForward size={15} />
        </button>
      </div>
    );
  }
);

RewardOverlay.displayName = 'RewardOverlay';

export default RewardOverlay;
