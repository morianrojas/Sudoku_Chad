import React from 'react';
import { Board, Coords } from '../types';

const NOTE_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

interface SudokuCellProps {
  row: number;
  col: number;
  value: number | null;
  isInitial: boolean;
  isError: boolean;
  isSelected: boolean;
  isSameNumber: boolean;
  isInUnit: boolean;
  notesMask: number;
  onSelect: (row: number, col: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = React.memo(({
  row,
  col,
  value,
  isInitial,
  isError,
  isSelected,
  isSameNumber,
  isInUnit,
  notesMask,
  onSelect,
}) => {
  let bgClass = "bg-white";
  if (isSelected) bgClass = "bg-blue-200";
  else if (isSameNumber) bgClass = "bg-blue-200";
  else if (isInUnit) bgClass = "bg-blue-50";

  if (isError && isSelected) {
    bgClass = "bg-red-200";
  }

  const borderRight = (col + 1) % 3 === 0 && col !== 8 ? 'border-r-2 border-r-slate-500' : 'border-r border-r-slate-300';
  const borderBottom = (row + 1) % 3 === 0 && row !== 8 ? 'border-b-2 border-b-slate-500' : 'border-b border-b-slate-300';

  let textClass = "text-blue-600";
  if (isInitial) textClass = "text-slate-800 font-semibold";
  else if (isError) textClass = "text-red-500 bg-red-100";

  return (
    <div
      onClick={() => onSelect(row, col)}
      className={`
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex justify-center items-center relative text-xl sm:text-3xl cursor-pointer transition-colors duration-75
        ${bgClass} ${borderRight} ${borderBottom}
      `}
    >
      {value !== null ? (
        <span className={textClass}>{value}</span>
      ) : notesMask !== 0 ? (
        <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
          {NOTE_DIGITS.map((n) => (
            <div key={n} className="flex justify-center items-center">
              <span className={`text-[8px] leading-none font-bold ${(notesMask & (1 << n)) !== 0 ? 'text-slate-500' : 'invisible'}`}>
                {n}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
});

SudokuCell.displayName = 'SudokuCell';

interface SudokuBoardProps {
  board: Board;
  solution: number[][];
  selectedCell: Coords | null;
  onSelectCell: (row: number, col: number) => void;
}

const getNotesMask = (notes?: number[]): number => {
  if (!notes || notes.length === 0) return 0;
  let mask = 0;
  for (let i = 0; i < notes.length; i++) {
    mask |= 1 << notes[i];
  }
  return mask;
};

const SudokuBoard: React.FC<SudokuBoardProps> = React.memo(({ board, solution, selectedCell, onSelectCell }) => {
  const selectedRow = selectedCell ? selectedCell.row : -1;
  const selectedCol = selectedCell ? selectedCell.col : -1;
  const selectedBlockRow = selectedCell ? Math.floor(selectedCell.row / 3) : -1;
  const selectedBlockCol = selectedCell ? Math.floor(selectedCell.col / 3) : -1;
  const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col].value : null;

  return (
    <div className="grid grid-cols-9 border-2 border-slate-800 bg-slate-800 shadow-2xl rounded-sm overflow-hidden">
      {board.map((row, rIndex) => {
        const blockRow = Math.floor(rIndex / 3);
        return row.map((cell, cIndex) => {
          const cellValue = cell.value;
          const isSelected = selectedRow === rIndex && selectedCol === cIndex;
          const isSameNumber = cellValue !== null && selectedValue !== null && cellValue === selectedValue;
          const isInUnit = selectedRow !== -1 && (
            selectedRow === rIndex ||
            selectedCol === cIndex ||
            (selectedBlockRow === blockRow && selectedBlockCol === Math.floor(cIndex / 3))
          );
          const isError = !cell.isInitial && cellValue !== null && cellValue !== solution[rIndex][cIndex];
          const notesMask = cellValue === null ? getNotesMask(cell.isNotes) : 0;

          return (
            <SudokuCell
              key={`${rIndex}-${cIndex}`}
              row={rIndex}
              col={cIndex}
              value={cellValue}
              isInitial={cell.isInitial}
              isError={isError}
              isSelected={isSelected}
              isSameNumber={isSameNumber}
              isInUnit={isInUnit}
              notesMask={notesMask}
              onSelect={onSelectCell}
            />
          );
        });
      })}
    </div>
  );
});

SudokuBoard.displayName = 'SudokuBoard';

export default SudokuBoard;
