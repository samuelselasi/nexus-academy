import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KenteWatermark } from './KentePattern';
import { soundEngine } from '../utils/audioEffects';
import { Award, Sparkles, CheckCircle2, Lock, Share2, Trophy, Clock, Star, X, ChevronRight, ShieldCheck } from 'lucide-react';

export interface GoldKenteBadge {
  id: string;
  hoursRequired: number;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
  unlocked: boolean;
  unlockedDate?: string;
  weaverTitle: string; // Ghanaian traditional accolade title
  kentePatternColors: string[];
}

interface GoldKenteMilestoneBadgesProps {
  completedHours?: number; // Total hours completed by the student
}

export const GoldKenteMilestoneBadges: React.FC<GoldKenteMilestoneBadgesProps> = ({
  completedHours = 12 // Default to 12 hours so 5h & 10h are unlocked, 20h is in progress
}) => {
  const [selectedBadge, setSelectedBadge] = useState<GoldKenteBadge | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);

  const badges: GoldKenteBadge[] = [
    {
      id: 'kente_5h',
      hoursRequired: 5,
      title: 'Adinkra Gold Weaver',
      subtitle: '5 Hours Tutoring Milestone',
      description: 'Awarded for completing 5 hours of intensive 1-on-1 virtual tutoring across GES, Cambridge, or Montessori tracks.',
      symbol: '🥇',
      unlocked: completedHours >= 5,
      unlockedDate: '12 June 2026',
      weaverTitle: 'Ahemaa Weaver of Perseverance',
      kentePatternColors: ['#f59e0b', '#d97706', '#92400e']
    },
    {
      id: 'kente_10h',
      hoursRequired: 10,
      title: 'Sika Kente Master Scholar',
      subtitle: '10 Hours Tutoring Milestone',
      description: 'Recognizing 10 hours of dedicated academic mastery in WASSCE & IGCSE subject preparation.',
      symbol: '👑',
      unlocked: completedHours >= 10,
      unlockedDate: '04 July 2026',
      weaverTitle: 'Ohene Royal Scholar of Distinction',
      kentePatternColors: ['#fbbf24', '#b45309', '#047857']
    },
    {
      id: 'kente_20h',
      hoursRequired: 20,
      title: 'Golden Stool Grand Laureate',
      subtitle: '20 Hours Tutoring Milestone',
      description: 'The pinnacle Gold Kente Honor awarded for 20+ hours of exemplary academic commitment and mastery.',
      symbol: '🏆',
      unlocked: completedHours >= 20,
      weaverTitle: 'Osagyefo Champion of Knowledge',
      kentePatternColors: ['#f59e0b', '#10b981', '#0369a1']
    }
  ];

  // Calculate next target
  const nextBadge = badges.find(b => !b.unlocked) || badges[badges.length - 1];
  const previousHours = badges.filter(b => b.unlocked).pop()?.hoursRequired || 0;
  const targetHours = nextBadge.hoursRequired;
  const progressPercent = Math.min(100, Math.round(((completedHours) / 20) * 100));

  const handleInspectBadge = (badge: GoldKenteBadge) => {
    soundEngine.playPaymentSuccessChime();
    setSelectedBadge(badge);
    setShowCertificate(false);
  };

  const handleShareBadge = () => {
    soundEngine.playUssdKeyClick();
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden space-y-6">
      
      {/* Kente Watermark Overlay */}
      <KenteWatermark opacity={0.05} />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
            <Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>National Academic Honors System</span>
          </div>

          <h2 className="text-xl md:text-2xl font-black font-serif-heading text-amber-100 flex items-center gap-2">
            <span>Gold Kente Milestone Honors</span>
          </h2>

          <p className="text-xs text-amber-200/80 font-medium">
            Earn prestigious Ghanaian Gold Kente weaves for every 5, 10, and 20 hours of live tutoring completed.
          </p>
        </div>

        {/* Current Hours Counter Pill */}
        <div className="bg-slate-900/90 border border-amber-500/50 p-3.5 rounded-2xl flex items-center gap-3 shrink-0 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-inner">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black font-mono text-amber-300">{completedHours} / 20 hrs</div>
            <div className="text-[10px] text-amber-200/70 font-bold uppercase tracking-wider">Tutoring Hours Logged</div>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-2 relative z-10 bg-slate-950/60 p-4 rounded-2xl border border-amber-500/20 backdrop-blur-xs">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next Milestone: {nextBadge.title} ({nextBadge.hoursRequired} Hours)</span>
          </span>
          <span className="text-amber-400 font-mono">{progressPercent}% Achieved</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-amber-500/30 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 shadow-md"
          />
        </div>

        <div className="flex justify-between text-[10px] text-amber-200/60 font-mono font-bold pt-0.5">
          <span>0 hrs</span>
          <span>5 hrs (Bronze)</span>
          <span>10 hrs (Silver)</span>
          <span>20 hrs (Gold Laureate)</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInspectBadge(badge)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 ${
              badge.unlocked
                ? 'bg-gradient-to-b from-amber-900/60 to-slate-900 border-amber-400/80 shadow-lg shadow-amber-950/50 hover:border-amber-300'
                : 'bg-slate-950/80 border-slate-800 opacity-70 hover:opacity-90'
            }`}
          >
            {/* Kente Corner Watermark Accent */}
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${badge.kentePatternColors[0]} 0%, transparent 70%)`
              }}
            />

            {/* Badge Top Info */}
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-300 border border-amber-200 text-slate-950 flex items-center justify-center text-2xl shadow-md">
                {badge.symbol}
              </div>

              {badge.unlocked ? (
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" /> Unlocked
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> {badge.hoursRequired - completedHours} hrs away
                </span>
              )}
            </div>

            {/* Badge Title & Hours */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                {badge.hoursRequired} Hours Milestone
              </span>
              <h3 className="text-base font-bold font-serif-heading text-amber-100">
                {badge.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                {badge.description}
              </p>
            </div>

            {/* Bottom Call to Action */}
            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-300">
              <span>{badge.unlocked ? 'View Honors Badge' : 'Locked Milestone'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>

          </motion.div>
        ))}
      </div>

      {/* Badge Inspection / Certificate Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border-2 border-amber-400/80 rounded-3xl max-w-lg w-full p-6 space-y-6 text-white shadow-2xl relative overflow-hidden"
            >
              <KenteWatermark opacity={0.06} />

              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {!showCertificate ? (
                /* Badge View */
                <div className="text-center space-y-4 pt-2">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 border-2 border-amber-200 text-slate-950 flex items-center justify-center text-4xl shadow-xl animate-pulse">
                    {selectedBadge.symbol}
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-amber-400 font-extrabold tracking-widest uppercase">
                      Official Ghanaian Gold Kente Award
                    </span>
                    <h3 className="text-2xl font-black font-serif-heading text-amber-100">
                      {selectedBadge.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold font-mono">
                      {selectedBadge.weaverTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    {selectedBadge.description}
                  </p>

                  <div className="flex items-center justify-center gap-4 text-xs font-mono text-amber-200/80">
                    <div>
                      <span className="block text-slate-400 text-[10px]">Hours Logged</span>
                      <strong className="text-amber-300 font-bold">{selectedBadge.hoursRequired} Hours</strong>
                    </div>
                    <span>•</span>
                    <div>
                      <span className="block text-slate-400 text-[10px]">Status</span>
                      <strong className={selectedBadge.unlocked ? 'text-emerald-400' : 'text-slate-400'}>
                        {selectedBadge.unlocked ? `Unlocked (${selectedBadge.unlockedDate})` : 'In Progress'}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleShareBadge}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{copiedShareLink ? 'Link Copied!' : 'Share Achievement'}</span>
                    </button>

                    {selectedBadge.unlocked && (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Official Certificate</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Gold Kente Honors Certificate View */
                <div className="space-y-4 pt-2">
                  <div className="bg-amber-50 text-slate-900 p-6 rounded-2xl border-4 border-amber-500 space-y-4 text-center relative shadow-inner">
                    <div className="flex items-center justify-between border-b border-amber-200 pb-2 text-[10px] font-bold text-amber-900 uppercase font-mono">
                      <span>Nexus Academy Honors</span>
                      <span>Certificate ID: {selectedBadge.id.toUpperCase()}-2026</span>
                    </div>

                    <div className="w-12 h-12 mx-auto rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-bold shadow-md">
                      {selectedBadge.symbol}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-extrabold font-serif-heading text-slate-900">
                        Certificate of Academic Excellence
                      </h4>
                      <p className="text-xs text-slate-600">This certifies that student</p>
                      <p className="text-base font-extrabold text-amber-900 underline decoration-amber-500">
                        Kofi Kwakye
                      </p>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      has successfully completed <strong className="text-amber-900">{selectedBadge.hoursRequired} Hours</strong> of live 1-on-1 virtual instruction and is hereby awarded the prestigious honor of:
                    </p>

                    <div className="bg-amber-100 p-2.5 rounded-xl border border-amber-300 font-extrabold text-amber-900 text-sm font-serif-heading">
                      {selectedBadge.title} — {selectedBadge.weaverTitle}
                    </div>

                    <div className="flex items-center justify-between pt-3 text-[10px] text-slate-500 border-t border-amber-200 font-mono">
                      <span>Ghana Education Service & Cambridge Standards</span>
                      <span>Awarded: {selectedBadge.unlockedDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCertificate(false)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
                  >
                    Back to Badge Details
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
