
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonPlan } from '../types';
import { BookOpen, Check, Coffee, Target, PenLine, Save, RotateCcw, Zap, AlertCircle, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeekContentProps {
    data: LessonPlan;
    isCompleted: boolean;
    onToggleComplete: () => void;
    note: string;
    onNoteChange: (text: string) => void;
    saveStatus: 'idle' | 'saving' | 'saved';
}

export const WeekContent: React.FC<WeekContentProps> = ({ 
    data, 
    isCompleted, 
    onToggleComplete,
    note,
    onNoteChange,
    saveStatus
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isPressing, setIsPressing] = useState(false);
    const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Regex checks
    const isActivity = /(TATİLİ|SOSYAL ETKİNLİK|PLANLAMA|ETKİNLİK HAFTASI)/i.test(data.topic || data.achievement || "");
    const isExam = /(SINAV HAFTASI|1\. Dönem \d\. Sınav|2\. Dönem \d\. Sınav)/i.test(data.topic || data.achievement || "");

    const topicClean = data.topic.replace(/\(.*\)/, '').trim();
    const outcomeClean = (data.outcome || data.achievement || "").trim();
    // Determine label based on data structure (outcome = 9/10th grade, achievement = others)
    const outcomeLabel = data.outcome ? "Öğrenme Çıktısı" : "Kazanım";

    const hasNote = note && note.trim().length > 0;

    const LONG_PRESS_DURATION = 600;

    // --- CONFETTI LOGIC ---
    const handleToggleWithConfetti = () => {
        if (!isCompleted) {
            // Zarif Konfeti Ayarları
            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio: number, opts: any) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
                colors: ['#10b981', '#f59e0b', '#ffffff'] // Emerald, Amber, White
            });
            fire(0.2, {
                spread: 60,
                colors: ['#10b981', '#f59e0b', '#ffffff']
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
                colors: ['#10b981', '#f59e0b', '#ffffff']
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
                colors: ['#10b981', '#f59e0b', '#ffffff']
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
                colors: ['#10b981', '#f59e0b', '#ffffff']
            });
        }
        onToggleComplete();
    };

    // --- LONG PRESS LOGIC ---
    const startPress = () => {
        if (isFlipped) return;
        setIsPressing(true);
        
        // Clear any existing timer just in case
        if (pressTimer.current) clearTimeout(pressTimer.current);

        pressTimer.current = setTimeout(() => {
            setIsFlipped(true);
            setIsPressing(false); // Reset state after flip trigger
            // Haptic feedback if supported
            if (navigator.vibrate) navigator.vibrate(50);
        }, LONG_PRESS_DURATION);
    };

    const cancelPress = () => {
        setIsPressing(false);
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    // --- HOLIDAY / ACTIVITY CARD ---
    if (isActivity) {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={data.range + "activity"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white shadow-lg shadow-blue-400/20"
                >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex flex-row items-center space-x-5">
                        <div className="w-12 h-12 shrink-0 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner border border-white/20">
                            <Coffee size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-heading font-bold leading-tight">{data.topic || data.achievement}</h2>
                            <p className="text-blue-100 text-sm font-medium mt-1 opacity-90">
                                Program dışı etkinlik veya tatil haftası.
                            </p>
                        </div>
                         <button 
                            onClick={handleToggleWithConfetti}
                            className={`
                                px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 shrink-0
                                ${isCompleted 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'bg-blue-800/30 text-white hover:bg-blue-800/50 border border-blue-400/30'}
                            `}
                        >
                            {isCompleted ? 'Tamam' : 'Geç'}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    // --- EXAM CARD ---
    if (isExam) {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={data.range + "exam"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 p-6 text-white shadow-lg shadow-rose-500/20 border border-white/10"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertCircle size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                            <div className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md border border-white/30 text-[10px] font-bold uppercase tracking-wider">
                                Sınav Haftası
                            </div>
                        </div>
                        <h2 className="text-2xl font-heading font-extrabold mb-2 leading-tight">
                            {topicClean}
                        </h2>
                        <p className="text-rose-50 text-sm font-medium border-l-2 border-white/40 pl-3 mb-5 opacity-90">
                            {outcomeClean}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleToggleWithConfetti}
                                className={`
                                    flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-200 shadow-md
                                    ${isCompleted 
                                        ? 'bg-white text-rose-600' 
                                        : 'bg-rose-900/30 hover:bg-rose-900/40 text-white backdrop-blur-sm border border-white/20'}
                                `}
                            >
                                <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center ${isCompleted ? 'border-rose-600' : 'border-white/70'}`}>
                                    {isCompleted && <Check size={10} strokeWidth={4} />}
                                </div>
                                <span>{isCompleted ? 'Sınav Tamamlandı' : 'Sınavı Tamamla'}</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    // --- 3D FLIP CARD CONTAINER ---
    return (
        <div className="space-y-4 relative z-20">
            <div className="perspective-1000 w-full">
                <motion.div
                    className="card-grid transform-style-3d w-full select-none"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20
                    }}
                >
                    {/* --- FRONT FACE (Lesson Content) --- */}
                    <div 
                        className="card-face backface-hidden touch-none" 
                        onPointerDown={startPress}
                        onPointerUp={cancelPress}
                        onPointerLeave={cancelPress}
                        onPointerCancel={cancelPress}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <motion.div 
                            animate={{ scale: isPressing ? 0.98 : 1 }}
                            transition={{ duration: 0.2 }}
                            className={`
                                relative h-full min-h-[280px] bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl shadow-slate-200/60 flex flex-col overflow-hidden cursor-pointer
                                ${isPressing ? 'ring-2 ring-indigo-500/30' : ''}
                            `}
                        >
                            {/* ENERGY BAR - Invisible track, only fill shows */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent z-50">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: isPressing ? "100%" : "0%" }}
                                    transition={{ 
                                        duration: LONG_PRESS_DURATION / 1000, 
                                        ease: "linear" 
                                    }}
                                    className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                />
                            </div>

                            {/* Decoration - Clean Left Bar Only */}
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-indigo-500 rounded-l-2xl"></div>

                            <div className="p-6 flex flex-col h-full pt-8">
                                {/* TOPIC ROW */}
                                <div className="flex items-start space-x-4 mb-6 relative">
                                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100/50 shadow-sm">
                                        <BookOpen size={22} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-8">
                                        <h4 className="text-[10px] font-extrabold text-amber-600/70 uppercase tracking-widest mb-1">
                                            Haftanın Konusu
                                        </h4>
                                        <h3 className="text-xl font-heading font-bold text-slate-800 leading-tight">
                                            {topicClean}
                                        </h3>
                                    </div>
                                    
                                    {/* Note Exists Indicator - Slightly Outside Right */}
                                    {hasNote && (
                                        <div className="absolute -right-2 -top-1 flex items-center space-x-1.5 px-2.5 py-1 bg-white rounded-full border border-slate-100 shadow-sm z-30">
                                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                                            <span className="text-[9px] font-extrabold text-amber-600 tracking-widest uppercase">NOT</span>
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6"></div>

                                {/* OUTCOME */}
                                <div className="flex items-start space-x-4 flex-grow">
                                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100/50 shadow-sm">
                                        <Target size={22} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[10px] font-extrabold text-indigo-500/70 uppercase tracking-widest mb-1">
                                            {outcomeLabel}
                                        </h4>
                                        <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                            {outcomeClean}
                                        </p>
                                    </div>
                                </div>

                                {/* Hint Footer - Dynamic */}
                                <div className="mt-6 pt-2 flex items-center justify-center opacity-70">
                                    <AnimatePresence mode="wait">
                                        {isPressing ? (
                                            <motion.span 
                                                key="pressing"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100"
                                            >
                                                <Zap size={12} className="fill-indigo-600 animate-pulse" /> Not Açılıyor...
                                            </motion.span>
                                        ) : (
                                            <motion.span 
                                                key="idle"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 bg-white border border-slate-100 shadow-sm px-3 py-1.5 rounded-full"
                                            >
                                                <PenLine size={12} /> Not için basılı tut
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>


                    {/* --- BACK FACE (Note Taking) --- */}
                    <div 
                        className="card-face backface-hidden rotate-y-180"
                    >
                        <div className="h-full min-h-[280px] bg-[#fffdf5] border-2 border-amber-200/60 rounded-2xl p-1 relative shadow-xl shadow-amber-100/50 flex flex-col">
                            {/* Dot Grid Pattern */}
                            <div 
                                className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl" 
                                style={{ 
                                    backgroundImage: 'radial-gradient(#a1a1aa 1.5px, transparent 1.5px)', 
                                    backgroundSize: '20px 20px' 
                                }} 
                            />
                            
                            {/* Spiral Binding Effect */}
                            <div className="absolute left-4 top-0 bottom-0 w-8 border-r-2 border-double border-amber-100/50 pointer-events-none"></div>

                            <div className="relative p-5 flex flex-col h-full z-10 pl-8"> 
                                <div className="flex items-center justify-between mb-4 shrink-0 border-b border-amber-200/50 pb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-extrabold text-amber-800 uppercase tracking-widest flex items-center gap-2">
                                            <PenLine size={14} /> Not Defteri
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        {/* Clear Note Button */}
                                        {hasNote && (
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onNoteChange('')}
                                                className="p-1 text-amber-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                                                title="Notu Temizle"
                                            >
                                                <Trash2 size={14} />
                                            </motion.button>
                                        )}

                                        {/* Save Status */}
                                        {saveStatus !== 'idle' && (
                                            <div className="flex items-center space-x-1 text-[10px] font-bold text-amber-600">
                                                {saveStatus === 'saving' ? (
                                                    <span className="animate-pulse">Kaydediliyor...</span>
                                                ) : (
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.8 }} 
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="flex items-center bg-white px-2 py-0.5 rounded-full shadow-sm border border-amber-100"
                                                    >
                                                        <Save size={10} className="mr-1 text-emerald-500" /> 
                                                        <span className="text-emerald-600">Kaydedildi</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <textarea
                                    value={note}
                                    onChange={(e) => onNoteChange(e.target.value)}
                                    placeholder="Bu hafta için düşüncelerin, planların veya hatırlatmaların..."
                                    className="w-full flex-grow bg-transparent text-slate-700 text-sm leading-7 font-medium placeholder:text-slate-400/50 resize-none focus:outline-none"
                                    style={{ 
                                        lineHeight: '28px',
                                        backgroundImage: 'linear-gradient(transparent 27px, #e4e4e7 28px)',
                                        backgroundSize: '100% 28px',
                                        backgroundAttachment: 'local'
                                    }}
                                />

                                <div className="mt-4 flex justify-between items-center shrink-0">
                                    <span className="text-[9px] text-amber-700/40 font-bold uppercase">
                                        Otomatik Kayıt
                                    </span>
                                    <button 
                                        onClick={() => setIsFlipped(false)}
                                        className="group flex items-center space-x-2 px-4 py-2 bg-white hover:bg-amber-50 text-amber-800 rounded-lg text-xs font-bold transition-all shadow-sm border border-amber-100 hover:border-amber-300"
                                    >
                                        <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-500" />
                                        <span>Kartı Çevir</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ACTION BUTTONS ROW */}
            <div className="flex pt-2">
                {/* Complete Button - NOW FULL WIDTH */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleToggleWithConfetti}
                    className={`
                        w-full relative overflow-hidden h-14 rounded-2xl shadow-sm transition-all duration-300 group border
                        ${isCompleted 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/30' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-100'}
                    `}
                >
                     <div className={`absolute inset-0 bg-emerald-500 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-left ${isCompleted ? 'scale-x-100' : 'scale-x-0'}`} />

                    <div className="relative z-10 flex items-center justify-center space-x-3 h-full">
                        <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${isCompleted ? 'border-white bg-white/20' : 'border-current opacity-40 group-hover:opacity-100'}
                        `}>
                            {isCompleted && <Check size={14} strokeWidth={4} />}
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-sm font-bold tracking-tight">
                                {isCompleted ? 'Tamamlandı' : 'İşaretle'}
                            </span>
                            {!isCompleted && <span className="text-[9px] font-bold opacity-60 uppercase tracking-wider mt-0.5">Haftayı Bitir</span>}
                        </div>
                    </div>
                </motion.button>
            </div>
        </div>
    );
};
