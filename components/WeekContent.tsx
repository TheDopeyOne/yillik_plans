
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonPlan, RichNote, ChecklistItem } from '../types';
import { BookOpen, Check, Coffee, Target, PenLine, Save, RotateCcw, Zap, AlertCircle, Trash2, Image as ImageIcon, Mic, Square, CheckSquare, Plus, X, StopCircle, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeekContentProps {
    data: LessonPlan;
    isCompleted: boolean;
    onToggleComplete: () => void;
    note: RichNote;
    onNoteChange: (note: RichNote) => void;
    saveStatus: 'idle' | 'saving' | 'saved';
}

const AudioPlayer = ({ src, onDelete }: { src: string, onDelete: () => void }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <button onClick={togglePlay} className="w-8 h-8 flex items-center justify-center bg-indigo-500 rounded-full text-white">
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            <div className="flex-1 h-1 bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                <div className={`h-full bg-indigo-500 ${isPlaying ? 'animate-[pulse_1s_infinite]' : ''}`} style={{ width: '100%' }}></div>
            </div>
            <button onClick={onDelete} className="p-1.5 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg">
                <Trash2 size={14} />
            </button>
            <audio 
                ref={audioRef} 
                src={src} 
                onEnded={() => setIsPlaying(false)} 
                onPause={() => setIsPlaying(false)} 
                className="hidden" 
            />
        </div>
    );
};

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
    const [isZenMode, setIsZenMode] = useState(false);

    const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Audio State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    // Checklist Input State
    const [newItemText, setNewItemText] = useState("");

    // Safe Data Access
    const topic = data?.topic || "";
    const achievement = data?.achievement || "";
    const outcome = data?.outcome || "";

    const isActivity = /(TATİLİ|SOSYAL ETKİNLİK|PLANLAMA|ETKİNLİK HAFTASI)/i.test(topic || achievement || "");
    const isExam = /(SINAV HAFTASI|1\. Dönem \d\. Sınav|2\. Dönem \d\. Sınav)/i.test(topic || achievement || "");

    const topicClean = topic.replace(/\(.*\)/, '').trim();
    const outcomeClean = (outcome || achievement || "").trim();
    const outcomeLabel = outcome ? "Öğrenme Çıktısı" : "Kazanım";

    // Rich Note Checks
    const hasNoteContent = (note.text?.trim().length > 0) || (note.images?.length > 0) || !!note.audio || (note.checklist?.length > 0);
    const LONG_PRESS_DURATION = 600;

    // Body scroll lock effect for Zen Mode
    useEffect(() => {
        if (isZenMode) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isZenMode]);

    // --- Media Handlers ---

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            onNoteChange({
                ...note,
                images: [...(note.images || []), base64]
            });
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (index: number) => {
        const newImages = [...note.images];
        newImages.splice(index, 1);
        onNoteChange({ ...note, images: newImages });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;
                    onNoteChange({ ...note, audio: base64 });
                };
                reader.readAsDataURL(blob);
                
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Mic Error:", err);
            alert("Mikrofon izni verilemedi.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const deleteAudio = () => {
        onNoteChange({ ...note, audio: undefined });
    };

    // --- Checklist Handlers ---

    const addChecklistItem = () => {
        if (!newItemText.trim()) return;
        const newItem: ChecklistItem = {
            id: Date.now().toString(),
            text: newItemText,
            checked: false
        };
        onNoteChange({
            ...note,
            checklist: [...(note.checklist || []), newItem]
        });
        setNewItemText("");
    };

    const toggleCheckItem = (id: string) => {
        const newChecklist = note.checklist.map(item => 
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        onNoteChange({ ...note, checklist: newChecklist });
    };

    const deleteCheckItem = (id: string) => {
        const newChecklist = note.checklist.filter(item => item.id !== id);
        onNoteChange({ ...note, checklist: newChecklist });
    };

    // --- Standard Handlers ---

    const handleToggleWithConfetti = () => {
        if (!isCompleted) {
            const count = 200;
            const defaults = { origin: { y: 0.7 } };
            function fire(particleRatio: number, opts: any) {
                confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
            }
            fire(0.25, { spread: 26, startVelocity: 55, colors: ['#10b981', '#f59e0b', '#ffffff'] });
            fire(0.2, { spread: 60, colors: ['#10b981', '#f59e0b', '#ffffff'] });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#10b981', '#f59e0b', '#ffffff'] });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#10b981', '#f59e0b', '#ffffff'] });
            fire(0.1, { spread: 120, startVelocity: 45, colors: ['#10b981', '#f59e0b', '#ffffff'] });
        }
        onToggleComplete();
    };

    const startPress = () => {
        if (isFlipped) return;
        setIsPressing(true);
        if (pressTimer.current) clearTimeout(pressTimer.current);
        pressTimer.current = setTimeout(() => {
            setIsFlipped(true);
            setIsPressing(false);
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

    // --- Render Helper for Note Content (Used in both Card and Zen Mode) ---
    const renderNoteBody = (isZen: boolean = false) => (
        <div className={`flex-1 overflow-y-auto ${isZen ? 'p-8 space-y-8' : 'pl-10 pr-4 py-4 space-y-5'} relative z-10 custom-scrollbar`}>
            {/* 1. Text Area */}
            <textarea
                value={note.text || ''}
                onChange={(e) => onNoteChange({ ...note, text: e.target.value })}
                placeholder="Notlarınızı buraya yazın..."
                className={`w-full bg-transparent text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-400/50 resize-none focus:outline-none 
                    ${isZen ? 'text-lg leading-8 min-h-[40vh]' : 'text-sm leading-6 min-h-[60px]'}
                `}
            />

            {/* 2. Checklist */}
            <div className="space-y-2">
                {(note.checklist || []).map(item => (
                    <div key={item.id} className="flex items-start gap-2 group">
                        <button 
                            onClick={() => toggleCheckItem(item.id)}
                            className={`mt-0.5 shrink-0 ${item.checked ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}
                        >
                            {item.checked ? <CheckSquare size={isZen ? 20 : 18} /> : <Square size={isZen ? 20 : 18} />}
                        </button>
                        <span className={`${isZen ? 'text-base' : 'text-sm'} flex-1 break-words ${item.checked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                            {item.text}
                        </span>
                        <button 
                            onClick={() => deleteCheckItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-0.5 text-rose-400"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                
                <div className="flex items-center gap-2">
                    <Plus size={16} className="text-slate-400" />
                    <input 
                        type="text" 
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addChecklistItem()}
                        placeholder="Liste öğesi ekle..."
                        className={`bg-transparent focus:outline-none flex-1 text-slate-700 dark:text-slate-200 placeholder:text-slate-400/50 ${isZen ? 'text-base' : 'text-sm'}`}
                    />
                </div>
            </div>

            {/* 3. Audio & Images */}
            <div className="space-y-3">
                {note.audio && (
                    <AudioPlayer src={note.audio} onDelete={deleteAudio} />
                )}

                {note.images && note.images.length > 0 && (
                    <div className={`grid gap-3 ${isZen ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {note.images.map((img, idx) => (
                            <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
                                <img src={img} alt="Note attachment" className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderToolbar = (isZen: boolean = false) => (
         <div className={`p-2 border-t border-amber-200/50 dark:border-slate-700 relative z-10 flex gap-2 ${isZen ? 'px-8 py-4 bg-[#fffdf5]/50 dark:bg-slate-800/50' : 'pl-10'}`}>
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
            />
            <button 
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 rounded-xl border border-amber-100 dark:border-slate-600 shadow-sm flex items-center justify-center gap-2 font-bold text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-600 transition-colors
                     ${isZen ? 'py-3 bg-white/50 dark:bg-slate-700/50' : 'py-2 bg-white dark:bg-slate-700 text-xs'}
                `}
            >
                <ImageIcon size={isZen ? 16 : 14} /> Fotoğraf
            </button>
            
            <button 
                onClick={isRecording ? stopRecording : startRecording}
                className={`
                    flex-1 rounded-xl border shadow-sm flex items-center justify-center gap-2 font-bold transition-all
                    ${isZen ? 'py-3' : 'py-2 text-xs'}
                    ${isRecording 
                        ? 'bg-rose-500 border-rose-600 text-white animate-pulse' 
                        : `bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-600 ${isZen ? 'bg-white/50 dark:bg-slate-700/50' : ''}`}
                `}
            >
                {isRecording ? <StopCircle size={isZen ? 16 : 14} /> : <Mic size={isZen ? 16 : 14} />} 
                {isRecording ? 'Durdur' : 'Ses'}
            </button>
        </div>
    );

    if (isActivity) {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={(data?.range || "unknown") + "activity"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white shadow-lg shadow-blue-400/20 dark:shadow-none"
                >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex flex-row items-center space-x-5">
                        <div className="w-12 h-12 shrink-0 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner border border-white/20">
                            <Coffee size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-heading font-bold leading-tight">{topic || achievement}</h2>
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

    if (isExam) {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={(data?.range || "unknown") + "exam"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 p-6 text-white shadow-lg shadow-rose-500/20 dark:shadow-none border border-white/10"
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

            {/* ZEN MODE OVERLAY (PORTAL) */}
            {createPortal(
                <AnimatePresence>
                    {isZenMode && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-slate-200/95 dark:bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overscroll-none touch-none"
                        >
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="w-full max-w-2xl h-full max-h-[85vh] bg-[#fffdf5] dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-amber-200/60 dark:border-slate-600 flex flex-col relative overflow-hidden pointer-events-auto touch-auto"
                            >
                                {/* Zen Header */}
                                <div className="flex items-center justify-between p-6 border-b border-amber-200/50 dark:border-slate-700/50">
                                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-500">
                                        <span className="text-sm font-extrabold uppercase tracking-widest flex items-center gap-2">
                                            <Zap size={18} className="fill-amber-500" /> Odak Modu
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {saveStatus !== 'idle' && (
                                            <div className="flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-500 mr-2">
                                                {saveStatus === 'saving' ? (
                                                    <span className="animate-pulse">Kaydediliyor...</span>
                                                ) : (
                                                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><Save size={12} /> Kaydedildi</span>
                                                )}
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => setIsZenMode(false)}
                                            className="p-2 bg-white dark:bg-slate-700 rounded-xl border border-amber-100 dark:border-slate-600 shadow-sm text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                                            title="Küçült"
                                        >
                                            <Minimize2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Zen Body */}
                                <div className="flex-1 overflow-hidden flex flex-col relative">
                                    <div 
                                        className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" 
                                        style={{ 
                                            backgroundImage: 'radial-gradient(#a1a1aa 1.5px, transparent 1.5px)', 
                                            backgroundSize: '24px 24px' 
                                        }} 
                                    />
                                    {renderNoteBody(true)}
                                    {renderToolbar(true)}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <div className="perspective-1000 w-full">
                <motion.div
                    className="relative transform-style-3d w-full select-none"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* --- FRONT FACE (Lesson Content) --- */}
                    <div 
                        className="relative z-10 backface-hidden touch-none" 
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
                                relative min-h-[200px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/60 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none flex flex-col overflow-hidden transition-colors duration-300
                                ${isPressing ? 'ring-2 ring-indigo-500/30' : ''}
                            `}
                        >
                            {/* ... rest of the front face UI ... */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent z-50">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: isPressing ? "100%" : "0%" }}
                                    transition={{ duration: LONG_PRESS_DURATION / 1000, ease: "linear" }}
                                    className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                />
                            </div>

                            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-indigo-500 rounded-l-2xl"></div>

                            <div className="p-6 flex flex-col pt-8">
                                {/* TOPIC ROW */}
                                <div className="flex items-start space-x-4 mb-6 relative">
                                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-600 dark:text-amber-500 rounded-xl flex items-center justify-center border border-amber-100/50 dark:border-amber-800/30 shadow-sm">
                                        <BookOpen size={22} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-8">
                                        <h4 className="text-[10px] font-extrabold text-amber-600/70 dark:text-amber-500/70 uppercase tracking-widest mb-1">
                                            Haftanın Konusu
                                        </h4>
                                        <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                            {topicClean || "Konu Belirtilmemiş"}
                                        </h3>
                                    </div>
                                    
                                    {hasNoteContent && (
                                        <div className="absolute -right-2 -top-1 flex items-center space-x-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm z-30">
                                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                                            <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400 tracking-widest uppercase">NOT</span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-6"></div>

                                {/* OUTCOME */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-100/50 dark:border-indigo-800/30 shadow-sm">
                                        <Target size={22} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[10px] font-extrabold text-indigo-500/70 dark:text-indigo-400/70 uppercase tracking-widest mb-1">
                                            {outcomeLabel}
                                        </h4>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {outcomeClean || "Detay bulunmuyor."}
                                        </p>
                                    </div>
                                </div>

                                {/* Hint Footer */}
                                <div className="mt-6 pt-2 flex items-center justify-center opacity-70">
                                    <AnimatePresence mode="wait">
                                        {isPressing ? (
                                            <motion.span 
                                                key="pressing"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800"
                                            >
                                                <Zap size={12} className="fill-indigo-600 animate-pulse" /> Not Açılıyor...
                                            </motion.span>
                                        ) : (
                                            <motion.span 
                                                key="idle"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm px-3 py-1.5 rounded-full"
                                            >
                                                <PenLine size={12} /> Not için basılı tut
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>


                    {/* --- BACK FACE (Rich Media Note) --- */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 z-0">
                        <div className="h-full bg-[#fffdf5] dark:bg-slate-800 border-2 border-amber-200/60 dark:border-slate-600 rounded-2xl p-1 relative shadow-xl shadow-amber-100/50 dark:shadow-none flex flex-col transition-colors duration-300">
                            
                             <div 
                                className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none rounded-2xl" 
                                style={{ 
                                    backgroundImage: 'radial-gradient(#a1a1aa 1.5px, transparent 1.5px)', 
                                    backgroundSize: '20px 20px' 
                                }} 
                            />
                            
                            <div className="absolute left-4 top-0 bottom-0 w-8 border-r-2 border-double border-amber-100/50 dark:border-slate-700 pointer-events-none"></div>

                            {/* Header */}
                            <div className="relative z-10 p-4 border-b border-amber-200/50 dark:border-slate-700/50 flex items-center justify-between shrink-0 pl-10">
                                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-500">
                                    <span className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-2">
                                        <PenLine size={14} /> Not Defteri
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {saveStatus !== 'idle' && (
                                        <div className="flex items-center space-x-1 text-[10px] font-bold text-amber-600 dark:text-amber-500">
                                            {saveStatus === 'saving' ? (
                                                <span className="animate-pulse">Kaydediliyor...</span>
                                            ) : (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.8 }} 
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="flex items-center bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full shadow-sm border border-amber-100 dark:border-slate-700"
                                                >
                                                    <Save size={10} className="mr-1 text-emerald-500" /> 
                                                    <span className="text-emerald-600 dark:text-emerald-400">Kaydedildi</span>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => setIsZenMode(true)}
                                        className="p-1.5 bg-white dark:bg-slate-700 rounded-lg border border-amber-100 dark:border-slate-600 shadow-sm text-slate-600 dark:text-slate-300 hover:text-amber-600"
                                        title="Odak Modu"
                                    >
                                        <Maximize2 size={14} />
                                    </button>
                                    <button 
                                        onClick={() => setIsFlipped(false)}
                                        className="p-1.5 bg-white dark:bg-slate-700 rounded-lg border border-amber-100 dark:border-slate-600 shadow-sm text-slate-600 dark:text-slate-300 hover:text-amber-600"
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                </div>
                            </div>

                            {renderNoteBody()}
                            {renderToolbar()}

                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ACTION BUTTONS ROW */}
            <div className="flex pt-2">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleToggleWithConfetti}
                    className={`
                        w-full relative overflow-hidden h-14 rounded-2xl shadow-sm transition-all duration-300 group border
                        ${isCompleted 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/30 dark:shadow-none' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-100 dark:hover:shadow-none'}
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
