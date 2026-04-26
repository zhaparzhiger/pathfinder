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
    <div className="min-h-screen bg-[#F5F3EF] flex flex-col font-sans">
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-[#E6DFD5] dark:border-slate-800 shadow-sm shadow-[#6FA8A3]/5 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-[1120px] mx-auto px-6 h-16">
          <a href="/" className="text-xl font-bold text-[#6FA8A3] dark:text-[#88C4BF] tracking-tighter">Pathfinder</a>
          <div className="hidden md:flex items-center gap-8">
            {hasResults && (
              <a className="text-slate-600 dark:text-slate-400 hover:text-[#6FA8A3] transition-colors font-medium tracking-tight" href="/results">{t.nav.myResults}</a>
            )}
            <div className="flex gap-2 text-sm font-medium ml-4">
              <span className={`cursor-pointer ${language === 'ru' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('ru')}>RU</span>
              <span className="text-slate-300">|</span>
              <span className={`cursor-pointer ${language === 'kz' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('kz')}>KZ</span>
              <span className="text-slate-300">|</span>
              <span className={`cursor-pointer ${language === 'en' ? 'text-[#6FA8A3]' : 'text-slate-400 hover:text-slate-600'}`} onClick={() => setLanguage('en')}>EN</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <ProfileDropdown user={user} />
                <a href="/paywall" className="bg-[#6FA8A3] text-white px-5 py-2.5 rounded-full font-button text-label-md shadow-md shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all">
                  {hasResults ? t.nav.retake : t.nav.takeTest}
                </a>
              </div>
            ) : (
              <>
                <a href="/login" className="hidden sm:block text-slate-600 dark:text-slate-400 font-button text-label-md hover:text-[#6FA8A3] transition-colors">{t.nav.signIn}</a>
                <a href="/login?message=Create an account" className="bg-[#6FA8A3] text-white px-5 py-2.5 rounded-full font-button text-label-md shadow-md shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all">{t.nav.getStarted}</a>
              </>
            )}
          </div>
        </div>
      </nav>
      <main>
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="max-w-[1120px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6FA8A3]/10 text-[#6FA8A3] mb-8 font-label-md">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>{t.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#191c1c] max-w-3xl mx-auto mb-6 tracking-tight">{t.hero.title}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">{t.hero.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/paywall" className="w-full sm:w-auto px-8 py-4 bg-[#6FA8A3] text-white rounded-full font-button text-button shadow-lg shadow-[#6FA8A3]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">
                {t.hero.startTest}
              </a>
              <button className="w-full sm:w-auto px-8 py-4 bg-[#e9e2d7] text-[#2d6763] rounded-full font-button text-button hover:bg-[#ccc6bc] transition-all">
                {t.hero.howItWorks}
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full -z-10 pointer-events-none opacity-40">
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#6FA8A3]/20 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section className="py-24 px-6 bg-[#F5F3EF]">
          <div className="max-w-[1120px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.features.title}</h2>
              <p className="text-slate-600">{t.features.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E6DFD5]/50 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#6FA8A3]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#6FA8A3] text-3xl">school</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t.features.student.title}</h3>
                <p className="text-slate-600 mb-6">{t.features.student.description}</p>
                <div className="flex items-center text-[#6FA8A3] font-bold gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  <span>{t.features.learnMore}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E6DFD5]/50 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#F4A261]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#F4A261] text-3xl">family_restroom</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t.features.parent.title}</h3>
                <p className="text-slate-600 mb-6">{t.features.parent.description}</p>
                <div className="flex items-center text-[#6FA8A3] font-bold gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  <span>{t.features.learnMore}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E6DFD5]/50 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#86513f]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#86513f] text-3xl">corporate_fare</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t.features.school.title}</h3>
                <p className="text-slate-600 mb-6">{t.features.school.description}</p>
                <div className="flex items-center text-[#6FA8A3] font-bold gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  <span>{t.features.learnMore}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-[1120px] mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <img className="w-full h-[500px] object-cover rounded-3xl shadow-lg" alt="Students research" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVl_2QmxqJrD8krD_mzPIKqS9qTn-F9LR7QWiote7VhwQCMeIXYIQvLrmfCS7HMqqUWKyq5oNvrFoy8iGWA7RgribwefuoFI-7bTXXXAVV8i_J496cyphzXL8YG_Lg-SrqlrDg-ylOgLBI9oAZF3b3_PU4iKael0x52ucfRHswCR6PBHB8oFuusZSCHqx3CNIzIk17qRpEfy20iBu3bG0SSoMvPynkFHAlIEG6ayfr5N6VLz-NAg5jzLpjt-zzRteKaO76rP4lzF4"/>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">{t.howItWorks.title}</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6FA8A3] text-white flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{t.howItWorks.step1.title}</h4>
                      <p className="text-slate-600">{t.howItWorks.step1.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6FA8A3] text-white flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{t.howItWorks.step2.title}</h4>
                      <p className="text-slate-600">{t.howItWorks.step2.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6FA8A3] text-white flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{t.howItWorks.step3.title}</h4>
                      <p className="text-slate-600">{t.howItWorks.step3.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-[1120px] mx-auto bg-[#2d6763] rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">{t.cta.subtitle}</p>
              <a href="/paywall" className="inline-block px-10 py-5 bg-white text-[#2d6763] rounded-full font-bold hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                {t.cta.button}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-6 mt-auto bg-[#F5F3EF] dark:bg-slate-950 border-t border-[#E6DFD5] dark:border-slate-800">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-[#6FA8A3] text-xl">Pathfinder</span>
            <p className="text-sm text-slate-500">{t.footer.copyright}</p>
          </div>
          <div className="flex gap-8">
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-sm" href="#">{t.footer.privacy}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-sm" href="#">{t.footer.terms}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-sm" href="#">{t.footer.help}</a>
            <a className="text-slate-500 hover:text-[#6FA8A3] transition-colors text-sm" href="#">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
