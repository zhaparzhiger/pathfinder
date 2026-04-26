'use client';

import { useLanguage } from '@/context/LanguageContext';
import { signout } from './login/actions';
import ProfileDropdown from '@/components/ProfileDropdown';

interface LandingClientProps {
  user: any;
  hasResults: boolean;
}

export default function LandingClient({ user, hasResults }: LandingClientProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans overflow-x-hidden">
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#E6DFD5] shadow-sm shadow-[#6FA8A3]/5 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-[1120px] mx-auto px-4 sm:px-6 h-16 sm:h-20">
          <a href="/" className="text-xl sm:text-2xl font-bold text-[#6FA8A3] tracking-tighter shrink-0">Pathfinder</a>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex items-center gap-4 mr-2">
              <div className="flex gap-2 text-[10px] sm:text-sm font-bold">
                <span className={`cursor-pointer px-1 ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('ru')}>RU</span>
                <span className="text-slate-200">|</span>
                <span className={`cursor-pointer px-1 ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('kz')}>KZ</span>
                <span className="text-slate-200">|</span>
                <span className={`cursor-pointer px-1 ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('en')}>EN</span>
              </div>
            </div>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <ProfileDropdown user={user} />
                <a href="/paywall" className="bg-[#6FA8A3] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap">
                  {hasResults ? t.nav.retake : t.nav.takeTest}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <a href="/login" className="text-slate-600 font-bold text-xs sm:text-sm hover:text-[#6FA8A3] transition-colors whitespace-nowrap">{t.nav.signIn}</a>
                <a href="/login?message=Create an account" className="bg-[#6FA8A3] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap">{t.nav.getStarted}</a>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Language Switcher */}
        <div className="sm:hidden border-t border-[#E6DFD5] bg-white/50 px-4 py-2 flex justify-center gap-6 text-[10px] font-bold">
          <span className={`cursor-pointer ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('ru')}>RU</span>
          <span className={`cursor-pointer ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('kz')}>KZ</span>
          <span className={`cursor-pointer ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400'}`} onClick={() => setLanguage('en')}>EN</span>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-[1120px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#6FA8A3]/10 text-[#6FA8A3] mb-6 sm:mb-8 font-bold text-[10px] sm:text-sm">
              <span className="material-symbols-outlined text-xs sm:text-sm">auto_awesome</span>
              <span className="uppercase tracking-wider">{t.hero.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#191c1c] max-w-3xl mx-auto mb-6 tracking-tight leading-[1.1]">
              {t.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <a href={user ? "/paywall" : "/login?message=Please sign in to take the test"} className="w-full sm:w-auto px-8 py-4 bg-[#6FA8A3] text-white rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">
                {t.hero.startTest}
              </a>
              <button className="w-full sm:w-auto px-8 py-4 bg-[#e9e2d7] text-[#2d6763] rounded-full font-bold text-sm sm:text-base hover:bg-[#ccc6bc] transition-all">
                {t.howItWorks.title}
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] sm:w-[120%] h-full -z-10 pointer-events-none opacity-40">
            <div className="absolute top-20 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-[#6FA8A3]/20 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#F4A261]/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F5F3EF]">
          <div className="max-w-[1120px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-4">{t.features.title}</h2>
              <p className="text-sm sm:text-base text-slate-600">{t.features.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E6DFD5]/50 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#6FA8A3]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#6FA8A3] text-2xl sm:text-3xl">school</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t.features.student.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6">{t.features.student.description}</p>
                <div className="flex items-center text-[#6FA8A3] font-bold gap-2 group-hover:gap-3 transition-all cursor-pointer text-sm">
                  <span>{t.features.learnMore}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E6DFD5]/50 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F4A261]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#F4A261] text-2xl sm:text-3xl">family_restroom</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t.features.parent.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6">{t.features.parent.description}</p>
                <div className="flex items-center text-[#6FA8A3] font-bold gap-2 group-hover:gap-3 transition-all cursor-pointer text-sm">
                  <span>{t.features.learnMore}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E6DFD5]/50 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#86513f]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#86513f] text-2xl sm:text-3xl">corporate_fare</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t.features.school.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6">{t.features.school.description}</p>
                <div className="flex items-center text-[#6FA8A3] font-bold gap-2 group-hover:gap-3 transition-all cursor-pointer text-sm">
                  <span>{t.features.learnMore}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-[1120px] mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-16">
              <div className="w-full md:w-1/2">
                <img className="w-full h-[300px] sm:h-[500px] object-cover rounded-2xl sm:rounded-3xl shadow-lg" alt="Students research" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVl_2QmxqJrD8krD_mzPIKqS9qTn-F9LR7QWiote7VhwQCMeIXYIQvLrmfCS7HMqqUWKyq5oNvrFoy8iGWA7RgribwefuoFI-7bTXXXAVV8i_J496cyphzXL8YG_Lg-SrqlrDg-ylOgLBI9oAZF3b3_PU4iKael0x52ucfRHswCR6PBHB8oFuusZSCHqx3CNIzIk17qRpEfy20iBu3bG0SSoMvPynkFHAlIEG6ayfr5N6VLz-NAg5jzLpjt-zzRteKaO76rP4lzF4"/>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12">{t.howItWorks.title}</h2>
                <div className="space-y-8 sm:space-y-12">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6FA8A3] text-white flex items-center justify-center font-bold text-base sm:text-lg">1</div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2">{t.howItWorks.step1.title}</h4>
                      <p className="text-sm sm:text-base text-slate-600">{t.howItWorks.step1.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6FA8A3] text-white flex items-center justify-center font-bold text-base sm:text-lg">2</div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2">{t.howItWorks.step2.title}</h4>
                      <p className="text-sm sm:text-base text-slate-600">{t.howItWorks.step2.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6FA8A3] text-white flex items-center justify-center font-bold text-base sm:text-lg">3</div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2">{t.howItWorks.step3.title}</h4>
                      <p className="text-sm sm:text-base text-slate-600">{t.howItWorks.step3.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-[1120px] mx-auto bg-[#2d6763] rounded-[1.5rem] sm:rounded-[2rem] p-8 sm:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full -mr-24 -mt-24 sm:-mr-32 sm:-mt-32 blur-3xl"></div>
            <div className="relative z-10 text-white">
              <h2 className="text-2xl sm:text-5xl font-bold mb-4 sm:mb-6">{t.cta.title}</h2>
              <p className="text-white/80 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10">{t.cta.subtitle}</p>
              <a href="/paywall" className="inline-block px-8 py-4 sm:px-10 sm:py-5 bg-white text-[#2d6763] rounded-full font-bold hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base">
                {t.cta.button}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-10 sm:py-12 px-4 sm:px-6 mt-auto bg-[#F5F3EF] border-t border-[#E6DFD5]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-[#6FA8A3] text-xl">Pathfinder</span>
            <p className="text-xs sm:text-sm text-slate-500 text-center md:text-left">{t.footer.copyright}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-xs sm:text-sm font-medium" href="#">{t.footer.privacy}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-xs sm:text-sm font-medium" href="#">{t.footer.terms}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-xs sm:text-sm font-medium" href="#">{t.footer.help}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-xs sm:text-sm font-medium" href="#">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
