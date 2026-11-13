import React from 'react';
import { Undo2, Eraser, PenLine, Lightbulb } from 'lucide-react';

interface ToolsProps {
  onUndo: () => void;
  onErase: () => void;
  onToggleNotes: () => void;
  onHint: () => void;
  isNotesMode: boolean;
  hintsRemaining: number;
}

const Tools: React.FC<ToolsProps> = React.memo(({ onUndo, onErase, onToggleNotes, onHint, isNotesMode, hintsRemaining }) => {
  return (
    <div className="grid grid-cols-4 w-full gap-4 px-1 mt-6">
      <button 
        onClick={onUndo}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors group"
      >
        <div className="w-full py-2 rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50 flex justify-center items-center transition-all">
          <Undo2 size={20} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">Undo</span>
      </button>

      <button 
        onClick={onErase}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors group"
      >
         <div className="w-full py-2 rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50 flex justify-center items-center transition-all">
          <Eraser size={20} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">Erase</span>
      </button>

      <button 
        onClick={onToggleNotes}
        className={`flex flex-col items-center gap-1 transition-colors group ${isNotesMode ? 'text-blue-600' : 'text-slate-500'}`}
      >
         <div className={`w-full py-2 rounded-xl border shadow-sm flex justify-center items-center transition-all ${isNotesMode ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-200' : 'border-slate-200 bg-white group-hover:border-blue-200 group-hover:bg-blue-50'}`}>
          <PenLine size={20} strokeWidth={2} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">{isNotesMode ? 'Notes On' : 'Notes'}</span>
      </button>

       <button 
        onClick={onHint}
        disabled={hintsRemaining <= 0}
        className={`flex flex-col items-center gap-1 transition-colors group ${hintsRemaining > 0 ? 'text-slate-500 hover:text-amber-500 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
      >
         <div className={`w-full py-2 rounded-xl border shadow-sm flex justify-center items-center relative transition-all ${hintsRemaining > 0 ? 'border-slate-200 bg-white group-hover:border-amber-200 group-hover:bg-amber-50' : 'border-slate-100 bg-slate-50'}`}>
          <Lightbulb size={20} strokeWidth={2} className={hintsRemaining > 0 ? 'group-hover:fill-amber-400' : ''}/>
          {hintsRemaining > 0 && (
             <div className="absolute top-2 right-1/3 translate-x-4 -translate-y-2 bg-amber-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {hintsRemaining}
             </div>
          )}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">Hint</span>
      </button>

    </div>
  );
});

Tools.displayName = 'Tools';

export default Tools;