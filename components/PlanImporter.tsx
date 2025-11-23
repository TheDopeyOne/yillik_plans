import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, ArrowRight, Check, AlertCircle, Trash2, Save, X, RefreshCw } from 'lucide-react';
import { parseWordFile, processTableData } from '../services/importService';
import { LessonPlan, ColumnMapping } from '../types';
import { saveCustomPlan } from '../services/planData';

interface PlanImporterProps {
    onClose: () => void;
}

type Step = 'upload' | 'map' | 'preview';

export const PlanImporter: React.FC<PlanImporterProps> = ({ onClose }) => {
    const [step, setStep] = useState<Step>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [rawTable, setRawTable] = useState<string[][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Mapping State
    const [mapping, setMapping] = useState<ColumnMapping>({
        dateIndex: 0,
        topicIndex: 1,
        outcomeIndex: 2
    });

    // Preview State
    const [plans, setPlans] = useState<LessonPlan[]>([]);
    const [planName, setPlanName] = useState("");
    const [subLabel, setSubLabel] = useState("Özel Plan");
    const [selectedColor, setSelectedColor] = useState("bg-slate-800");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const maxColumns = useMemo(() => {
        if (!rawTable || rawTable.length === 0) return 0;
        return rawTable.reduce((max, row) => Math.max(max, row?.length || 0), 0);
    }, [rawTable]);

    const columnOptions = useMemo(() => {
        return Array.from({ length: maxColumns }, (_, i) => i);
    }, [maxColumns]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setLoading(true);
        setError(null);

        try {
            const data = await parseWordFile(selectedFile);
            if (data.length < 2) throw new Error("Tablo çok kısa veya okunamadı.");
            
            setRawTable(data);
            setPlanName(selectedFile.name.replace('.docx', ''));
            setStep('map');
        } catch (err: any) {
            setError(err.message || "Dosya okunamadı.");
            setFile(null);
        } finally {
            setLoading(false);
        }
    };

    const handleGeneratePreview = () => {
        try {
            const generated = processTableData(rawTable, mapping);
            setPlans(generated);
            setStep('preview');
        } catch (err) {
            setError("Veri işlenirken hata oluştu.");
        }
    };

    const handleSave = () => {
        if (!planName) {
            setError("Lütfen plana bir isim verin.");
            return;
        }
        
        const newId = `custom-${Date.now()}`;
        const newPlanMeta = {
            id: newId,
            label: planName,
            subLabel: subLabel,
            icon: 'file-text' as const,
            color: selectedColor,
            isCustom: true
        };

        saveCustomPlan({
            id: newId,
            meta: newPlanMeta,
            data: plans
        });
        
        onClose();
    };

    const removeRow = (index: number) => {
        setPlans(prev => prev.filter((_, i) => i !== index));
    };

    const updateRow = (index: number, field: keyof LessonPlan, value: string) => {
        setPlans(prev => {
            const newPlans = [...prev];
            newPlans[index] = { ...newPlans[index], [field]: value };
            return newPlans;
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
            >
                {/* Modal Header */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Plan Sihirbazı</span>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    
                    {/* STEP 1: UPLOAD */}
                    {step === 'upload' && (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div 
                                className="w-full max-w-md h-64 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input type="file" accept=".docx" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                                {loading ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <p className="text-sm font-medium text-slate-500">Dosya Analiz Ediliyor...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Upload size={32} className="text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Word Dosyanı Yükle</h3>
                                        <p className="text-sm text-slate-500 mt-2 max-w-xs">.docx formatındaki yıllık plan dosyanı buraya sürükle veya seç.</p>
                                    </>
                                )}
                            </div>
                            {error && (
                                <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 rounded-xl text-sm flex items-center gap-2">
                                    <AlertCircle size={16} /> {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 2: MAP COLUMNS */}
                    {step === 'map' && (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-700 shrink-0">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Sütunları Eşleştir</h3>
                                <p className="text-sm text-slate-500">Word tablosundaki verileri doğru alanlarla eşleştir.</p>
                            </div>
                            
                            <div className="flex-1 overflow-auto p-6">
                                {/* Örnek Tablo */}
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto mb-6">
                                    <table className="w-full text-xs text-left whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                                {columnOptions.map((idx) => (
                                                    <th key={idx} className="p-3 font-bold text-slate-600 dark:text-slate-400 min-w-[100px]">Sütun {idx + 1}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rawTable.slice(0, 5).map((row, rIdx) => (
                                                <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                                                    {columnOptions.map((cIdx) => (
                                                        <td key={cIdx} className="p-3 text-slate-600 dark:text-slate-300 truncate max-w-[150px]">{row[cIdx] || ''}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Seçiciler */}
                                <div className="space-y-4">
                                    {[
                                        { label: 'Tarih / Hafta', sub: 'Örn: 08-12 Eylül', val: mapping.dateIndex, set: (v: number) => setMapping({...mapping, dateIndex: v}) },
                                        { label: 'Konu Başlığı', sub: 'Örn: Kuvvet ve Hareket', val: mapping.topicIndex, set: (v: number) => setMapping({...mapping, topicIndex: v}) },
                                        { label: 'Kazanım / Çıktı', sub: 'Detaylı açıklama', val: mapping.outcomeIndex, set: (v: number) => setMapping({...mapping, outcomeIndex: v}) },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <div>
                                                <span className="font-bold text-sm text-slate-700 dark:text-slate-300 block">{item.label}</span>
                                                <span className="text-xs text-slate-400">{item.sub}</span>
                                            </div>
                                            <select 
                                                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={item.val}
                                                onChange={(e) => item.set(Number(e.target.value))}
                                            >
                                                {columnOptions.map((idx) => <option key={idx} value={idx}>Sütun {idx + 1}</option>)}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                                <button onClick={() => setStep('upload')} className="text-slate-500 hover:text-slate-800 text-sm font-bold">Geri</button>
                                <button onClick={handleGeneratePreview} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/30">Önizle <ArrowRight size={16} /></button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: PREVIEW & EDIT */}
                    {step === 'preview' && (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-700 shrink-0 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Son Kontrol</h3>
                                        <p className="text-xs text-slate-500">{plans.length} hafta tespit edildi. Hataları düzeltebilirsin.</p>
                                    </div>
                                    {error && <span className="text-xs text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded">{error}</span>}
                                </div>
                                
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="flex-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Plan Adı</label>
                                        <input 
                                            type="text" 
                                            value={planName} 
                                            onChange={(e) => setPlanName(e.target.value)} 
                                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-indigo-500 placeholder-slate-400" 
                                            placeholder="Örn: 10-C" 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Ders Adı</label>
                                        <input 
                                            type="text" 
                                            value={subLabel} 
                                            onChange={(e) => setSubLabel(e.target.value)} 
                                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-indigo-500 placeholder-slate-400" 
                                            placeholder="Örn: Fizik" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Kart Rengi</label>
                                        <div className="flex gap-1">
                                            {['bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-indigo-500'].map(color => (
                                                <button 
                                                    key={color} 
                                                    onClick={() => setSelectedColor(color)} 
                                                    className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-slate-400' : 'opacity-50 hover:opacity-100'} transition-all`} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50 custom-scrollbar">
                                {plans.map((row, idx) => (
                                    <div key={idx} className="group flex gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 transition-colors">
                                        <div className="flex flex-col w-10 items-center justify-center border-r border-slate-100 dark:border-slate-700 pr-3"><span className="text-[10px] font-bold text-slate-400">{idx + 1}</span></div>
                                        <div className="flex-1 space-y-2 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    value={row.range} 
                                                    onChange={(e) => updateRow(idx, 'range', e.target.value)}
                                                    className="text-xs font-extrabold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded w-24 text-center focus:ring-1 focus:ring-indigo-500 outline-none" 
                                                />
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">{row.displayMonth}</span>
                                            </div>
                                            <input 
                                                value={row.topic} 
                                                onChange={(e) => updateRow(idx, 'topic', e.target.value)}
                                                className="w-full text-sm font-bold text-slate-800 dark:text-slate-200 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 outline-none transition-colors" 
                                            />
                                            <textarea 
                                                value={row.outcome || ''} 
                                                onChange={(e) => updateRow(idx, 'outcome', e.target.value)}
                                                className="w-full text-xs text-slate-500 dark:text-slate-400 bg-transparent resize-none outline-none border-b border-transparent hover:border-slate-200 focus:border-indigo-500 h-8"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => removeRow(idx)} 
                                            className="opacity-0 group-hover:opacity-100 p-2 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-all self-center"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                                <button onClick={() => setStep('map')} className="text-slate-500 hover:text-slate-800 text-sm font-bold">Geri</button>
                                <button 
                                    onClick={handleSave}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/30"
                                >
                                    <Save size={16} /> Planı Kaydet
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
