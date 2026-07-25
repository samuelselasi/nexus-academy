import React, { useState } from 'react';
import { Session, Assignment, CurriculumProgress } from '../types';
import { formatToUserTimezone, getMinutesUntilSession, isJoinable } from '../utils/dateTimeUtils';
import { KenteWatermark, KenteBorderCard } from './KentePattern';
import { AiDiagnosticPredictor } from './AiDiagnosticPredictor';
import { StudyGroupsForum } from './StudyGroupsForum';
import { GoldKenteMilestoneBadges } from './GoldKenteMilestoneBadges';
import { soundEngine } from '../utils/audioEffects';
import { motion } from 'motion/react';
import { Video, Calendar, Clock, BookOpen, Award, CheckCircle2, ArrowRight, Sparkles, FileText, Smartphone, Brain, Users, Layout } from 'lucide-react';

interface StudentDashboardProps {
  sessions: Session[];
  assignments: Assignment[];
  curriculumProgress: CurriculumProgress[];
  timezone: string;
  currency: 'GHS' | 'USD';
  onBookTutorClick: () => void;
  onJoinMeetClick: (session: Session) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  sessions,
  assignments,
  curriculumProgress,
  timezone,
  currency,
  onBookTutorClick,
  onJoinMeetClick,
}) => {
  const [activeTab, setActiveTab] = useState<'portal' | 'diagnostic' | 'study_groups'>('portal');

  const upcomingSessions = sessions.filter(s => s.status === 'SCHEDULED' || s.status === 'IN_PROGRESS');
  const pastSessions = sessions.filter(s => s.status === 'COMPLETED');

  // Next imminent session
  const nextSession = upcomingSessions[0];

  return (
    <div className="space-y-8 pb-12 text-slate-900 bg-white">
      {/* Welcome Hero Banner with Ghanaian Kente Overlay */}
      <KenteBorderCard className="p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" />
              <span>Certified GES WASSCE • Cambridge CIE • AMI Montessori</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Akwaaba! Welcome to Your Live Virtual Portal
            </h1>
            
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Your virtual classroom connects seamlessly with expert tutors certified across Ghana and international diaspora standards. Synced in <span className="text-amber-800 font-bold font-mono">{timezone}</span>.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookTutorClick}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider shrink-0"
          >
            <span>Book Certified Tutor</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="pt-4 border-t border-amber-200/80 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setActiveTab('portal');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'portal'
                ? 'bg-amber-800 text-white shadow-2xs'
                : 'bg-white/80 text-slate-700 hover:bg-amber-100'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>My Classes & Progress</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setActiveTab('diagnostic');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'diagnostic'
                ? 'bg-amber-800 text-white shadow-2xs'
                : 'bg-white/80 text-slate-700 hover:bg-amber-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Diagnostic & WASSCE Score Predictor</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setActiveTab('study_groups');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'study_groups'
                ? 'bg-amber-800 text-white shadow-2xs'
                : 'bg-white/80 text-slate-700 hover:bg-amber-100'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Student Study Groups & Forums</span>
          </button>
        </div>
      </KenteBorderCard>

      {/* Render selected view */}
      {activeTab === 'diagnostic' && (
        <AiDiagnosticPredictor onSelectTutorToBook={() => onBookTutorClick()} />
      )}

      {activeTab === 'study_groups' && (
        <StudyGroupsForum />
      )}

      {activeTab === 'portal' && (
        <>
          {/* Hero Imminent Session Alert / Google Meet Join Card */}
          {nextSession && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-slate-900 rounded-3xl p-6 border border-stone-200 shadow-xs relative overflow-hidden"
            >
              <KenteWatermark opacity={0.03} />
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={nextSession.tutorAvatar}
                      alt={nextSession.tutorName}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-emerald-800 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white">
                      {nextSession.curriculum}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                        Next Class Ready
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        ID: {nextSession.googleEventId}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900">
                      {nextSession.subject}: {nextSession.topic || 'Interactive Virtual Classroom'}
                    </h3>
                    
                    <p className="text-xs text-slate-600 flex flex-wrap items-center gap-2 font-medium">
                      <span>Tutor: <strong className="text-amber-800">{nextSession.tutorName}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {formatToUserTimezone(nextSession.startTime, timezone)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Google Meet Join Button */}
                <div className="w-full md:w-auto bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col items-center justify-center text-center gap-3 shrink-0">
                  {(() => {
                    const minutesLeft = getMinutesUntilSession(nextSession.startTime);
                    const active = isJoinable(nextSession.startTime, nextSession.endTime);

                    if (active) {
                      return (
                        <>
                          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                            Classroom Active (Google Meet)
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onJoinMeetClick(nextSession)}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-xs transition-all text-xs"
                          >
                            <Video className="w-4 h-4 text-amber-300" />
                            <span>Enter Google Meet Classroom</span>
                          </motion.button>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="text-xs text-slate-600">
                            Class starts in <span className="text-amber-800 font-bold font-mono text-sm">{minutesLeft > 0 ? `${minutesLeft} mins` : 'soon'}</span>
                          </div>
                          <button
                            onClick={() => onJoinMeetClick(nextSession)}
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-xs border border-stone-300 shadow-2xs transition"
                          >
                            <Video className="w-4 h-4 text-amber-700" />
                            <span>Preview Google Meet Classroom</span>
                          </button>
                        </>
                      );
                    }
                  })()}
                </div>

              </div>
            </motion.div>
          )}

          {/* Prominent Gold Kente Milestone Honors Section */}
          <GoldKenteMilestoneBadges completedHours={pastSessions.length > 0 ? Math.max(12, pastSessions.length * 2) : 12} />

          {/* Grid Section: Overview Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div whileHover={{ y: -2 }} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs flex items-center gap-4 relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="p-3 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 relative z-10">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-black text-amber-900">{upcomingSessions.length}</div>
                <div className="text-xs text-slate-500 font-medium">Upcoming Live Classes</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs flex items-center gap-4 relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 relative z-10">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-black text-emerald-900">{pastSessions.length}</div>
                <div className="text-xs text-slate-500 font-medium">Completed Classes</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs flex items-center gap-4 relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="p-3 rounded-xl bg-sky-100 text-sky-800 border border-sky-300 relative z-10">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-black text-sky-900">{assignments.length}</div>
                <div className="text-xs text-slate-500 font-medium">Active Homework</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs flex items-center gap-4 relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <div className="p-3 rounded-xl bg-red-100 text-red-800 border border-red-300 relative z-10">
                <Award className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-black text-slate-900">3 Tracks</div>
                <div className="text-xs text-slate-500 font-medium">GES • Cambridge • Montessori</div>
              </div>
            </motion.div>
          </div>

          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (2 cols): Upcoming Sessions & Assignments */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Upcoming Classes List */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden relative">
                <KenteWatermark opacity={0.02} />
                <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between relative z-10">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-700" />
                    Scheduled Live Classes
                  </h2>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full border border-amber-300">
                    Google Calendar Synced
                  </span>
                </div>

                <div className="divide-y divide-stone-200 relative z-10">
                  {upcomingSessions.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No upcoming sessions booked yet. Browse our certified GES, Cambridge, and Montessori tutors to get started!
                    </div>
                  ) : (
                    upcomingSessions.map((session) => (
                      <div key={session.id} className="p-5 hover:bg-stone-50/80 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        
                        <div className="flex items-start gap-4">
                          <img
                            src={session.tutorAvatar}
                            alt={session.tutorName}
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/80 shadow-2xs"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                                session.curriculum === 'GES' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                                session.curriculum === 'CAMBRIDGE' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                                'bg-amber-100 text-amber-900 border border-amber-300'
                              }`}>
                                {session.curriculum} Standard
                              </span>
                              <span className="text-xs text-slate-500 font-medium">
                                Tutor: {session.tutorName}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900">
                              {session.subject}
                            </h4>

                            <p className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                              <span className="flex items-center gap-1 font-medium text-slate-700">
                                <Clock className="w-3.5 h-3.5 text-amber-700" />
                                {formatToUserTimezone(session.startTime, timezone)}
                              </span>
                              <span>•</span>
                              <span className="text-emerald-800 font-mono font-bold">
                                Paid via {session.paymentMethod.replace('_', ' ')} ({currency === 'GHS' ? `GH₵${session.amountPaidGHS}` : `$${Math.round(session.amountPaidGHS / 12)}`})
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 w-full sm:w-auto">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onJoinMeetClick(session)}
                            className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 shadow-2xs"
                          >
                            <Video className="w-3.5 h-3.5 text-amber-300" />
                            <span>Join Virtual Class</span>
                          </motion.button>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Active Homework Card */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden relative">
                <KenteWatermark opacity={0.02} />
                <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between relative z-10">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-700" />
                    Active Homework & WASSCE / IGCSE Practice
                  </h2>
                </div>

                <div className="divide-y divide-stone-200 relative z-10">
                  {assignments.map((asgn) => (
                    <div key={asgn.id} className="p-5 flex items-center justify-between gap-4 hover:bg-stone-50/80 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold bg-stone-100 text-amber-900 px-2 py-0.5 rounded border border-stone-300">
                            {asgn.subject} ({asgn.curriculum})
                          </span>
                          <span className="text-xs text-slate-500 font-medium">Tutor: {asgn.tutorName}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900">{asgn.title}</h4>
                        <p className="text-xs text-slate-500">
                          Due: {formatToUserTimezone(asgn.dueDate, timezone)}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {asgn.status === 'GRADED' ? (
                          <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1 rounded-full border border-emerald-300">
                            Grade: {asgn.grade}
                          </span>
                        ) : (
                          <button className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-black px-3.5 py-1.5 rounded-xl transition shadow-2xs">
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (1 col): Curriculum Mastery & MoMo Receipts */}
            <div className="space-y-6">
              
              {/* Curriculum Mastery Progress Widget */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5 relative overflow-hidden">
                <KenteWatermark opacity={0.03} />
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 relative z-10">
                  <Award className="w-5 h-5 text-amber-700" />
                  Curriculum Mastery Tracking
                </h3>

                <div className="space-y-4 relative z-10">
                  {curriculumProgress.map((cp) => (
                    <div key={cp.curriculum} className="space-y-2 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-amber-900">{cp.curriculum} Standard</span>
                        <span className="font-mono text-emerald-800 font-extrabold">{cp.percentage}%</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            cp.curriculum === 'GES' ? 'bg-emerald-700' :
                            cp.curriculum === 'CAMBRIDGE' ? 'bg-sky-700' : 'bg-amber-700'
                          }`}
                          style={{ width: `${cp.percentage}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-600 font-medium">
                        {cp.completedModules} of {cp.totalModules} modules completed
                      </p>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cp.badges.map((badge) => (
                          <span key={badge} className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold border border-amber-300">
                            🏅 {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & MoMo Receipts Summary */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 relative overflow-hidden">
                <KenteWatermark opacity={0.03} />
                <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-700" />
                    MTN MoMo & Card Receipts
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded border border-emerald-300 font-bold">
                    Paystack Gateway
                  </span>
                </div>

                <div className="space-y-3 text-xs divide-y divide-stone-200 relative z-10">
                  {sessions.map((sess) => (
                    <div key={sess.id} className="pt-2 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{sess.subject}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{sess.transactionRef}</p>
                      </div>
                      <div className="text-right font-mono font-bold text-amber-800">
                        {currency === 'GHS' ? `GH₵${sess.amountPaidGHS}` : `$${Math.round(sess.amountPaidGHS / 12)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
};

