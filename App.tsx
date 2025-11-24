
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PLAN_DATA, findCurrentWeekIndex, GRADES } from './services/planData';
import { CompletionData, NotesData, RichNote } from './types';
import { GradeSelector } from './components/GradeSelector';
import { WeekContent } from './components/WeekContent';
import { Navigation } from './components/Navigation';
import { ProgressBar } from './components/ProgressBar';
import { WeekGrid } from './components/WeekGrid';
import { ArrowLeft, LayoutGrid, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY_COMPLETION = 'planTrackerCompletion_v2';
const STORAGE_KEY_NOTES = 'planTrackerNotes_v1';

// Animation Variants Optimized: Removed 'scale' to prevent 3D/Blur flickering
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 20 : -20,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 20 : -20,
        opacity: 0,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    })
};

// Page Transition Variants: Simplified to Fade-only for max performance with Glassmorphism
const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

function App() {
    const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
    const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
    const [direction, setDirection] = useState([0, 0]); // [direction, weekIndex] to track unique keys
    const [completionData, setCompletionData] = useState<CompletionData>({});
    const [notesData, setNotesData] = useState<NotesData>({});
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [isGridOpen, setIsGridOpen] = useState(false);

    // Load data from local storage on mount
    useEffect(() => {
        try {
            const storedCompletion = localStorage.getItem(STORAGE_KEY_COMPLETION);
            if (storedCompletion) setCompletionData(JSON.parse(storedCompletion));

            const storedNotes = localStorage.getItem(STORAGE_KEY_NOTES);
            if (storedNotes) setNotesData(JSON.parse(storedNotes));
        } catch (e) {
            console.error("Failed to parse storage", e);
        }
    }, []);

    // History Handling (Back Button Support)
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (selectedGradeId) {
                setSelectedGradeId(null);
                setIsGridOpen(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedGradeId]);

    // Handle Grade Selection & Auto-Completion Logic
    const handleGradeSelect = (id: string) => {
        // Push state for back button support
        window.history.pushState({ gradeId: id }, '', '');
        
        setSelectedGradeId(id);
        // Safety check: Ensure plan exists or default to empty array
        const plan = PLAN_DATA[id] || [];
        const today = new Date();
        
        // Find where we are today
        const index = findCurrentWeekIndex(plan, today);
        setCurrentWeekIndex(index);
        setDirection([0, index]); // Initial direction 0

        // Auto-mark past weeks logic
        setCompletionData(prev => {
            const existingData = prev[id];
            
            // If data exists (even if partial), do not overwrite
            if (existingData && existingData.length > 0) {
                // Just fix length if plan changed
                if (existingData.length !== plan.length) {
                     const newGradeData = [...existingData];
                     while(newGradeData.length < plan.length) newGradeData.push(false);
                     
                     const newState = { ...prev, [id]: newGradeData };
                     localStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(newState));
                     return newState;
                }
                return prev;
            }

            // Only if NO data exists for this grade, auto-fill past weeks
            // Only do this if we have a valid plan
            if (plan.length > 0) {
                const newGradeData = new Array(plan.length).fill(false);
                for (let i = 0; i < index; i++) {
                    newGradeData[i] = true;
                }
                
                const newState = { ...prev, [id]: newGradeData };
                localStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(newState));
                return newState;
            }
            
            return prev;
        });
    };

    const handleBackToMenu = () => {
        // Use history back to trigger popstate and consistent navigation
        window.history.back();
    };

    const handleToggleComplete = () => {
        if (!selectedGradeId) return;

        setCompletionData(prev => {
            const plan = PLAN_DATA[selectedGradeId] || [];
            const currentGradeData = prev[selectedGradeId] ? [...prev[selectedGradeId]] : new Array(plan.length).fill(false);
            // Ensure array is long enough (safety)
            while (currentGradeData.length <= currentWeekIndex) currentGradeData.push(false);
            
            currentGradeData[currentWeekIndex] = !currentGradeData[currentWeekIndex];
            
            const newState = { ...prev, [selectedGradeId]: currentGradeData };
            localStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(newState));
            return newState;
        });
    };

    const handleNoteChange = useCallback((noteData: RichNote) => {
        if (!selectedGradeId) return;
        
        setSaveStatus('saving');
        
        setNotesData(prev => ({
            ...prev,
            [selectedGradeId]: {
                ...(prev[selectedGradeId] || {}),
                [currentWeekIndex]: noteData
            }
        }));

        const timeoutId = setTimeout(() => {
            setNotesData(latestNotes => {
                localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(latestNotes));
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000); 
                return latestNotes;
            });
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [selectedGradeId, currentWeekIndex]);


    // Derived State with Safety Checks
    const currentPlan = selectedGradeId ? (PLAN_DATA[selectedGradeId] || []) : [];
    const hasPlanData = currentPlan.length > 0;
    
    // Calculate safe index
    const safeWeekIndex = hasPlanData 
        ? Math.min(Math.max(0, currentWeekIndex), currentPlan.length - 1) 
        : 0;
    
    // If index was out of bounds, sync state
    if (hasPlanData && currentWeekIndex !== safeWeekIndex) {
        // We use a timeout to avoid setting state during render if possible, 
        // though direct set is often okay in event handlers, here it's safer inside effect or direct logic
        // But for this render cycle, use safeWeekIndex variable
    }

    const currentWeekData = hasPlanData ? currentPlan[safeWeekIndex] : null;
    const gradeInfo = GRADES.find(g => g.id === selectedGradeId);
    
    const completedCount = useMemo(() => {
        if (!selectedGradeId || !completionData[selectedGradeId]) return 0;
        return completionData[selectedGradeId].filter(Boolean).length;
    }, [selectedGradeId, completionData]);

    const isCurrentWeekCompleted = useMemo(() => {
        if (!selectedGradeId || !completionData[selectedGradeId]) return false;
        return !!completionData[selectedGradeId][safeWeekIndex];
    }, [selectedGradeId, completionData, safeWeekIndex]);

    const currentNote: RichNote = useMemo(() => {
        if (!selectedGradeId || !notesData[selectedGradeId]) return { text: '', images: [], checklist: [] };
        const val = notesData[selectedGradeId][safeWeekIndex];
        // Migration support for old string notes
        if (typeof val === 'string') {
            return { text: val, images: [], checklist: [] };
        }
        return val || { text: '', images: [], checklist: [] };
    }, [selectedGradeId, notesData, safeWeekIndex]);

    const todayFormatted = useMemo(() => {
        return new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    }, []);

    const handlePrev = () => {
        setDirection([-1, safeWeekIndex - 1]);
        setCurrentWeekIndex(p => Math.max(0, p - 1));
    };
    
    const handleNext = () => {
        setDirection([1, safeWeekIndex + 1]);
        setCurrentWeekIndex(p => Math.min(currentPlan.length - 1, p + 1));
    };
    
    const handleCurrent = () => {
        const idx = findCurrentWeekIndex(currentPlan, new Date());
        const dir = idx > safeWeekIndex ? 1 : -1;
        setDirection([dir, idx]);
        setCurrentWeekIndex(idx);
    };

    const handleJumpToWeek = (index: number) => {
        const dir = index > safeWeekIndex ? 1 : -1;
        setDirection([dir, index]);
        setCurrentWeekIndex(index);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-indigo-100 selection:text-indigo-700 transition-colors duration-300 overflow-hidden relative">
            
            {/* Global Persistent Background - Moved outside AnimatePresence to prevent re-rendering/flashing */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 transition-colors duration-500"></div>
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 transition-colors duration-500"></div>
            </div>

            <AnimatePresence mode="wait">
                {!selectedGradeId ? (
                    <motion.div 
                        key="menu"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="h-full relative z-10"
                    >
                        <GradeSelector onSelect={handleGradeSelect} completionData={completionData} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="week-view"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="min-h-screen flex flex-col relative z-10"
                    >
                        {/* Professional Command Bar Header */}
                        <header className="sticky top-0 z-50 pointer-events-none">
                            <div className="max-w-xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between pointer-events-auto">
                                
                                {/* Context Menu (Back + Info) */}
                                <button 
                                    onClick={handleBackToMenu} 
                                    className="group flex items-center gap-3 pl-1 pr-5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-700 shadow-sm shadow-slate-200/50 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all duration-200"
                                >
                                     <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-200 shadow-inner">
                                        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
                                     </div>
                                     <div className="flex flex-col items-start">
                                         <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Geri Dön</span>
                                         <span className="text-sm font-heading font-bold text-slate-800 dark:text-slate-100 leading-none">
                                            {gradeInfo?.label || "Ders"} <span className="opacity-60 font-normal">{gradeInfo?.subLabel}</span>
                                         </span>
                                     </div>
                                </button>

                                {/* Tools (Date + Grid) */}
                                <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-700 rounded-full p-1.5 pl-5 shadow-sm shadow-slate-200/50 dark:shadow-none transition-colors">
                                     <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">Bugün</span>
                                        <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 leading-none">{todayFormatted}</span>
                                     </div>
                                     <div className="w-px h-6 bg-slate-200/80 dark:bg-slate-700 transition-colors"></div>
                                     <button
                                        onClick={() => setIsGridOpen(true)}
                                        disabled={!hasPlanData}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 active:scale-90 transition-all shadow-lg shadow-slate-900/20 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Yıllık Planı Gör"
                                     >
                                        <LayoutGrid size={18} strokeWidth={2} />
                                     </button>
                                </div>
                            </div>
                        </header>

                        <main className="relative z-10 w-full max-w-xl mx-auto px-4 pt-5 pb-28 space-y-5 flex-grow flex flex-col">
                            <section>
                                <ProgressBar total={currentPlan.length} completed={completedCount} />
                            </section>

                            <section className="space-y-3 flex-grow">
                                {currentWeekData ? (
                                    <>
                                        <div className="flex justify-center">
                                            <motion.div 
                                                key={safeWeekIndex + "-badge"}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-white/50 dark:border-slate-700 backdrop-blur-sm transition-colors"
                                            >
                                                Hafta {safeWeekIndex + 1}
                                            </motion.div>
                                        </div>
                                        
                                        <AnimatePresence mode='wait' custom={direction[0]}>
                                            <motion.div
                                                key={safeWeekIndex}
                                                custom={direction[0]}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                className="w-full"
                                            >
                                                <WeekContent 
                                                    data={currentWeekData} 
                                                    isCompleted={isCurrentWeekCompleted}
                                                    onToggleComplete={handleToggleComplete}
                                                    note={currentNote}
                                                    onNoteChange={handleNoteChange}
                                                    saveStatus={saveStatus}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-center p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                                        <AlertCircle size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400">Plan Verisi Bulunamadı</h3>
                                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-xs">Bu ders için plan oluşturulmamış veya veri yüklenirken hata oluştu.</p>
                                    </div>
                                )}
                            </section>
                        </main>

                        {hasPlanData && (
                            <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
                                <div className="pointer-events-auto shadow-2xl shadow-slate-400/20 dark:shadow-none rounded-full">
                                    <Navigation 
                                        onPrev={handlePrev}
                                        onNext={handleNext}
                                        onCurrent={handleCurrent}
                                        canPrev={safeWeekIndex > 0}
                                        canNext={safeWeekIndex < currentPlan.length - 1} 
                                        currentDateRange={currentWeekData?.range || ""}
                                    />
                                </div>
                            </div>
                        )}

                        <AnimatePresence>
                            {isGridOpen && (
                                <WeekGrid 
                                    plan={currentPlan}
                                    completionData={completionData[selectedGradeId!] || []}
                                    currentWeekIndex={safeWeekIndex}
                                    onSelect={handleJumpToWeek}
                                    onClose={() => setIsGridOpen(false)}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;