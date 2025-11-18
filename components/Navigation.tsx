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
        <div className="bg-white/80 backdrop-blur-2xl border border-white/50 rounded-full shadow-2xl shadow-slate-300/40 p-2 pl-6 pr-2 flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col mr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tarih Aralığı</span>
                <span className="text-sm font-bold text-slate-800 font-heading">{currentDateRange}</span>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={onPrev}
                    disabled={!canPrev}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                
                <button 
                    onClick={onCurrent}
                    className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-900/20"
                >
                    Bugün
                </button>

                <button
                    onClick={onNext}
                    disabled={!canNext}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowRight size={20} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};