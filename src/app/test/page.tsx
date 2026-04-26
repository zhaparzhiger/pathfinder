'use client';

import { submitTest } from '../actions';
import { useState, useTransition, useEffect } from 'react';
import urusQuestions from '../../../urus.json';
import { useLanguage } from '@/context/LanguageContext';
import ProfileDropdown from '@/components/ProfileDropdown';
import { createClient } from '@/utils/supabase/client';

export default function TestPage() {
  const { language, setLanguage, t } = useLanguage();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    
    if (currentQuestionIdx < urusQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setAnswers(newAnswers);
      const formData = new FormData();
      formData.append('answers', JSON.stringify(newAnswers));
      startTransition(() => {
        submitTest(formData);
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const currentQuestion = urusQuestions[currentQuestionIdx];
  const progressPercent = Math.round(((currentQuestionIdx) / urusQuestions.length) * 100);

  // Strings for the test page
  const ui = {
    ru: {
      question: "Вопрос",
      of: "из",
      complete: "завершено",
      analyzing: "Анализируем ваши ответы...",
      wait: "Пожалуйста, подождите, пока мы рассчитываем ваш оптимальный карьерный путь.",
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
  }[language];

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#191c1c] font-sans">
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E6DFD5] shadow-sm shadow-[#6FA8A3]/5">
        <div className="flex justify-between items-center max-w-[1040px] mx-auto px-8 h-20">
          <a href="/" className="text-2xl font-bold text-[#6FA8A3] tracking-tighter">Pathfinder</a>
          <nav className="hidden md:flex gap-8 items-center">
            <div className="flex gap-2 text-sm font-medium ml-4">
              <span className={`cursor-pointer ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('ru')}>RU</span>
              <span className="text-slate-300">|</span>
              <span className={`cursor-pointer ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('kz')}>KZ</span>
              <span className="text-slate-300">|</span>
              <span className={`cursor-pointer ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('en')}>EN</span>
            </div>
          </nav>
          <div className="flex items-center gap-4">
             {user && <ProfileDropdown user={user} />}
          </div>
        </div>
      </header>

      <main className="pt-[160px] pb-[120px] max-w-[1040px] mx-auto px-8">
        <div className="max-w-[640px] mx-auto mb-24">
          <div className="flex justify-between items-end mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ui.question} {currentQuestionIdx + 1} {ui.of} {urusQuestions.length}</span>
            <span className="text-xs font-bold text-[#6FA8A3]">{progressPercent}% {ui.complete}</span>
          </div>
          <div className="h-[2px] w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#6FA8A3] transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <section className="max-w-[720px] mx-auto text-center">
          {isPending ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <div className="w-16 h-16 border-4 border-[#6FA8A3] border-t-transparent rounded-full animate-spin mb-8"></div>
              <h1 className="text-3xl font-bold text-[#191c1c]">{ui.analyzing}</h1>
              <p className="text-slate-500 mt-4">{ui.wait}</p>
            </div>
          ) : (
            <div className="min-h-[40vh]">
              <h1 className="text-2xl md:text-3xl font-bold text-[#191c1c] mb-12 leading-tight">
                {currentQuestion.question}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {currentQuestion.options.map((option: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => handleAnswer(option.type)}
                    disabled={isPending} 
                    className="group relative bg-white border border-[#E6DFD5] p-6 rounded-2xl shadow-sm hover:border-[#6FA8A3] transition-all duration-200 text-left flex items-center justify-between active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="text-slate-800 text-sm md:text-base pr-4 font-medium">
                      {option.text}
                    </span>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 group-hover:border-[#6FA8A3] flex items-center justify-center transition-colors flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#6FA8A3] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isPending && (
            <div className="flex items-center justify-between mt-12 pt-12 border-t border-[#E6DFD5]">
              <button 
                onClick={handlePrevious}
                disabled={currentQuestionIdx === 0}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors px-6 py-3 rounded-xl hover:bg-slate-100 disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                {ui.previous}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
