import React, { useState } from 'react';
import { TutorProfile, CurriculumType, UserRole } from '../types';
import { KentePattern, KenteWatermark, KenteBorderCard } from './KentePattern';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, UserCheck, Video, 
  Sparkles, ArrowRight, CheckCircle2, Star, BookOpen, 
  ChevronDown, Search, Smartphone, X
} from 'lucide-react';

interface LandingPageProps {
  tutors: TutorProfile[];
  currency: 'GHS' | 'USD';
  onNavigateToPortal: (role: UserRole) => void;
  onRegisterStudent: (data: RegisteredStudentData) => void;
  onRegisterTutor: (data: RegisteredTutorData) => void;
  onLaunchDemoMeet: () => void;
}

export interface RegisteredStudentData {
  name: string;
  email: string;
  phone: string;
  curriculum: CurriculumType;
  gradeLevel: string;
  timezone: string;
}

export interface RegisteredTutorData {
  name: string;
  email: string;
  phone: string;
  curriculum: CurriculumType;
  primarySubject: string;
  hourlyRateGHS: number;
  bio: string;
  qualifications: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  tutors,
  currency,
  onNavigateToPortal,
  onRegisterStudent,
  onRegisterTutor,
  onLaunchDemoMeet,
}) => {
  // Modal state for Registration
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [registerRole, setRegisterRole] = useState<'student' | 'tutor'>('student');

  // Registration Form States - Student
  const [studentForm, setStudentForm] = useState<RegisteredStudentData>({
    name: '',
    email: '',
    phone: '',
    curriculum: 'GES',
    gradeLevel: 'SHS 2 (WASSCE)',
    timezone: 'Africa/Accra',
  });

  // Registration Form States - Tutor
  const [tutorForm, setTutorForm] = useState<RegisteredTutorData>({
    name: '',
    email: '',
    phone: '',
    curriculum: 'GES',
    primarySubject: 'Core Mathematics & Elective Math',
    hourlyRateGHS: 120,
    bio: '',
    qualifications: 'B.Sc. Mathematics, NaCCA Certified Educator',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  // Search & Filter State on Landing Explorer
  const [selectedCurriculumFilter, setSelectedCurriculumFilter] = useState<CurriculumType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Demo Whiteboard State
  const [activeDemoSubject, setActiveDemoSubject] = useState<CurriculumType>('GES');

  // FAQ Accordion Toggle
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.email) return;
    onRegisterStudent(studentForm);
    setRegistrationSuccess(`Akwaaba, ${studentForm.name}! Your Student account has been registered successfully.`);
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegistrationSuccess(null);
      onNavigateToPortal('student');
    }, 1500);
  };

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorForm.name || !tutorForm.email) return;
    onRegisterTutor(tutorForm);
    setRegistrationSuccess(`Congratulations, ${tutorForm.name}! Your Tutor application has been submitted and auto-verified.`);
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegistrationSuccess(null);
      onNavigateToPortal('tutor');
    }, 1500);
  };

  const filteredTutors = tutors.filter(t => {
    const matchesCurriculum = selectedCurriculumFilter === 'ALL' || t.curricula.includes(selectedCurriculumFilter);
    const matchesQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCurriculum && matchesQuery;
  });

  const demoWhiteboardData = {
    GES: {
      title: 'GES SHS WASSCE Calculus & Trigonometry',
      tutor: 'Dr. Abena Osei-Mensah (NaCCA Certified)',
      formula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
      notes: 'Finding gradient functions for quadratic & polynomial curves. Standard WASSCE Paper 2 structure.',
      badge: 'GES SHS 1-3 Curriculum',
    },
    CAMBRIDGE: {
      title: 'Cambridge IGCSE & A-Level Organic Chemistry',
      tutor: 'Sarah Jenkins-Agyeman (CIE Examiner)',
      formula: 'C_n H_{2n+2} + O_2 \\longrightarrow n CO_2 + (n+1) H_2 O',
      notes: 'Combustion mechanisms, electrophilic addition & infrared spectroscopy for A-Level Chemistry (9701).',
      badge: 'Cambridge CIE International',
    },
    MONTESSORI: {
      title: 'AMI Montessori Concrete Bead Bank Operations',
      tutor: 'Kwame Mensah-Bonsu (AMI Diploma Holder)',
      formula: 'Decimal System Golden Bead Material (1, 10, 100, 1000)',
      notes: 'Sensory tactile math exploration developing spatial intuition & early phonics for ages 3-12.',
      badge: 'AMI Montessori Standard',
    }
  };

  const currentDemo = demoWhiteboardData[activeDemoSubject];

  const faqs = [
    {
      q: 'How does Akoma Tutoring support both Ghana (GES) and International curricula?',
      a: 'Our platform maintains distinct certified learning pathways. Tutors undergo verification for Ghana Education Service (GES) NaCCA standards, Cambridge Assessment International Education (CIE), and AMI Montessori diploma methodologies.'
    },
    {
      q: 'How do Mobile Money (MTN MoMo) and Card payments work?',
      a: 'We integrate with Paystack for seamless local Mobile Money payments in Ghana Cedis (GH₵) across MTN MoMo, Telecel Cash, and AT Money, as well as USD Visa/Mastercard payments for diaspora parents in London, New York, or anywhere globally.'
    },
    {
      q: 'How are Google Meet virtual classrooms auto-generated?',
      a: 'When a session is booked, our system uses the Google Calendar API to automatically create a unique, encrypted Google Meet link and places it directly into both the tutor’s and student’s calendars with timezone-adjusted reminders.'
    },
    {
      q: 'Who can register on Akoma Tutoring?',
      a: 'Students from Primary to SHS/A-Levels, parents booking on behalf of children, and qualified educators across Ghana and the African diaspora looking to teach flexible online classes.'
    },
    {
      q: 'What equipment is required for live classes?',
      a: 'Any smartphone, tablet, laptop, or desktop computer with an internet connection. No extra software downloads are required—Google Meet runs directly inside your browser.'
    }
  ];

  return (
    <div className="space-y-16 pb-16 text-slate-900 bg-white">

      {/* Hero Banner Section with Light Kente Overlay */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 border border-stone-200/80 shadow-sm p-6 sm:p-10 md:p-16">
        <KenteWatermark opacity={0.05} />
        <KentePattern className="absolute top-0 left-0 right-0 h-3 shadow-2xs" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-4">
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
            <span>Connecting Ghana & Diaspora Learners with Certified Educators</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Empower Academic Mastery with Certified Tutors in <span className="text-amber-800 font-serif italic">GES</span>, <span className="text-emerald-800">Cambridge</span> & <span className="text-red-800">Montessori</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Book 1-on-1 virtual classes with verified Ghanaian & international educators. Auto-synced Google Meet classrooms, homework tracking, and MTN Mobile Money (MoMo) payments.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            {/* Primary CTA - Register */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setRegisterRole('student');
                setShowRegisterModal(true);
              }}
              className="flex items-center gap-2.5 bg-amber-700 hover:bg-amber-800 text-white font-extrabold px-7 py-4 rounded-2xl shadow-md text-sm uppercase tracking-wider transition"
            >
              <UserCheck className="w-5 h-5" />
              <span>Register as Student</span>
            </motion.button>

            {/* Secondary CTA - Tutor Registration */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setRegisterRole('tutor');
                setShowRegisterModal(true);
              }}
              className="flex items-center gap-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-7 py-4 rounded-2xl shadow-md text-sm uppercase tracking-wider transition border border-emerald-700/30"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>Become a Tutor</span>
            </motion.button>

            {/* Instant Demo Launch */}
            <button
              onClick={onLaunchDemoMeet}
              className="flex items-center gap-2 bg-white hover:bg-stone-100 text-slate-800 font-extrabold px-6 py-4 rounded-2xl text-sm border border-stone-300 shadow-2xs transition"
            >
              <Video className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span>Try Virtual Classroom</span>
            </button>

          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-stone-200/80 max-w-3xl mx-auto">
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="relative z-10">
                <div className="text-xl sm:text-2xl font-black text-amber-800">100%</div>
                <div className="text-[11px] text-slate-500 font-medium">Verified Tutors</div>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="relative z-10">
                <div className="text-xl sm:text-2xl font-black text-emerald-800">GH₵ & $</div>
                <div className="text-[11px] text-slate-500 font-medium">MoMo & Card Payment</div>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="relative z-10">
                <div className="text-xl sm:text-2xl font-black text-sky-800">Google</div>
                <div className="text-[11px] text-slate-500 font-medium">Meet & Calendar Sync</div>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="relative z-10">
                <div className="text-xl sm:text-2xl font-black text-red-800">3 Tracks</div>
                <div className="text-[11px] text-slate-500 font-medium">GES, CIE & Montessori</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Virtual Classroom Canvas (Video-Free High Reliability Simulator) */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase tracking-widest bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            <Video className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Classroom Whiteboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Digital Whiteboard & Live Classroom Demo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select a curriculum below to explore live formulas, lesson notes, and Google Workspace live tools.
          </p>
        </div>

        {/* Whiteboard Interactive Simulator Card */}
        <KenteBorderCard className="p-6 sm:p-8 rounded-3xl space-y-6">
          
          {/* Top Curriculum Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl border border-stone-300/80">
              {(['GES', 'CAMBRIDGE', 'MONTESSORI'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setActiveDemoSubject(curr)}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${
                    activeDemoSubject === curr
                      ? 'bg-amber-700 text-white shadow-xs scale-102'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {curr} Standard
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Google Meet Sync Active</span>
            </div>
          </div>

          {/* Whiteboard Workspace Simulation */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-6 relative overflow-hidden">
            <KenteWatermark opacity={0.03} />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-4 relative z-10">
              <div>
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-widest">
                  {currentDemo.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{currentDemo.title}</h3>
                <p className="text-xs text-slate-600">Instructor: {currentDemo.tutor}</p>
              </div>

              <button
                onClick={onLaunchDemoMeet}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold px-4.5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
              >
                <Video className="w-4 h-4 text-amber-300" />
                <span>Launch Google Meet Sandbox</span>
              </button>
            </div>

            {/* Simulated Mathematical/Concept Canvas */}
            <div className="bg-white p-6 rounded-2xl border border-amber-300 space-y-4 font-mono text-center shadow-xs relative z-10">
              <div className="text-xs text-amber-800 uppercase tracking-widest font-sans font-bold flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" /> Live Whiteboard Render
              </div>

              <div className="text-lg sm:text-2xl font-black text-slate-900 bg-stone-50 py-4 px-6 rounded-xl border border-stone-200 tracking-wide">
                {currentDemo.formula}
              </div>

              <p className="text-xs text-slate-700 font-sans max-w-xl mx-auto leading-relaxed font-medium">
                {currentDemo.notes}
              </p>
            </div>

            {/* Bottom Interactive Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs relative z-10">
              <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Real-time Canvas Share</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Recorded Sessions for Revision</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Google Docs & Sheets Grading</span>
              </div>
            </div>

          </div>

        </KenteBorderCard>
      </section>

      {/* Curriculum Tracks Breakdown Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Tailored Curricula for Ghana & International Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select the exact academic pathway suited for your educational goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* GES Track */}
          <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
            <KenteWatermark opacity={0.03} />
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center font-black text-xl">
                GES
              </div>
              <h3 className="text-xl font-bold text-slate-900">GES SHS WASSCE & BECE</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete alignment with NaCCA & WAEC syllabus for Core & Elective Mathematics, Integrated Science, Biology, Chemistry, Physics, and Social Studies.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-stone-200 relative z-10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>WASSCE Past Questions & Mock Grading</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Certified SHS Subject Specialists</span>
              </li>
            </ul>
          </motion.div>

          {/* Cambridge Track */}
          <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
            <KenteWatermark opacity={0.03} />
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-900 border border-sky-300 flex items-center justify-center font-black text-xl">
                CIE
              </div>
              <h3 className="text-xl font-bold text-slate-900">Cambridge IGCSE & A-Levels</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous preparation for Cambridge Assessment International Education (CIE) exams with structured past paper workouts and mark scheme strategies.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-stone-200 relative z-10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700" />
                <span>IGCSE / AS & A-Level Syllabus</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700" />
                <span>Experienced CIE Examiners</span>
              </li>
            </ul>
          </motion.div>

          {/* Montessori Track */}
          <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
            <KenteWatermark opacity={0.03} />
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-black text-xl">
                AMI
              </div>
              <h3 className="text-xl font-bold text-slate-900">AMI Montessori Early Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Child-centered sensory learning, concrete mathematical bead operations, and early phonics guided by AMI-certified Montessori diploma holders.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-stone-200 relative z-10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Ages 3-12 Foundational Learning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Sensory & Spatial Phonics</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* Explore Verified Tutors Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Explore Our Certified Educator Network
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Browse profiles, subjects, ratings, and rates in GHS and USD.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subject or tutor name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-white border border-stone-300 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs outline-none focus:border-amber-600 w-56 shadow-2xs"
              />
            </div>

            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-300">
              {(['ALL', 'GES', 'CAMBRIDGE', 'MONTESSORI'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurriculumFilter(curr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedCurriculumFilter === curr
                      ? 'bg-amber-700 text-white font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <motion.div
              key={tutor.id}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden"
            >
              <KenteWatermark opacity={0.03} />
              <div className="space-y-4 relative z-10">
                <div className="flex items-start gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-amber-800 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                      <span>{tutor.rating} ({tutor.reviewsCount} reviews)</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{tutor.name}</h3>
                    <p className="text-xs text-emerald-800 font-bold">{tutor.location}</p>
                    <p className="text-[11px] text-slate-500">{tutor.verificationBadge}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {tutor.bio}
                </p>

                {/* Subjects & Curricula tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tutor.curricula.map(c => (
                    <span key={c} className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      {c}
                    </span>
                  ))}
                  {tutor.subjects.slice(0, 2).map(s => (
                    <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-slate-700 border border-stone-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Book Action */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between relative z-10">
                <div>
                  <div className="text-xs text-slate-500">Hourly Rate</div>
                  <div className="text-base font-black text-amber-800 font-mono">
                    {currency === 'GHS' ? `GH₵${tutor.hourlyRateGHS}` : `$${tutor.hourlyRateUSD}`}
                    <span className="text-xs text-slate-500 font-normal"> / hr</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRegisterRole('student');
                    setShowRegisterModal(true);
                  }}
                  className="bg-amber-700 hover:bg-amber-800 text-white font-extrabold px-4 py-2 rounded-xl text-xs transition shadow-2xs flex items-center gap-1.5"
                >
                  <span>Book Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* Integration Ecosystem Showcase */}
      <section className="bg-stone-50 rounded-3xl p-8 border border-stone-200 shadow-2xs space-y-6 relative overflow-hidden">
        <KenteWatermark opacity={0.04} />
        <div className="text-center max-w-xl mx-auto space-y-2 relative z-10">
          <h2 className="text-2xl font-black text-slate-900">
            Seamless Platform Architecture
          </h2>
          <p className="text-xs text-slate-600">
            Powered by enterprise Google Workspace integration & local financial gateways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-2xs">
            <div className="p-3 w-fit rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Google Meet & Calendar API</h3>
            <p className="text-xs text-slate-600">
              Automated video classroom creation with Google OAuth calendar event sync and email invitations.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-2xs">
            <div className="p-3 w-fit rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">MTN MoMo & Paystack</h3>
            <p className="text-xs text-slate-600">
              Instant mobile money receipts for Ghana (MTN, Telecel, AT) and international card processing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-2xs">
            <div className="p-3 w-fit rounded-xl bg-sky-100 text-sky-800 border border-sky-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Google Docs Homework API</h3>
            <p className="text-xs text-slate-600">
              Seamless assignment submission, grading, and direct tutor feedback in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-600">Everything you need to know about Akoma Tutoring Ghana.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-amber-700 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 border-t border-stone-200 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Registration Modal Dialog */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-stone-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-slate-900"
            >
              <KenteWatermark opacity={0.03} />

              {/* Close Button */}
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-900 p-1 rounded-lg bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 relative z-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-amber-700" />
                  <span>Account Registration</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">Join Akoma Tutoring Ghana</h3>
                <p className="text-xs text-slate-600">Select your registration type below to get started.</p>
              </div>

              {/* Success Notification Alert */}
              {registrationSuccess && (
                <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-2 relative z-10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{registrationSuccess}</span>
                </div>
              )}

              {/* Role Switcher Tabs inside Modal */}
              <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-2xl border border-stone-300 relative z-10">
                <button
                  type="button"
                  onClick={() => setRegisterRole('student')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    registerRole === 'student'
                      ? 'bg-amber-700 text-white font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Register Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegisterRole('tutor')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    registerRole === 'tutor'
                      ? 'bg-emerald-800 text-white font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Register Tutor</span>
                </button>
              </div>

              {/* Student Registration Form */}
              {registerRole === 'student' ? (
                <form onSubmit={handleStudentSubmit} className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ama Mensah"
                      value={studentForm.name}
                      onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="ama.mensah@gmail.com"
                      value={studentForm.email}
                      onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">WhatsApp / MoMo Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+233 24 123 4567"
                      value={studentForm.phone}
                      onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Curriculum Track</label>
                      <select
                        value={studentForm.curriculum}
                        onChange={e => setStudentForm({ ...studentForm, curriculum: e.target.value as CurriculumType })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-600"
                      >
                        <option value="GES">GES (WASSCE/BECE)</option>
                        <option value="CAMBRIDGE">Cambridge CIE</option>
                        <option value="MONTESSORI">AMI Montessori</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Grade / Level</label>
                      <input
                        type="text"
                        placeholder="e.g. SHS 2 or IGCSE"
                        value={studentForm.gradeLevel}
                        onChange={e => setStudentForm({ ...studentForm, gradeLevel: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition"
                  >
                    Complete Student Registration
                  </button>
                </form>
              ) : (
                /* Tutor Registration Form */
                <form onSubmit={handleTutorSubmit} className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kofi Agyeman, M.Sc."
                      value={tutorForm.name}
                      onChange={e => setTutorForm({ ...tutorForm, name: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="kofi.agyeman@gmail.com"
                      value={tutorForm.email}
                      onChange={e => setTutorForm({ ...tutorForm, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Primary Curriculum</label>
                      <select
                        value={tutorForm.curriculum}
                        onChange={e => setTutorForm({ ...tutorForm, curriculum: e.target.value as CurriculumType })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700"
                      >
                        <option value="GES">GES (NaCCA Certified)</option>
                        <option value="CAMBRIDGE">Cambridge CIE Specialist</option>
                        <option value="MONTESSORI">AMI Montessori Diploma</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Hourly Rate (GH₵)</label>
                      <input
                        type="number"
                        min="50"
                        max="1000"
                        value={tutorForm.hourlyRateGHS}
                        onChange={e => setTutorForm({ ...tutorForm, hourlyRateGHS: Number(e.target.value) })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Qualifications & Certifications</label>
                    <input
                      type="text"
                      placeholder="e.g. NaCCA Certified, B.Ed. Physics"
                      value={tutorForm.qualifications}
                      onChange={e => setTutorForm({ ...tutorForm, qualifications: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition"
                  >
                    Complete Tutor Application
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
