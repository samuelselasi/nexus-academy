import React, { useState } from 'react';
import { TutorProfile, CurriculumType } from '../types';
import { KenteWatermark } from './KentePattern';
import { TutorIntroModal } from './TutorIntroModal';
import { soundEngine } from '../utils/audioEffects';
import { Search, Star, CheckCircle, Shield, MapPin, Calendar, Video } from 'lucide-react';

interface TutorDiscoveryProps {
  tutors: TutorProfile[];
  currency: 'GHS' | 'USD';
  onBookTutor: (tutor: TutorProfile) => void;
}

export const TutorDiscovery: React.FC<TutorDiscoveryProps> = ({
  tutors,
  currency,
  onBookTutor,
}) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [maxRate, setMaxRate] = useState<number>(400);
  const [selectedTutorForIntro, setSelectedTutorForIntro] = useState<TutorProfile | null>(null);

  // Extract all unique subjects
  const allSubjects = Array.from(new Set(tutors.flatMap(t => t.subjects)));

  // Filtered tutors
  const filteredTutors = tutors.filter(tutor => {
    const matchesCurriculum = selectedCurriculum === 'ALL' || tutor.curricula.includes(selectedCurriculum);
    const matchesSubject = selectedSubject === 'ALL' || tutor.subjects.includes(selectedSubject);
    const matchesSearch = searchQuery === '' || 
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRate = currency === 'GHS' ? tutor.hourlyRateGHS <= maxRate : tutor.hourlyRateUSD <= (maxRate / 12);

    return matchesCurriculum && matchesSubject && matchesSearch && matchesRate;
  });

  return (
    <div className="space-y-8 pb-12 text-slate-900 bg-white">
      {/* Search & Filter Top Bar */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-5 relative overflow-hidden">
        <KenteWatermark opacity={0.03} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-5 relative z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Find Certified Ghanaian & International Tutors
            </h2>
            <p className="text-xs text-slate-600">
              Verified by Ghana Education Service (GES), Cambridge International, and AMI Montessori.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, subject, or topic..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 transition"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center relative z-10">
          
          {/* Curriculum Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Curriculum Standard
            </label>
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-300">
              {(['ALL', 'GES', 'CAMBRIDGE', 'MONTESSORI'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurriculum(curr)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition ${
                    selectedCurriculum === curr
                      ? 'bg-amber-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Subject Area
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-amber-600"
            >
              <option value="ALL">All Subjects</option>
              {allSubjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Max Hourly Rate Filter */}
          <div className="space-y-1 sm:col-span-2 md:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Max Hourly Rate ({currency === 'GHS' ? 'GH₵' : '$'})
              </label>
              <span className="font-mono font-bold text-amber-800">
                {currency === 'GHS' ? `GH₵${maxRate}` : `$${Math.round(maxRate/12)}`} / hr
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={500}
              step={10}
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-full accent-amber-700 cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* Tutor Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTutors.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-stone-200 text-slate-500">
            No tutors match your selected curriculum and subject filters. Try adjusting the search range.
          </div>
        ) : (
          filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between relative"
            >
              <KenteWatermark opacity={0.03} />
              <div className="p-6 space-y-4 relative z-10">
                
                {/* Header info */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-2xs"
                    />
                    {tutor.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white p-1 rounded-full border-2 border-white" title="Verified Certification">
                        <CheckCircle className="w-3.5 h-3.5 fill-current text-white" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-slate-900 truncate">
                        {tutor.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-xs font-bold border border-amber-300 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                        <span>{tutor.rating}</span>
                        <span className="text-[10px] text-amber-700 font-normal">({tutor.reviewsCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                      {tutor.headline}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {tutor.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-950 font-medium">
                  <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-bold text-[11px] leading-tight">
                    {tutor.verificationBadge}
                  </span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {tutor.bio}
                </p>

                {/* Curricula Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {tutor.curricula.map(c => (
                    <span
                      key={c}
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        c === 'GES' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        c === 'CAMBRIDGE' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                        'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {c} Certified
                    </span>
                  ))}
                  {tutor.subjects.slice(0, 3).map(subj => (
                    <span key={subj} className="text-[10px] bg-stone-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-stone-200">
                      {subj}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Card Footer with Price & Booking Action */}
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div>
                  <span className="text-xs text-slate-500 block">Hourly Rate</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">
                    {currency === 'GHS' ? `GH₵${tutor.hourlyRateGHS}` : `$${tutor.hourlyRateUSD}`}
                    <span className="text-xs text-slate-500 font-normal"> / session</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playWhiteboardSound();
                      setSelectedTutorForIntro(tutor);
                    }}
                    className="bg-white hover:bg-stone-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <Video className="w-3.5 h-3.5 text-amber-700" />
                    <span>Watch Intro</span>
                  </button>

                  <button
                    onClick={() => onBookTutor(tutor)}
                    className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xs transition flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {selectedTutorForIntro && (
        <TutorIntroModal
          tutor={selectedTutorForIntro}
          onClose={() => setSelectedTutorForIntro(null)}
          onBookTutor={onBookTutor}
        />
      )}
    </div>
  );
};
