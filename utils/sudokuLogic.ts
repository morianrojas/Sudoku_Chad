import { Difficulty } from '../types';

// Helper to check if placing num at board[row][col] is valid
const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }
  // Check col
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }
  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
};

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const shuffleArray = <T,>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};

// Backtracking solver
const solveSudoku = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffleArray([...DIGITS]);
        for (let i = 0; i < nums.length; i++) {
          const num = nums[i];
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const generateSudoku = (difficulty: Difficulty) => {
  // 1. Create empty board
  const solution: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  // 2. Fill diagonal boxes first (independent) to ensure randomness and valid start
  for (let i = 0; i < 9; i += 3) {
    fillBox(solution, i, i);
  }

  // 3. Solve the rest to get a complete valid board
  solveSudoku(solution);

  // 4. Create the playable board by removing numbers based on difficulty (single-pass Fisher-Yates)
  const playableBoard = solution.map((row) => [...row]);
  let attempts = 0;

  switch (difficulty) {
    case Difficulty.EASY: attempts = 30; break;
    case Difficulty.MEDIUM: attempts = 40; break;
    case Difficulty.HARD: attempts = 50; break;
    case Difficulty.LEGENDARY: attempts = 58; break;
    case Difficulty.INSANE: attempts = 64; break;
  }

  const indices = Array.from({ length: 81 }, (_, idx) => idx);
  shuffleArray(indices);
  for (let i = 0; i < attempts; i++) {
    const cellIdx = indices[i];
    const row = Math.floor(cellIdx / 9);
    const col = cellIdx % 9;
    playableBoard[row][col] = 0;
  }

  return {
    initial: playableBoard, // With 0s
    solution: solution,     // Full numbers
  };
};

const fillBox = (board: number[][], row: number, col: number) => {
  let num: number;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isSafeInBox(board, row, col, num));
      board[row + i][col + j] = num;
    }
  }
};

const isSafeInBox = (board: number[][], row: number, col: number, num: number) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[row + i][col + j] === num) return false;
    }
  }
  return true;
};
