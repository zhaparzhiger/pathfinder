'use client';

import { useLanguage } from '@/context/LanguageContext';
import { signout } from '../login/actions';
import ProfileDropdown from '@/components/ProfileDropdown';

interface ResultsClientProps {
  user: any;
  result: any;
}

export default function ResultsClient({ user, result }: ResultsClientProps) {
  const { language, setLanguage, t } = useLanguage();

  // Look up personality type and careers by code
  const code = result?.personality_type || 'default';
  const riasecInfo = t.riasec[code] || t.riasec['default'];
  
  const personalityType = riasecInfo.type;
  const topCareers = riasecInfo.careers.map((c: string, i: number) => ({
    title: c,
    desc: language === 'ru' ? 'Анализируйте сложные системы и данные для внедрения инноваций.' : 
          language === 'kz' ? 'Инновацияларды енгізу үшін күрделі жүйелер мен деректерді талдаңыз.' : 
          'Analyze complex systems and data to drive innovation.',
    icon: i === 0 ? 'analytics' : i === 1 ? 'biotech' : 'architecture',
    fit: i === 0 ? '98%' : i === 1 ? '92%' : '89%'
  }));

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans text-[#191c1c] overflow-x-hidden">
      <header className="bg-white/90 backdrop-blur-md border-b border-[#E6DFD5] shadow-sm shadow-[#6FA8A3]/5 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-[1120px] mx-auto px-4 sm:px-6 h-16 sm:h-20">
          <div className="flex items-center gap-4 sm:gap-8 overflow-hidden">
            <a href="/" className="text-xl sm:text-2xl font-bold text-[#6FA8A3] tracking-tighter shrink-0">Pathfinder</a>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-[#6FA8A3] font-bold border-b-2 border-[#6FA8A3] pb-1 text-sm" href="#">{t.nav.results}</a>
              <div className="flex gap-2 text-sm font-medium ml-4">
                <span className={`cursor-pointer px-1 ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('ru')}>RU</span>
                <span className="text-slate-200">|</span>
                <span className={`cursor-pointer px-1 ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('kz')}>KZ</span>
                <span className="text-slate-200">|</span>
                <span className={`cursor-pointer px-1 ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('en')}>EN</span>
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="md:hidden flex gap-3 text-[10px] font-bold mr-2">
              <span className={`${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('ru')}>RU</span>
              <span className={`${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('kz')}>KZ</span>
              <span className={`${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('en')}>EN</span>
            </div>
            <ProfileDropdown user={user} />
            <a href="/paywall" className="bg-[#6FA8A3] text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full sm:rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap">
              {t.nav.retake}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <section className="mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-[0_4px_24px_rgba(111,168,163,0.06)] flex flex-col md:flex-row items-center gap-8 sm:gap-10">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40 sm:w-64 sm:h-64 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#6FA8A3]/20 to-[#F4A261]/10">
                <div className="w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img className="w-full h-full object-cover" alt="Artistic visual" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU8D3o61CBImSeWH49aqpJmLGeSMU_jWTzkwsUoJcGRM3FqL_xelRbKMd5mVOtrHp9E0G_ZhVraaRvwiGJRVFcxrRPi8LmYrdSc16gWspt-mZ9eWxpMtbQSxOM9qAtNdd9en8rhl5yrkhRFMqnkk2U1-sQgEF9gPjckBBWt_GXgAnbnYFDXZEIJfka9sTL_y_SbV2Jq0-y1j464YcnRmhQSnSifxr_J979-w-l9vtTOLGG2aRe13hfF9O9KXwKiYyh5e_dc784Fgo"/>
                </div>
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm sm:text-base text-[#6FA8A3]">psychology</span>
                  <span className="font-bold text-xs sm:text-sm text-slate-800">{t.results.matchRate}</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F4A261]/15 text-[#F4A261] font-bold text-xs mb-4 uppercase tracking-wider">{t.results.personalityBadge}</span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{personalityType}</h1>
              <p className="text-sm sm:text-lg text-slate-600 mb-6 leading-relaxed">
                {language === 'ru' ? 'Вы преуспеваете в среде, требующей тщательного анализа, логических рассуждений и структурированной организации. Ваша сила заключается в том, чтобы брать сложные данные и превращать их в четкие, действенные планы.' : 
                 language === 'kz' ? 'Сіз мұқият талдауды, логикалық пайымдауды және құрылымдық ұйымдастыруды қажет ететін ортада жақсы жұмыс істейсіз. Сіздің күшіңіз күрделі деректерді қабылдап, оларды анық, іс-әрекетке бағытталған жоспарларға айналдыруда.' : 
                 'You thrive in environments that require careful analysis, logical reasoning, and structured organization. Your strength lies in taking complex data and turning it into clear, actionable plans.'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#6FA8A3]/10 text-[#6FA8A3] rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm">
                  {language === 'ru' ? 'Аналитическое мышление' : language === 'kz' ? 'Аналитикалық ойлау' : 'Analytical Thinking'}
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#6FA8A3]/10 text-[#6FA8A3] rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm">
                  {language === 'ru' ? 'Решение проблем' : language === 'kz' ? 'Мәселелерді шешу' : 'Problem Solver'}
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#6FA8A3]/10 text-[#6FA8A3] rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm">
                  {language === 'ru' ? 'Внимание к деталям' : language === 'kz' ? 'Егжей-тегжейге назар аудару' : 'Detail-Oriented'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{t.results.recommendedCareers}</h2>
              <p className="text-sm sm:text-base text-slate-500">{t.results.recommendedCareersSubtitle}</p>
            </div>
            <button className="text-[#6FA8A3] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm sm:text-base">
              {t.results.viewAllPaths} <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {topCareers.map((career: any, i: number) => (
              <div key={i} className="group bg-white p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#6FA8A3]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 text-[#6FA8A3]">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">{career.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">{career.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">{career.desc}</p>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-bold text-slate-400">{career.fit} Fit</span>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#6FA8A3] transition-colors">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-50">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-[#6FA8A3]">payments</span>
              <h2 className="text-xl sm:text-2xl font-bold">{t.results.marketPotential}</h2>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs">{t.results.salaryRange}</span>
                  <span className="font-bold text-xl sm:text-2xl text-[#6FA8A3]">450,000 - 1,200,000 ₸</span>
                </div>
                <div className="w-full h-3 sm:h-4 bg-[#E6DFD5] rounded-full overflow-hidden flex">
                  <div className="w-1/4 h-full bg-slate-200"></div>
                  <div className="w-1/2 h-full bg-[#6FA8A3]"></div>
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-[#F5F3EF] rounded-xl sm:rounded-2xl">
                <h4 className="font-bold text-sm sm:text-base text-slate-800 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm sm:text-base">trending_up</span>
                  {t.results.highDemand}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.results.demandDesc}</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 bg-[#2d6763] p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-white shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-6">{t.results.whyFitsTitle}</h2>
              <ul className="space-y-4 sm:space-y-6">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-teal-200 text-sm sm:text-base shrink-0">check_circle</span>
                    <p className="text-teal-50 text-xs sm:text-sm leading-relaxed">
                      {item === 1 ? (language === 'ru' ? "Ваш низкий балл по шкале 'Экстраверсия' означает глубокую работу." : t.riasec[code]?.type) :
                       item === 2 ? (language === 'ru' ? "Высокая 'Добросовестность' гарантирует успех." : "High Conscientiousness") :
                       (language === 'ru' ? "Природное 'Любопытство' ведет к росту." : "Natural Curiosity")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 px-2">{t.results.recommendedUnis}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-4 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-50 flex flex-row items-center gap-4 sm:gap-6 group hover:border-[#6FA8A3]/30 transition-all">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Uni 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwCpUMgH_4KopNFkxP0nvKH9oXcCT5VByD3NmQAM-FoWGSrfvbeLVj7M0mhbFj7nBMF_s3WHXspesbwrkN559Ky2oX0Z5XdjgutMyQKxZXSif33ROB2_481VHnm7hDp9zHabladupMKYqi1YqK2SQ6BjpN8iwtqE86RjSb-aiPc9KUqCFsMY4TGOSQBq3Cowtcepziapa0ncvpLJcA7Gsh3xaSSib9YuJ2wxLfwudr1vtr2vj-kdNjq82jjDrM7V6Hw4Wem9U5Q4c"/>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">Nazarbayev University</h3>
                  <span className="text-[8px] sm:text-[10px] font-bold text-[#6FA8A3] bg-[#6FA8A3]/10 px-2 py-0.5 rounded uppercase shrink-0">{t.results.rank1}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Astana, Kazakhstan</p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] sm:text-xs font-bold flex items-center gap-1 text-slate-400">
                    <span className="material-symbols-outlined text-[12px] sm:text-sm">school</span> Data Sci, AI
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-50 flex flex-row items-center gap-4 sm:gap-6 group hover:border-[#6FA8A3]/30 transition-all">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Uni 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Q6t8poIujoOo_TOKYg36lxKFz1VHeKYPLQPsCCKa59XIDgEVPCe9Gp7h3oOkwIUUR9x7jXKa9DRml2wCo8KHQCzFYuul5v5RfMGgCLG1P1_lehp3z6GOqy4yKXq8iMC0nCyBC4zBjHPDwlx_jHam9mUStgmsMGDLUZkUBp_6nNy0y-sVP_dbHEbQEdwvf4sZwxBZuUjvDj8xT3PibmrftU9GBG84Ki3ZgUcpziprzZa4T1xA5RjUtpYZ5IJoKIXSbgp3957lrzM"/>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">KBTU</h3>
                  <span className="text-[8px] sm:text-[10px] font-bold text-[#6FA8A3] bg-[#6FA8A3]/10 px-2 py-0.5 rounded uppercase shrink-0">{t.results.topTech}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Almaty, Kazakhstan</p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] sm:text-xs font-bold flex items-center gap-1 text-slate-400">
                    <span className="material-symbols-outlined text-[12px] sm:text-sm">school</span> Software Eng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 sm:py-12 px-4 sm:px-6 mt-auto bg-[#F5F3EF] border-t border-[#E6DFD5]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-[#6FA8A3] text-lg sm:text-xl">Pathfinder</span>
            <p className="text-[10px] sm:text-sm text-slate-500 text-center">{t.footer.copyright}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] sm:text-sm font-medium">
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors" href="#">{t.footer.help}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors" href="#">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
