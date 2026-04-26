'use client';

import { login, signup } from './actions'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext';

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  const ui = {
    ru: {
      loginTitle: "Вход в Pathfinder",
      signupTitle: "Создать аккаунт",
      firstName: "Имя",
      firstNamePlaceholder: "Иван",
      lastName: "Фамилия",
      lastNamePlaceholder: "Иванов",
      schoolClass: "Класс/Грейд",
      schoolClassPlaceholder: "10А",
      email: "Электронная почта",
      password: "Пароль",
      loginBtn: "Войти",
      signupBtn: "Зарегистрироваться",
      alreadyHave: "Уже есть аккаунт? Войти",
      dontHave: "Нет аккаунта? Зарегистрироваться",
      emailSent: "Ссылка для подтверждения отправлена на вашу почту. Пожалуйста, проверьте входящие сообщения.",
    },
    kz: {
      loginTitle: "Pathfinder-ге кіру",
      signupTitle: "Тіркелу",
      firstName: "Аты",
      firstNamePlaceholder: "Әлихан",
      lastName: "Жөні",
      lastNamePlaceholder: "Смаилов",
      schoolClass: "Сынып/Грейд",
      schoolClassPlaceholder: "10А",
      email: "Электрондық пошта",
      password: "Құпия сөз",
      loginBtn: "Кіру",
      signupBtn: "Тіркелу",
      alreadyHave: "Аккаунтыңыз бар ма? Кіру",
      dontHave: "Аккаунтыңыз жоқ па? Тіркелу",
      emailSent: "Растау сілтемесі электрондық поштаңызға жіберілді. Кіріс хабарларды тексеріңіз.",
    },
    en: {
      loginTitle: "Pathfinder Login",
      signupTitle: "Create an Account",
      firstName: "First Name",
      firstNamePlaceholder: "John",
      lastName: "Last Name",
      lastNamePlaceholder: "Doe",
      schoolClass: "Class/Grade",
      schoolClassPlaceholder: "10A",
      email: "Email",
      password: "Password",
      loginBtn: "Log in",
      signupBtn: "Sign up",
      alreadyHave: "Already have an account? Log in",
      dontHave: "Don't have an account? Sign up",
      emailSent: "A confirmation link has been sent to your email. Please check your inbox.",
    }
  }[language];
  
  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_8px_24px_rgba(61,61,60,0.05)] border border-[#E6DFD5] animate-in">
      <div className="flex justify-center gap-4 mb-8 text-xs font-bold text-slate-400">
        <span className={`cursor-pointer ${language === 'ru' ? 'text-[#6FA8A3]' : ''}`} onClick={() => setLanguage('ru')}>RU</span>
        <span className="text-slate-200">|</span>
        <span className={`cursor-pointer ${language === 'kz' ? 'text-[#6FA8A3]' : ''}`} onClick={() => setLanguage('kz')}>KZ</span>
        <span className="text-slate-200">|</span>
        <span className={`cursor-pointer ${language === 'en' ? 'text-[#6FA8A3]' : ''}`} onClick={() => setLanguage('en')}>EN</span>
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
        {isSignUp ? ui.signupTitle : ui.loginTitle}
      </h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm flex gap-3 items-center border border-red-100">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
        </div>
      )}
      
      {message && (
        <div className="bg-[#6FA8A3]/10 text-[#6FA8A3] p-5 rounded-2xl mb-6 text-sm border border-[#6FA8A3]/20 flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-[#6FA8A3]/20 rounded-full flex items-center justify-center mb-2">
            <span className="material-symbols-outlined">mark_email_read</span>
          </div>
          <p className="font-bold">{message.includes('successful') ? ui.emailSent : message}</p>
        </div>
      )}

      <form className="flex flex-col gap-4">
        {isSignUp && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-700" htmlFor="firstName">{ui.firstName}:</label>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  required={isSignUp}
                  className="px-4 py-3 rounded-xl border border-[#E6DFD5] bg-slate-50 outline-none focus:border-[#6FA8A3] transition-colors"
                  placeholder={ui.firstNamePlaceholder}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-700" htmlFor="lastName">{ui.lastName}:</label>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  required={isSignUp}
                  className="px-4 py-3 rounded-xl border border-[#E6DFD5] bg-slate-50 outline-none focus:border-[#6FA8A3] transition-colors"
                  placeholder={ui.lastNamePlaceholder}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-slate-700" htmlFor="schoolClass">{ui.schoolClass}:</label>
              <input 
                id="schoolClass" 
                name="schoolClass" 
                type="text" 
                required={isSignUp}
                className="px-4 py-3 rounded-xl border border-[#E6DFD5] bg-slate-50 outline-none focus:border-[#6FA8A3] transition-colors"
                placeholder={ui.schoolClassPlaceholder}
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-slate-700" htmlFor="email">{ui.email}:</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            className="px-4 py-3 rounded-xl border border-[#E6DFD5] bg-slate-50 outline-none focus:border-[#6FA8A3] transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm font-bold text-slate-700" htmlFor="password">{ui.password}:</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className="px-4 py-3 rounded-xl border border-[#E6DFD5] bg-slate-50 outline-none focus:border-[#6FA8A3] transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button 
          formAction={isSignUp ? signup : login}
          className="w-full px-6 py-4 bg-[#6FA8A3] text-white rounded-xl font-bold shadow-lg shadow-[#6FA8A3]/20 hover:bg-[#5a8c88] transition-all active:scale-95"
        >
          {isSignUp ? ui.signupBtn : ui.loginBtn}
        </button>

        <div className="text-center mt-4">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-[#6FA8A3] font-bold hover:underline"
          >
            {isSignUp ? ui.alreadyHave : ui.dontHave}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F3EF] p-4 font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
