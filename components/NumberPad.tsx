import React from 'react';
import { Difficulty } from '../types';
import { DIFFICULTY_THEMES } from '../data/difficultyThemes';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  counts: { [key: number]: number }; // Counts of correct numbers placed
  difficulty?: Difficulty;
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const NumberPad: React.FC<NumberPadProps> = React.memo(
  ({ onNumberClick, counts, difficulty = Difficulty.EASY }) => {
    const theme = DIFFICULTY_THEMES[difficulty];

    return (
      <div className="grid grid-cols-9 gap-1 sm:gap-2 w-full px-1 mt-4">
        {NUMBERS.map((num) => {
          const isComplete = counts[num] === 9;

          return (
            <button
              key={num}
              onClick={() => !isComplete && onNumberClick(num)}
              disabled={isComplete}
              className={`
                aspect-square flex justify-center items-center font-mono tabular-nums
                text-2xl sm:text-3xl font-extrabold rounded-lg transition-all duration-150 select-none
                ${
                  isComplete
                    ? 'opacity-25 cursor-default text-slate-400 bg-slate-100 border border-slate-200'
                    : theme.numKeyActive
                }
              `}
            >
              {num}
            </button>
          );
        })}
      </div>
    );
  }
);

NumberPad.displayName = 'NumberPad';

export default NumberPad;