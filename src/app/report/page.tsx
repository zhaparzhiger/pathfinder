export default function ReportPage() {
  return (
    <>
      <div>
  
  <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50">
    <div className="max-w-[1040px] mx-auto px-8 h-20 flex justify-between items-center">
      <div className="text-2xl font-bold text-stone-900 tracking-tighter font-display">Pathfinder</div>
      <nav className="hidden md:flex items-center gap-8">
        <a className="text-teal-600 font-semibold border-b-2 border-teal-600 pb-1 font-manrope transition-all duration-300" href="#">Assessments</a>
        <a className="text-stone-500 font-medium font-manrope hover:text-teal-500 transition-all duration-300" href="#">Careers</a>
        <a className="text-stone-500 font-medium font-manrope hover:text-teal-500 transition-all duration-300" href="#">Mentors</a>
        <a className="text-stone-500 font-medium font-manrope hover:text-teal-500 transition-all duration-300" href="#">Library</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="p-2 text-stone-500 hover:text-teal-600 transition-transform active:scale-95">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
        </button>
        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border border-stone-200/50">
          <img alt="User profile avatar" className="w-full h-full object-cover" data-alt="portrait of a young professional woman with a soft smile in minimalist natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQx7C9zjN4QE-wusYykkIBdNaHyF0L_hEUqOBTo9eokdEIA9f2tQb4duquXQbd8yu9NyT4gt7dF3ilIQWgJz0bgMj-BNIOHHIT0tscmhKzwbvoD9wyHiDqEfW6ITYnXVO-4RZlqpyj-b1lGINCtqRrK1q4qDp5fijCKpY9VRDeNG691qvO2_2CtWdv-gvVeePLue2YC38hdYnG2s_snhdxa1n8Q5Sy--xTFGXKio4Oi6IqM000FWbtvqcCnz8mKGY5UUIcyoIeFw" />
        </div>
      </div>
    </div>
  </header>
  <main className="pt-32 pb-section-gap">
    <div className="max-w-[1040px] mx-auto px-8">
      
      <section className="text-center mb-section-gap">
        <div className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps mb-8">
          ASSESSMENT COMPLETE
        </div>
        <h1 className="font-display text-display text-on-surface mb-6 max-w-2xl mx-auto">
          A deeper look into your professional path.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          We've analyzed your responses. Your 20-page personalized report is ready to help you navigate your next decade with clarity.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-12 gap-grid-gutter mb-section-gap">
        <div className="md:col-span-7 bg-surface-container-lowest p-container-padding rounded-[24px] ambient-shadow border border-outline-variant/30 flex flex-col justify-between min-h-[320px]">
          <div>
            <span className="material-symbols-outlined text-primary mb-6" data-icon="auto_awesome" style={{fontSize: 32}}>auto_awesome</span>
            <h2 className="font-h2 text-h2 mb-4">Personalized Career Matches</h2>
            <p className="font-body-md text-on-surface-variant">Three high-fidelity career paths tailored to your personality, skill set, and long-term fulfillment goals.</p>
          </div>
          <div className="mt-8 flex gap-2 overflow-hidden">
            <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-caps font-label-caps">Strategic Lead</span>
            <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-caps font-label-caps">UX Researcher</span>
            <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-caps font-label-caps">Creative Director</span>
          </div>
        </div>
        <div className="md:col-span-5 bg-surface-container-lowest p-container-padding rounded-[24px] ambient-shadow border border-outline-variant/30 flex flex-col justify-center text-center">
          <span className="material-symbols-outlined text-primary mb-6" data-icon="description" style={{fontSize: 48}}>description</span>
          <h3 className="font-h1 text-h1 mb-2">20</h3>
          <p className="font-label-caps text-label-caps text-on-surface-variant">PAGES OF INSIGHT</p>
        </div>
        <div className="md:col-span-4 bg-surface-container-lowest p-container-padding rounded-[24px] ambient-shadow border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary mb-4" data-icon="psychology">psychology</span>
          <h3 className="font-h2 text-h2 mb-2">Cognitive Map</h3>
          <p className="font-body-md text-on-surface-variant">Understand how you solve problems and handle professional pressure.</p>
        </div>
        <div className="md:col-span-8 bg-surface-container-lowest p-container-padding rounded-[24px] ambient-shadow border border-outline-variant/30 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
          <div className="flex-1">
            <span className="material-symbols-outlined text-primary mb-4" data-icon="timeline">timeline</span>
            <h3 className="font-h2 text-h2 mb-2">Skill Gap Analysis</h3>
            <p className="font-body-md text-on-surface-variant">A concrete roadmap of what to learn next to reach your target salary bracket.</p>
          </div>
          <div className="w-full md:w-48 h-32 bg-surface-container-high rounded-xl relative overflow-hidden shrink-0">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary-container opacity-20" />
            <div className="absolute bottom-0 left-4 w-4 h-24 bg-primary-container rounded-t-lg" />
            <div className="absolute bottom-0 left-12 w-4 h-16 bg-primary-container/60 rounded-t-lg" />
            <div className="absolute bottom-0 left-20 w-4 h-28 bg-primary-container/80 rounded-t-lg" />
          </div>
        </div>
      </section>
      
      <section className="flex justify-center">
        <div className="w-full max-w-lg bg-surface-container-lowest p-container-padding rounded-[24px] ambient-shadow border border-outline-variant/30 text-center">
          <h2 className="font-h2 text-h2 mb-2">Full Access</h2>
          <p className="font-body-md text-on-surface-variant mb-8">One-time payment for lifetime access to your report.</p>
          <div className="mb-10">
            <span className="text-on-surface font-display text-[40px] font-bold">4,900</span>
            <span className="text-on-surface-variant font-display text-h1 font-medium ml-1">₸</span>
          </div>
          <ul className="text-left space-y-4 mb-10 max-w-xs mx-auto">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" data-icon="check_circle" style={{fontSize: 20}}>check_circle</span>
              <span className="font-body-md">Complete PDF Career Dossier</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" data-icon="check_circle" style={{fontSize: 20}}>check_circle</span>
              <span className="font-body-md">Personalized Mentor Recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" data-icon="check_circle" style={{fontSize: 20}}>check_circle</span>
              <span className="font-body-md">Salary Benchmarks for Your Region</span>
            </li>
          </ul>
          <button className="w-full py-5 px-8 bg-primary-container text-on-primary rounded-xl font-body-lg font-semibold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all duration-300">
            Unlock Full Report
          </button>
          <p className="mt-6 font-label-caps text-label-caps text-stone-400">
            SECURE ENCRYPTED PAYMENT
          </p>
        </div>
      </section>
      
      <section className="mt-section-gap text-center max-w-lg mx-auto">
        <div className="w-12 h-1 px-4 bg-outline-variant/30 mx-auto mb-8" />
        <p className="font-body-md text-on-surface-variant italic leading-relaxed">
          "Our goal isn't just to find you a job, but to help you find a place where your unique talents feel at home."
        </p>
        <p className="mt-4 font-label-caps text-label-caps text-on-surface-variant">— THE PATHFINDER TEAM</p>
      </section>
    </div>
  </main>
  
  <footer className="bg-stone-50 border-t border-stone-200 py-24">
    <div className="max-w-[1040px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-lg font-semibold text-stone-800 font-manrope">Pathfinder</div>
      <nav className="flex flex-wrap justify-center gap-8">
        <a className="font-manrope text-sm tracking-wide text-stone-400 hover:text-teal-600 underline underline-offset-8 decoration-2 transition-all" href="#">Privacy</a>
        <a className="font-manrope text-sm tracking-wide text-stone-400 hover:text-teal-600 underline underline-offset-8 decoration-2 transition-all" href="#">Terms</a>
        <a className="font-manrope text-sm tracking-wide text-stone-400 hover:text-teal-600 underline underline-offset-8 decoration-2 transition-all" href="#">Support</a>
        <a className="font-manrope text-sm tracking-wide text-stone-400 hover:text-teal-600 underline underline-offset-8 decoration-2 transition-all" href="#">Ethical AI</a>
      </nav>
      <div className="font-manrope text-sm tracking-wide text-stone-400">
        © 2024 Pathfinder. Designed for clarity.
      </div>
    </div>
  </footer>
</div>

    </>
  );
}
