import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Chatbot() {
  const [botOpen, setBotOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-24 right-6 z-[60]">
      <div className="relative">
        <button
          onClick={() => setBotOpen(!botOpen)}
          className="w-14 h-14 bg-[#004655] text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer outline-hidden border-none"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </button>

        <AnimatePresence>
          {botOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="absolute bottom-16 right-0 w-72 bg-[#FDFBF7] rounded-2xl shadow-2xl p-6 border border-slate-200 flex flex-col space-y-3"
            >
              <div className="flex justify-between items-center">
                <p className="font-headline-md text-[18px] text-[#004655] font-bold">{t('chatbot.title')}</p>
                <button
                  onClick={() => setBotOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {t('chatbot.welcome')}
              </p>
              <div className="space-y-2 pt-2">
                <button className="w-full text-left p-2.5 rounded bg-surface-container-low text-[12px] hover:bg-primary-fixed transition-colors text-slate-700 font-medium cursor-pointer">
                  {t('chatbot.bookingAvailability')}
                </button>
                <button className="w-full text-left p-2.5 rounded bg-surface-container-low text-[12px] hover:bg-primary-fixed transition-colors text-slate-700 font-medium cursor-pointer">
                  {t('chatbot.surfConditions')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
