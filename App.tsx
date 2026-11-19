import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Difficulty,
  GameState,
  Board,
  Cell,
  Coords,
  AppSettings,
  ActivityLogEntry,
  UnitClearAnimation,
  UnitClearVariant,
} from './types';
import { generateSudoku } from './utils/sudokuLogic';
import {
  QUOTE_PACKAGES,
  BREAK_QUOTES,
  RANKS,
  SOUND_REWARD_MAIN,
  SOUND_ERROR,
  RANK_UP_GIFS,
  RANK_UP_SOUNDS,
  RANK_UP_SPECIAL_GIFS,
  RANK_UP_SPECIAL_SOUNDS,
  RANK_UP_SAJAYIN8_GIFS,
  SOUND_RANK_UP_SAJAYIN8,
  RANK_UP_SAJAYIN7_GIFS,
  SOUND_RANK_UP_SAJAYIN7,
  RANK_UP_X3_KAMEHA_GIFS,
  SOUND_RANK_UP_X3_KAMEHA,
  RANK_UP_GOHAN_CELL_GIFS,
  SOUND_RANK_UP_GOHAN_CELL,
  INITIAL_REWARD_SOUNDS,
  INITIAL_REWARD_GIFS,
  MAX_MISTAKES_FOR_MAX_RANK,
  MAX_RANK_INDEX_BY_DIFFICULTY,
  getRankIndexForScore,
  getRankProgressInfo,
} from './data/gameData';
import { DIFFICULTY_THEMES } from './data/difficultyThemes';
import MainMenu from './components/MainMenu';
import NumberPad from './components/NumberPad';
import Tools from './components/Tools';
import SudokuBoard from './components/SudokuBoard';
import GameTimer, { formatTime } from './components/GameTimer';
import VictoryModal from './components/VictoryModal';
import RewardOverlay from './components/RewardOverlay';
import BreakOverlay from './components/BreakOverlay';
import RankGuideModal from './components/RankGuideModal';
import {
  Settings,
  ChevronLeft,
  Play,
  CheckCircle2,
  XCircle,
  Calculator,
  ListChecks,
  History,
  RotateCcw,
  Zap,
  Volume2,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  Save,
  Download,
  Eye,
  EyeOff,
  Music,
  X,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Trophy,
  Search,
  ClipboardPaste,
  Power,
} from 'lucide-react';

const GIF_BUFFER_SIZE = 4;

const getBlockIndex = (row: number, col: number): number => {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
};

const cloneBoard = (board: Board): Board =>
  board.map((row) =>
    row.map((cell) => ({
      value: cell.value,
      isInitial: cell.isInitial,
      isNotes: cell.isNotes && cell.isNotes.length > 0 ? [...cell.isNotes] : undefined,
    }))
  );

const addLog = (
  prevGameState: GameState,
  message: string,
  type: ActivityLogEntry['type']
): ActivityLogEntry[] => {
  const newEntry: ActivityLogEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: new Date().toLocaleTimeString([], {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    message,
    type,
  };
  const newLog = [...prevGameState.activityLog, newEntry];
  return newLog.length > 50 ? newLog.slice(newLog.length - 50) : newLog;
};

const UNIT_ANIM_DURATION_MS = 1400;
const UNIT_CLEAR_VARIANTS: UnitClearVariant[] = ['ripple-wave', 'golden-flip', 'neon-sweep'];
let unitClearVariantBag: UnitClearVariant[] = [];
let lastUnitClearVariant: UnitClearVariant | null = null;

function popNextUnitClearVariant(): UnitClearVariant {
  if (unitClearVariantBag.length === 0) {
    const nextBag = [...UNIT_CLEAR_VARIANTS];
    for (let i = nextBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nextBag[i], nextBag[j]] = [nextBag[j], nextBag[i]];
    }
    if (nextBag.length > 1 && nextBag[nextBag.length - 1] === lastUnitClearVariant) {
      [nextBag[0], nextBag[nextBag.length - 1]] = [nextBag[nextBag.length - 1], nextBag[0]];
    }
    unitClearVariantBag = nextBag;
  }
  const picked = unitClearVariantBag.pop()!;
  lastUnitClearVariant = picked;
  return picked;
}

const isRowSolved = (board: Board, solution: number[][], row: number): boolean => {
  for (let c = 0; c < 9; c++) {
    if (board[row][c].value !== solution[row][c]) return false;
  }
  return true;
};

const isColSolved = (board: Board, solution: number[][], col: number): boolean => {
  for (let r = 0; r < 9; r++) {
    if (board[r][col].value !== solution[r][col]) return false;
  }
  return true;
};

const isBoxSolved = (
  board: Board,
  solution: number[][],
  boxRow: number,
  boxCol: number
): boolean => {
  const startR = boxRow * 3;
  const startC = boxCol * 3;
  for (let r = startR; r < startR + 3; r++) {
    for (let c = startC; c < startC + 3; c++) {
      if (board[r][c].value !== solution[r][c]) return false;
    }
  }
  return true;
};

const detectCompletedUnits = (
  prevBoard: Board,
  nextBoard: Board,
  solution: number[][],
  row: number,
  col: number
): { rows: number[]; cols: number[]; boxes: number[]; hasCompletedUnit: boolean } => {
  const rows: number[] = [];
  const cols: number[] = [];
  const boxes: number[] = [];

  if (!isRowSolved(prevBoard, solution, row) && isRowSolved(nextBoard, solution, row)) {
    rows.push(row);
  }
  if (!isColSolved(prevBoard, solution, col) && isColSolved(nextBoard, solution, col)) {
    cols.push(col);
  }
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  if (
    !isBoxSolved(prevBoard, solution, boxRow, boxCol) &&
    isBoxSolved(nextBoard, solution, boxRow, boxCol)
  ) {
    boxes.push(boxRow * 3 + boxCol);
  }

  return {
    rows,
    cols,
    boxes,
    hasCompletedUnit: rows.length > 0 || cols.length > 0 || boxes.length > 0,
  };
};

const playUnitClearChime = (
  unitCount: number,
  isBoardComplete: boolean,
  volumePercent: number
) => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    const vol = Math.max(0.03, Math.min(0.32, (volumePercent / 100) * 0.28));
    masterGain.gain.setValueAtTime(vol, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const notes = isBoardComplete
      ? [523.25, 659.25, 783.99, 1046.5]
      : unitCount >= 2
        ? [523.25, 659.25, 783.99, 987.77]
        : [523.25, 659.25, 783.99];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.095);
      gain.gain.setValueAtTime(0.001, now + idx * 0.095);
      gain.gain.exponentialRampToValueAtTime(0.42, now + idx * 0.095 + 0.028);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.095 + 0.48);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now + idx * 0.095);
      osc.stop(now + idx * 0.095 + 0.5);
    });

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1250);
  } catch {
    // Web Audio unavailable
  }
};

const App: React.FC = () => {
  const [inMenu, setInMenu] = useState(true);
  const [highestCompletedRankIndex, setHighestCompletedRankIndex] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState(0);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCell, setSelectedCell] = useState<Coords | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Game Mode States
  const [isNotesMode, setIsNotesMode] = useState(false);

  // New Game Confirmation State
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);
  const [pendingDifficulty, setPendingDifficulty] = useState<Difficulty | null>(null);

  // Non-blocking feedback states
  const [showCopyFeedback, setShowCopyFeedback] = useState<{ type: 'gif' | 'sound' } | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Settings & Break Logic
  const [settings, setSettings] = useState<AppSettings>({
    operationsTarget: 10,
    breakDuration: 60,
    rewardDuration: 7200,
    volumeRewardMain: 60,
    volumeRewardList: 20,
    volumeError: 65,
    enableVisualRewards: true,
    enableRewardSounds: true,
    showActivityLog: false,
    showRewardTimerBar: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showRankGuide, setShowRankGuide] = useState(false);
  const [showRewardConfig, setShowRewardConfig] = useState(false);
  const [viewingList, setViewingList] = useState<'gifs' | 'sounds' | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [isBreakPending, setIsBreakPending] = useState(false);
  const [isBreakQueued, setIsBreakQueued] = useState(false);
  const [currentBreakQuote, setCurrentBreakQuote] = useState('');

  // Resource Management State
  const [gifList, setGifList] = useState<string[]>(INITIAL_REWARD_GIFS);
  const [soundList, setSoundList] = useState<string[]>(INITIAL_REWARD_SOUNDS);
  const [disabledGifs, setDisabledGifs] = useState<Set<string>>(() => new Set());
  const [disabledSounds, setDisabledSounds] = useState<Set<string>>(() => new Set());
  const [findUrlInput, setFindUrlInput] = useState('');
  const [listSearchQuery, setListSearchQuery] = useState('');
  const [highlightedUrl, setHighlightedUrl] = useState<string | null>(null);

  const activeGifList = useMemo(
    () => gifList.filter((url) => !disabledGifs.has(url)),
    [gifList, disabledGifs]
  );
  const activeSoundList = useMemo(
    () => soundList.filter((url) => !disabledSounds.has(url)),
    [soundList, disabledSounds]
  );

  // Rank Up Playlists State
  const [rankUpGifs, setRankUpGifs] = useState<string[]>(() => [...RANK_UP_GIFS]);
  const [rankUpSounds, setRankUpSounds] = useState<string[]>(() => [...RANK_UP_SOUNDS]);
  const [rankUpSpecialSounds, setRankUpSpecialSounds] = useState<string[]>(() => [
    ...RANK_UP_SPECIAL_SOUNDS,
  ]);

  // Reward Visuals - Buffer Strategy
  const [showRewardScreen, setShowRewardScreen] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [isVictoryQueued, setIsVictoryQueued] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [rankImgFailed, setRankImgFailed] = useState(false);
  const [currentGif, setCurrentGif] = useState<string>('');
  const [lastPlayedGif, setLastPlayedGif] = useState<string>('');
  const [lastPlayedSound, setLastPlayedSound] = useState<string>('');
  const [gifBuffer, setGifBuffer] = useState<string[]>([]);
  const [currentRewardData, setCurrentRewardData] = useState<{
    quote: string;
    xp: number;
    rankIndex?: number;
  } | null>(null);

  // Quote Management Ref
  const quoteTracker = useRef<{
    currentPackageIndex: number;
    availableQuotes: string[];
  }>({ currentPackageIndex: 0, availableQuotes: [] });

  // Preview States for List View
  const [previewGifUrl, setPreviewGifUrl] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Audio State (Shuffle Bag)
  const [rewardPlaylist, setRewardPlaylist] = useState<string[]>(() => [...INITIAL_REWARD_SOUNDS]);
  const activeAudioRefs = useRef<HTMLAudioElement[]>([]);

  // Preload & Timer Refs
  const [unitClearAnim, setUnitClearAnim] = useState<UnitClearAnimation | null>(null);
  const preloadedUrlsRef = useRef<Set<string>>(new Set());
  const elapsedSecondsRef = useRef<number>(0);
  const breakDelayTimeoutRef = useRef<number | null>(null);
  const unitAnimTimeoutRef = useRef<number | null>(null);
  const copyFeedbackTimeoutRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Refs for scrolling log & highlighted reward list item
  const logContainerRef = useRef<HTMLDivElement>(null);
  const highlightedItemRef = useRef<HTMLDivElement | null>(null);

  // Input Refs for Configuration
  const newGifInputRef = useRef<HTMLInputElement>(null);
  const bulkGifInputRef = useRef<HTMLTextAreaElement>(null);
  const newSoundInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Cleanup audio & timers on unmount
  useEffect(() => {
    return () => {
      if (breakDelayTimeoutRef.current !== null) window.clearTimeout(breakDelayTimeoutRef.current);
      if (unitAnimTimeoutRef.current !== null) window.clearTimeout(unitAnimTimeoutRef.current);
      if (copyFeedbackTimeoutRef.current !== null) window.clearTimeout(copyFeedbackTimeoutRef.current);
      if (toastTimeoutRef.current !== null) window.clearTimeout(toastTimeoutRef.current);
      activeAudioRefs.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      activeAudioRefs.current = [];
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        previewAudioRef.current = null;
      }
    };
  }, []);

  // Auto-scroll log only when visible
  useEffect(() => {
    if (settings.showActivityLog && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [gameState?.activityLog, settings.showActivityLog]);

  // Scroll highlighted GIF/Audio card into view when opening the list from URL lookup
  useEffect(() => {
    if (!viewingList || !highlightedUrl) return;
    const rafId = window.requestAnimationFrame(() => {
      highlightedItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [viewingList, highlightedUrl]);

  // --- OPTIMIZED BUFFER & IMAGE PRELOADER ---
  const pickRandomGif = useCallback(
    (excludeList: string[]) => {
      const available = activeGifList.filter((g) => !excludeList.includes(g));
      const pool = available.length > 0 ? available : activeGifList;
      if (pool.length === 0) return '';
      return pool[Math.floor(Math.random() * pool.length)];
    },
    [activeGifList]
  );

  // Purge disabled or deleted GIFs from preloaded buffer immediately
  useEffect(() => {
    const activeSet = new Set(activeGifList);
    setGifBuffer((prev) => {
      const next = prev.filter((url) => activeSet.has(url));
      return next.length === prev.length ? prev : next;
    });
  }, [activeGifList]);

  // Purge disabled or deleted sounds from audio shuffle bag immediately
  useEffect(() => {
    const activeSet = new Set(activeSoundList);
    setRewardPlaylist((prev) => {
      const next = prev.filter((url) => activeSet.has(url));
      return next.length === prev.length ? prev : next;
    });
  }, [activeSoundList]);

  useEffect(() => {
    if (!settings.enableVisualRewards) return;
    if (gifBuffer.length < GIF_BUFFER_SIZE && activeGifList.length > 0) {
      const needed = GIF_BUFFER_SIZE - gifBuffer.length;
      const newGifs: string[] = [];
      const currentExcludes = [...gifBuffer];

      for (let i = 0; i < needed; i++) {
        const pick = pickRandomGif(currentExcludes);
        if (pick) {
          newGifs.push(pick);
          currentExcludes.push(pick);
        }
      }

      if (newGifs.length > 0) {
        setGifBuffer((prev) => [...prev, ...newGifs]);
      }
    }
  }, [gifBuffer, activeGifList.length, pickRandomGif, settings.enableVisualRewards]);

  // Deduplicated JS Image preloader (replaces duplicate hidden DOM elements)
  const preloadImageUrl = useCallback((url: string) => {
    if (!url || preloadedUrlsRef.current.has(url)) return;
    preloadedUrlsRef.current.add(url);
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  }, []);

  useEffect(() => {
    if (inMenu || !settings.enableVisualRewards) return;
    gifBuffer.forEach(preloadImageUrl);
  }, [inMenu, settings.enableVisualRewards, gifBuffer, preloadImageUrl]);

  // Only preload current + next 2 upcoming rank images (capped by difficulty max rank)
  const currentRankIdx = gameState ? gameState.rankIndex : 0;
  const maxRankForCurrentDifficulty = gameState
    ? MAX_RANK_INDEX_BY_DIFFICULTY[gameState.difficulty] + 1
    : RANKS.length;
  useEffect(() => {
    if (inMenu) return;
    const endIdx = Math.min(maxRankForCurrentDifficulty, currentRankIdx + 3);
    for (let i = currentRankIdx; i < endIdx; i++) {
      preloadImageUrl(RANKS[i].img);
    }
  }, [inMenu, currentRankIdx, maxRankForCurrentDifficulty, preloadImageUrl]);

  // Preload a couple of rank-up GIFs when visual rewards are active so rank-up opens without network lag
  useEffect(() => {
    if (inMenu || !settings.enableVisualRewards) return;
    rankUpGifs.slice(0, 3).forEach(preloadImageUrl);
  }, [inMenu, settings.enableVisualRewards, rankUpGifs, preloadImageUrl]);

  // --- AUDIO HELPERS ---
  const playSound = useCallback((url: string, volumePercent: number) => {
    try {
      const audio = new Audio(url);
      audio.volume = Math.max(0, Math.min(1, volumePercent / 100));
      activeAudioRefs.current.push(audio);

      const cleanup = () => {
        activeAudioRefs.current = activeAudioRefs.current.filter((a) => a !== audio);
      };
      audio.onended = cleanup;
      audio.onerror = cleanup;

      audio.play().catch((err) => {
        cleanup();
        console.warn('Audio play blocked or failed', err);
      });
    } catch (e) {
      console.warn('Error initializing audio', e);
    }
  }, []);

  const handlePreviewSound = useCallback(
    (url: string) => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        previewAudioRef.current.currentTime = 0;
      }
      const audio = new Audio(url);
      audio.volume = Math.max(0, Math.min(1, settings.volumeRewardList / 100));
      previewAudioRef.current = audio;
      audio.onended = () => {
        previewAudioRef.current = null;
      };
      audio.play().catch((e) => console.warn('Preview play failed', e));
    },
    [settings.volumeRewardList]
  );

  const stopPreviewAudio = useCallback(() => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current.currentTime = 0;
      previewAudioRef.current = null;
    }
  }, []);

  const closeListView = useCallback(() => {
    stopPreviewAudio();
    setViewingList(null);
    setListSearchQuery('');
    setHighlightedUrl(null);
  }, [stopPreviewAudio]);

  const playRandomReward = useCallback(() => {
    const activePool = rewardPlaylist.filter((url) => !disabledSounds.has(url));
    const currentList = activePool.length > 0 ? [...activePool] : [...activeSoundList];
    if (currentList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * currentList.length);
    const soundUrl = currentList[randomIndex];
    setLastPlayedSound(soundUrl);
    playSound(soundUrl, settings.volumeRewardList);
    currentList.splice(randomIndex, 1);
    setRewardPlaylist(currentList);
  }, [rewardPlaylist, disabledSounds, activeSoundList, playSound, settings.volumeRewardList]);

  // --- QUOTE LOGIC ---
  const getNextQuote = useCallback(() => {
    let { currentPackageIndex, availableQuotes } = quoteTracker.current;
    if (availableQuotes.length === 0) {
      if (currentPackageIndex >= QUOTE_PACKAGES.length) {
        currentPackageIndex = 0;
      }
      availableQuotes = [...QUOTE_PACKAGES[currentPackageIndex]];
    }
    const randIdx = Math.floor(Math.random() * availableQuotes.length);
    const quote = availableQuotes[randIdx];
    availableQuotes.splice(randIdx, 1);
    if (availableQuotes.length === 0) {
      currentPackageIndex++;
    }
    quoteTracker.current = { currentPackageIndex, availableQuotes };
    return quote;
  }, []);

  // --- RANK UP MEDIA LOGIC ---
  const getRankUpMedia = useCallback(() => {
    const currentGifs = rankUpGifs.length > 0 ? [...rankUpGifs] : [...RANK_UP_GIFS];
    const gifIdx = Math.floor(Math.random() * currentGifs.length);
    const selectedGif = currentGifs[gifIdx];
    const nextGifs = currentGifs.filter((_, i) => i !== gifIdx);
    setRankUpGifs(nextGifs.length === 0 ? [...RANK_UP_GIFS] : nextGifs);

    let selectedSound: string;
    if (RANK_UP_SPECIAL_GIFS.has(selectedGif)) {
      const currentSpecial =
        rankUpSpecialSounds.length > 0 ? [...rankUpSpecialSounds] : [...RANK_UP_SPECIAL_SOUNDS];
      const soundIdx = Math.floor(Math.random() * currentSpecial.length);
      selectedSound = currentSpecial[soundIdx];
      const nextSpecial = currentSpecial.filter((_, i) => i !== soundIdx);
      setRankUpSpecialSounds(
        nextSpecial.length === 0 ? [...RANK_UP_SPECIAL_SOUNDS] : nextSpecial
      );
    } else if (RANK_UP_SAJAYIN8_GIFS.has(selectedGif)) {
      selectedSound = SOUND_RANK_UP_SAJAYIN8;
    } else if (RANK_UP_SAJAYIN7_GIFS.has(selectedGif)) {
      selectedSound = SOUND_RANK_UP_SAJAYIN7;
    } else if (RANK_UP_X3_KAMEHA_GIFS.has(selectedGif)) {
      selectedSound = SOUND_RANK_UP_X3_KAMEHA;
    } else if (RANK_UP_GOHAN_CELL_GIFS.has(selectedGif)) {
      selectedSound = SOUND_RANK_UP_GOHAN_CELL;
    } else {
      const currentSounds = rankUpSounds.length > 0 ? [...rankUpSounds] : [...RANK_UP_SOUNDS];
      const soundIdx = Math.floor(Math.random() * currentSounds.length);
      selectedSound = currentSounds[soundIdx];
      const nextSounds = currentSounds.filter((_, i) => i !== soundIdx);
      setRankUpSounds(nextSounds.length === 0 ? [...RANK_UP_SOUNDS] : nextSounds);
    }

    return { gif: selectedGif, sound: selectedSound };
  }, [rankUpGifs, rankUpSounds, rankUpSpecialSounds]);

  const startBreakSequence = useCallback(
    (delay = 2000) => {
      const quote = BREAK_QUOTES[Math.floor(Math.random() * BREAK_QUOTES.length)];
      setCurrentBreakQuote(quote);

      if (breakDelayTimeoutRef.current !== null) {
        window.clearTimeout(breakDelayTimeoutRef.current);
        breakDelayTimeoutRef.current = null;
      }

      if (delay > 0) {
        setIsBreakPending(true);
        breakDelayTimeoutRef.current = window.setTimeout(() => {
          breakDelayTimeoutRef.current = null;
          setIsBreakPending(false);
          setBreakTimeLeft(settings.breakDuration);
          setIsOnBreak(true);
          setGameState((prev) =>
            prev
              ? {
                  ...prev,
                  activityLog: addLog(prev, 'Taking a break...', 'warning'),
                }
              : null
          );
        }, delay);
      } else {
        setBreakTimeLeft(settings.breakDuration);
        setIsOnBreak(true);
        setGameState((prev) =>
          prev
            ? {
                ...prev,
                activityLog: addLog(prev, 'Taking a break...', 'warning'),
              }
            : null
        );
      }
    },
    [settings.breakDuration]
  );

  // Handle Reward Screen Cleanup, Victory Handoff, and Break Trigger
  const handleCloseReward = useCallback(() => {
    setShowRewardScreen(false);
    setGifBuffer((prev) => prev.slice(1));
    setCurrentGif('');
    setCurrentRewardData(null);

    activeAudioRefs.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    activeAudioRefs.current = [];

    if (isVictoryQueued) {
      setIsVictoryQueued(false);
      setIsBreakQueued(false);
      setShowVictoryModal(true);
      return;
    }

    if (isBreakQueued) {
      setIsBreakQueued(false);
      startBreakSequence(0);
    }
  }, [isVictoryQueued, isBreakQueued, startBreakSequence]);

  useEffect(() => {
    if (!showRewardScreen) return;
    const closeTimeout = window.setTimeout(() => {
      handleCloseReward();
    }, settings.rewardDuration);
    return () => clearTimeout(closeTimeout);
  }, [showRewardScreen, settings.rewardDuration, handleCloseReward]);

  const handleSkipBreak = useCallback(() => {
    setIsOnBreak(false);
  }, []);

  // --- Configuration Handlers ---
  const handleAddGif = useCallback(() => {
    const url = newGifInputRef.current?.value.trim();
    if (url) {
      setGifList((prev) => (prev.includes(url) ? prev : [...prev, url]));
      if (newGifInputRef.current) newGifInputRef.current.value = '';
      showToast('GIF added successfully!');
    }
  }, [showToast]);

  const handleBulkAddGifs = useCallback(() => {
    const text = bulkGifInputRef.current?.value;
    if (text) {
      const urls = text
        .split(/["',\n]+/)
        .map((u) => u.trim())
        .filter((u) => u.length > 4 && u.startsWith('http'));
      if (urls.length > 0) {
        setGifList((prev) => {
          const existing = new Set(prev);
          const uniqueNew = urls.filter((u) => !existing.has(u) && existing.add(u));
          return uniqueNew.length > 0 ? [...prev, ...uniqueNew] : prev;
        });
        if (bulkGifInputRef.current) bulkGifInputRef.current.value = '';
        showToast(`Added ${urls.length} GIFs successfully!`);
      } else {
        showToast('No valid URLs found.', 'error');
      }
    }
  }, [showToast]);

  const handleAddSound = useCallback(() => {
    const url = newSoundInputRef.current?.value.trim();
    if (url) {
      setSoundList((prev) => (prev.includes(url) ? prev : [...prev, url]));
      if (newSoundInputRef.current) newSoundInputRef.current.value = '';
      showToast('Sound added successfully!');
    }
  }, [showToast]);

  const handleToggleDisable = useCallback(
    (url: string, type: 'gif' | 'sound') => {
      if (type === 'gif') {
        const willDisable = !disabledGifs.has(url);
        setDisabledGifs((prev) => {
          const next = new Set(prev);
          if (next.has(url)) next.delete(url);
          else next.add(url);
          return next;
        });
        if (willDisable) {
          setGifBuffer((prev) => prev.filter((item) => item !== url));
          showToast('GIF disabled (kept in list).');
        } else {
          showToast('GIF enabled.');
        }
      } else {
        const willDisable = !disabledSounds.has(url);
        setDisabledSounds((prev) => {
          const next = new Set(prev);
          if (next.has(url)) next.delete(url);
          else next.add(url);
          return next;
        });
        if (willDisable) {
          setRewardPlaylist((prev) => prev.filter((item) => item !== url));
          showToast('Audio disabled (kept in list).');
        } else {
          showToast('Audio enabled.');
        }
      }
    },
    [disabledGifs, disabledSounds, showToast]
  );

  const handleRemoveSpecific = useCallback(
    (url: string, type: 'gif' | 'sound') => {
      if (type === 'gif') {
        setGifList((prev) => prev.filter((item) => item !== url));
        setDisabledGifs((prev) => {
          if (!prev.has(url)) return prev;
          const next = new Set(prev);
          next.delete(url);
          return next;
        });
        setGifBuffer((prev) => prev.filter((item) => item !== url));
      } else {
        setSoundList((prev) => prev.filter((item) => item !== url));
        setDisabledSounds((prev) => {
          if (!prev.has(url)) return prev;
          const next = new Set(prev);
          next.delete(url);
          return next;
        });
        setRewardPlaylist((prev) => prev.filter((item) => item !== url));
      }
      setHighlightedUrl((prev) => (prev === url ? null : prev));
    },
    []
  );

  const findUrlMatch = (list: string[], query: string): string | null => {
    const exact = list.find((u) => u === query);
    if (exact) return exact;
    const lower = query.toLowerCase();
    const caseInsensitiveExact = list.find((u) => u.toLowerCase() === lower);
    if (caseInsensitiveExact) return caseInsensitiveExact;
    return list.find((u) => u.toLowerCase().includes(lower)) || null;
  };

  const handleJumpToUrl = useCallback(
    (rawInput?: string) => {
      const raw = (rawInput ?? findUrlInput).trim().replace(/^["']+|["']+$/g, '');
      if (!raw) {
        showToast('Paste or enter a URL first.', 'error');
        return;
      }

      const matchedGif = findUrlMatch(gifList, raw);
      if (matchedGif) {
        setListSearchQuery('');
        setHighlightedUrl(matchedGif);
        setViewingList('gifs');
        return;
      }

      const matchedSound = findUrlMatch(soundList, raw);
      if (matchedSound) {
        setListSearchQuery('');
        setHighlightedUrl(matchedSound);
        setViewingList('sounds');
        return;
      }

      showToast('URL not found in your GIF or Audio lists.', 'error');
    },
    [findUrlInput, gifList, soundList, showToast]
  );

  const handlePasteAndJump = useCallback(async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      const cleaned = clipText.trim().replace(/^["']+|["']+$/g, '');
      if (!cleaned) {
        showToast('Clipboard is empty.', 'error');
        return;
      }
      setFindUrlInput(cleaned);
      handleJumpToUrl(cleaned);
    } catch {
      showToast('Clipboard blocked — paste manually in the box.', 'error');
    }
  }, [handleJumpToUrl, showToast]);

  const handlePasteIntoListSearch = useCallback(async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      const cleaned = clipText.trim().replace(/^["']+|["']+$/g, '');
      if (!cleaned) {
        showToast('Clipboard is empty.', 'error');
        return;
      }
      setListSearchQuery(cleaned);
      const currentList = viewingList === 'gifs' ? gifList : soundList;
      const match = findUrlMatch(currentList, cleaned);
      setHighlightedUrl(match);
    } catch {
      showToast('Clipboard blocked — paste manually in the box.', 'error');
    }
  }, [viewingList, gifList, soundList, showToast]);

  const copyLastGifLink = useCallback(() => {
    if (lastPlayedGif) {
      navigator.clipboard.writeText(lastPlayedGif).then(() => {
        setGameState((prev) =>
          prev
            ? {
                ...prev,
                activityLog: addLog(prev, `GIF Link Copied: ${lastPlayedGif}`, 'info'),
              }
            : null
        );
        setShowCopyFeedback({ type: 'gif' });
        if (copyFeedbackTimeoutRef.current !== null) {
          window.clearTimeout(copyFeedbackTimeoutRef.current);
        }
        copyFeedbackTimeoutRef.current = window.setTimeout(() => setShowCopyFeedback(null), 3500);
      });
    } else {
      showToast('No GIF has been played yet.', 'error');
    }
  }, [lastPlayedGif, showToast]);

  const copyLastSoundLink = useCallback(() => {
    if (lastPlayedSound) {
      navigator.clipboard.writeText(lastPlayedSound).then(() => {
        setGameState((prev) =>
          prev
            ? {
                ...prev,
                activityLog: addLog(prev, `Audio Link Copied: ${lastPlayedSound}`, 'info'),
              }
            : null
        );
        setShowCopyFeedback({ type: 'sound' });
        if (copyFeedbackTimeoutRef.current !== null) {
          window.clearTimeout(copyFeedbackTimeoutRef.current);
        }
        copyFeedbackTimeoutRef.current = window.setTimeout(() => setShowCopyFeedback(null), 3500);
      });
    } else {
      showToast('No audio reward has played yet.', 'error');
    }
  }, [lastPlayedSound, showToast]);

  // --- Game Logic ---
  const startNewSession = useCallback((difficulty: Difficulty, keepProgress: boolean) => {
    if (breakDelayTimeoutRef.current !== null) {
      window.clearTimeout(breakDelayTimeoutRef.current);
      breakDelayTimeoutRef.current = null;
    }
    if (unitAnimTimeoutRef.current !== null) {
      window.clearTimeout(unitAnimTimeoutRef.current);
      unitAnimTimeoutRef.current = null;
    }
    setUnitClearAnim(null);

    const { initial, solution } = generateSudoku(difficulty);

    let totalEmptyCells = 0;
    const boardCells: Cell[][] = initial.map((row) =>
      row.map((val) => {
        if (val === 0) totalEmptyCells += 1;
        return {
          value: val === 0 ? null : val,
          isInitial: val !== 0,
          isNotes: undefined,
        };
      })
    );

    quoteTracker.current = { currentPackageIndex: 0, availableQuotes: [] };

    setGameState((prev) => {
      let stats = {
        mistakes: 0,
        hits: 0,
        score: 0,
        currentStreak: 0,
        rankIndex: 0,
        rankProgress: 0,
        operationsCount: 0,
      };
      let initLog: ActivityLogEntry[] = [
        {
          id: 'init',
          timestamp: new Date().toLocaleTimeString([], {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          message: `Game started - ${difficulty}`,
          type: 'info',
        },
      ];

      if (keepProgress && prev) {
        const clampedRankIndex = Math.min(
          prev.rankIndex,
          MAX_RANK_INDEX_BY_DIFFICULTY[difficulty]
        );
        stats = {
          mistakes: prev.mistakes,
          hits: prev.hits,
          score: prev.score,
          currentStreak: prev.currentStreak,
          rankIndex: clampedRankIndex,
          rankProgress: getRankProgressInfo(
            prev.score,
            clampedRankIndex,
            difficulty,
            0,
            3,
            0,
            totalEmptyCells
          ).progressPercent,
          operationsCount: prev.operationsCount,
        };
        initLog = addLog(prev, `New Game (${difficulty}) - Progress Kept`, 'info');
      }

      return {
        board: boardCells,
        solution,
        difficulty,
        ...stats,
        sessionMistakes: 0,
        totalEmptyCells,
        contaminatedBlockNumbers: [],
        isComplete: false,
        history: [],
        hintsRemaining: 3,
        activityLog: initLog,
      };
    });

    elapsedSecondsRef.current = 0;
    setCompletionTime(0);
    setShowVictoryModal(false);
    setIsVictoryQueued(false);
    setSessionId((prev) => prev + 1);
    setInMenu(false);
    setSelectedCell(null);
    setIsPaused(false);
    setIsOnBreak(false);
    setIsBreakPending(false);
    setIsBreakQueued(false);
    setShowRewardScreen(false);
    setShowRankGuide(false);
    setIsNotesMode(false);
    setShowNewGameConfirm(false);
    setPendingDifficulty(null);
  }, []);

  const requestNewGame = useCallback(
    (difficulty?: Difficulty) => {
      if (
        gameState &&
        !gameState.isComplete &&
        (gameState.score > 0 || gameState.hits > 0 || gameState.mistakes > 0)
      ) {
        setPendingDifficulty(difficulty || gameState.difficulty);
        setIsPaused(true);
        setShowNewGameConfirm(true);
      } else {
        startNewSession(difficulty || (gameState ? gameState.difficulty : Difficulty.MEDIUM), false);
      }
    },
    [gameState, startNewSession]
  );

  // Break countdown timer
  useEffect(() => {
    if (!isOnBreak) return;
    if (breakTimeLeft <= 0) {
      setIsOnBreak(false);
      return;
    }
    const timer = window.setInterval(() => {
      setBreakTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOnBreak, breakTimeLeft]);

  const handleInput = useCallback(
    (num: number | null) => {
      if (!gameState || !selectedCell || gameState.isComplete || isBreakPending || unitClearAnim) return;

      const { row, col } = selectedCell;
      const currentCell = gameState.board[row][col];

      if (currentCell.isInitial) return;

      if (isNotesMode && num !== null) {
        if (currentCell.value === null) {
          const notes = currentCell.isNotes ? [...currentCell.isNotes] : [];
          const idx = notes.indexOf(num);
          if (idx !== -1) {
            notes.splice(idx, 1);
          } else {
            notes.push(num);
          }
          const newBoard = gameState.board.map((r, rIdx) =>
            rIdx === row
              ? r.map((c, cIdx) => (cIdx === col ? { ...c, isNotes: notes } : c))
              : r
          );
          setGameState((prev) => (prev ? { ...prev, board: newBoard } : null));
        }
        return;
      }

      if (num !== null && currentCell.value === num) {
        num = null;
      }

      const newHistory =
        gameState.history.length >= 20 ? gameState.history.slice(1) : [...gameState.history];
      newHistory.push(cloneBoard(gameState.board));

      const newBoard = gameState.board.map((r, rIdx) =>
        rIdx === row
          ? r.map((c, cIdx) => (cIdx === col ? { ...c, value: num, isNotes: undefined } : c))
          : r
      );

      let newMistakes = gameState.mistakes;
      let newSessionMistakes = gameState.sessionMistakes;
      let newHits = gameState.hits;
      let newScore = gameState.score;
      let newStreak = gameState.currentStreak;
      let newRankIndex = gameState.rankIndex;
      let newRankProgress = gameState.rankProgress;
      let newContaminated = gameState.contaminatedBlockNumbers;
      let logMsg = '';
      let logType: ActivityLogEntry['type'] = 'info';
      let rewardTriggered = false;
      let isCorrectHit = false;
      let completedUnits: { rows: number[]; cols: number[]; boxes: number[]; hasCompletedUnit: boolean } = {
        rows: [],
        cols: [],
        boxes: [],
        hasCompletedUnit: false,
      };
      let queuedReward: {
        gif: string;
        rewardData: { quote: string; xp: number; rankIndex?: number };
        isRankUp: boolean;
        rankUpSound?: string;
      } | null = null;

      let isComplete = true;
      let correctCellsCount = 0;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (newBoard[r][c].value === gameState.solution[r][c]) {
            correctCellsCount += 1;
          } else {
            isComplete = false;
          }
        }
      }
      const filledEmptyCount = Math.max(0, correctCellsCount - (81 - gameState.totalEmptyCells));

      if (num !== null) {
        const blockIndex = getBlockIndex(row, col);
        const contaminationKey = `${blockIndex}-${num}`;
        const isCorrect = num === gameState.solution[row][col];

        if (isCorrect) {
          isCorrectHit = true;
          completedUnits = detectCompletedUnits(
            gameState.board,
            newBoard,
            gameState.solution,
            row,
            col
          );
          const maxAllowedMistakes = MAX_MISTAKES_FOR_MAX_RANK[gameState.difficulty];
          const canUnlockMaxRank =
            isComplete &&
            newSessionMistakes <= maxAllowedMistakes &&
            gameState.hintsRemaining === 3;

          if (!newContaminated.includes(contaminationKey)) {
            if (currentCell.value !== num) {
              newHits += 1;
              newStreak += 1;

              const points = 50;
              let multiplier = 1;
              if (newStreak === 2) {
                multiplier = 1.15;
              } else if (newStreak > 2) {
                multiplier = 1.15 + (newStreak - 2) * 0.05;
              }

              const pointsGained = Math.round(points * multiplier);
              newScore += pointsGained;

              // XP unlocks up to (maxRankIndex - 1); the difficulty's max rank ONLY unlocks on full board completion within error limits
              const maxRankIndex = MAX_RANK_INDEX_BY_DIFFICULTY[gameState.difficulty];
              const xpRankIndex = getRankIndexForScore(newScore, gameState.difficulty);
              const targetRankIndex = canUnlockMaxRank ? maxRankIndex : xpRankIndex;
              let isRankUpEvent = false;
              if (targetRankIndex > newRankIndex) {
                newRankIndex = targetRankIndex;
                logMsg = `PROMOTED to ${RANKS[newRankIndex].name}! (+${pointsGained} XP)`;
                logType = 'rank-up';
                isRankUpEvent = true;
              }

              newRankProgress = getRankProgressInfo(
                newScore,
                newRankIndex,
                gameState.difficulty,
                newSessionMistakes,
                gameState.hintsRemaining,
                filledEmptyCount,
                gameState.totalEmptyCells
              ).progressPercent;

              if (settings.enableVisualRewards) {
                if (isRankUpEvent) {
                  const { gif, sound } = getRankUpMedia();
                  if (gif) {
                    queuedReward = {
                      gif,
                      rewardData: {
                        quote: `NEW RANK: ${RANKS[newRankIndex].name}`,
                        xp: pointsGained,
                        rankIndex: newRankIndex,
                      },
                      isRankUp: true,
                      rankUpSound: sound,
                    };
                    rewardTriggered = true;
                  }
                } else {
                  const nextGif = gifBuffer.length > 0 ? gifBuffer[0] : '';
                  if (nextGif) {
                    const quote = getNextQuote();
                    queuedReward = {
                      gif: nextGif,
                      rewardData: { quote, xp: pointsGained },
                      isRankUp: false,
                    };
                    rewardTriggered = true;
                  }
                }
              }

              if (logType !== 'rank-up') {
                logMsg = `Placed ${num} - Correct (+${pointsGained} XP)`;
                if (newStreak > 1) logMsg += ` [${newStreak}x Streak]`;
                logType = 'success';
              }
            } else {
              logMsg = `Placed ${num} again - No XP`;
              logType = 'info';
            }
          } else {
            // Final contaminated cell can still complete the board and award the difficulty's max rank if within error limit
            const maxRankIndex = MAX_RANK_INDEX_BY_DIFFICULTY[gameState.difficulty];
            if (canUnlockMaxRank && newRankIndex < maxRankIndex) {
              newRankIndex = maxRankIndex;
              logMsg = `PROMOTED to ${RANKS[newRankIndex].name}!`;
              logType = 'rank-up';
              if (settings.enableVisualRewards) {
                const { gif, sound } = getRankUpMedia();
                if (gif) {
                  queuedReward = {
                    gif,
                    rewardData: {
                      quote: `NEW RANK: ${RANKS[newRankIndex].name}`,
                      xp: 0,
                      rankIndex: newRankIndex,
                    },
                    isRankUp: true,
                    rankUpSound: sound,
                  };
                  rewardTriggered = true;
                }
              }
            } else {
              logMsg = `Placed ${num} - Correct (Contaminated, no XP)`;
              logType = 'warning';
            }
            newRankProgress = getRankProgressInfo(
              newScore,
              newRankIndex,
              gameState.difficulty,
              newSessionMistakes,
              gameState.hintsRemaining,
              filledEmptyCount,
              gameState.totalEmptyCells
            ).progressPercent;
          }
        } else {
          newMistakes += 1;
          newSessionMistakes += 1;
          playSound(SOUND_ERROR, settings.volumeError);
          newScore = Math.max(0, newScore - 40);
          newStreak = 0;
          newRankProgress = getRankProgressInfo(
            newScore,
            newRankIndex,
            gameState.difficulty,
            newSessionMistakes,
            gameState.hintsRemaining,
            filledEmptyCount,
            gameState.totalEmptyCells
          ).progressPercent;
          logMsg = `Placed ${num} - Incorrect (-40 XP)`;
          logType = 'error';
          if (!newContaminated.includes(contaminationKey)) {
            newContaminated = [...newContaminated, contaminationKey];
          }
        }
      } else if (currentCell.value !== null) {
        logMsg = `Erased cell R${row + 1}:C${col + 1}`;
        logType = 'info';
      }

      let newOpsCount = gameState.operationsCount;
      if (isCorrectHit) {
        newOpsCount += 1;
      }

      let triggerBreak = false;
      if (newOpsCount >= settings.operationsTarget) {
        triggerBreak = true;
        newOpsCount = 0;
      }

      const finalElapsed = elapsedSecondsRef.current;
      let updatedLog = logMsg ? addLog(gameState, logMsg, logType) : gameState.activityLog;
      if (isComplete) {
        updatedLog = addLog(
          { ...gameState, activityLog: updatedLog },
          `Victory! Solved ${gameState.difficulty} in ${formatTime(finalElapsed)} (${newScore} XP)`,
          'rank-up'
        );
      }

      setGameState((prev) =>
        prev
          ? {
              ...prev,
              board: newBoard,
              mistakes: newMistakes,
              sessionMistakes: newSessionMistakes,
              hits: newHits,
              score: newScore,
              currentStreak: newStreak,
              rankIndex: newRankIndex,
              rankProgress: newRankProgress,
              contaminatedBlockNumbers: newContaminated,
              operationsCount: newOpsCount,
              history: newHistory,
              isComplete,
              activityLog: updatedLog,
            }
          : null
      );

      if (isComplete) {
        setHighestCompletedRankIndex((prev) =>
          prev === null ? newRankIndex : Math.max(prev, newRankIndex)
        );
        setCompletionTime(finalElapsed);
      }

      if (completedUnits.hasCompletedUnit) {
        // First play the Sudoku unit clear animation on the board, then launch Reward / Victory / Break
        if (unitAnimTimeoutRef.current !== null) {
          window.clearTimeout(unitAnimTimeoutRef.current);
        }

        const unitCount =
          completedUnits.rows.length + completedUnits.cols.length + completedUnits.boxes.length;
        if (settings.enableRewardSounds) {
          playUnitClearChime(unitCount, isComplete, settings.volumeRewardMain);
        }

        setUnitClearAnim({
          id: Date.now(),
          originRow: row,
          originCol: col,
          rows: completedUnits.rows,
          cols: completedUnits.cols,
          boxes: completedUnits.boxes,
          variant: popNextUnitClearVariant(),
          isBoardComplete: isComplete,
        });

        const rewardToOpen = queuedReward;
        unitAnimTimeoutRef.current = window.setTimeout(() => {
          unitAnimTimeoutRef.current = null;
          setUnitClearAnim(null);

          if (rewardToOpen) {
            setCurrentGif(rewardToOpen.gif);
            setLastPlayedGif(rewardToOpen.gif);
            setCurrentRewardData(rewardToOpen.rewardData);
            if (isComplete) {
              setIsVictoryQueued(true);
            } else if (triggerBreak) {
              setIsBreakQueued(true);
            }
            setShowRewardScreen(true);

            if (settings.enableRewardSounds) {
              if (rewardToOpen.isRankUp && rewardToOpen.rankUpSound) {
                playSound(rewardToOpen.rankUpSound, settings.volumeRewardMain);
              } else if (!rewardToOpen.isRankUp) {
                playSound(SOUND_REWARD_MAIN, settings.volumeRewardMain);
                playRandomReward();
              }
            }
          } else if (isComplete) {
            setShowVictoryModal(true);
          } else if (triggerBreak) {
            startBreakSequence(800);
          }
        }, UNIT_ANIM_DURATION_MS);
      } else {
        if (queuedReward) {
          setCurrentGif(queuedReward.gif);
          setLastPlayedGif(queuedReward.gif);
          setCurrentRewardData(queuedReward.rewardData);
          setShowRewardScreen(true);

          if (settings.enableRewardSounds) {
            if (queuedReward.isRankUp && queuedReward.rankUpSound) {
              playSound(queuedReward.rankUpSound, settings.volumeRewardMain);
            } else if (!queuedReward.isRankUp) {
              playSound(SOUND_REWARD_MAIN, settings.volumeRewardMain);
              playRandomReward();
            }
          }
        }

        if (isComplete) {
          if (rewardTriggered) {
            setIsVictoryQueued(true);
          } else {
            setShowVictoryModal(true);
          }
        } else if (triggerBreak) {
          if (rewardTriggered) {
            setIsBreakQueued(true);
          } else {
            startBreakSequence(2000);
          }
        }
      }
    },
    [
      gameState,
      selectedCell,
      settings,
      isBreakPending,
      unitClearAnim,
      startBreakSequence,
      gifBuffer,
      isNotesMode,
      getRankUpMedia,
      getNextQuote,
      playSound,
      playRandomReward,
    ]
  );

  // Keep refs updated so keyboard listener never churns on every move/selection
  const handleInputRef = useRef(handleInput);
  handleInputRef.current = handleInput;

  const selectedCellRef = useRef(selectedCell);
  selectedCellRef.current = selectedCell;

  useEffect(() => {
    if (
      inMenu ||
      isPaused ||
      isOnBreak ||
      showSettings ||
      showRankGuide ||
      isBreakPending ||
      Boolean(unitClearAnim) ||
      showRewardScreen ||
      showVictoryModal ||
      showNewGameConfirm
    ) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCellRef.current) return;

      if (e.key === 'ArrowUp' || e.key === 'w') {
        setSelectedCell((prev) => (prev ? { ...prev, row: Math.max(0, prev.row - 1) } : null));
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        setSelectedCell((prev) => (prev ? { ...prev, row: Math.min(8, prev.row + 1) } : null));
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        setSelectedCell((prev) => (prev ? { ...prev, col: Math.max(0, prev.col - 1) } : null));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setSelectedCell((prev) => (prev ? { ...prev, col: Math.min(8, prev.col + 1) } : null));
      } else if (e.key >= '1' && e.key <= '9') {
        handleInputRef.current(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleInputRef.current(null);
      } else if (e.key === 'n' || e.key === 'N') {
        setIsNotesMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    inMenu,
    isPaused,
    isOnBreak,
    showSettings,
    isBreakPending,
    unitClearAnim,
    showRewardScreen,
    showVictoryModal,
    showNewGameConfirm,
  ]);

  const handleHint = useCallback(() => {
    if (
      !gameState ||
      !selectedCell ||
      gameState.isComplete ||
      unitClearAnim ||
      gameState.hintsRemaining <= 0
    ) {
      return;
    }
    const { row, col } = selectedCell;
    const currentCell = gameState.board[row][col];
    const correctVal = gameState.solution[row][col];
    if (currentCell.value === correctVal) return;

    const newBoard = gameState.board.map((r, rIdx) =>
      rIdx === row
        ? r.map((c, cIdx) => (cIdx === col ? { ...c, value: correctVal, isNotes: undefined } : c))
        : r
    );

    const completedUnits = detectCompletedUnits(
      gameState.board,
      newBoard,
      gameState.solution,
      row,
      col
    );

    let isComplete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newBoard[r][c].value !== gameState.solution[r][c]) {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) break;
    }

    const finalElapsed = elapsedSecondsRef.current;

    setGameState((prev) => {
      if (!prev) return null;
      let nextLog = addLog(prev, `Used Hint at R${row + 1}:C${col + 1}`, 'warning');
      if (isComplete) {
        nextLog = addLog(
          { ...prev, activityLog: nextLog },
          `Victory! Solved ${prev.difficulty} in ${formatTime(finalElapsed)} (${prev.score} XP)`,
          'rank-up'
        );
      }
      return {
        ...prev,
        board: newBoard,
        hintsRemaining: prev.hintsRemaining - 1,
        isComplete,
        activityLog: nextLog,
      };
    });

    if (isComplete) {
      setHighestCompletedRankIndex((prev) =>
        prev === null ? gameState.rankIndex : Math.max(prev, gameState.rankIndex)
      );
      setCompletionTime(finalElapsed);
    }

    if (completedUnits.hasCompletedUnit) {
      if (unitAnimTimeoutRef.current !== null) {
        window.clearTimeout(unitAnimTimeoutRef.current);
      }
      const unitCount =
        completedUnits.rows.length + completedUnits.cols.length + completedUnits.boxes.length;
      if (settings.enableRewardSounds) {
        playUnitClearChime(unitCount, isComplete, settings.volumeRewardMain);
      }
      setUnitClearAnim({
        id: Date.now(),
        originRow: row,
        originCol: col,
        rows: completedUnits.rows,
        cols: completedUnits.cols,
        boxes: completedUnits.boxes,
        variant: popNextUnitClearVariant(),
        isBoardComplete: isComplete,
      });
      unitAnimTimeoutRef.current = window.setTimeout(() => {
        unitAnimTimeoutRef.current = null;
        setUnitClearAnim(null);
        if (isComplete) {
          setShowVictoryModal(true);
        }
      }, UNIT_ANIM_DURATION_MS);
    } else if (isComplete) {
      setShowVictoryModal(true);
    }
  }, [gameState, selectedCell, unitClearAnim, settings.enableRewardSounds, settings.volumeRewardMain]);

  const handleUndo = useCallback(() => {
    if (unitClearAnim) return;
    setGameState((prev) => {
      if (!prev || prev.history.length === 0) return prev;
      const previousBoard = prev.history[prev.history.length - 1];
      const newHistory = prev.history.slice(0, -1);
      return {
        ...prev,
        board: previousBoard,
        history: newHistory,
        activityLog: addLog(prev, 'Undo action performed', 'info'),
      };
    });
  }, [unitClearAnim]);

  const handleSelectCell = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, []);

  const handleErase = useCallback(() => {
    handleInputRef.current(null);
  }, []);

  const handleToggleNotes = useCallback(() => {
    setIsNotesMode((prev) => !prev);
  }, []);

  const handleTogglePause = useCallback(() => {
    setIsPaused((prevPaused) => {
      const nextPaused = !prevPaused;
      setGameState((prev) =>
        prev
          ? {
              ...prev,
              activityLog: addLog(prev, nextPaused ? 'Game paused' : 'Game resumed', 'info'),
            }
          : null
      );
      return nextPaused;
    });
  }, []);

  // Memoized completed number counts (only recomputes when board or solution changes)
  const completedCounts = useMemo<Record<number, number>>(() => {
    if (!gameState) return {};
    const counts: Record<number, number> = {};
    const { board, solution } = gameState;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c].value;
        if (val !== null && val === solution[r][c]) {
          counts[val] = (counts[val] || 0) + 1;
        }
      }
    }
    return counts;
  }, [gameState?.board, gameState?.solution]);

  const currentRank = gameState ? RANKS[gameState.rankIndex] : RANKS[0];
  useEffect(() => {
    setRankImgFailed(false);
  }, [currentRank.img]);

  const filledEmptyCount = useMemo(() => {
    if (!gameState) return 0;
    let totalCorrect = 0;
    for (let n = 1; n <= 9; n++) {
      totalCorrect += completedCounts[n] || 0;
    }
    return Math.max(0, totalCorrect - (81 - gameState.totalEmptyCells));
  }, [completedCounts, gameState?.totalEmptyCells]);

  const rankProgressInfo = useMemo(
    () =>
      gameState
        ? getRankProgressInfo(
            gameState.score,
            gameState.rankIndex,
            gameState.difficulty,
            gameState.sessionMistakes,
            gameState.hintsRemaining,
            filledEmptyCount,
            gameState.totalEmptyCells
          )
        : null,
    [
      gameState?.score,
      gameState?.rankIndex,
      gameState?.difficulty,
      gameState?.sessionMistakes,
      gameState?.hintsRemaining,
      filledEmptyCount,
      gameState?.totalEmptyCells,
    ]
  );
  const isTimerRunning = Boolean(
    !inMenu &&
      gameState &&
      !gameState.isComplete &&
      !isPaused &&
      !isOnBreak &&
      !isBreakPending &&
      !unitClearAnim &&
      !showSettings &&
      !showRankGuide &&
      !showRewardScreen &&
      !showVictoryModal &&
      !showNewGameConfirm
  );
  const boardTheme = gameState
    ? DIFFICULTY_THEMES[gameState.difficulty]
    : DIFFICULTY_THEMES[Difficulty.EASY];

  return (
    <>
      {inMenu && (
        <MainMenu
          onStartGame={requestNewGame}
          highestRankIndex={highestCompletedRankIndex}
        />
      )}

      {!inMenu && gameState && (
        <div
          className={`min-h-screen w-full bg-gradient-to-br ${boardTheme.pageBg} flex flex-col items-center relative text-slate-900 overflow-x-hidden transition-colors duration-300`}
        >
          {/* Difficulty-Matched Atmospheric Backdrop & Subtle Tactical Grid */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `linear-gradient(${boardTheme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${boardTheme.gridColor} 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: boardTheme.radialBg,
              }}
            />
          </div>

          {/* GAME UI CONTAINER */}
          <div
            className={`flex-grow w-full max-w-2xl flex flex-col items-center p-4 pt-5 sm:justify-center relative z-10 ${
              showRewardScreen ? 'hidden' : ''
            }`}
          >
              {/* Top Header */}
              <div className="w-full flex justify-between items-center mb-5 px-2">
                <button
                  onClick={() => {
                    if (unitAnimTimeoutRef.current !== null) {
                      window.clearTimeout(unitAnimTimeoutRef.current);
                      unitAnimTimeoutRef.current = null;
                    }
                    setUnitClearAnim(null);
                    setInMenu(true);
                  }}
                  aria-label="Back to menu"
                  className={`p-2 -ml-2 text-slate-700 ${boardTheme.headerButtonHover} rounded-lg transition-colors duration-150`}
                >
                  <ChevronLeft size={30} />
                </button>
                <div className="flex flex-col items-center">
                  <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-[0.14em] text-slate-900 leading-none">
                    {gameState.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsPaused(true);
                    setShowSettings(true);
                  }}
                  aria-label="Settings"
                  className={`p-2 -mr-2 text-slate-700 ${boardTheme.headerButtonHover} rounded-lg transition-colors duration-150`}
                >
                  <Settings size={26} />
                </button>
              </div>

              {/* Stats Bar & Rank Display */}
              <div className="w-full flex gap-3 px-1 mb-4 items-center">
                {/* Difficulty-Matched Rank Crest Card (Click to view ranks by difficulty) */}
                <button
                  type="button"
                  onClick={() => setShowRankGuide(true)}
                  aria-label={`Current rank ${currentRank.name}. Click to view ranks available per difficulty.`}
                  title="Click to view available ranks per difficulty"
                  className={`flex flex-col items-center justify-center min-w-[104px] border rounded-xl px-2.5 py-2 ${boardTheme.cardSurface} hover:scale-105 active:scale-100 transition-transform duration-200 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500`}
                >
                  <span
                    className={`font-display text-xs sm:text-sm font-black uppercase text-center leading-none ${currentRank.lightColor} tracking-wider mb-1.5 relative z-10`}
                  >
                    {currentRank.name}
                  </span>
                  <div
                    className={`${currentRank.orientation === 'vertical' ? 'w-10 h-14' : 'w-16 h-9'} rounded-md overflow-hidden shadow-[0_4px_14px_rgba(15,23,42,0.14)] ${currentRank.shadow} border ${boardTheme.rankImgBorder} transition-all duration-300 bg-slate-100 flex items-center justify-center`}
                  >
                    {!rankImgFailed ? (
                      <img
                        src={currentRank.img}
                        alt={currentRank.name}
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => setRankImgFailed(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Trophy size={20} className={currentRank.lightColor} />
                    )}
                  </div>
                  {rankProgressInfo && (
                    <div className="w-20 mt-1.5 flex flex-col items-center">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            rankProgressInfo.isMaxRank
                              ? boardTheme.rankBarGrad
                              : rankProgressInfo.isAwaitingCompletion
                                ? rankProgressInfo.isMaxRankLockedOut
                                  ? 'bg-rose-600'
                                  : boardTheme.rankAwaitColor
                                : boardTheme.rankBarGrad
                          }`}
                          style={{ width: `${rankProgressInfo.progressPercent}%` }}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold tabular-nums mt-1 leading-none ${
                          rankProgressInfo.isAwaitingCompletion &&
                          rankProgressInfo.isMaxRankLockedOut
                            ? 'text-rose-600'
                            : 'text-slate-600'
                        }`}
                      >
                        {rankProgressInfo.isMaxRank
                          ? 'MAX RANK'
                          : rankProgressInfo.isAwaitingCompletion
                            ? rankProgressInfo.isMaxRankLockedOut
                              ? 'ERR LIMIT'
                              : `${filledEmptyCount}/${gameState.totalEmptyCells}`
                            : `${gameState.score}/${rankProgressInfo.nextThreshold}`}
                      </span>
                    </div>
                  )}
                </button>

                {/* Main Stats Grid */}
                <div
                  className={`flex-1 grid grid-cols-4 gap-0 text-sm font-medium p-2.5 rounded-xl border ${boardTheme.cardSurface}`}
                >
                  <div className="flex flex-col items-center justify-center border-r border-slate-200/80">
                    <div className={`flex items-center gap-1 ${boardTheme.scoreIconText} mb-0.5`}>
                      <Zap size={14} fill="currentColor" />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                        Score
                      </span>
                    </div>
                    <span className="text-base sm:text-xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {gameState.score}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center border-r border-slate-200/80">
                    <div className="flex items-center gap-1 text-emerald-600 mb-0.5">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                        Hits
                      </span>
                    </div>
                    <span className="text-base sm:text-xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {gameState.hits}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-r border-slate-200/80">
                    <div className="flex items-center gap-1 text-rose-600 mb-0.5">
                      <XCircle size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                        Err
                      </span>
                    </div>
                    <span className="text-base sm:text-xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {gameState.mistakes}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className={`flex items-center gap-1 ${boardTheme.totalIconText} mb-0.5`}>
                      <Calculator size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                        Total
                      </span>
                    </div>
                    <span className="text-base sm:text-xl font-mono font-extrabold text-slate-900 tabular-nums">
                      {gameState.hits + gameState.mistakes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Game Board (Memoized) */}
              <div
                className={`p-1 select-none w-full flex justify-center transition-opacity duration-200 ${isPaused || isBreakPending || showNewGameConfirm ? 'opacity-0' : 'opacity-100'}`}
              >
                <SudokuBoard
                  board={gameState.board}
                  solution={gameState.solution}
                  selectedCell={selectedCell}
                  unitClearAnim={unitClearAnim}
                  difficulty={gameState.difficulty}
                  onSelectCell={handleSelectCell}
                />
              </div>

              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div
                    className={`font-display text-4xl font-black uppercase tracking-[0.25em] ${boardTheme.pausedText}`}
                  >
                    PAUSED
                  </div>
                </div>
              )}

              {gameState.isComplete && !showVictoryModal && !showRewardScreen && (
                <div className="w-full mt-3 px-1">
                  <div
                    className={`w-full bg-white/95 border ${boardTheme.solvedBannerBorder} rounded-xl p-3 flex items-center justify-between gap-3 shadow-md`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg ${boardTheme.solvedTrophyBg} flex items-center justify-center shrink-0`}
                      >
                        <Trophy size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-slate-900 truncate">
                          Puzzle Solved!
                        </p>
                        <p className="text-xs text-slate-600 font-mono tabular-nums">
                          {gameState.score.toLocaleString()} XP · {formatTime(completionTime)} ({completionTime.toLocaleString()}s)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setShowVictoryModal(true)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                      >
                        View Summary
                      </button>
                      <button
                        onClick={() => startNewSession(gameState.difficulty, false)}
                        className={`px-3 py-2 ${boardTheme.playAgainBtn} text-xs font-extrabold rounded-lg transition-colors whitespace-nowrap`}
                      >
                        Play Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className={`w-full ${isPaused || isBreakPending ? 'invisible' : ''}`}>
                <Tools
                  onUndo={handleUndo}
                  onErase={handleErase}
                  onToggleNotes={handleToggleNotes}
                  onHint={handleHint}
                  isNotesMode={isNotesMode}
                  hintsRemaining={gameState.hintsRemaining}
                  difficulty={gameState.difficulty}
                />
              </div>

              <div className={`w-full ${isPaused || isBreakPending ? 'invisible' : ''}`}>
                <NumberPad
                  onNumberClick={handleInput}
                  counts={completedCounts}
                  difficulty={gameState.difficulty}
                />
              </div>

              {/* Footer */}
              <div className="w-full mt-5 mb-2 grid grid-cols-3 gap-3 px-1 items-center">
                {/* Left: New Game */}
                <button
                  onClick={() => requestNewGame(gameState.difficulty)}
                  className={`col-span-1 ${boardTheme.newGameBtn} py-2 rounded-lg font-bold text-xs transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap`}
                >
                  <RotateCcw size={14} />
                  New Game
                </button>

                {/* Center: Isolated Timer + Pause */}
                <GameTimer
                  sessionId={sessionId}
                  isRunning={isTimerRunning}
                  isPaused={isPaused}
                  onTogglePause={handleTogglePause}
                  elapsedRef={elapsedSecondsRef}
                  difficulty={gameState.difficulty}
                />

                {/* Right: Operations Counter & Quick Copy URLs */}
                <div
                  className={`col-span-1 flex flex-row items-center justify-center gap-1 sm:gap-1.5 bg-white/95 border ${boardTheme.cardBorder} py-2 px-1.5 rounded-lg shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] relative`}
                >
                  <div className="flex items-center gap-0.5 sm:gap-1 font-mono tabular-nums">
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider sm:tracking-widest mr-0.5">
                      OPS
                    </span>
                    <span className={`text-xs sm:text-sm font-extrabold ${boardTheme.opsCountText}`}>
                      {gameState.operationsCount}
                    </span>
                    <span className="text-slate-300 font-light text-xs">/</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {settings.operationsTarget}
                    </span>
                  </div>

                  {/* Quick Copy Buttons: Last GIF & Last Audio */}
                  <div className="flex items-center gap-1 ml-0.5">
                    <button
                      onClick={copyLastGifLink}
                      className={`p-1 ${boardTheme.linkBtn} rounded-md transition-colors duration-150`}
                      title="Copy Last GIF URL"
                      aria-label="Copy Last GIF URL"
                    >
                      <ImageIcon size={12} />
                    </button>
                    <button
                      onClick={copyLastSoundLink}
                      className={`p-1 ${boardTheme.linkBtn} rounded-md transition-colors duration-150`}
                      title="Copy Last Audio URL"
                      aria-label="Copy Last Audio URL"
                    >
                      <Music size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Log - Conditionally Rendered */}
              {settings.showActivityLog && (
                <div
                  className={`w-full mt-4 bg-white/95 rounded-xl border ${boardTheme.cardBorder} overflow-hidden flex flex-col max-h-48 min-h-24 shadow-sm`}
                >
                  <div
                    className={`${boardTheme.logHeaderBg} px-3 py-1.5 flex items-center gap-2 border-b`}
                  >
                    <History size={12} className={boardTheme.logIconText} />
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                      Activity Log
                    </span>
                  </div>
                  <div
                    ref={logContainerRef}
                    className="flex-1 overflow-y-auto p-2 space-y-1 scroll-smooth"
                  >
                    {gameState.activityLog.map((log) => (
                      <div
                        key={log.id}
                        className="text-[10px] font-mono flex gap-2 items-start border-b border-slate-100 pb-1 last:border-0 last:pb-0"
                      >
                        <span className="text-slate-400 shrink-0">{log.timestamp}</span>
                        <span
                          className={`
                            break-words leading-tight
                            ${log.type === 'error' ? 'text-rose-600 font-bold' : ''}
                            ${log.type === 'success' ? 'text-emerald-600' : ''}
                            ${log.type === 'rank-up' ? boardTheme.logRankUpText : ''}
                            ${log.type === 'warning' ? 'text-amber-600' : ''}
                            ${log.type === 'info' ? 'text-slate-700' : ''}
                          `}
                        >
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          {/* TOAST FEEDBACK */}
          {toastMessage && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[130] pointer-events-none">
              <div
                className={`px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold text-white flex items-center gap-2 ${
                  toastMessage.type === 'error' ? 'bg-rose-600' : 'bg-slate-800'
                }`}
              >
                {toastMessage.type === 'error' ? (
                  <AlertTriangle size={14} />
                ) : (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                )}
                <span>{toastMessage.text}</span>
              </div>
            </div>
          )}

          {/* COPY LINK FEEDBACK POPUP */}
          {showCopyFeedback && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none">
              <div className="bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex flex-col items-center text-center border border-slate-700 w-max max-w-sm pointer-events-auto">
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-2 mb-2">
                  <CheckCircle2 size={20} />{' '}
                  {showCopyFeedback.type === 'gif' ? 'GIF Link Copied!' : 'Audio Link Copied!'}
                </span>
                <span className="text-xs text-slate-400 leading-tight">
                  Go to <span className="font-bold text-slate-300">Settings &gt; Manage Rewards</span>{' '}
                  and paste the URL to jump right to it to disable or delete it.
                </span>
              </div>
            </div>
          )}

          {/* Settings Modal */}
          {showSettings && !showRewardConfig && !viewingList && (
            <div className="absolute inset-0 z-50 bg-slate-100 flex flex-col p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
                <button
                  onClick={() => {
                    setShowSettings(false);
                    setIsPaused(false);
                  }}
                  className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50"
                >
                  <XCircle size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-8 flex-1 overflow-y-auto">
                {/* Rewards Content Button */}
                <button
                  onClick={() => setShowRewardConfig(true)}
                  className="w-full bg-white border-2 border-purple-200 text-purple-700 py-3 rounded-xl font-bold shadow-sm hover:bg-purple-50 transition-colors flex justify-between items-center px-4"
                >
                  <span className="flex items-center gap-2">
                    <ListChecks size={20} /> Manage Reward Content
                  </span>
                  <ChevronLeft className="rotate-180" size={20} />
                </button>

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        enableVisualRewards: !prev.enableVisualRewards,
                      }))
                    }
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${settings.enableVisualRewards ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Visual Rewards
                    </span>
                    {settings.enableVisualRewards ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        enableRewardSounds: !prev.enableRewardSounds,
                      }))
                    }
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${settings.enableRewardSounds ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Reward Sounds
                    </span>
                    {settings.enableRewardSounds ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, showActivityLog: !prev.showActivityLog }))
                    }
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${settings.showActivityLog ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Activity Log
                    </span>
                    {settings.showActivityLog ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        showRewardTimerBar: !prev.showRewardTimerBar,
                      }))
                    }
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${settings.showRewardTimerBar ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Reward Timer Bar
                    </span>
                    {settings.showRewardTimerBar ? (
                      <ToggleRight size={32} />
                    ) : (
                      <ToggleLeft size={32} />
                    )}
                  </button>
                </div>

                {/* Operations Target */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700">Operations Target</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                      {settings.operationsTarget}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={settings.operationsTarget}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        operationsTarget: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-slate-400 mt-2">Actions before mandatory break</p>
                </div>

                {/* Break Duration */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700">Break Duration</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                      {settings.breakDuration}s
                    </span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="10"
                    value={settings.breakDuration}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        breakDuration: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Reward Duration */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <label className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700">Reward Duration</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      {settings.rewardDuration}ms
                    </span>
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    step="100"
                    value={settings.rewardDuration}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        rewardDuration: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full accent-purple-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Volume */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <Volume2 size={18} /> Audio
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Main Reward</span>
                      <span>{settings.volumeRewardMain}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volumeRewardMain}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          volumeRewardMain: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>SFX</span>
                      <span>{settings.volumeRewardList}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volumeRewardList}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          volumeRewardList: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Error SFX</span>
                      <span>{settings.volumeError}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volumeError}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          volumeError: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full accent-rose-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSettings(false);
                  setIsPaused(false);
                }}
                className="mt-4 w-full py-4 bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl hover:bg-slate-700"
              >
                <Save size={20} /> Save Changes
              </button>
            </div>
          )}

          {/* Reward Config Modal */}
          {showRewardConfig && !viewingList && (
            <div className="absolute inset-0 z-[80] bg-slate-50 flex flex-col p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <ListChecks /> Manage Rewards
                </h2>
                <button
                  onClick={() => setShowRewardConfig(false)}
                  className="p-2 bg-slate-200 rounded-full hover:bg-slate-300"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {/* Direct URL Lookup / Paste & Jump */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-200">
                  <h3 className="font-bold text-base text-slate-800 flex items-center gap-2 mb-1">
                    <LinkIcon size={18} className="text-indigo-600" /> Find GIF or Audio by URL
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Paste a URL copied from the game screen to jump straight to it in the list and
                    disable or delete it.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={findUrlInput}
                        onChange={(e) => setFindUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleJumpToUrl();
                          }
                        }}
                        placeholder="Paste GIF or Audio URL here..."
                        className="w-full border border-slate-300 rounded-lg pl-3 pr-8 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {findUrlInput && (
                        <button
                          onClick={() => setFindUrlInput('')}
                          aria-label="Clear URL"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={handlePasteAndJump}
                        className="px-3 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg font-bold text-xs hover:bg-indigo-100 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                        title="Paste from clipboard and jump to item"
                      >
                        <ClipboardPaste size={15} /> Paste &amp; Go
                      </button>
                      <button
                        onClick={() => handleJumpToUrl()}
                        className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Search size={15} /> Go
                      </button>
                    </div>
                  </div>
                </div>

                {/* GIF Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-purple-700 flex items-center gap-2">
                        <ImageIcon size={20} /> GIFs ({activeGifList.length}/{gifList.length})
                      </h3>
                      {disabledGifs.size > 0 && (
                        <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                          {disabledGifs.size} disabled
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setListSearchQuery('');
                        setHighlightedUrl(null);
                        setViewingList('gifs');
                      }}
                      className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-200 transition-colors flex items-center gap-1"
                    >
                      <Eye size={12} /> View &amp; Edit List
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      Add Single URL
                    </label>
                    <div className="flex gap-2 mt-1">
                      <input
                        ref={newGifInputRef}
                        type="text"
                        placeholder="https://..."
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        onClick={handleAddGif}
                        className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase">Bulk Add</label>
                    <div className="mt-1">
                      <textarea
                        ref={bulkGifInputRef}
                        rows={3}
                        placeholder='"http://...", "http://..."'
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
                      />
                      <button
                        onClick={handleBulkAddGifs}
                        className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg font-bold text-xs hover:bg-blue-600 flex items-center justify-center gap-2"
                      >
                        <Download size={14} /> Import Bulk
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sound Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-amber-600 flex items-center gap-2">
                        <Music size={20} /> Sounds ({activeSoundList.length}/{soundList.length})
                      </h3>
                      {disabledSounds.size > 0 && (
                        <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                          {disabledSounds.size} disabled
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setListSearchQuery('');
                        setHighlightedUrl(null);
                        setViewingList('sounds');
                      }}
                      className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-200 transition-colors flex items-center gap-1"
                    >
                      <Eye size={12} /> View &amp; Edit List
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      Add Single URL
                    </label>
                    <div className="flex gap-2 mt-1">
                      <input
                        ref={newSoundInputRef}
                        type="text"
                        placeholder="https://...mp3"
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        onClick={handleAddSound}
                        className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewingList && (() => {
            const fullList = viewingList === 'gifs' ? gifList : soundList;
            const disabledSet = viewingList === 'gifs' ? disabledGifs : disabledSounds;
            const normalizedSearch = listSearchQuery
              .trim()
              .replace(/^["']+|["']+$/g, '')
              .toLowerCase();
            const filteredEntries = fullList
              .map((url, idx) => ({ url, idx }))
              .filter(
                ({ url }) => !normalizedSearch || url.toLowerCase().includes(normalizedSearch)
              );
            const activeCount = fullList.length - disabledSet.size;

            return (
              <div className="absolute inset-0 z-[90] bg-slate-100 flex flex-col p-4">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-300">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      {viewingList === 'gifs' ? (
                        <ImageIcon className="text-purple-600" />
                      ) : (
                        <Music className="text-amber-600" />
                      )}
                      {viewingList === 'gifs' ? 'All GIFs' : 'All Sounds'}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {activeCount} active · {disabledSet.size} disabled · {fullList.length} total
                    </p>
                  </div>
                  <button
                    onClick={closeListView}
                    className="p-2 bg-slate-200 rounded-full hover:bg-slate-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>

                {/* Search / Paste URL inside list */}
                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="text"
                      value={listSearchQuery}
                      onChange={(e) => {
                        setListSearchQuery(e.target.value);
                        setHighlightedUrl(null);
                      }}
                      placeholder="Filter or paste URL to locate..."
                      className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-8 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {listSearchQuery && (
                      <button
                        onClick={() => {
                          setListSearchQuery('');
                          setHighlightedUrl(null);
                        }}
                        aria-label="Clear filter"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handlePasteIntoListSearch}
                    className="px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-bold text-xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                    title="Paste copied URL from clipboard"
                  >
                    <ClipboardPaste size={14} /> Paste URL
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {filteredEntries.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-500">
                      No matching {viewingList === 'gifs' ? 'GIFs' : 'sounds'} found.
                    </div>
                  ) : (
                    filteredEntries.map(({ url, idx }) => {
                      const isDisabled = disabledSet.has(url);
                      const isHighlighted = highlightedUrl === url;

                      return (
                        <div
                          key={`${url}-${idx}`}
                          ref={isHighlighted ? highlightedItemRef : undefined}
                          className={`p-2.5 rounded-xl border shadow-sm flex items-center gap-3 transition-all ${
                            isHighlighted
                              ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-400/60'
                              : isDisabled
                                ? 'bg-slate-100/90 border-slate-200 opacity-75'
                                : 'bg-white border-slate-200'
                          }`}
                        >
                          {viewingList === 'gifs' ? (
                            <button
                              onClick={() => setPreviewGifUrl(url)}
                              className="w-16 h-12 bg-slate-200 rounded overflow-hidden flex-shrink-0 relative group cursor-zoom-in"
                            >
                              <img
                                src={url}
                                alt="preview"
                                loading="lazy"
                                decoding="async"
                                className={`w-full h-full object-cover ${isDisabled ? 'grayscale opacity-60' : ''}`}
                              />
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePreviewSound(url)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                isDisabled
                                  ? 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                                  : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                              }`}
                            >
                              <Play size={16} fill="currentColor" />
                            </button>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                #{idx + 1}
                              </span>
                              {isHighlighted && (
                                <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-600 text-white">
                                  Matched
                                </span>
                              )}
                              {isDisabled && (
                                <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                                  Disabled
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-[10px] truncate font-mono ${
                                isDisabled ? 'text-slate-400 line-through' : 'text-slate-600'
                              }`}
                            >
                              {url}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() =>
                                handleToggleDisable(url, viewingList === 'gifs' ? 'gif' : 'sound')
                              }
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                                isDisabled
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                              }`}
                              title={isDisabled ? 'Enable item' : 'Disable item without deleting'}
                            >
                              {isDisabled ? <Power size={13} /> : <EyeOff size={13} />}
                              <span className="hidden sm:inline">
                                {isDisabled ? 'Enable' : 'Disable'}
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleRemoveSpecific(url, viewingList === 'gifs' ? 'gif' : 'sound')
                              }
                              className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete permanently"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })()}

          {previewGifUrl && (
            <div
              onClick={() => setPreviewGifUrl(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            >
              <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
                <img
                  src={previewGifUrl}
                  alt="Full Preview"
                  className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => setPreviewGifUrl(null)}
                  className="absolute -top-12 right-0 text-white hover:text-rose-400 transition-colors"
                >
                  <X size={32} />
                </button>
              </div>
            </div>
          )}

          {/* Reward Screen */}
          {showRewardScreen && currentRewardData && (
            <RewardOverlay
              gifUrl={currentGif}
              quote={currentRewardData.quote}
              xp={currentRewardData.xp}
              totalXp={gameState.score}
              rankIndex={currentRewardData.rankIndex}
              rewardDurationMs={settings.rewardDuration}
              showTimerBar={settings.showRewardTimerBar}
              onClose={handleCloseReward}
            />
          )}

          {/* Break Screen */}
          {isOnBreak && (
            <BreakOverlay
              breakTimeLeft={breakTimeLeft}
              totalBreakDuration={settings.breakDuration}
              quote={currentBreakQuote}
              onSkipBreak={handleSkipBreak}
            />
          )}
        </div>
      )}

      {/* NEW GAME CONFIRMATION MODAL */}
      {showNewGameConfirm && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center border-2 border-slate-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Start New Game?</h3>
            <p className="text-sm text-slate-500 mb-6 px-4">
              You have active progress. Do you want to keep your XP, Rank, and Stats for the new
              session?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => startNewSession(pendingDifficulty || Difficulty.MEDIUM, true)}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Zap size={18} fill="currentColor" /> Keep Progress
              </button>

              <button
                onClick={() => startNewSession(pendingDifficulty || Difficulty.MEDIUM, false)}
                className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
              >
                Start Fresh (Reset All)
              </button>

              <button
                onClick={() => {
                  setShowNewGameConfirm(false);
                  setPendingDifficulty(null);
                  setIsPaused(false);
                }}
                className="mt-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RANK GUIDE MODAL */}
      {showRankGuide && gameState && (
        <RankGuideModal
          currentDifficulty={gameState.difficulty}
          currentRankIndex={gameState.rankIndex}
          currentScore={gameState.score}
          onClose={() => setShowRankGuide(false)}
          onSelectDifficulty={(diff) => requestNewGame(diff)}
        />
      )}

      {/* VICTORY MODAL */}
      {showVictoryModal && gameState && (
        <VictoryModal
          difficulty={gameState.difficulty}
          score={gameState.score}
          hits={gameState.hits}
          mistakes={gameState.mistakes}
          rankIndex={gameState.rankIndex}
          completionTime={completionTime}
          enableSound={settings.enableRewardSounds}
          volumePercent={settings.volumeRewardMain}
          onPlayAgain={() => startNewSession(gameState.difficulty, false)}
          onMainMenu={() => {
            setShowVictoryModal(false);
            setInMenu(true);
          }}
          onClose={() => setShowVictoryModal(false)}
        />
      )}
    </>
  );
};

export default App;