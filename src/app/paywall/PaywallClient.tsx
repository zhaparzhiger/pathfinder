'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function PaywallClient() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/test');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#E6DFD5] shadow-sm shadow-[#6FA8A3]/5 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-[1120px] mx-auto px-6 h-16">
          <a href="/" className="text-xl font-bold text-[#6FA8A3] tracking-tighter">Pathfinder</a>
          <div className="flex gap-2 text-sm font-medium">
            <span className={`cursor-pointer ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('ru')}>RU</span>
            <span className="text-slate-300">|</span>
            <span className={`cursor-pointer ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('kz')}>KZ</span>
            <span className="text-slate-300">|</span>
            <span className={`cursor-pointer ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('en')}>EN</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-[480px] w-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_24px_rgba(111,168,163,0.06)] border border-[#E6DFD5]/50 text-center">
          <div className="w-16 h-16 bg-[#6FA8A3]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#6FA8A3]">
            <span className="material-symbols-outlined text-4xl">lock</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{t.paywall.title}</h1>
          <p className="text-slate-600 mb-8">{t.paywall.description}</p>
          
          <div className="bg-[#F5F3EF] rounded-2xl p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-slate-500 uppercase">{t.paywall.oneTime}</span>
              <span className="text-2xl font-bold text-[#6FA8A3]">{t.paywall.price}</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="material-symbols-outlined text-[#6FA8A3] text-lg">check_circle</span>
                {t.paywall.feature1}
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="material-symbols-outlined text-[#6FA8A3] text-lg">check_circle</span>
                {t.paywall.feature2}
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="material-symbols-outlined text-[#6FA8A3] text-lg">check_circle</span>
                {t.paywall.feature3}
              </li>
            </ul>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 bg-[#6FA8A3] text-white rounded-full font-bold shadow-lg shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isProcessing ? t.paywall.processing : t.paywall.button}
          </button>
          
          <p className="mt-6 text-xs text-slate-400">{t.paywall.simulated}</p>
        </div>
      </main>
    </div>
  );
}
