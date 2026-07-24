import React from 'react';
import { UserRole } from '../types';
import { KentePattern } from './KentePattern';
import { motion } from 'motion/react';
import { UserCheck, Code2, ShieldCheck, GraduationCap, Clock, DollarSign, Smartphone, Monitor, Home, Users } from 'lucide-react';

export type AppViewRole = UserRole | 'code' | 'landing';

interface HeaderProps {
  currentRole: AppViewRole;
  onRoleChange: (role: AppViewRole) => void;
  selectedTimezone: string;
  onTimezoneChange: (tz: string) => void;
  currency: 'GHS' | 'USD';
  onCurrencyChange: (curr: 'GHS' | 'USD') => void;
  userName: string;
  userAvatar: string;
  isMobileAppFrame: boolean;
  onToggleMobileAppFrame: () => void;
  onOpenRegisterModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedTimezone,
  onTimezoneChange,
  currency,
  onCurrencyChange,
  userName,
  userAvatar,
  isMobileAppFrame,
  onToggleMobileAppFrame,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 text-slate-900 border-b border-stone-200 shadow-sm backdrop-blur-md">
      {/* Authentic Ghanaian Kente Woven Pattern Banner Ribbon */}
      <KentePattern className="h-3 w-full shadow-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onRoleChange('landing')}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[2px] shadow-lg shadow-amber-900/15 group overflow-hidden"
          >
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative z-10 overflow-hidden">
              {/* Subtle background crest pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:8px_8px]" />

              <svg viewBox="0 0 40 40" className="w-7 h-7 text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Shield / Diamond Geometric Emblem */}
                <path d="M20 3L33 10V22C33 29.5 27.5 35 20 37C12.5 35 7 29.5 7 22V10L20 3Z" fill="url(#goldGrad)" stroke="#fef08a" strokeWidth="1" opacity="0.9" />
                {/* Graduation Cap overlapping Crest */}
                <path d="M20 12L29 16.5L20 21L11 16.5L20 12Z" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 18.2V22.5C14 24.5 16.7 26 20 26C23.3 26 26 24.5 26 22.5V18.2" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M27 17.5V23.5" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="27" cy="24" r="1" fill="#f59e0b" />
                
                <defs>
                  <linearGradient id="goldGrad" x1="7" y1="3" x2="33" y2="37" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#b45309" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#78350f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900 flex items-center gap-1">
                <span className="bg-gradient-to-r from-slate-900 via-amber-900 to-amber-700 bg-clip-text text-transparent font-black">
                  NEXUS
                </span>
                <span className="text-amber-600 font-serif italic tracking-normal">ACADEMY</span>
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-300/80 uppercase tracking-wider shadow-2xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                Global Learning
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              Certified <span className="text-emerald-700 font-bold">GES WASSCE</span> • <span className="text-sky-700 font-bold">Cambridge CIE</span> • <span className="text-amber-800 font-bold">Montessori</span>
            </p>
          </div>
        </div>

        {/* View / Role Switcher Tabs */}
        <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-300/80 shadow-inner overflow-x-auto max-w-full">
          <button
            onClick={() => onRoleChange('landing')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'landing'
                ? 'bg-amber-600 text-white shadow-sm font-extrabold scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Landing
          </button>

          <button
            onClick={() => onRoleChange('student')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'student'
                ? 'bg-amber-700 text-white shadow-sm font-extrabold scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Student Portal
          </button>

          <button
            onClick={() => onRoleChange('parent')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'parent'
                ? 'bg-sky-700 text-white shadow-sm font-extrabold scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Parent View
          </button>

          <button
            onClick={() => onRoleChange('tutor')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'tutor'
                ? 'bg-emerald-700 text-white shadow-sm font-extrabold scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Tutor Portal
          </button>

          <button
            onClick={() => onRoleChange('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'admin'
                ? 'bg-slate-900 text-white shadow-sm font-extrabold scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>

          <button
            onClick={() => onRoleChange('code')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'code'
                ? 'bg-amber-900 text-white shadow-sm font-extrabold scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Specs & API
          </button>
        </div>

        {/* Device Mode Toggle & Local Settings */}
        <div className="flex items-center gap-2.5">
          {/* Mobile App Device Simulator Button */}
          <button
            onClick={onToggleMobileAppFrame}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition shadow-2xs ${
              isMobileAppFrame
                ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-500/20'
                : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
            }`}
            title="Toggle Native Mobile App View Shell"
          >
            {isMobileAppFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-amber-600" />}
            <span>{isMobileAppFrame ? 'Web View' : 'Mobile App'}</span>
          </button>

          {/* Timezone Selector */}
          <div className="flex items-center gap-1 bg-white border border-stone-300 text-slate-700 px-2.5 py-1.5 rounded-xl text-xs shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <select
              value={selectedTimezone}
              onChange={(e) => onTimezoneChange(e.target.value)}
              className="bg-transparent text-slate-800 outline-none text-xs font-medium cursor-pointer"
            >
              <option value="Africa/Accra">GMT (Accra, Ghana)</option>
              <option value="UTC">UTC (Universal)</option>
              <option value="Africa/Lagos">WAT (Lagos, Abuja)</option>
              <option value="Europe/London">BST/GMT (London)</option>
              <option value="America/New_York">EST (New York)</option>
            </select>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={() => onCurrencyChange(currency === 'GHS' ? 'USD' : 'GHS')}
            className="flex items-center gap-1 bg-white hover:bg-stone-100 text-slate-800 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-stone-300 transition shadow-2xs"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currency === 'GHS' ? 'GH₵ GHS' : '$ USD'}</span>
          </button>

          {/* User Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-300">
            <img
              src={userAvatar}
              alt={userName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/80 shadow-2xs"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900">{userName}</div>
              <div className="text-[10px] text-amber-700 uppercase font-extrabold">{currentRole === 'landing' ? 'Visitor' : currentRole}</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
