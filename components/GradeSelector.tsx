
import React, { useState, useEffect } from 'react';
import { GRADES, PLAN_DATA, getPassedWeekCount, deleteCustomPlan, getRefreshedGrades } from '../services/planData';
import { CompletionData } from '../types';
import { Dashboard } from './Dashboard';
import { Library, Sun, Moon, Plus, FileText, Trash2, AlertTriangle, X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { PlanImporter } from './PlanImporter';
import { InstallPrompt } from './InstallPrompt';

interface GradeSelectorProps {
    onSelect: (id: string) => void;
    completionData: CompletionData;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: "Günaydın Hocam", icon: Sun };
    if (hour >= 12 && hour < 18) return { text: "İyi Dersler", icon: Library };
    return { text: "İyi Akşamlar", icon: Moon };
};

const icons = {
    atom: Library,
    telescope: Library,
    book: Library,
    calculator: Library,
    'file-text': FileText
};

export const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelect, completionData }) => {
    const [greeting, setGreeting] = useState(getGreeting());
    const [isImporting, setIsImporting] = useState(false);
    const [currentGrades, setCurrentGrades] = useState(GRADES);
    
    // Visibility State for Standard Grades
    const [showStandard, setShowStandard] = useState(() => {
        const stored = localStorage.getItem('pref_show_standard');
        return stored !== 'false'; // Default true
    });
    
    // Swipe & Delete State
    const [swipedId, setSwipedId] = useState<string | null>(null);
    const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setGreeting(getGreeting());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Listen for custom plan updates
    useEffect(() => {
        const handleUpdate = () => {
            setCurrentGrades([...getRefreshedGrades()]);
        };
        window.addEventListener('plan-data-change', handleUpdate);
        return () => window.removeEventListener('plan-data-change', handleUpdate);
    }, []);

    const toggleStandardGrades = () => {
        const newValue = !showStandard;
        setShowStandard(newValue);
        localStorage.setItem('pref_show_standard', String(newValue));
    };

    const GreetingIcon = greeting.icon;

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: string) => {
        const threshold = 60;
        // Drag logic: 
        // If closed (0) -> Drag Right (> threshold) -> Open
        // If open (110) -> Drag Left (<- threshold) -> Close
        // Simply checking offset works for opening, but for closing we need to check relative movement
        
        if (info.offset.x > threshold) {
             // Trying to open
             setSwipedId(id);
        } else if (info.offset.x < -threshold && swipedId === id) {
             // Trying to close
             setSwipedId(null);
        } else {
            // Snap back
            if (swipedId === id && info.offset.x < 0) {
                 // Already open, moved slightly left -> stay open
            } else if (swipedId === id) {
                 // Already open, moved right? stay open
            } else {
                 // Closed, moved slightly -> stay closed
                 setSwipedId(null);
            }
        }
    };

    const handleCardClick = (id: string) => {
        // Eğer kart swipe edilmişse (açıksa), tıklama onu kapatmalı
        if (swipedId === id) {
            setSwipedId(null);
            return;
        }
        // Değilse sayfaya git
        onSelect(id);
    };

    const handleDeleteClick = (id: string) => {
        setDeleteDialogId(id);
    };

    const confirmDelete = () => {
        if (deleteDialogId) {
            deleteCustomPlan(deleteDialogId);
            setDeleteDialogId(null);
            setSwipedId(null);
        }
    };

    // Filter grades based on preference
    const visibleGrades = currentGrades.filter(grade => {
        if (grade.isCustom) return true; // Always show custom
        return showStandard; // Show standard only if preference is true
    });

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-[#f8fafc] dark:bg-slate-950 overflow-hidden relative transition-colors duration-300">
            
            <InstallPrompt />
            
            {isImporting && <PlanImporter onClose={() => setIsImporting(false)} />}

            {/* DELETE CONFIRMATION DIALOG */}
            <AnimatePresence>
                {deleteDialogId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-white/20 p-6 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4 text-rose-500">
                                <AlertTriangle size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-slate-100 mb-2">
                                Planı Silmek İstediğinize Emin Misiniz?
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                Bu işlem geri döndürülemez ve plana ait tüm notlar silinecektir.
                            </p>
                            <div className="flex w-full gap-3">
                                <button 
                                    onClick={() => setDeleteDialogId(null)}
                                    className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    İptal
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    className="flex-1 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-colors"
                                >
                                    Onayla
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Arka Plan Efektleri */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                 <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60 animate-pulse" />
                 <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-rose-400/10 dark:bg-rose-900/20 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '3s' }} />
            </div>
            
            {/* 1. TOP BAR */}
            <div className="pt-4 px-4 pb-2 flex items-center justify-between z-20 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm border border-white/50 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Library size={20} strokeWidth={2.5} />
                    </div>
                    <button 
                        onClick={toggleStandardGrades}
                        className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm border border-white/50 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95"
                        title={showStandard ? "Standart Sınıfları Gizle" : "Standart Sınıfları Göster"}
                    >
                        {showStandard ? <Eye size={20} strokeWidth={2} /> : <EyeOff size={20} strokeWidth={2} />}
                    </button>
                </div>
                <Dashboard completionData={completionData} />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 z-10 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                
                {/* 2. HERO BAŞLIK */}
                <div className="pt-6 pb-6 px-1">
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-1 text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest"
                    >
                        <GreetingIcon size={14} className="text-amber-500 dark:text-amber-400" />
                        {greeting.text}
                    </motion.div>
                    <h1 className="text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-2">
                        Yıllık Plan<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                            Asistanı
                        </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-[280px] leading-relaxed border-l-2 border-indigo-300 dark:border-slate-700 pl-3">
                        Dersini seç, haftalık kazanımları takip et.
                    </p>
                </div>

                {/* 3. LİSTE */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-3 pb-8"
                >
                    {visibleGrades.map((grade) => {
                        const plan = PLAN_DATA[grade.id] || [];
                        const isCustom = grade.isCustom;
                        
                        const total = plan.length;
                        const completed = completionData[grade.id]?.filter(Boolean).length || 0;
                        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                        
                        const passedWeeksCount = getPassedWeekCount(plan);
                        const diff = completed - passedWeeksCount;
                        
                        let statusText = "Başlanmadı";
                        let statusColor = "text-slate-600 dark:text-slate-300";
                        let statusBg = "bg-white/40 dark:bg-black/20";

                        if (completed > 0) {
                            if (diff > 1) {
                                statusText = "Önde";
                                statusColor = "text-emerald-800 dark:text-emerald-200";
                                statusBg = "bg-emerald-200/40 dark:bg-emerald-500/20";
                            } else if (diff < 0) {
                                statusText = "Geride";
                                statusColor = "text-rose-800 dark:text-rose-200";
                                statusBg = "bg-rose-200/40 dark:bg-rose-500/20";
                            } else {
                                statusText = "Uygun";
                                statusColor = "text-blue-800 dark:text-blue-200";
                                statusBg = "bg-blue-200/40 dark:bg-blue-500/20";
                            }
                        }

                        const themeColors: Record<string, { card: string, border: string, stroke: string, text: string, divider: string, shadow: string, track: string }> = {
                            'bg-blue-500': { 
                                card: 'bg-gradient-to-br from-blue-50 via-blue-50/50 to-white dark:from-blue-900/40 dark:via-blue-900/20 dark:to-slate-900',
                                border: 'border-white/60 dark:border-blue-500/30 hover:border-blue-400/60',
                                stroke: 'text-blue-600 dark:text-blue-400',
                                track: 'text-blue-200/50 dark:text-blue-900/50',
                                text: 'text-blue-800 dark:text-blue-200',
                                divider: 'bg-blue-300/60 dark:bg-blue-600/40',
                                shadow: 'shadow-blue-200/50 dark:shadow-blue-900/30 hover:shadow-blue-300/60'
                            },
                            'bg-indigo-500': { 
                                card: 'bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-white dark:from-indigo-900/40 dark:via-indigo-900/20 dark:to-slate-900',
                                border: 'border-white/60 dark:border-indigo-500/30 hover:border-indigo-400/60',
                                stroke: 'text-indigo-600 dark:text-indigo-400',
                                track: 'text-indigo-200/50 dark:text-indigo-900/50',
                                text: 'text-indigo-800 dark:text-indigo-200',
                                divider: 'bg-indigo-300/60 dark:bg-indigo-600/40',
                                shadow: 'shadow-indigo-200/50 dark:shadow-indigo-900/30 hover:shadow-indigo-300/60'
                            },
                            'bg-violet-500': { 
                                card: 'bg-gradient-to-br from-purple-50 via-purple-50/50 to-white dark:from-purple-900/40 dark:via-purple-900/20 dark:to-slate-900',
                                border: 'border-white/60 dark:border-purple-500/30 hover:border-purple-400/60',
                                stroke: 'text-purple-600 dark:text-purple-400',
                                track: 'text-purple-200/50 dark:text-purple-900/50',
                                text: 'text-purple-800 dark:text-purple-200',
                                divider: 'bg-purple-300/60 dark:bg-purple-600/40',
                                shadow: 'shadow-purple-200/50 dark:shadow-purple-900/30 hover:shadow-purple-300/60'
                            },
                            'bg-rose-500': { 
                                card: 'bg-gradient-to-br from-rose-50 via-rose-50/50 to-white dark:from-rose-900/40 dark:via-rose-900/20 dark:to-slate-900',
                                border: 'border-white/60 dark:border-rose-500/30 hover:border-rose-400/60',
                                stroke: 'text-rose-600 dark:text-rose-400',
                                track: 'text-rose-200/50 dark:text-rose-900/50',
                                text: 'text-rose-800 dark:text-rose-200',
                                divider: 'bg-rose-300/60 dark:bg-rose-600/40',
                                shadow: 'shadow-rose-200/50 dark:shadow-rose-900/30 hover:shadow-rose-300/60'
                            },
                            'bg-slate-800': { 
                                card: 'bg-gradient-to-br from-slate-100 via-slate-50/50 to-white dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-900',
                                border: 'border-white/60 dark:border-slate-500/30 hover:border-slate-400/60',
                                stroke: 'text-slate-700 dark:text-slate-400',
                                track: 'text-slate-300/50 dark:text-slate-700/50',
                                text: 'text-slate-900 dark:text-slate-200',
                                divider: 'bg-slate-300/60 dark:bg-slate-600/40',
                                shadow: 'shadow-slate-300/50 dark:shadow-slate-900/30 hover:shadow-slate-400/60'
                            },
                            'bg-emerald-500': { 
                                card: 'bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white dark:from-emerald-900/40 dark:via-emerald-900/20 dark:to-slate-900',
                                border: 'border-white/60 dark:border-emerald-500/30 hover:border-emerald-400/60',
                                stroke: 'text-emerald-600 dark:text-emerald-400',
                                track: 'text-emerald-200/50 dark:text-emerald-900/50',
                                text: 'text-emerald-800 dark:text-emerald-200',
                                divider: 'bg-emerald-300/60 dark:bg-emerald-600/40',
                                shadow: 'shadow-emerald-200/50 dark:shadow-emerald-900/30 hover:shadow-emerald-300/60'
                            },
                            'bg-amber-500': { 
                                card: 'bg-gradient-to-br from-amber-50 via-amber-50/50 to-white dark:from-amber-900/40 dark:via-amber-900/20 dark:to-slate-900',
                                border: 'border-white/60 dark:border-amber-500/30 hover:border-amber-400/60',
                                stroke: 'text-amber-600 dark:text-amber-400',
                                track: 'text-amber-200/50 dark:text-amber-900/50',
                                text: 'text-amber-800 dark:text-amber-200',
                                divider: 'bg-amber-300/60 dark:bg-amber-600/40',
                                shadow: 'shadow-amber-200/50 dark:shadow-amber-900/30 hover:shadow-amber-300/60'
                            },
                            'default': {
                                card: 'bg-gradient-to-br from-slate-50 via-slate-50/50 to-white dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-900',
                                border: 'border-white/60 dark:border-slate-500/30 hover:border-slate-400/60',
                                stroke: 'text-slate-700 dark:text-slate-400',
                                track: 'text-slate-300/50 dark:text-slate-700/50',
                                text: 'text-slate-900 dark:text-slate-200',
                                divider: 'bg-slate-300/60 dark:bg-slate-600/40',
                                shadow: 'shadow-slate-300/50 dark:shadow-slate-900/30 hover:shadow-slate-400/60'
                            }
                        };

                        const theme = themeColors[grade.color] || themeColors['default'];
                        const IconComp = grade.icon === 'file-text' ? FileText : (icons[grade.icon as keyof typeof icons] || Library);
                        const isSwiped = swipedId === grade.id;

                        return (
                            <motion.div 
                                layout
                                key={grade.id} 
                                variants={item}
                                className="relative group"
                            >
                                {/* DELETE ACTION LAYER (BEHIND CARD) */}
                                {isCustom && (
                                    <div className="absolute inset-y-0 left-0 w-28 bg-rose-500 rounded-3xl flex items-center justify-center z-0 shadow-inner">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(grade.id);
                                            }}
                                            className="flex flex-col items-center justify-center gap-1 text-white w-full h-full active:scale-95 transition-transform"
                                        >
                                            <Trash2 size={24} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Sil</span>
                                        </button>
                                    </div>
                                )}

                                {/* MAIN CARD LAYER */}
                                <motion.div 
                                    drag={isCustom ? "x" : false}
                                    dragConstraints={{ left: 0, right: 110 }}
                                    dragElastic={0.1}
                                    onDragEnd={(e, info) => handleDragEnd(e, info, grade.id)}
                                    animate={{ x: isSwiped ? 110 : 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    onClick={() => handleCardClick(grade.id)}
                                    className={`
                                        relative w-full p-4 rounded-3xl text-left cursor-pointer select-none touch-pan-y
                                        border transition-all duration-300 overflow-hidden z-10 bg-white dark:bg-slate-900
                                        ${theme.card} ${theme.border} ${theme.shadow}
                                    `}
                                >
                                    {/* Hint for swipe (only on custom cards) */}
                                    {grade.isCustom && !isSwiped && (
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-400/30 rounded-full md:hidden"></div>
                                    )}

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent z-10 pointer-events-none ease-in-out" />

                                    <div className="flex items-center gap-5 h-full relative z-20 pointer-events-none">
                                        
                                        {/* SOL: Grafik */}
                                        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                                                <circle cx="18" cy="18" r="15.5" stroke="currentColor" strokeWidth="3" fill="transparent" className={theme.track} />
                                                <circle cx="18" cy="18" r="15.5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={97} strokeDashoffset={97 - (97 * percent) / 100} className={`${theme.stroke} transition-all duration-1000 ease-out`} strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className={`text-sm font-heading font-bold leading-none tabular-nums tracking-tight ${theme.text}`}>%{percent}</span>
                                            </div>
                                        </div>

                                        {/* ORTA: Divider */}
                                        <div className={`w-px h-12 ${theme.divider} shrink-0`}></div>

                                        {/* SAĞ: İçerik */}
                                        <div className="flex-1 flex items-center justify-between min-w-0">
                                            <div className="flex flex-col mr-2">
                                                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-100 leading-tight truncate">
                                                    {grade.label}
                                                </h3>
                                                <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide opacity-80 truncate">
                                                    {grade.subLabel}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end shrink-0">
                                                {completed > 0 ? (
                                                    <span className={`text-[9px] font-semibold px-2 py-1 rounded-lg uppercase tracking-wider mb-1 shadow-sm ${statusBg} ${statusColor}`}>{statusText}</span>
                                                ) : (
                                                     <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 opacity-80">---</span>
                                                )}
                                                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                                                    <span className="text-slate-800 dark:text-slate-200">{completed}</span><span className="opacity-40 mx-1">/</span><span className="opacity-70">{total}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}

                    {/* IMPORT BUTTON */}
                    <motion.div 
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsImporting(true)}
                        className="w-full p-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all group cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                            <Plus size={18} />
                        </div>
                        <span className="font-semibold text-sm">Yeni Plan Ekle</span>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};
