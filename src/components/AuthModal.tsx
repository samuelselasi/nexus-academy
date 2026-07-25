import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { soundEngine } from '../utils/audioEffects';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User as UserIcon, Phone, GraduationCap, ShieldCheck, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onAuthenticate: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onAuthenticate,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>('student');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && !name) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    setIsSubmitting(true);
    soundEngine.playPaymentSuccessChime();

    setTimeout(() => {
      setIsSubmitting(false);

      // Create or retrieve user object
      const authUser: User = {
        id: `usr-${Date.now()}`,
        name: mode === 'signup' ? name : (email.split('@')[0] || 'User'),
        email: email.toLowerCase(),
        role: role,
        avatar: `https://images.unsplash.com/photo-${role === 'tutor' ? '1534528741775-53994a69daeb' : '1539571696357-5a69c17a67c6'}?auto=format&fit=crop&q=80&w=200`,
        timezone: 'Africa/Accra',
        phone: phone || '+233 24 000 0000',
      };

      onAuthenticate(authUser);
      onClose();
    }, 600);
  };

  const handleDemoSignIn = (demoRole: UserRole, demoName: string, demoEmail: string) => {
    soundEngine.playPaymentSuccessChime();
    const demoUser: User = {
      id: `usr-demo-${demoRole}`,
      name: demoName,
      email: demoEmail,
      role: demoRole,
      avatar: demoRole === 'tutor' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' 
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      timezone: 'Africa/Accra',
      phone: '+233 24 123 4567',
    };
    onAuthenticate(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="bg-white border border-stone-200 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-slate-900"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black border border-amber-500/40 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" /> Secure Authentication
            </span>
            <h3 className="text-2xl font-black font-serif-heading text-amber-100">
              {mode === 'signin' ? 'Sign In to Nexus Academy' : 'Create Your Free Account'}
            </h3>
            <p className="text-xs text-amber-200/80 font-medium">
              Access your personalized tutoring portal, live classrooms, and progress tracking.
            </p>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex border-b border-stone-200 bg-stone-50 p-1">
          <button
            onClick={() => { setMode('signin'); setErrorMessage(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
              mode === 'signin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMessage(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Role selector on Signup */}
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 block">Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { r: 'student', label: 'Student', icon: UserIcon },
                  { r: 'parent', label: 'Parent', icon: ShieldCheck },
                  { r: 'tutor', label: 'Tutor', icon: GraduationCap },
                ].map(({ r, label, icon: Icon }) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as UserRole)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      role === r
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-extrabold'
                        : 'border-stone-200 hover:bg-stone-50 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-700" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full Name field on Signup */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 block">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Kwame Mensah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-700 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-700 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          {/* Phone Number on Signup */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 block">Phone / MoMo Number (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  placeholder="+233 24 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isSubmitting ? 'Authenticating...' : mode === 'signin' ? 'Sign In Now' : 'Complete Registration'}</span>
          </button>

          {/* One-Click Quick Demo Sign In */}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block text-center">
              Or Try One-Click Demo Access
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleDemoSignIn('student', 'Kofi Kwakye', 'kofi.kwakye@student.edu.gh')}
                className="py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold rounded-lg border border-stone-200 transition text-center"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('parent', 'Ama Osei-Kwakye', 'ama.osei@parent.gh')}
                className="py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold rounded-lg border border-stone-200 transition text-center"
              >
                👨‍👩‍👧 Parent
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('tutor', 'Dr. Abena Osei-Mensah', 'dr.abena@nexus.edu.gh')}
                className="py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold rounded-lg border border-stone-200 transition text-center"
              >
                👩‍🏫 Tutor
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
