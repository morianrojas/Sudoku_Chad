import React from 'react';
import { Board, Coords, Difficulty, UnitClearAnimation, UnitClearVariant } from '../types';
import { DIFFICULTY_THEMES, DifficultyTheme } from '../data/difficultyThemes';

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
  clearAnimId: number | null;
  clearAnimVariant: UnitClearVariant | null;
  clearDelayMs: number;
  theme: DifficultyTheme;
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
  clearAnimId,
  clearAnimVariant,
  clearDelayMs,
  theme,
  onSelect,
}) => {
  let bgClass = theme.cellHover;
  if (isSelected) bgClass = theme.cellSelected;
  else if (isSameNumber) bgClass = theme.cellSameNumber;
  else if (isInUnit) bgClass = theme.cellInUnit;

  if (isError) {
    bgClass = isSelected ? theme.cellErrorSelected : theme.cellError;
  }

  const borderRight =
    (col + 1) % 3 === 0 && col !== 8
      ? theme.boxDividerRight
      : 'border-r border-r-slate-200';
  const borderBottom =
    (row + 1) % 3 === 0 && row !== 8
      ? theme.boxDividerBottom
      : 'border-b border-b-slate-200';

  let textClass = theme.digitPlayer;
  if (isInitial) textClass = 'text-slate-900 font-extrabold';
  else if (isError) textClass = 'text-rose-600 font-extrabold';
  else if (isSameNumber) textClass = theme.digitSameNumber;

  const isClearing = clearAnimId !== null && clearAnimVariant !== null;
  const cellAnimClass = isClearing
    ? clearAnimVariant === 'golden-flip'
      ? 'anim-unit-cell-flip'
      : clearAnimVariant === 'neon-sweep'
        ? 'anim-unit-cell-neon'
        : 'anim-unit-cell-ripple'
    : '';
  const digitAnimClass = isClearing
    ? clearAnimVariant === 'golden-flip'
      ? 'anim-unit-digit-spin'
      : 'anim-unit-digit-pop'
    : '';

  return (
    <div
      key={isClearing ? `clear-${clearAnimId}-${row}-${col}` : `cell-${row}-${col}`}
      onClick={() => onSelect(row, col)}
      style={isClearing ? { animationDelay: `${clearDelayMs}ms` } : undefined}
      className={`
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex justify-center items-center relative overflow-hidden text-xl sm:text-3xl cursor-pointer transition-colors duration-75
        ${bgClass} ${borderRight} ${borderBottom} ${cellAnimClass}
      `}
    >
      {isClearing && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/85 to-transparent anim-unit-sheen"
          style={{ animationDelay: `${clearDelayMs + 55}ms` }}
          aria-hidden="true"
        />
      )}

      {value !== null ? (
        <span
          className={`relative z-10 font-mono tabular-nums ${textClass} ${digitAnimClass}`}
          style={isClearing ? { animationDelay: `${clearDelayMs}ms` } : undefined}
        >
          {value}
        </span>
      ) : notesMask !== 0 ? (
        <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
          {NOTE_DIGITS.map((n) => (
            <div key={n} className="flex justify-center items-center">
              <span
                className={`text-[8px] sm:text-[9px] leading-none font-mono font-bold ${
                  (notesMask & (1 << n)) !== 0
                    ? isSelected
                      ? theme.noteSelected
                      : 'text-slate-500'
                    : 'invisible'
                }`}
              >
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
  unitClearAnim?: UnitClearAnimation | null;
  difficulty?: Difficulty;
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

const getUnitBannerLabel = (anim: UnitClearAnimation): string => {
  if (anim.isBoardComplete) return 'PUZZLE COMPLETE!';
  const totalUnits = anim.rows.length + anim.cols.length + anim.boxes.length;
  if (totalUnits >= 3) return 'TRIPLE CLEAR!';
  if (totalUnits === 2) return 'DOUBLE CLEAR!';
  if (anim.boxes.length === 1) return '3×3 BOX COMPLETE!';
  if (anim.rows.length === 1) return 'ROW COMPLETE!';
  return 'COLUMN COMPLETE!';
};

const SudokuBoard: React.FC<SudokuBoardProps> = React.memo(
  ({
    board,
    solution,
    selectedCell,
    unitClearAnim = null,
    difficulty = Difficulty.EASY,
    onSelectCell,
  }) => {
    const theme = DIFFICULTY_THEMES[difficulty];
    const selectedRow = selectedCell ? selectedCell.row : -1;
    const selectedCol = selectedCell ? selectedCell.col : -1;
    const selectedBlockRow = selectedCell ? Math.floor(selectedCell.row / 3) : -1;
    const selectedBlockCol = selectedCell ? Math.floor(selectedCell.col / 3) : -1;
    const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col].value : null;

    return (
      <div className="relative inline-block" style={theme.unitCssVars}>
        {/* Floating Unit Completion Callout Badge */}
        {unitClearAnim && (
          <div
            key={`unit-banner-${unitClearAnim.id}`}
            className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 z-30"
            aria-live="polite"
          >
            <div
              className={`anim-unit-banner font-display whitespace-nowrap px-4 py-1 rounded-md text-sm sm:text-base font-black uppercase tracking-[0.16em] border ${theme.unitBanner}`}
            >
              {getUnitBannerLabel(unitClearAnim)}
            </div>
          </div>
        )}

        <div
          className={`relative grid grid-cols-9 border-[3px] ${theme.boardFrame} rounded-md overflow-hidden`}
        >
          {board.map((row, rIndex) => {
            const blockRow = Math.floor(rIndex / 3);
            return row.map((cell, cIndex) => {
              const blockCol = Math.floor(cIndex / 3);
              const boxIdx = blockRow * 3 + blockCol;
              const cellValue = cell.value;
              const isSelected = selectedRow === rIndex && selectedCol === cIndex;
              const isSameNumber =
                cellValue !== null && selectedValue !== null && cellValue === selectedValue;
              const isInUnit =
                selectedRow !== -1 &&
                (selectedRow === rIndex ||
                  selectedCol === cIndex ||
                  (selectedBlockRow === blockRow && selectedBlockCol === blockCol));
              const isError =
                !cell.isInitial && cellValue !== null && cellValue !== solution[rIndex][cIndex];
              const notesMask = cellValue === null ? getNotesMask(cell.isNotes) : 0;

              let clearAnimId: number | null = null;
              let clearAnimVariant: UnitClearVariant | null = null;
              let clearDelayMs = 0;

              if (unitClearAnim) {
                const inCompletedRow = unitClearAnim.rows.includes(rIndex);
                const inCompletedCol = unitClearAnim.cols.includes(cIndex);
                const inCompletedBox = unitClearAnim.boxes.includes(boxIdx);

                if (inCompletedRow || inCompletedCol || inCompletedBox) {
                  clearAnimId = unitClearAnim.id;
                  clearAnimVariant = unitClearAnim.variant;
                  const dist = Math.hypot(
                    rIndex - unitClearAnim.originRow,
                    cIndex - unitClearAnim.originCol
                  );
                  clearDelayMs = Math.round(dist * 62);
                }
              }

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
                  clearAnimId={clearAnimId}
                  clearAnimVariant={clearAnimVariant}
                  clearDelayMs={clearDelayMs}
                  theme={theme}
                  onSelect={onSelectCell}
                />
              );
            });
          })}

          {/* Unit Completion Sweeping Beam & 3x3 Perimeter Glow Overlays */}
          {unitClearAnim && (
            <div
              key={`unit-fx-${unitClearAnim.id}`}
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
              aria-hidden="true"
            >
              {/* Horizontal Row Beams */}
              {unitClearAnim.rows.map((r) => (
                <div
                  key={`beam-r-${r}`}
                  className={`absolute left-0 right-0 anim-unit-beam-h ${theme.unitBeamH}`}
                  style={{
                    top: `${(r / 9) * 100}%`,
                    height: `${100 / 9}%`,
                  }}
                />
              ))}

              {/* Vertical Column Beams */}
              {unitClearAnim.cols.map((c) => (
                <div
                  key={`beam-c-${c}`}
                  className={`absolute top-0 bottom-0 anim-unit-beam-v ${theme.unitBeamV}`}
                  style={{
                    left: `${(c / 9) * 100}%`,
                    width: `${100 / 9}%`,
                  }}
                />
              ))}

              {/* 3x3 Box Perimeter Frames */}
              {unitClearAnim.boxes.map((boxIdx) => {
                const bRow = Math.floor(boxIdx / 3);
                const bCol = boxIdx % 3;
                return (
                  <div
                    key={`box-glow-${boxIdx}`}
                    className={`absolute anim-unit-box-glow border-[3px] ${theme.unitBoxGlow}`}
                    style={{
                      top: `${(bRow / 3) * 100}%`,
                      left: `${(bCol / 3) * 100}%`,
                      width: `${100 / 3}%`,
                      height: `${100 / 3}%`,
                    }}
                  />
                );
              })}

              {/* Origin Cell Shockwave Ring */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  top: `${(unitClearAnim.originRow / 9) * 100}%`,
                  left: `${(unitClearAnim.originCol / 9) * 100}%`,
                  width: `${100 / 9}%`,
                  height: `${100 / 9}%`,
                }}
              >
                <span
                  className={`block w-8 h-8 rounded-full border-2 ${theme.unitOriginRing} anim-unit-origin-ring`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

SudokuBoard.displayName = 'SudokuBoard';

export default SudokuBoard;
