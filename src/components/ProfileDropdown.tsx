'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { signout } from '@/app/login/actions';

interface ProfileDropdownProps {
  user: any;
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  const lastName = user?.user_metadata?.last_name || user?.user_metadata?.full_name?.split(' ')[1] || '';
  const schoolClass = user?.user_metadata?.school_class || 'N/A';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-[#6FA8A3]/10 border border-[#6FA8A3]/20 flex items-center justify-center hover:bg-[#6FA8A3]/20 transition-all overflow-hidden"
      >
        <span className="material-symbols-outlined text-[#6FA8A3]">person</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-[#E6DFD5] py-4 z-[100] animate-in fade-in zoom-in duration-200">
          <div className="px-6 pb-4 border-b border-[#E6DFD5] mb-2">
            <p className="text-sm font-bold text-slate-900 truncate">{firstName} {lastName}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <div className="px-6 py-2 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">{t.nav.fullName}</span>
              <span className="text-slate-900 font-bold">{firstName}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">{t.nav.lastName}</span>
              <span className="text-slate-900 font-bold">{lastName}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">{t.nav.class}</span>
              <span className="text-slate-900 font-bold">{schoolClass}</span>
            </div>
          </div>
          <div className="px-6 pt-4 mt-2 border-t border-[#E6DFD5]">
            <form action={signout}>
              <button className="w-full text-left text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">logout</span>
                {t.nav.signOut}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
