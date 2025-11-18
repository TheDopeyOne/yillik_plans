
import React from 'react';
import { GRADES } from '../services/planData';
import { Atom, BookOpen, Calculator, Telescope, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GradeSelectorProps {
    onSelect: (id: string) => void;
}

const icons = {
    atom: Atom,
    book: BookOpen,
    calculator: Calculator,
    telescope: Telescope,
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05 // Daha hızlı animasyon
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
};

export const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelect }) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 relative z-10 flex flex-col justify-center items-center h-full">
            <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-2 tracking-tight leading-tight">
                    Dersini Seç,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Planı Yakala.</span>
                </h1>
                <p className="text-sm md:text-base text-slate-600 font-medium max-w-md mx-auto leading-relaxed opacity-80">
                    Öğretmenler ve öğrenciler için tasarlanmış, odaklanmayı artıran modern takip sistemi.
                </p>
            </motion.div>

            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"
            >
                {GRADES.map((grade) => {
                    const Icon = icons[grade.icon];
                    // Dinamik gradient renkleri
                    const gradientMap: Record<string, string> = {
                        'bg-blue-500': 'from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 hover:shadow-blue-200/50',
                        'bg-indigo-500': 'from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300 hover:shadow-indigo-200/50',
                        'bg-violet-500': 'from-purple-50 to-fuchsia-50 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/50',
                        'bg-rose-500': 'from-rose-50 to-orange-50 border-rose-200 hover:border-rose-300 hover:shadow-rose-200/50',
                        'bg-slate-800': 'from-slate-50 to-gray-50 border-slate-300 hover:border-slate-400 hover:shadow-slate-200/50',
                    };
                    
                    const iconColorMap: Record<string, string> = {
                        'bg-blue-500': 'text-blue-600 bg-white shadow-blue-100',
                        'bg-indigo-500': 'text-indigo-600 bg-white shadow-indigo-100',
                        'bg-violet-500': 'text-purple-600 bg-white shadow-purple-100',
                        'bg-rose-500': 'text-rose-600 bg-white shadow-rose-100',
                        'bg-slate-800': 'text-slate-700 bg-white shadow-slate-100',
                    };

                    const cardStyle = gradientMap[grade.color] || 'from-white to-slate-50 border-slate-200';
                    const iconStyle = iconColorMap[grade.color] || 'text-slate-600 bg-white';

                    return (
                        <motion.button
                            key={grade.id}
                            variants={item}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelect(grade.id)}
                            className={`
                                group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300
                                bg-gradient-to-br ${cardStyle}
                                border backdrop-blur-sm shadow-md
                            `}
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/40 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-xl ${iconStyle} flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform duration-300`}>
                                        <Icon size={20} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-heading font-bold text-slate-800 tracking-tight leading-none">
                                            {grade.label}
                                        </h3>
                                        <p className="text-xs font-semibold text-slate-500 mt-1">
                                            {grade.subLabel}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
                                    <ChevronRight size={14} className="text-slate-400" />
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
};
