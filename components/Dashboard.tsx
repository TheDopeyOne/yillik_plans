
import React, { useMemo, useEffect, useState } from 'react';
import { PLAN_DATA, getPassedWeekCount, findCurrentWeekIndex } from '../services/planData';
import { CompletionData } from '../types';
import { PieChart, TrendingUp, TrendingDown, Minus, Hourglass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
    completionData: CompletionData;
}

const CountUp = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const target = isNaN(value) ? 0 : value;
        setCount(target); 
    }, [value]);

    return <span className="tabular-nums tracking-tighter">{count}</span>;
};

export const Dashboard: React.FC<DashboardProps> = ({ completionData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Ekran genişliğini kontrol et (Masaüstünde her zaman açık kalsın)
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const stats = useMemo(() => {
        let totalWeeks = 0;
        let totalCompleted = 0;
        let totalAhead = 0;
        let totalBehind = 0;

        if (!PLAN_DATA) return { globalPercentage: 0, totalAhead: 0, totalBehind: 0, remaining: 0 };

        // 1. İstatistiksel Hesaplama
        Object.keys(PLAN_DATA).forEach(gradeId => {
            const plan = PLAN_DATA[gradeId];
            if (!plan) return;

            const completedWeeks = completionData[gradeId]?.filter(Boolean).length || 0;
            const passedWeeksCount = getPassedWeekCount(plan); 
            const diff = completedWeeks - passedWeeksCount;

            totalWeeks += plan.length;
            totalCompleted += completedWeeks;
            
            if (completedWeeks > 0) {
                 if (diff > 1) totalAhead++;
                 else if (diff < 0) totalBehind++; 
            }
        });

        const globalPercentage = totalWeeks > 0 ? Math.round((totalCompleted / totalWeeks) * 100) : 0;

        // 2. Takvimsel Hesaplama
        const referencePlan = PLAN_DATA['9'];
        let remaining = 0;
        
        if (referencePlan) {
            const currentWeekIdx = findCurrentWeekIndex(referencePlan);
            const totalAcademicWeeks = referencePlan.length;
            remaining = Math.max(0, totalAcademicWeeks - currentWeekIdx);
        }

        return {
            globalPercentage,
            totalAhead,
            totalBehind,
            remaining
        };
    }, [completionData]);

    // Gösterilecek içerik durumu: Masaüstüyse VEYA mobilde tıklanmışsa
    const showContent = isDesktop || isOpen;

    return (
        <motion.button 
            layout
            onClick={() => !isDesktop && setIsOpen(!isOpen)} // Sadece mobilde tıklayınca tetikle
            className={`
                relative z-50 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm transition-colors duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800
                p-1.5 ${!isDesktop ? 'cursor-pointer active:scale-95' : 'cursor-default'}
            `}
            transition={{ layout: { duration: 0.3, ease: "easeInOut" } }} // Layout geçişini yumuşat
        >
            {/* Sol Taraf: Dairesel Grafik (Her zaman görünür) */}
            <motion.div layout="position" className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        className="text-slate-100 dark:text-slate-800"
                    />
                    <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={97}
                        strokeDashoffset={97 - (97 * stats.globalPercentage) / 100}
                        className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                        <PieChart size={14} className="text-indigo-600 dark:text-indigo-400 opacity-90" />
                </div>
            </motion.div>

            {/* Sağ Taraf: Genişleyen İçerik */}
            <AnimatePresence mode="wait" initial={false}>
                {showContent && (
                    <motion.div 
                        key="content"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ 
                            width: "auto", 
                            opacity: 1,
                            transition: { 
                                width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, // Smooth standard easing
                                opacity: { duration: 0.2, delay: 0.15 } // İçerik biraz gecikmeli gelsin
                            }
                        }}
                        exit={{ 
                            width: 0, 
                            opacity: 0,
                            transition: { 
                                width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.1 } // Hızlıca kaybolsun
                            }
                        }}
                        className="overflow-hidden"
                    >
                        {/* İçerik kutusu sabit padding'e sahip, böylece metin titremez */}
                        <div className="flex flex-col justify-center whitespace-nowrap text-left pl-3 pr-3">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1 block">
                                Genel Durum
                            </span>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-lg font-heading font-extrabold text-slate-800 dark:text-slate-100 leading-none">
                                    %<CountUp value={stats.globalPercentage} />
                                </span>
                                
                                {/* Mini Status Indicator */}
                                {stats.totalBehind > 0 ? (
                                        <div className="flex items-center gap-0.5 text-[8px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded-full border border-rose-100 dark:border-rose-800/50">
                                        <TrendingDown size={8} />
                                        <span>{stats.totalBehind}</span>
                                        </div>
                                ) : stats.totalAhead > 0 ? (
                                    <div className="flex items-center gap-0.5 text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                                        <TrendingUp size={8} />
                                        <span>{stats.totalAhead}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-0.5 text-[8px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-800/50">
                                        <Minus size={8} />
                                    </div>
                                )}
                            </div>
                            <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Hourglass size={8} /> Kalan: {stats.remaining} Hafta
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
