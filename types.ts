export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  LEGENDARY = 'Legendary',
  INSANE = 'Insane',
}

export type CellValue = number | null;

export interface Cell {
  value: CellValue;
  isInitial: boolean; // True if part of the puzzle start
  isNotes?: number[]; // Array of potential numbers (notes)
}

export type Board = Cell[][];

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'rank-up'; // Added 'rank-up'
}

export interface GameState {
  board: Board;
  solution: number[][]; // The solved grid numbers
  difficulty: Difficulty;
  mistakes: number;
  hits: number; // Correct answers on first try
  score: number; // Current XP score
  currentStreak: number; // Consecutive correct answers (Global multiplier)
  rankIndex: number; // Current Rank Level (0-15) - Persists on error
  rankProgress: number; // Percentage (0-100) towards the NEXT rank based on difficulty XP thresholds
  sessionMistakes: number; // Mistakes committed on the current board
  totalEmptyCells: number; // Initial empty cells count for the current board
  contaminatedBlockNumbers: string[]; // List of "blockIndex-number" strings that have been mistaken
  operationsCount: number; // Number of inputs since last break
  isComplete: boolean;
  history: Board[]; // For undo
  activityLog: ActivityLogEntry[];
  hintsRemaining: number; // Logic for hints
}

export interface Coords {
  row: number;
  col: number;
}

export interface AppSettings {
  operationsTarget: number;
  breakDuration: number; // in seconds
  rewardDuration: number; // in milliseconds
  volumeRewardMain: number; // 0-100
  volumeRewardList: number; // 0-100
  volumeError: number; // 0-100
  enableVisualRewards: boolean;
  enableRewardSounds: boolean;
  showActivityLog: boolean;
}