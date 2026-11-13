import React, { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

interface GameTimerProps {
  sessionId: number;
  isRunning: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  elapsedRef?: React.MutableRefObject<number>;
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const GameTimer: React.FC<GameTimerProps> = React.memo(({ sessionId, isRunning, isPaused, onTogglePause, elapsedRef }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setTimeElapsed(0);
    if (elapsedRef) {
      elapsedRef.current = 0;
    }
  }, [sessionId, elapsedRef]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => {
      setTimeElapsed((prev) => {
        const next = prev + 1;
        if (elapsedRef) {
          elapsedRef.current = next;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, elapsedRef]);

  return (
    <div className="col-span-1 flex items-center justify-center gap-2 bg-white border border-slate-200 py-2 rounded-xl shadow-sm">
      <span className="text-sm font-mono font-bold text-slate-700 tabular-nums">{formatTime(timeElapsed)}</span>
      <button
        onClick={onTogglePause}
        className="text-slate-500 hover:text-blue-600 transition-colors"
        aria-label={isPaused ? 'Resume game' : 'Pause game'}
      >
        {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
      </button>
    </div>
  );
});

GameTimer.displayName = 'GameTimer';

export default GameTimer;
