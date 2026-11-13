import React from 'react';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  counts: { [key: number]: number }; // Counts of correct numbers placed
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const NumberPad: React.FC<NumberPadProps> = React.memo(({ onNumberClick, counts }) => {
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
              aspect-square flex justify-center items-center
              text-3xl sm:text-4xl font-medium rounded-lg transition-all duration-200 select-none
              ${isComplete 
                ? 'opacity-20 cursor-default text-slate-400 bg-slate-100' 
                : 'text-blue-600 bg-white shadow-sm border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 active:scale-95 cursor-pointer'
              }
            `}
          >
             {num}
          </button>
        );
      })}
    </div>
  );
});

NumberPad.displayName = 'NumberPad';

export default NumberPad;