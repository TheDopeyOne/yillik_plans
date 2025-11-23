
import React from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

interface NavigationProps {
    onPrev: () => void;
    onNext: () => void;
    onCurrent: () => void;
    canPrev: boolean;
    canNext: boolean;
    currentDateRange: string;
}

export const Navigation: React.FC<NavigationProps> = ({
    onPrev, onNext, onCurrent, canPrev, canNext, currentDateRange
}) => {
    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-slate-700 rounded-full shadow-2xl shadow-slate-300/40 dark:shadow-none p-2 pl-6 pr-2 flex items-center justify-between max-w-md mx-auto transition-all duration-300">
            <div className="flex flex-col mr-4">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tarih Aralığı</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-heading">{currentDateRange}</span>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={onPrev}
                    disabled={!canPrev}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                
                <button 
                    onClick={onCurrent}
                    className="px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-none"
                >
                    Bugün
                </button>

                <button
                    onClick={onNext}
                    disabled={!canNext}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowRight size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};
