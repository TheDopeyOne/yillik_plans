
import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Star, AlertCircle, CalendarDays, Eye } from 'lucide-react';
import { LessonPlan } from '../types';
import { findCurrentWeekIndex } from '../services/planData';

interface WeekGridProps {
    plan: LessonPlan[];
    completionData: boolean[];
    currentWeekIndex: number;
    onSelect: (index: number) => void;
    onClose: () => void;
}

const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(4px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2 } }
};

const modalVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.95, 
        y: 20,
    },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            mass: 0.8,
            staggerChildren: 0.02,
            delayChildren: 0.1
        } 
    },
    exit: { 
        opacity: 0, 
        scale: 0.95, 
        y: 20,
        transition: { duration: 0.2 } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

export const WeekGrid: React.FC<WeekGridProps> = ({ plan, completionData, currentWeekIndex, onSelect, onClose }) => {
    const realCurrentIndex = useMemo(() => findCurrentWeekIndex(plan), [plan]);
    const scrollRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Animasyonun bitmesini bekleyip scroll yapmak daha yumuşak bir geçiş sağlar
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60"
            onClick={onClose} // Dışarı tıklayınca kapat
        >
            <motion.div 
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()} // İçeri tıklayınca kapanmayı engelle
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl w-full max-w-5xl max-h-[85vh] rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700 flex flex-col overflow-hidden transition-colors duration-300"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50 shrink-0">
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-slate-800 dark:text-white">Yıllık Plan</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                           <CalendarDays size={14} /> 
                           Tüm Haftalar
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Grid Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar scroll-smooth">
                    <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                    >
                        {plan.map((week, index) => {
                            // SAFETY CHECK: Eğer veri bozuksa render etme
                            if (!week) return null;

                            const isCompleted = completionData[index];
                            const isTimeCurrent = realCurrentIndex === index;
                            const isSelected = currentWeekIndex === index;
                            
                            // Safe access to properties
                            const topic = week.topic || "";
                            const outcome = week.outcome || "";
                            
                            const isExam = topic.toLowerCase().includes('sınav') || outcome.toLowerCase().includes('sınav');
                            const isActivity = /(tatil|etkinlik)/i.test(topic);

                            let bgClass = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500";
                            let icon = <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Hafta {index + 1}</span>;
                            let ringClass = "";

                            if (isTimeCurrent) {
                                bgClass = "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 shadow-md shadow-indigo-100/50 dark:shadow-none z-10";
                                icon = <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-bold text-xs"><Star size={12} className="fill-indigo-500 dark:fill-indigo-400" /> Bu Hafta</div>;
                            } else if (isCompleted) {
                                bgClass = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-90 hover:opacity-100";
                                icon = <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs"><Check size={12} /> Tamamlandı</div>;
                            } else if (isExam) {
                                bgClass = "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300";
                                icon = <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold text-xs"><AlertCircle size={12} /> Sınav</div>;
                            } else if (isActivity) {
                                bgClass = "bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300";
                            }

                            if (isSelected) {
                                ringClass = "ring-2 ring-offset-2 ring-slate-400/50 dark:ring-offset-slate-900";
                            }

                            return (
                                <motion.button
                                    key={index}
                                    ref={isSelected ? scrollRef : null}
                                    variants={itemVariants}
                                    onClick={() => {
                                        onSelect(index);
                                        onClose();
                                    }}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        relative group p-3.5 rounded-xl border flex flex-col items-start justify-between min-h-[100px] transition-colors text-left
                                        ${bgClass} ${ringClass}
                                    `}
                                >
                                    <div className="flex w-full justify-between items-center mb-2 border-b border-black/5 dark:border-white/10 pb-1">
                                        {icon}
                                        {isSelected && !isTimeCurrent && (
                                            <div className="bg-slate-200 dark:bg-slate-600 rounded-full p-0.5" title="Şu an buradasınız">
                                                <Eye size={10} className="text-slate-600 dark:text-slate-200" />
                                            </div>
                                        )}
                                        <span className="text-[9px] font-bold bg-white/50 dark:bg-black/30 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 ml-auto">
                                            {week.displayMonth || "-"}
                                        </span>
                                    </div>
                                    
                                    <div className="w-full flex flex-col gap-1">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wide opacity-70 bg-black/5 dark:bg-white/5 p-1 rounded w-fit">
                                            {week.range || "?"}
                                        </div>
                                        
                                        <div className="text-xs font-bold line-clamp-2 leading-snug mt-1">
                                            {topic.replace(/\(.*\)/, '')}
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>
                
                {/* Footer Legend */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200/50 dark:border-slate-700 flex flex-wrap gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider justify-center shrink-0 transition-colors">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Bu Hafta (Tarih)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border-2 border-slate-400 dark:border-slate-500"></div> Şu An Açık</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Tamamlandı</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Sınav</div>
                </div>
            </motion.div>
        </motion.div>
    );
};
