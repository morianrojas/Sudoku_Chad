import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Difficulty } from '../types';
import { DIFFICULTY_THEMES } from '../data/difficultyThemes';

interface GameTimerProps {
  sessionId: number;
  isRunning: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  elapsedRef?: React.MutableRefObject<number>;
  difficulty?: Difficulty;
}

export const formatTime = (seconds: number): string => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const GameTimer: React.FC<GameTimerProps> = React.memo(({ sessionId, isRunning, isPaused, onTogglePause, elapsedRef, difficulty = Difficulty.EASY }) => {
  const theme = DIFFICULTY_THEMES[difficulty];
  const [timeElapsed, setTimeElapsed] = useState<number>(() => elapsedRef?.current ?? 0);
  const lastSessionIdRef = useRef<number>(sessionId);
  const accumulatedMsRef = useRef<number>((elapsedRef?.current ?? 0) * 1000);
  const segmentStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (lastSessionIdRef.current !== sessionId) {
      lastSessionIdRef.current = sessionId;
      accumulatedMsRef.current = 0;
      segmentStartRef.current = isRunning ? performance.now() : null;
      setTimeElapsed(0);
      if (elapsedRef) {
        elapsedRef.current = 0;
      }
    }
  }, [sessionId, elapsedRef, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      segmentStartRef.current = null;
      return;
    }

    segmentStartRef.current = performance.now();

    const syncElapsed = () => {
      const now = performance.now();
      if (segmentStartRef.current !== null) {
        accumulatedMsRef.current += Math.max(0, now - segmentStartRef.current);
      }
      segmentStartRef.current = now;
      const wholeSeconds = Math.floor(accumulatedMsRef.current / 1000);
      if (elapsedRef) {
        elapsedRef.current = wholeSeconds;
      }
      setTimeElapsed((prev) => (prev === wholeSeconds ? prev : wholeSeconds));
    };

    const timer = window.setInterval(syncElapsed, 200);
    return () => {
      window.clearInterval(timer);
      if (segmentStartRef.current !== null) {
        accumulatedMsRef.current += Math.max(0, performance.now() - segmentStartRef.current);
        segmentStartRef.current = null;
      }
      const wholeSeconds = Math.floor(accumulatedMsRef.current / 1000);
      if (elapsedRef) {
        elapsedRef.current = wholeSeconds;
      }
      setTimeElapsed((prev) => (prev === wholeSeconds ? prev : wholeSeconds));
    };
  }, [isRunning, elapsedRef]);

  return (
    <div className={`col-span-1 flex items-center justify-center gap-2 bg-white/95 border ${theme.timerBoxBorder} py-2 rounded-lg shadow-[0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]`}>
      <span className="text-sm font-mono font-extrabold text-slate-900 tabular-nums">{formatTime(timeElapsed)}</span>
      <button
        onClick={onTogglePause}
        className={`text-slate-500 ${theme.timerBtnHover} transition-colors duration-150`}
        aria-label={isPaused ? 'Resume game' : 'Pause game'}
      >
        {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
      </button>
    </div>
  );
});

GameTimer.displayName = 'GameTimer';

export default GameTimer;
