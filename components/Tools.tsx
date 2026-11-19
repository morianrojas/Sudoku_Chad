import React from 'react';
import { Undo2, Eraser, PenLine, Lightbulb } from 'lucide-react';
import { Difficulty } from '../types';
import { DIFFICULTY_THEMES } from '../data/difficultyThemes';

interface ToolsProps {
  onUndo: () => void;
  onErase: () => void;
  onToggleNotes: () => void;
  onHint: () => void;
  isNotesMode: boolean;
  hintsRemaining: number;
  difficulty?: Difficulty;
}

const Tools: React.FC<ToolsProps> = React.memo(
  ({
    onUndo,
    onErase,
    onToggleNotes,
    onHint,
    isNotesMode,
    hintsRemaining,
    difficulty = Difficulty.EASY,
  }) => {
    const theme = DIFFICULTY_THEMES[difficulty];

    return (
      <div className="grid grid-cols-4 w-full gap-3 sm:gap-4 px-1 mt-5">
        <button
          onClick={onUndo}
          className={`flex flex-col items-center gap-1.5 text-slate-600 ${theme.toolHoverText} transition-colors duration-150 group`}
        >
          <div
            className={`w-full py-2.5 rounded-lg border ${theme.toolCardBorder} bg-white/95 shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] ${theme.toolHoverCard} flex justify-center items-center transition-all duration-150`}
          >
            <Undo2 size={20} strokeWidth={2.2} />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${theme.toolHoverLabel}`}
          >
            Undo
          </span>
        </button>

        <button
          onClick={onErase}
          className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-rose-600 transition-colors duration-150 group"
        >
          <div
            className={`w-full py-2.5 rounded-lg border ${theme.toolCardBorder} bg-white/95 shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:border-rose-500 group-hover:bg-rose-50 flex justify-center items-center transition-all duration-150`}
          >
            <Eraser size={20} strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-rose-600">
            Erase
          </span>
        </button>

        <button
          onClick={onToggleNotes}
          className={`flex flex-col items-center gap-1.5 transition-colors duration-150 group ${
            isNotesMode ? theme.notesActiveText : `text-slate-600 ${theme.toolHoverText}`
          }`}
        >
          <div
            className={`w-full py-2.5 rounded-lg border shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] flex justify-center items-center transition-all duration-150 ${
              isNotesMode
                ? theme.notesActiveCard
                : `${theme.toolCardBorder} bg-white/95 ${theme.toolHoverCard}`
            }`}
          >
            <PenLine size={20} strokeWidth={2.2} />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              isNotesMode ? theme.notesActiveLabel : `text-slate-500 ${theme.toolHoverLabel}`
            }`}
          >
            {isNotesMode ? 'Notes On' : 'Notes'}
          </span>
        </button>

        <button
          onClick={onHint}
          disabled={hintsRemaining <= 0}
          className={`flex flex-col items-center gap-1.5 transition-colors duration-150 group ${
            hintsRemaining > 0
              ? `text-slate-600 ${theme.hintHoverText} cursor-pointer`
              : 'text-slate-400 cursor-not-allowed'
          }`}
        >
          <div
            className={`w-full py-2.5 rounded-lg border shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] flex justify-center items-center relative transition-all duration-150 ${
              hintsRemaining > 0
                ? `${theme.toolCardBorder} bg-white/95 ${theme.hintHoverCard}`
                : 'border-slate-200 bg-slate-100 opacity-65'
            }`}
          >
            <Lightbulb
              size={20}
              strokeWidth={2.2}
              className={hintsRemaining > 0 ? 'group-hover:fill-amber-300' : ''}
            />
            {hintsRemaining > 0 && (
              <div
                className={`absolute top-1.5 right-1/3 translate-x-4 -translate-y-1.5 ${theme.hintBadgeBg} text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-sm`}
              >
                {hintsRemaining}
              </div>
            )}
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              hintsRemaining > 0 ? `text-slate-500 ${theme.hintHoverLabel}` : 'text-slate-400'
            }`}
          >
            Hint
          </span>
        </button>
      </div>
    );
  }
);

Tools.displayName = 'Tools';

export default Tools;