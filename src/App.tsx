import React, { useState, useEffect } from 'react';
import { TutorProfile, Session, Assignment, CurriculumProgress, User } from './types';
import { mockUsers, mockTutors, mockSessions, mockAssignments, mockCurriculumProgress } from './data/mockData';

import { Header, AppViewRole } from './components/Header';
import { LandingPage, RegisteredStudentData, RegisteredTutorData } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { TutorDiscovery } from './components/TutorDiscovery';
import { TutorDashboard } from './components/TutorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { RevisionHub } from './components/RevisionHub';
import { BookingModal } from './components/BookingModal';
import { GoogleMeetModal } from './components/GoogleMeetModal';
import { CodeArchitectureViewer } from './components/CodeArchitectureViewer';
import { AuthModal } from './components/AuthModal';
import { KentePattern, KenteWatermark } from './components/KentePattern';
import { InteractiveKnowledgeCanvas } from './components/InteractiveKnowledgeCanvas';

import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Search, Smartphone, Video, BookOpen, Users } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<AppViewRole>('landing');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Africa/Accra');
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');

  // Authentication State with LocalStorage persistence
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('nexus_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Sessions state with LocalStorage persistence
  const [sessions, setSessions] = useState<Session[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_sessions');
      return saved ? JSON.parse(saved) : mockSessions;
    } catch {
      return mockSessions;
    }
  });

  const [tutors, setTutors] = useState<TutorProfile[]>(mockTutors);
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [curriculumProgress] = useState<CurriculumProgress[]>(mockCurriculumProgress);

  // Tab navigation within student view
  const [studentTab, setStudentTab] = useState<'dashboard' | 'tutors' | 'revision'>('dashboard');

  // Mobile App Shell Toggle
  const [isMobileAppFrame, setIsMobileAppFrame] = useState<boolean>(false);

  // Booking Modal
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<TutorProfile | null>(null);

  // Active Google Meet Live Virtual Classroom
  const [activeMeetSession, setActiveMeetSession] = useState<Session | null>(null);

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem('nexus_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions:', e);
    }
  }, [sessions]);

  // Persist user auth
  const handleAuthenticateUser = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('nexus_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user:', e);
    }
    setCurrentRole(user.role);
    if (user.role === 'student') setStudentTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('nexus_user');
    } catch (e) {
      console.error('Failed to remove user:', e);
    }
    setCurrentRole('landing');
  };

  const handleBookingSuccess = (newSession: Session) => {
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    setSelectedTutorForBooking(null);
    setStudentTab('dashboard');
  };

  const handleUpdateTutorProfile = (updatedProfile: TutorProfile) => {
    setTutors(tutors.map(t => t.id === updatedProfile.id ? updatedProfile : t));
  };

  const handleVerifyTutor = (tutorId: string) => {
    setTutors(tutors.map(t => t.id === tutorId ? { ...t, isVerified: true } : t));
  };

  // Registration handler for Students
  const handleRegisterStudent = (data: RegisteredStudentData) => {
    const newUser: User = {
      id: `usr-std-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      timezone: data.timezone || 'Africa/Accra',
      phone: data.phone,
    };
    handleAuthenticateUser(newUser);
  };

  // Registration handler for Tutors
  const handleRegisterTutor = (data: RegisteredTutorData) => {
    const newTutor: TutorProfile = {
      id: `tut-${Date.now()}`,
      userId: `u-tut-${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      headline: `${data.curriculum} Certified Educator • ${data.primarySubject}`,
      bio: data.bio || `Specialist educator in ${data.primarySubject} with expertise across ${data.curriculum} curriculum.`,
      curricula: [data.curriculum],
      subjects: [data.primarySubject],
      hourlyRateGHS: data.hourlyRateGHS,
      hourlyRateUSD: Math.round(data.hourlyRateGHS / 12),
      rating: 5.0,
      reviewsCount: 1,
      isVerified: true,
      verificationBadge: `Verified Educator #${Math.floor(1000 + Math.random() * 9000)}`,
      location: 'Accra, Ghana',
      languages: ['English', 'Twi'],
      googleCalendarConnected: true,
      availableSlots: [new Date(Date.now() + 86400000).toISOString()],
    };

    setTutors([newTutor, ...tutors]);

    const newUser: User = {
      id: newTutor.userId,
      name: data.name,
      email: data.email,
      role: 'tutor',
      avatar: newTutor.avatar,
      timezone: 'Africa/Accra',
      phone: data.phone,
    };
    handleAuthenticateUser(newUser);
  };

  // Trigger quick instant sample live video classroom launch
  const handleLaunchSampleLiveClass = () => {
    if (sessions.length > 0) {
      setActiveMeetSession(sessions[0]);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900 transition-colors relative">
      {/* Interactive HTML5 Canvas Knowledge Network Background */}
      <InteractiveKnowledgeCanvas />
      
      {/* Header with Kente Ribbon & View Switches */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'student') setStudentTab('dashboard');
        }}
        selectedTimezone={selectedTimezone}
        onTimezoneChange={setSelectedTimezone}
        currency={currency}
        onCurrencyChange={setCurrency}
        currentUser={currentUser}
        isMobileAppFrame={isMobileAppFrame}
        onToggleMobileAppFrame={() => setIsMobileAppFrame(!isMobileAppFrame)}
        onOpenAuthModal={(m = 'signin') => {
          setAuthModalMode(m);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Student View Secondary Navigation */}
      {currentRole === 'student' && (
        <div className="bg-white/95 border-b border-stone-200 shadow-2xs sticky top-[69px] z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto">
              <button
                onClick={() => setStudentTab('dashboard')}
                className={`flex items-center gap-2 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
                  studentTab === 'dashboard'
                    ? 'border-amber-700 text-amber-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-amber-700" />
                <span>Student Dashboard</span>
              </button>

              <button
                onClick={() => setStudentTab('tutors')}
                className={`flex items-center gap-2 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
                  studentTab === 'tutors'
                    ? 'border-amber-700 text-amber-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Search className="w-4 h-4 text-amber-700" />
                <span>Find Certified Tutors</span>
              </button>

              <button
                onClick={() => setStudentTab('revision')}
                className={`flex items-center gap-2 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
                  studentTab === 'revision'
                    ? 'border-amber-700 text-amber-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>WASSCE & Cambridge Revision Hub</span>
              </button>
            </div>

            {/* Quick Live Classroom Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLaunchSampleLiveClass}
              className="hidden sm:flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-3.5 py-1.5 rounded-xl text-xs shadow-2xs shrink-0"
            >
              <Video className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Enter Live Class</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Main Layout Container */}
      <div className={isMobileAppFrame ? "py-8 flex justify-center bg-stone-100 min-h-[calc(100vh-120px)]" : "flex-1"}>
        <div className={isMobileAppFrame ? "w-[390px] h-[780px] bg-white border-[10px] border-stone-800 rounded-[48px] shadow-xl overflow-y-auto relative flex flex-col scrollbar-thin" : "max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
          
          {/* Simulated Mobile Status Notch Bar */}
          {isMobileAppFrame && (
            <div className="bg-white px-6 py-2 flex justify-between items-center text-[10px] text-slate-500 sticky top-0 z-40 border-b border-stone-200">
              <span className="font-bold text-amber-800">9:41 AM • Accra, Ghana</span>
              <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
                <Smartphone className="w-3 h-3 text-emerald-700" />
                <span>Nexus iOS/Android App</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentRole}-${studentTab}-${isMobileAppFrame}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Landing Page Explorer & Registration Hub */}
              {currentRole === 'landing' && (
                <LandingPage
                  tutors={tutors}
                  currency={currency}
                  onNavigateToPortal={(role) => {
                    setCurrentRole(role);
                    if (role === 'student') setStudentTab('dashboard');
                  }}
                  onRegisterStudent={handleRegisterStudent}
                  onRegisterTutor={handleRegisterTutor}
                  onLaunchDemoMeet={handleLaunchSampleLiveClass}
                />
              )}

              {/* Student View */}
              {currentRole === 'student' && (
                studentTab === 'dashboard' ? (
                  <StudentDashboard
                    sessions={sessions}
                    assignments={assignments}
                    curriculumProgress={curriculumProgress}
                    timezone={selectedTimezone}
                    currency={currency}
                    onBookTutorClick={() => setStudentTab('tutors')}
                    onJoinMeetClick={(sess) => setActiveMeetSession(sess)}
                  />
                ) : studentTab === 'tutors' ? (
                  <TutorDiscovery
                    tutors={tutors}
                    currency={currency}
                    onBookTutor={(tutor) => setSelectedTutorForBooking(tutor)}
                  />
                ) : (
                  <RevisionHub currency={currency} />
                )
              )}

              {/* Dedicated Parent / Guardian Dashboard */}
              {currentRole === 'parent' && (
                <ParentDashboard
                  sessions={sessions}
                  currency={currency}
                />
              )}

              {/* Tutor Portal View */}
              {currentRole === 'tutor' && (
                <TutorDashboard
                  tutorProfile={tutors[0]}
                  sessions={sessions}
                  timezone={selectedTimezone}
                  currency={currency}
                  onUpdateProfile={handleUpdateTutorProfile}
                />
              )}

              {/* Admin Control View */}
              {currentRole === 'admin' && (
                <AdminDashboard
                  tutors={tutors}
                  sessions={sessions}
                  currency={currency}
                  onVerifyTutor={handleVerifyTutor}
                />
              )}

              {/* Developer / Code Architecture Viewer */}
              {currentRole === 'code' && (
                <CodeArchitectureViewer />
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Booking Modal */}
      {selectedTutorForBooking && (
        <BookingModal
          tutor={selectedTutorForBooking}
          timezone={selectedTimezone}
          currency={currency}
          onClose={() => setSelectedTutorForBooking(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Google Meet Classroom Modal */}
      {activeMeetSession && (
        <GoogleMeetModal
          session={activeMeetSession}
          onClose={() => setActiveMeetSession(null)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateUser}
      />

      {/* Authentic Kente Bordered Footer */}
      <footer className="bg-white text-slate-600 text-xs border-t border-stone-200 mt-auto relative overflow-hidden">
        <KentePattern className="h-1.5 w-full opacity-90" />
        <KenteWatermark opacity={0.02} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
          <div className="space-y-1">
            <p className="font-bold text-slate-900">
              © {new Date().getFullYear()} Nexus Academy Ghana. Certified in GES WASSCE, Cambridge CIE & AMI Montessori.
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Accra • Kumasi • Cape Coast • Tamale • London • New York • Diaspora Online Learning
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-700 font-medium text-[11px]">
            <span className="bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 text-amber-900 font-bold">
              GES & Cambridge Accredited
            </span>
            <span className="bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 text-emerald-900 font-bold">
              MTN MoMo & Card Payments
            </span>
            <span className="bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 text-sky-900 font-bold">
              1-on-1 HD Virtual Classrooms
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

