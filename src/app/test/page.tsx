'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import ProfileDropdown from '@/components/ProfileDropdown';
import { saveTestResult } from '@/app/actions';

const questions = [
  {
    id: 1,
    options: [
      { text: { ru: "Собирать или ремонтировать вещи", kz: "Заттарды жинау немесе жөндеу", en: "Building or repairing things" }, type: 'R' },
      { text: { ru: "Изучать научные теории", kz: "Ғылыми теорияларды зерттеу", en: "Studying scientific theories" }, type: 'I' }
    ]
  },
  {
    id: 2,
    options: [
      { text: { ru: "Рисовать или создавать дизайн", kz: "Сурет салу немесе дизайн жасау", en: "Drawing or designing" }, type: 'A' },
      { text: { ru: "Помогать людям решать проблемы", kz: "Адамдарға мәселелерді шешуге көмектесу", en: "Helping people solve problems" }, type: 'S' }
    ]
  },
  {
    id: 3,
    options: [
      { text: { ru: "Убеждать людей или продавать", kz: "Адамдарды сендіру немесе сату", en: "Persuading people or selling" }, type: 'E' },
      { text: { ru: "Работать с документами и данными", kz: "Құжаттармен және деректермен жұмыс істеу", en: "Working with documents and data" }, type: 'C' }
    ]
  }
];

export default function TestPage({ user }: { user: any }) {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      startTransition(async () => {
        const counts: Record<string, number> = {};
        newAnswers.forEach(ans => { counts[ans] = (counts[ans] || 0) + 1; });
        const sortedTypes = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const personalityType = sortedTypes.slice(0, 2).map(t => t[0]).join('');
        
        await saveTestResult(personalityType);
        router.push('/results');
      });
    }
  };

  const t = {
    ru: {
      question: "Вопрос",
      of: "из",
      complete: "Завершено",
      analyzing: "Анализируем ваши ответы...",
      wait: "Пожалуйста, подождите, пока мы рассчитываем ваш карьерный путь.",
      previous: "Назад",
    },
    kz: {
      question: "Сұрақ",
      of: "ішінен",
      complete: "аяқталды",
      analyzing: "Жауаптарыңызды талдаудамыз...",
      wait: "Сіздің оңтайлы мансап жолыңызды есептегенше күте тұрыңыз.",
      previous: "Артқа",
    },
    en: {
      question: "Question",
      of: "of",
      complete: "Complete",
      analyzing: "Analyzing your responses...",
      wait: "Please wait while we calculate your optimal career path.",
      previous: "Previous",
    }
  }[language] || { question: "Question", of: "of", complete: "Complete", analyzing: "Analyzing...", wait: "Wait...", previous: "Previous" };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#191c1c] font-sans overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E6DFD5] shadow-sm shadow-[#6FA8A3]/5">
        <div className="flex justify-between items-center max-w-[1040px] mx-auto px-4 sm:px-8 h-16 sm:h-20">
          <a href="/" className="text-xl sm:text-2xl font-bold text-[#6FA8A3] tracking-tighter">Pathfinder</a>
          <nav className="flex gap-4 sm:gap-8 items-center">
            <div className="flex gap-2 text-[10px] sm:text-sm font-bold">
              <span className={`cursor-pointer px-1 ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('ru')}>RU</span>
              <span className="text-slate-200">|</span>
              <span className={`cursor-pointer px-1 ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('kz')}>KZ</span>
              <span className="text-slate-200">|</span>
              <span className={`cursor-pointer px-1 ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('en')}>EN</span>
            </div>
            {user && <ProfileDropdown user={user} />}
          </nav>
        </div>
      </header>

      <main className="pt-[100px] sm:pt-[160px] pb-10 sm:pb-[120px] max-w-[1040px] mx-auto px-4 sm:px-8">
        {isPending ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 animate-in">
            <div className="w-16 h-16 border-4 border-[#6FA8A3]/20 border-t-[#6FA8A3] rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-bold mb-4">{t.analyzing}</h2>
            <p className="text-slate-500 max-w-sm">{t.wait}</p>
          </div>
        ) : (
          <div className="max-w-[640px] mx-auto">
            <div className="mb-12 sm:mb-24">
              <div className="flex justify-between items-end mb-4 px-1">
                <span className="text-[#6FA8A3] font-bold text-sm sm:text-base uppercase tracking-widest">
                  {t.question} {currentStep + 1} {t.of} {questions.length}
                </span>
                <span className="text-slate-400 font-bold text-xs sm:text-sm">{Math.round(progress)}% {t.complete}</span>
              </div>
              <div className="w-full h-2 sm:h-3 bg-[#E6DFD5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6FA8A3] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(111,168,163,0.4)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-8 sm:mb-12 leading-tight text-center sm:text-left">
              {language === 'ru' ? "Что вам ближе?" : language === 'kz' ? "Сізге не жақын?" : "What do you prefer?"}
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {currentQuestion.options.map((option: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(option.type)}
                  disabled={isPending} 
                  className="group relative bg-white border border-[#E6DFD5] p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:border-[#6FA8A3] transition-all duration-300 text-left flex items-center justify-between active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="text-slate-800 text-base sm:text-lg pr-4 font-bold leading-snug">
                    {option.text[language as keyof typeof option.text] || option.text['en']}
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-100 group-hover:border-[#6FA8A3] flex items-center justify-center transition-all flex-shrink-0 bg-slate-50 group-hover:bg-[#6FA8A3]/10">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#6FA8A3] scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-8 text-slate-400 font-bold hover:text-[#6FA8A3] transition-colors flex items-center gap-2 mx-auto sm:mx-0"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                {t.previous}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
