import React from 'react';
import { Difficulty } from '../types';
import { Coffee, Brain, Flame, Trophy, Skull } from 'lucide-react';

interface MainMenuProps {
  onStartGame: (difficulty: Difficulty) => void;
}

// Using user provided Brave Search image links for the GigaChad theme
const chadImages = [
  "https://imgs.search.brave.com/3a-bVQd5ZjO4EBhTfpsBwYjZ9E8ibzjJVywkACM-pHc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgzLzlh/LzA3LzgzOWEwN2Yw/Njg4Zjk0YWU3ZTQ2/NzEzMmQ1OThjMThi/LmpwZw", 
  "https://imgs.search.brave.com/F6esWisgAbl763_xTbphlenA9R4ipEa-1qYp79fxvXo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2pv/a2UtYmF0dGxlcy9p/bWFnZXMvZC9kZi9H/aWdhY2hhZC5wbmcv/cmV2aXNpb24vbGF0/ZXN0L3NjYWxlLXRv/LXdpZHRoLWRvd24v/NDAwP2NiPTIwMjMw/ODEyMDY0ODM1",
  "https://imgs.search.brave.com/H9IMjjXe66jvcr9b6O4DnpeIBne_e_UkXQZN5FKOyLc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTQvR2ln/YWNoYWQtUE5HLUlt/YWdlcy5wbmc",
  "https://imgs.search.brave.com/jPW_AivjjkbFDJ4C60pB7Nne4aOYrjcO14-HKS5Fkaw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDk5MTcy/ODAuanBn"
];

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

const MainMenu: React.FC<MainMenuProps> = React.memo(({ onStartGame }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-300 via-gray-200 to-slate-400 text-slate-800 p-6 overflow-hidden">
      
      {/* Background Collage Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Top Left */}
        <img 
          src={chadImages[0]} 
          alt="" 
          loading="lazy"
          decoding="async"
          className="absolute -top-20 -left-20 w-[500px] h-[500px] object-cover opacity-[0.15] grayscale rotate-12 mix-blend-multiply transition-opacity duration-1000"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {/* Top Right */}
        <img 
          src={chadImages[1]} 
          alt="" 
          loading="lazy"
          decoding="async"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] object-cover opacity-[0.15] grayscale -rotate-12 mix-blend-multiply transition-opacity duration-1000"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {/* Bottom Left */}
        <img 
          src={chadImages[2]} 
          alt="" 
          loading="lazy"
          decoding="async"
          className="absolute -bottom-10 -left-32 w-[600px] h-[700px] object-cover opacity-[0.15] grayscale rotate-6 mix-blend-multiply transition-opacity duration-1000"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {/* Bottom Right */}
        <img 
          src={chadImages[3]} 
          alt="" 
          loading="lazy"
          decoding="async"
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] object-cover opacity-[0.15] grayscale -rotate-6 mix-blend-multiply transition-opacity duration-1000"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-10 text-center relative px-4">
          {/* Added pb-2 and leading-tight to prevent clipping of 'g' descender */}
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-500 via-slate-700 to-gray-600 mb-2 tracking-tight drop-shadow-sm pb-2 leading-tight">
            GigaChad Sudoku
          </h1>
          <p className="text-slate-600 font-bold text-lg">
            Choose your challenge level
          </p>
        </div>

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