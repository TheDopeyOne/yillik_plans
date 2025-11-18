
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PLAN_DATA, findCurrentWeekIndex, GRADES } from './services/planData';
import { CompletionData, NotesData } from './types';
import { GradeSelector } from './components/GradeSelector';
import { WeekContent } from './components/WeekContent';
import { Navigation } from './components/Navigation';
import { ProgressBar } from './components/ProgressBar';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY_COMPLETION = 'planTrackerCompletion_v2';
const STORAGE_KEY_NOTES = 'planTrackerNotes_v1';

// Animation Variants for slide transitions
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
        filter: 'blur(4px)'
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
        filter: 'blur(4px)',
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    })
};

function App() {
    const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
    const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
    const [direction, setDirection] = useState([0, 0]); // [direction, weekIndex] to track unique keys
    const [completionData, setCompletionData] = useState<CompletionData>({});
    const [notesData, setNotesData] = useState<NotesData>({});
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

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

    // Handle Grade Selection & Auto-Completion Logic
    const handleGradeSelect = (id: string) => {
        setSelectedGradeId(id);
        const plan = PLAN_DATA[id];
        const today = new Date();
        
        // Find where we are today
        const index = findCurrentWeekIndex(plan, today);
        setCurrentWeekIndex(index);
        setDirection([0, index]); // Initial direction 0

        // Auto-mark past weeks logic
        setCompletionData(prev => {
            const gradeData = prev[id] || new Array(plan.length).fill(false);
            const newGradeData = [...gradeData];
            
            // Ensure array length matches plan length
            if (newGradeData.length !== plan.length) {
                while(newGradeData.length < plan.length) newGradeData.push(false);
            }

            // Mark all previous weeks as done if not already set
            for (let i = 0; i < index; i++) {
                if (!newGradeData[i]) {
                    newGradeData[i] = true;
                }
            }
            
            const newState = { ...prev, [id]: newGradeData };
            localStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(newState));
            return newState;
        });
    };

    const handleBackToMenu = () => {
        setSelectedGradeId(null);
    };

    const handleToggleComplete = () => {
        if (!selectedGradeId) return;

        setCompletionData(prev => {
            const currentGradeData = prev[selectedGradeId] ? [...prev[selectedGradeId]] : new Array(PLAN_DATA[selectedGradeId].length).fill(false);
            currentGradeData[currentWeekIndex] = !currentGradeData[currentWeekIndex];
            
            const newState = { ...prev, [selectedGradeId]: currentGradeData };
            localStorage.setItem(STORAGE_KEY_COMPLETION, JSON.stringify(newState));
            return newState;
        });
    };

    // NOTE SAVING LOGIC (Debounced)
    const handleNoteChange = useCallback((text: string) => {
        if (!selectedGradeId) return;
        
        setSaveStatus('saving');
        
        // Update UI immediately
        setNotesData(prev => ({
            ...prev,
            [selectedGradeId]: {
                ...(prev[selectedGradeId] || {}),
                [currentWeekIndex]: text
            }
        }));

        // Debounce save to disk
        const timeoutId = setTimeout(() => {
            setNotesData(latestNotes => {
                localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(latestNotes));
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000); 
                return latestNotes;
            });
        }, 800); // 800ms delay

        return () => clearTimeout(timeoutId);
    }, [selectedGradeId, currentWeekIndex]);


    // Derived State
    const currentPlan = selectedGradeId ? PLAN_DATA[selectedGradeId] : [];
    const currentWeekData = currentPlan[currentWeekIndex];
    const gradeInfo = GRADES.find(g => g.id === selectedGradeId);
    
    const completedCount = useMemo(() => {
        if (!selectedGradeId || !completionData[selectedGradeId]) return 0;
        return completionData[selectedGradeId].filter(Boolean).length;
    }, [selectedGradeId, completionData]);

    const isCurrentWeekCompleted = useMemo(() => {
        if (!selectedGradeId || !completionData[selectedGradeId]) return false;
        return !!completionData[selectedGradeId][currentWeekIndex];
    }, [selectedGradeId, completionData, currentWeekIndex]);

    const currentNote = useMemo(() => {
        if (!selectedGradeId || !notesData[selectedGradeId]) return "";
        return notesData[selectedGradeId][currentWeekIndex] || "";
    }, [selectedGradeId, notesData, currentWeekIndex]);

    // Navigation Handlers
    const handlePrev = () => {
        setDirection([-1, currentWeekIndex - 1]);
        setCurrentWeekIndex(p => Math.max(0, p - 1));
    };
    
    const handleNext = () => {
        setDirection([1, currentWeekIndex + 1]);
        setCurrentWeekIndex(p => Math.min(currentPlan.length - 1, p + 1));
    };
    
    const handleCurrent = () => {
        const idx = findCurrentWeekIndex(currentPlan, new Date());
        const dir = idx > currentWeekIndex ? 1 : -1;
        setDirection([dir, idx]);
        setCurrentWeekIndex(idx);
    };

    // Render Logic
    if (!selectedGradeId) {
        return (
            <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#f8fafc]">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[400px] h-[400px] bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
                
                <GradeSelector onSelect={handleGradeSelect} />
            </div>
        );
    }

    if (!currentWeekData) return null;

    return (
        <div className="min-h-screen relative bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-700 flex flex-col">
            
            {/* Background elements for inner page */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Navbar - Compact */}
            <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/50 shadow-sm">
                <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between">
                    <button 
                        onClick={handleBackToMenu}
                        className="group flex items-center px-3 py-1.5 rounded-full bg-slate-100 hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 hover:text-slate-900 transition-all text-xs font-bold"
                    >
                        <ArrowLeft size={14} className="mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
                        Menü
                    </button>
                    <div className="text-right">
                        <h1 className="font-heading font-bold text-slate-800 text-base leading-none tracking-tight">
                            {gradeInfo?.label}
                        </h1>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider opacity-70">
                            {gradeInfo?.subLabel}
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full max-w-xl mx-auto px-4 pt-5 pb-24 space-y-5 flex-grow flex flex-col">
                {/* Progress Section */}
                <section>
                    <ProgressBar total={currentPlan.length} completed={completedCount} />
                </section>

                {/* Main Content - With Animation */}
                <section className="space-y-3 flex-grow">
                    <div className="flex justify-center">
                         <motion.div 
                            key={currentWeekIndex + "-badge"}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200/60 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-white/50"
                         >
                            Hafta {currentWeekIndex + 1}
                         </motion.div>
                    </div>
                    
                    <AnimatePresence mode='wait' custom={direction[0]}>
                        <motion.div
                            key={currentWeekIndex}
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
                </section>
            </main>

            {/* Sticky Bottom Navigation - Floating Island Style */}
            <div className="fixed bottom-5 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
                <div className="pointer-events-auto shadow-2xl shadow-slate-400/20 rounded-full">
                    <Navigation 
                        onPrev={handlePrev}
                        onNext={handleNext}
                        onCurrent={handleCurrent}
                        canPrev={currentWeekIndex > 0}
                        canNext={currentWeekIndex < currentPlan.length - 1}
                        currentDateRange={currentWeekData.range}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
