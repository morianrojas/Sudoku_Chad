import { AppSettings, Board, Difficulty, GameState } from '../types';

const SESSION_STORAGE_KEY = 'gigachad_sudoku_session_v1';
const PROFILE_STORAGE_KEY = 'gigachad_sudoku_profile_v1';

export interface SavedSessionData {
  gameState: GameState;
  elapsedSeconds: number;
  completionTime: number;
  inMenu: boolean;
  isNotesMode: boolean;
  quoteTracker: {
    currentPackageIndex: number;
    availableQuotes: string[];
  };
  savedAt: number;
}

export interface SavedProfileData {
  lastCompletedRankIndex?: number | null;
  highestCompletedRankIndex?: number | null;
  settings: AppSettings;
  gifList: string[];
  soundList: string[];
  knownDefaultGifs?: string[];
  knownDefaultSounds?: string[];
  disabledGifs: string[];
  disabledSounds: string[];
  lastPlayedGif: string;
  lastPlayedSound: string;
  rankUpGifs?: string[];
  rankUpSounds?: string[];
  rankUpSpecialSounds?: string[];
}

const VALID_DIFFICULTIES = new Set<string>(Object.values(Difficulty));

const isValidBoard = (board: unknown): board is Board => {
  if (!Array.isArray(board) || board.length !== 9) return false;
  return board.every(
    (row) =>
      Array.isArray(row) &&
      row.length === 9 &&
      row.every(
        (cell) =>
          cell !== null &&
          typeof cell === 'object' &&
          ('value' in cell) &&
          (cell.value === null || (typeof cell.value === 'number' && cell.value >= 1 && cell.value <= 9)) &&
          typeof cell.isInitial === 'boolean'
      )
  );
};

const isValidSolution = (solution: unknown): solution is number[][] => {
  if (!Array.isArray(solution) || solution.length !== 9) return false;
  return solution.every(
    (row) =>
      Array.isArray(row) &&
      row.length === 9 &&
      row.every((n) => typeof n === 'number' && n >= 1 && n <= 9)
  );
};

export const loadSavedSession = (): SavedSessionData | null => {
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedSessionData>;
    if (!parsed || !parsed.gameState) return null;

    const gs = parsed.gameState;
    if (
      !isValidBoard(gs.board) ||
      !isValidSolution(gs.solution) ||
      !VALID_DIFFICULTIES.has(gs.difficulty) ||
      typeof gs.score !== 'number' ||
      typeof gs.rankIndex !== 'number'
    ) {
      return null;
    }

    const sanitizedGameState: GameState = {
      board: gs.board,
      solution: gs.solution,
      difficulty: gs.difficulty,
      mistakes: typeof gs.mistakes === 'number' ? gs.mistakes : 0,
      hits: typeof gs.hits === 'number' ? gs.hits : 0,
      score: gs.score,
      currentStreak: typeof gs.currentStreak === 'number' ? gs.currentStreak : 0,
      rankIndex: Math.max(0, gs.rankIndex),
      rankProgress: typeof gs.rankProgress === 'number' ? gs.rankProgress : 0,
      sessionMistakes: typeof gs.sessionMistakes === 'number' ? gs.sessionMistakes : 0,
      totalEmptyCells: typeof gs.totalEmptyCells === 'number' ? gs.totalEmptyCells : 40,
      contaminatedBlockNumbers: Array.isArray(gs.contaminatedBlockNumbers)
        ? gs.contaminatedBlockNumbers
        : [],
      operationsCount: typeof gs.operationsCount === 'number' ? gs.operationsCount : 0,
      isComplete: Boolean(gs.isComplete),
      history: Array.isArray(gs.history) ? gs.history.filter(isValidBoard) : [],
      activityLog: Array.isArray(gs.activityLog) ? gs.activityLog : [],
      hintsRemaining: typeof gs.hintsRemaining === 'number' ? gs.hintsRemaining : 3,
    };

    return {
      gameState: sanitizedGameState,
      elapsedSeconds:
        typeof parsed.elapsedSeconds === 'number' && parsed.elapsedSeconds >= 0
          ? Math.floor(parsed.elapsedSeconds)
          : 0,
      completionTime:
        typeof parsed.completionTime === 'number' && parsed.completionTime >= 0
          ? Math.floor(parsed.completionTime)
          : 0,
      inMenu: typeof parsed.inMenu === 'boolean' ? parsed.inMenu : false,
      isNotesMode: Boolean(parsed.isNotesMode),
      quoteTracker:
        parsed.quoteTracker &&
        typeof parsed.quoteTracker.currentPackageIndex === 'number' &&
        Array.isArray(parsed.quoteTracker.availableQuotes)
          ? parsed.quoteTracker
          : { currentPackageIndex: 0, availableQuotes: [] },
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
    };
  } catch {
    return null;
  }
};

export const saveSessionData = (data: SavedSessionData): void => {
  try {
    const compactData: SavedSessionData = {
      ...data,
      gameState: {
        ...data.gameState,
        // Keep last 25 undo snapshots to ensure localStorage stays well under quota
        history: data.gameState.history.slice(-25),
        activityLog: data.gameState.activityLog.slice(-50),
      },
    };
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(compactData));
  } catch {
    // Retry without undo history if storage quota is tight
    try {
      const minimalData: SavedSessionData = {
        ...data,
        gameState: {
          ...data.gameState,
          history: [],
          activityLog: data.gameState.activityLog.slice(-15),
        },
      };
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(minimalData));
    } catch {
      // Ignore storage failures (e.g. private browsing restrictions)
    }
  }
};

export const loadSavedProfile = (): Partial<SavedProfileData> | null => {
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedProfileData>;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
};

export const saveProfileData = (data: SavedProfileData): void => {
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage failures
  }
};
