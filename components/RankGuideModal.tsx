import React, { useEffect, useState } from 'react';
import { Difficulty } from '../types';
import {
  RANKS,
  MAX_RANK_INDEX_BY_DIFFICULTY,
  MAX_MISTAKES_FOR_MAX_RANK,
  RANK_XP_THRESHOLDS,
} from '../data/gameData';
import {
  X,
  Trophy,
  Lock,
  CheckCircle2,
  Coffee,
  Brain,
  Flame,
  Skull,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface RankGuideModalProps {
  currentDifficulty: Difficulty;
  currentRankIndex: number;
  currentScore: number;
  onClose: () => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DIFFICULTIES = Object.values(Difficulty);

const DIFFICULTY_META: Record<
  Difficulty,
  {
    icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
    tagline: string;
    tabActive: string;
    tabInactive: string;
    badgeBg: string;
    accentText: string;
    cardRing: string;
    spotlightBg: string;
    ctaBtn: string;
  }
> = {
  [Difficulty.EASY]: {
    icon: Coffee,
    tagline: 'Relax & Chill',
    tabActive: 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20',
    tabInactive: 'bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:bg-teal-50/60',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
    accentText: 'text-teal-700',
    cardRing: 'border-teal-500 bg-teal-50/70 ring-2 ring-teal-500/25',
    spotlightBg: 'from-teal-900 via-emerald-900 to-slate-900 border-teal-500/40',
    ctaBtn: 'bg-teal-500 hover:bg-teal-400 text-slate-950',
  },
  [Difficulty.MEDIUM]: {
    icon: Brain,
    tagline: 'Brain Workout',
    tabActive: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20',
    tabInactive: 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/60',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    accentText: 'text-blue-700',
    cardRing: 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/25',
    spotlightBg: 'from-blue-950 via-indigo-900 to-slate-900 border-blue-500/40',
    ctaBtn: 'bg-blue-500 hover:bg-blue-400 text-white',
  },
  [Difficulty.HARD]: {
    icon: Flame,
    tagline: 'Challenge',
    tabActive: 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20',
    tabInactive: 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:bg-orange-50/60',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    accentText: 'text-orange-700',
    cardRing: 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-500/25',
    spotlightBg: 'from-orange-950 via-amber-900 to-slate-900 border-orange-500/40',
    ctaBtn: 'bg-orange-500 hover:bg-orange-400 text-slate-950',
  },
  [Difficulty.LEGENDARY]: {
    icon: Trophy,
    tagline: 'Master Class',
    tabActive: 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20',
    tabInactive: 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:bg-purple-50/60',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    accentText: 'text-purple-700',
    cardRing: 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-500/25',
    spotlightBg: 'from-purple-950 via-violet-900 to-slate-900 border-purple-500/40',
    ctaBtn: 'bg-purple-500 hover:bg-purple-400 text-white',
  },
  [Difficulty.INSANE]: {
    icon: Skull,
    tagline: 'Good Luck',
    tabActive: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20',
    tabInactive: 'bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:bg-rose-50/60',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    accentText: 'text-rose-700',
    cardRing: 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-500/25',
    spotlightBg: 'from-rose-950 via-red-900 to-slate-900 border-rose-500/40',
    ctaBtn: 'bg-rose-500 hover:bg-rose-400 text-white',
  },
};

const getMinDifficultyForRank = (rankIndex: number): Difficulty => {
  for (const diff of DIFFICULTIES) {
    if (rankIndex <= MAX_RANK_INDEX_BY_DIFFICULTY[diff]) {
      return diff;
    }
  }
  return Difficulty.INSANE;
};

const RankGuideModal: React.FC<RankGuideModalProps> = ({
  currentDifficulty,
  currentRankIndex,
  currentScore,
  onClose,
  onSelectDifficulty,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(currentDifficulty);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const meta = DIFFICULTY_META[selectedDifficulty];
  const SelectedIcon = meta.icon;
  const maxRankIndex = MAX_RANK_INDEX_BY_DIFFICULTY[selectedDifficulty];
  const maxRank = RANKS[maxRankIndex];
  const maxAllowedMistakes = MAX_MISTAKES_FOR_MAX_RANK[selectedDifficulty];
  const thresholds = RANK_XP_THRESHOLDS[selectedDifficulty];

  const unlockedRanks = RANKS.slice(0, maxRankIndex + 1);
  const lockedRanks = RANKS.slice(maxRankIndex + 1);
  const isViewingCurrentDifficulty = selectedDifficulty === currentDifficulty;
  const isHigherThanCurrent =
    DIFFICULTIES.indexOf(selectedDifficulty) > DIFFICULTIES.indexOf(currentDifficulty);

  const handleImgError = (idx: number) => {
    setFailedImages((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rank-guide-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-sm shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <h2
                id="rank-guide-title"
                className="font-display text-lg sm:text-xl font-black uppercase tracking-wide text-slate-900 leading-tight"
              >
                Rank Ladder by Difficulty
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Higher difficulties unlock elite ranks up to{' '}
                <span className="font-bold text-slate-800">Ultra Instinct</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close rank guide"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Difficulty Selector Tabs */}
        <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-2 shrink-0">
          {DIFFICULTIES.map((diff) => {
            const diffMeta = DIFFICULTY_META[diff];
            const DiffIcon = diffMeta.icon;
            const diffMaxIdx = MAX_RANK_INDEX_BY_DIFFICULTY[diff];
            const diffMaxRank = RANKS[diffMaxIdx];
            const isSelected = diff === selectedDifficulty;
            const isCurrent = diff === currentDifficulty;

            return (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`relative flex flex-col items-start p-2.5 rounded-xl border text-left transition-all duration-150 ${
                  isSelected ? diffMeta.tabActive : diffMeta.tabInactive
                }`}
              >
                <div className="w-full flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    <DiffIcon size={14} strokeWidth={2.5} />
                    <span className="text-xs font-black uppercase tracking-wide">{diff}</span>
                  </div>
                  {isCurrent && (
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-slate-200/90 text-slate-700'
                      }`}
                    >
                      Now
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-bold leading-tight truncate w-full ${
                    isSelected ? 'text-white/95' : 'text-slate-700'
                  }`}
                >
                  {diffMaxIdx + 1}/16 • {diffMaxRank.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-slate-50/40">
          {/* Selected Difficulty Peak Spotlight */}
          <div
            className={`rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${meta.spotlightBg} border text-white shadow-lg flex flex-col sm:flex-row items-center gap-4`}
          >
            <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-xl overflow-hidden border border-white/25 bg-slate-950/60 shadow-xl shrink-0 flex items-center justify-center">
              {!failedImages[maxRankIndex] ? (
                <img
                  src={maxRank.img}
                  alt={maxRank.name}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => handleImgError(maxRankIndex)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Trophy size={32} className={maxRank.color} />
              )}
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/15 text-white/90">
                  <SelectedIcon size={12} />
                  {selectedDifficulty} Peak Rank
                </span>
                <span className="text-[11px] font-mono font-bold text-white/75 tabular-nums">
                  Rank {maxRankIndex + 1} of {RANKS.length}
                </span>
              </div>

              <h3 className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-wide ${maxRank.color}`}>
                {maxRank.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-200/90 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                <span>
                  Final Rank Rule: Solve the full board with{' '}
                  <strong className="text-white">0 hints</strong> &amp;{' '}
                  <strong className="text-white">
                    {maxAllowedMistakes === 0
                      ? '0 mistakes (perfect)'
                      : `≤ ${maxAllowedMistakes} ${maxAllowedMistakes === 1 ? 'mistake' : 'mistakes'}`}
                  </strong>
                  .
                </span>
              </p>
            </div>

            {!isViewingCurrentDifficulty && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectDifficulty(selectedDifficulty);
                }}
                className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0 ${meta.ctaBtn}`}
              >
                <span>{isHigherThanCurrent ? `Challenge ${selectedDifficulty}` : `Play ${selectedDifficulty}`}</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          {/* Unlockable Ranks Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles size={14} className={meta.accentText} />
                Available Ranks in {selectedDifficulty} ({unlockedRanks.length} of {RANKS.length})
              </h4>
              {isViewingCurrentDifficulty && (
                <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
                  Your Score: {currentScore.toLocaleString()} XP
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {unlockedRanks.map((rank, idx) => {
                const isPeak = idx === maxRankIndex;
                const isCurrent = isViewingCurrentDifficulty && idx === currentRankIndex;
                const isAlreadyUnlocked = isViewingCurrentDifficulty && idx < currentRankIndex;
                const xpNeeded = idx === 0 ? 0 : idx < maxRankIndex ? thresholds[idx - 1] : null;

                return (
                  <div
                    key={rank.name}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                      isCurrent
                        ? meta.cardRing
                        : isPeak
                          ? 'bg-amber-50/50 border-amber-300/90'
                          : 'bg-white border-slate-200/90'
                    }`}
                  >
                    <div className="w-14 h-11 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 flex items-center justify-center relative">
                      {!failedImages[idx] ? (
                        <img
                          src={rank.img}
                          alt={rank.name}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={() => handleImgError(idx)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Trophy size={18} className={rank.lightColor} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 tabular-nums">
                          #{idx + 1}
                        </span>
                        <span
                          className={`font-display text-sm font-black uppercase tracking-wide truncate ${rank.lightColor}`}
                        >
                          {rank.name}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 font-medium mt-0.5 tabular-nums">
                        {idx === 0 ? (
                          <span>Starting Rank • 0 XP</span>
                        ) : xpNeeded !== null ? (
                          <span>
                            Requires <strong className="text-slate-700">{xpNeeded.toLocaleString()} XP</strong>
                          </span>
                        ) : (
                          <span>
                            Complete board ({maxAllowedMistakes === 0 ? '0 errors' : `≤ ${maxAllowedMistakes} err`}, 0 hints)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isCurrent ? (
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${meta.badgeBg}`}
                        >
                          Current
                        </span>
                      ) : isAlreadyUnlocked ? (
                        <CheckCircle2 size={16} className="text-emerald-500" aria-label="Unlocked" />
                      ) : isPeak ? (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                          Peak
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked Elite Ranks Preview (Motivation to play higher difficulties) */}
          {lockedRanks.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Lock size={14} className="text-slate-400" />
                  Unlock in Higher Difficulties ({lockedRanks.length} more)
                </h4>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  Click any rank to inspect its difficulty
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lockedRanks.map((rank, offset) => {
                  const idx = maxRankIndex + 1 + offset;
                  const requiredDiff = getMinDifficultyForRank(idx);
                  const reqMeta = DIFFICULTY_META[requiredDiff];

                  return (
                    <button
                      key={rank.name}
                      type="button"
                      onClick={() => setSelectedDifficulty(requiredDiff)}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-100/70 hover:bg-white hover:border-slate-400 transition-all text-left group"
                    >
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-300 bg-slate-200 shrink-0 relative flex items-center justify-center">
                        {!failedImages[idx] ? (
                          <img
                            src={rank.img}
                            alt={rank.name}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={() => handleImgError(idx)}
                            className="w-full h-full object-cover opacity-55 grayscale-[40%] group-hover:opacity-85 group-hover:grayscale-0 transition-all"
                          />
                        ) : (
                          <Lock size={15} className="text-slate-500" />
                        )}
                        <div className="absolute inset-0 bg-slate-900/25 flex items-center justify-center group-hover:bg-slate-900/10 transition-colors">
                          <Lock size={13} className="text-white drop-shadow" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-slate-400 tabular-nums">
                            #{idx + 1}
                          </span>
                          <span className="font-display text-sm font-black uppercase tracking-wide text-slate-700 truncate">
                            {rank.name}
                          </span>
                        </div>
                        <span className={`text-[11px] font-bold ${reqMeta.accentText}`}>
                          Requires {requiredDiff}
                          {requiredDiff === Difficulty.LEGENDARY ? ' or Insane' : '+'}
                        </span>
                      </div>

                      <ArrowRight
                        size={15}
                        className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankGuideModal;
