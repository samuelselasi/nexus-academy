import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { KentePattern } from './KentePattern';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, ShieldCheck, GraduationCap, Clock, DollarSign, 
  Smartphone, Monitor, Home, Users, LogIn, UserPlus, LogOut, Menu, X, ChevronRight 
} from 'lucide-react';

export type AppViewRole = UserRole | 'code' | 'landing';

interface HeaderProps {
  currentRole: AppViewRole;
  onRoleChange: (role: AppViewRole) => void;
  selectedTimezone: string;
  onTimezoneChange: (tz: string) => void;
  currency: 'GHS' | 'USD';
  onCurrencyChange: (curr: 'GHS' | 'USD') => void;
  currentUser: User | null;
  isMobileAppFrame: boolean;
  onToggleMobileAppFrame: () => void;
  onOpenAuthModal: (mode?: 'signin' | 'signup') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedTimezone,
  onTimezoneChange,
  currency,
  onCurrencyChange,
  currentUser,
  isMobileAppFrame,
  onToggleMobileAppFrame,
  onOpenAuthModal,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRoleSelect = (role: AppViewRole) => {
    onRoleChange(role);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 text-slate-900 border-b border-stone-200 shadow-sm backdrop-blur-md">
      {/* Authentic Ghanaian Kente Woven Pattern Banner Ribbon */}
      <KentePattern className="h-2.5 w-full shadow-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleRoleSelect('landing')}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[2px] shadow-md shadow-amber-900/15 group overflow-hidden shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative z-10 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:8px_8px]" />

              <svg viewBox="0 0 40 40" className="w-6 h-6 text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3L33 10V22C33 29.5 27.5 35 20 37C12.5 35 7 29.5 7 22V10L20 3Z" fill="url(#goldGrad)" stroke="#fef08a" strokeWidth="1" opacity="0.9" />
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
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1">
                <span className="bg-gradient-to-r from-slate-900 via-amber-900 to-amber-700 bg-clip-text text-transparent font-black">
                  NEXUS
                </span>
                <span className="text-amber-600 font-serif italic tracking-normal">ACADEMY</span>
              </span>
              <span className="hidden sm:inline-flex bg-amber-100 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-300/80 uppercase tracking-wider shadow-2xs items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                Global
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium hidden sm:block">
              Certified <span className="text-emerald-700 font-bold">GES WASSCE</span> • <span className="text-sky-700 font-bold">Cambridge CIE</span> • <span className="text-amber-800 font-bold">Montessori</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation & View Switcher Tabs (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-300/80 shadow-inner">
          <button
            onClick={() => handleRoleSelect('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'landing'
                ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Landing
          </button>

          <button
            onClick={() => handleRoleSelect('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'student'
                ? 'bg-amber-700 text-white shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Student Portal
          </button>

          <button
            onClick={() => handleRoleSelect('parent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'parent'
                ? 'bg-sky-700 text-white shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Parent View
          </button>

          <button
            onClick={() => handleRoleSelect('tutor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'tutor'
                ? 'bg-emerald-700 text-white shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Tutor Portal
          </button>

          <button
            onClick={() => handleRoleSelect('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'admin'
                ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Desktop Controls Toolbar (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Mobile Shell Toggle */}
          <button
            onClick={onToggleMobileAppFrame}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition shadow-2xs ${
              isMobileAppFrame
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
            }`}
            title="Toggle Mobile Shell"
          >
            {isMobileAppFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-amber-600" />}
            <span>{isMobileAppFrame ? 'Web View' : 'Mobile App'}</span>
          </button>

          {/* Timezone Selector */}
          <div className="flex items-center gap-1 bg-white border border-stone-300 text-slate-700 px-2 py-1.5 rounded-xl text-xs shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <select
              value={selectedTimezone}
              onChange={(e) => onTimezoneChange(e.target.value)}
              className="bg-transparent text-slate-800 outline-none text-xs font-medium cursor-pointer"
            >
              <option value="Africa/Accra">GMT (Accra)</option>
              <option value="UTC">UTC</option>
              <option value="Africa/Lagos">WAT (Lagos)</option>
              <option value="Europe/London">BST (London)</option>
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

          {/* Auth Section Desktop */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-300">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/80 shadow-2xs"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[10px] text-amber-700 uppercase font-extrabold">{currentUser.role}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuthModal('signin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-slate-800 text-xs font-bold rounded-xl border border-stone-300 shadow-2xs transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-extrabold rounded-xl shadow-2xs transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile & Tablet Top Bar Controls (Visible on < lg) */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500"
              />
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuthModal('signin')}
                className="px-2.5 py-1.5 text-slate-700 text-xs font-bold hover:text-slate-900"
              >
                Sign In
              </button>
              {/* Always Prominent Mobile Sign Up Button */}
              <button
                onClick={() => onOpenAuthModal('signup')}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-extrabold rounded-xl shadow-xs transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Drawer Trigger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-stone-100 border border-stone-300 text-slate-800 hover:bg-stone-200 transition"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-200 bg-white/98 shadow-xl overflow-hidden"
          >
            <div className="p-4 space-y-4 max-w-md mx-auto">
              
              {/* Portal Selector Buttons */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block px-2">
                  Select Portal / View
                </span>
                
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { id: 'landing', label: 'Landing Page', icon: Home, color: 'text-amber-700' },
                    { id: 'student', label: 'Student Portal', icon: UserCheck, color: 'text-amber-800' },
                    { id: 'parent', label: 'Parent View', icon: Users, color: 'text-sky-700' },
                    { id: 'tutor', label: 'Tutor Portal', icon: GraduationCap, color: 'text-emerald-700' },
                    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, color: 'text-slate-900' },
                  ].map(({ id, label, icon: Icon, color }) => (
                    <button
                      key={id}
                      onClick={() => handleRoleSelect(id as AppViewRole)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition w-full ${
                        currentRole === id
                          ? 'bg-amber-50 border border-amber-300 text-amber-950 font-extrabold'
                          : 'hover:bg-stone-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span>{label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences & Settings Controls */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block px-2">
                  Preferences & Currency
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {/* Currency Button */}
                  <button
                    onClick={() => onCurrencyChange(currency === 'GHS' ? 'USD' : 'GHS')}
                    className="flex items-center justify-center gap-1.5 p-2 bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-bold text-slate-800 transition"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currency === 'GHS' ? 'GH₵ GHS' : '$ USD'}</span>
                  </button>

                  {/* Mobile Shell Toggle */}
                  <button
                    onClick={() => {
                      onToggleMobileAppFrame();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 p-2 bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-bold text-slate-800 transition"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isMobileAppFrame ? 'Web Mode' : 'App Shell'}</span>
                  </button>
                </div>

                {/* Timezone Dropdown */}
                <div className="flex items-center gap-2 bg-stone-50 border border-stone-300 p-2 rounded-xl text-xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <select
                    value={selectedTimezone}
                    onChange={(e) => onTimezoneChange(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none text-xs font-medium w-full"
                  >
                    <option value="Africa/Accra">GMT (Accra, Ghana)</option>
                    <option value="UTC">UTC (Universal)</option>
                    <option value="Africa/Lagos">WAT (Lagos, Nigeria)</option>
                    <option value="Europe/London">BST/GMT (London)</option>
                    <option value="America/New_York">EST (New York)</option>
                  </select>
                </div>
              </div>

              {/* Sign In & Sign Up Action Buttons in Drawer */}
              {!currentUser && (
                <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onOpenAuthModal('signin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs rounded-xl border border-stone-300 text-center transition flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5 text-amber-700" />
                    <span>Sign In</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenAuthModal('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs rounded-xl shadow-xs text-center transition flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};


