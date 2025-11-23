
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    total: number;
    completed: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed }) => {
    const percentage = Math.round((completed / total) * 100);

    return (
        <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700 rounded-2xl p-4 shadow-sm flex items-center space-x-4 transition-colors duration-300">
            {/* Text Info */}
            <div className="flex flex-col shrink-0">
                 <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">İlerleme</span>
                 <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-heading font-extrabold text-slate-800 dark:text-slate-100 leading-none">{percentage}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">({completed}/{total})</span>
                 </div>
            </div>
            
            {/* Bar */}
            <div className="relative flex-1 h-2.5 bg-slate-200/70 dark:bg-slate-700/70 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                />
            </div>
        </div>
    );
};
