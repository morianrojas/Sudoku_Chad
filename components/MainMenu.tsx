import React, { useState, useEffect } from 'react';
import { Difficulty } from '../types';
import { RANKS } from '../data/gameData';
import { Coffee, Brain, Flame, Trophy, Skull, Play } from 'lucide-react';
import { formatTime } from './GameTimer';
import chadImg1 from '../src/assets/images/chad-1.jpg';
import chadImg2 from '../src/assets/images/chad-2.webp';
import chadImg3 from '../src/assets/images/chad-3.png';
import chadImg4 from '../src/assets/images/chad-4.jpg';

export interface ResumableSessionInfo {
  difficulty: Difficulty;
  score: number;
  rankIndex: number;
  filledCount: number;
  totalEmptyCells: number;
  elapsedSeconds: number;
}

interface MainMenuProps {
  onStartGame: (difficulty: Difficulty) => void;
  onResumeGame?: () => void;
  resumableSession?: ResumableSessionInfo | null;
  lastRankIndex?: number | null;
}

const chadImages = [chadImg1, chadImg2, chadImg3, chadImg4];

const difficultyConfig = {
  [Difficulty.EASY]: { 
    icon: Coffee, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-100', 
    // Updated: Soft colored border by default
    border: 'border-emerald-200 group-hover:border-emerald-500', 
    label: 'Relax & Chill'
  },
  [Difficulty.MEDIUM]: { 
    icon: Brain, 
    color: 'text-blue-600', 
    bg: 'bg-blue-100', 
    border: 'border-blue-200 group-hover:border-blue-500',
    label: 'Brain Workout'
  },
  [Difficulty.HARD]: { 
    icon: Flame, 
    color: 'text-orange-600', 
    bg: 'bg-orange-100', 
    border: 'border-orange-200 group-hover:border-orange-500',
    label: 'Challenge'
  },
  [Difficulty.LEGENDARY]: { 
    icon: Trophy, 
    color: 'text-purple-600', 
    bg: 'bg-purple-100', 
    border: 'border-purple-200 group-hover:border-purple-500',
    label: 'Master Class'
  },
  [Difficulty.INSANE]: { 
    icon: Skull, 
    color: 'text-rose-600', 
    bg: 'bg-rose-100', 
    border: 'border-rose-200 group-hover:border-rose-500',
    label: 'Good Luck'
  },
};

const DIFFICULTIES = Object.values(Difficulty);

const MainMenu: React.FC<MainMenuProps> = React.memo(
  ({ onStartGame, onResumeGame, resumableSession = null, lastRankIndex = null }) => {
  const achievedRank =
    lastRankIndex !== null && lastRankIndex >= 0 && lastRankIndex < RANKS.length
      ? RANKS[lastRankIndex]
      : null;
  const [rankBgFailed, setRankBgFailed] = useState(false);

  useEffect(() => {
    setRankBgFailed(false);
  }, [achievedRank?.img]);

  const showRankBackground = Boolean(achievedRank && !rankBgFailed);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-300 via-gray-200 to-slate-400 text-slate-800 p-6 overflow-hidden">
      
      {/* Background Layer: Last Completed Game Rank Image OR 4 GigaChad Collage */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {showRankBackground && achievedRank ? (
          <>
            <img
              src={achievedRank.img}
              alt=""
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setRankBgFailed(true)}
              className={`w-full h-full object-cover ${
                achievedRank.orientation === 'vertical' ? 'object-[center_20%]' : 'object-center'
              } opacity-[0.26]`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-200/35 via-transparent to-slate-300/45" />
          </>
        ) : (
          <>
            {/* Top Left */}
            <img 
              src={chadImages[0]} 
              alt="" 
              decoding="async"
              className="absolute -top-4 -left-6 sm:top-2 sm:left-2 lg:left-6 w-[210px] h-[190px] sm:w-[340px] sm:h-[290px] lg:w-[440px] lg:h-[340px] object-cover object-top opacity-[0.18] grayscale rotate-6 mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_86%)]"
            />
            {/* Top Right */}
            <img 
              src={chadImages[1]} 
              alt="" 
              decoding="async"
              className="absolute -top-4 -right-6 sm:top-2 sm:right-2 lg:right-6 w-[195px] h-[225px] sm:w-[300px] sm:h-[350px] lg:w-[380px] lg:h-[430px] object-cover object-top opacity-[0.18] grayscale -rotate-6 mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_86%)]"
            />
            {/* Bottom Left */}
            <img 
              src={chadImages[2]} 
              alt="" 
              decoding="async"
              className="absolute -bottom-2 -left-4 sm:bottom-0 sm:left-2 lg:left-6 w-[205px] h-[250px] sm:w-[310px] sm:h-[390px] lg:w-[380px] lg:h-[460px] object-contain object-bottom opacity-[0.18] grayscale rotate-6 mix-blend-multiply"
            />
            {/* Bottom Right */}
            <img 
              src={chadImages[3]} 
              alt="" 
              decoding="async"
              className="absolute -bottom-4 -right-6 sm:bottom-2 sm:right-2 lg:right-6 w-[210px] h-[200px] sm:w-[340px] sm:h-[300px] lg:w-[440px] lg:h-[360px] object-cover object-top opacity-[0.18] grayscale -rotate-6 mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_86%)]"
            />
          </>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-10 text-center relative px-4">
          {/* Added pb-2 and leading-tight to prevent clipping of 'g' descender */}
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-500 via-slate-700 to-gray-600 mb-2 tracking-tight drop-shadow-sm pb-2 leading-tight">
            Chad Sudoku
          </h1>
          <p className="text-slate-600 font-bold text-lg">
            Choose your challenge level
          </p>
        </div>

        {/* Resume Saved Session Card (if unfinished game exists) */}
        {resumableSession && onResumeGame && (
          <div className="w-full max-w-sm mb-5">
            <button
              type="button"
              onClick={onResumeGame}
              className="group w-full p-4 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-emerald-400 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Play size={20} fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black uppercase tracking-wide text-white">
                      Resume {resumableSession.difficulty}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Saved
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium tabular-nums truncate mt-0.5">
                    {RANKS[resumableSession.rankIndex]?.name ?? 'Bronze'} •{' '}
                    {resumableSession.score.toLocaleString()} XP • {resumableSession.filledCount}/
                    {resumableSession.totalEmptyCells} cells •{' '}
                    {formatTime(resumableSession.elapsedSeconds)}
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Difficulty Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {DIFFICULTIES.map((diff) => {
            const config = difficultyConfig[diff];
            const Icon = config.icon;

            return (
              <button
                key={diff}
                onClick={() => onStartGame(diff)}
                className={`
                  group relative w-full p-4 bg-white/95 border-2 rounded-2xl shadow-md 
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                  flex items-center gap-5 ${config.border}
                `}
              >
                {/* Icon Box */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center 
                  ${config.bg} ${config.color} transition-transform group-hover:scale-110 duration-300 shadow-sm
                `}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold text-slate-800 group-hover:text-slate-900">
                    {diff}
                  </span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {config.label}
                  </span>
                </div>
                
                {/* Subtle background decoration inside button */}
                <div className="absolute right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300 transform translate-x-2">
                   <Icon size={48} className={config.color} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center text-slate-500 font-semibold text-sm">
          <p>Tap a card to start playing</p>
        </div>
      </div>
    </div>
  );
});

MainMenu.displayName = 'MainMenu';

export default MainMenu;