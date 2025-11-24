
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Show the UI
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 z-[999] flex justify-center pointer-events-none"
                >
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-indigo-200 dark:border-indigo-800 shadow-2xl shadow-indigo-500/20 rounded-2xl p-4 w-full max-w-md pointer-events-auto flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
                            <Download className="text-white" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-slate-800 dark:text-white text-sm">Uygulamayı Yükle</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                                İnternet olmadan erişmek ve tam ekran deneyimi için ana ekrana ekle.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleClose}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X size={20} />
                            </button>
                            <button 
                                onClick={handleInstallClick}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
                            >
                                Yükle
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
