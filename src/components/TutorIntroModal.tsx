import React, { useState } from 'react';
import { TutorProfile } from '../types';
import { KenteWatermark } from './KentePattern';
import { X, Play, Pause, Volume2, Video, FileText, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

interface TutorIntroModalProps {
  tutor: TutorProfile;
  onClose: () => void;
  onBookTutor: (tutor: TutorProfile) => void;
}

export const TutorIntroModal: React.FC<TutorIntroModalProps> = ({
  tutor,
  onClose,
  onBookTutor,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'audio' | 'transcript'>('video');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const toggleAudio = () => {
    soundEngine.playWhiteboardSound();
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative">
        <KenteWatermark opacity={0.03} />

        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{tutor.name}</h3>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  ★ {tutor.rating}
                </span>
              </div>
              <p className="text-xs text-stone-300 line-clamp-1 font-medium">{tutor.headline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 px-6 py-3 bg-stone-50 relative z-10">
          <button
            onClick={() => setActiveMediaTab('video')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeMediaTab === 'video'
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Introduction</span>
          </button>

          <button
            onClick={() => setActiveMediaTab('audio')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeMediaTab === 'audio'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Audio Voice Note</span>
          </button>

          <button
            onClick={() => setActiveMediaTab('transcript')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeMediaTab === 'transcript'
                ? 'bg-sky-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Transcript</span>
          </button>
        </div>

        {/* Media Content Display */}
        <div className="p-6 space-y-6 relative z-10">
          
          {activeMediaTab === 'video' && (
            <div className="space-y-3">
              <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden relative shadow-inner border border-stone-800 flex items-center justify-center group">
                <video
                  src={tutor.introVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-female-teacher-speaking-in-a-classroom-41315-large.mp4"}
                  controls
                  poster={tutor.avatar}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-slate-500 italic text-center">
                Watch {tutor.name} outline their classroom pedagogy and preparation strategy.
              </p>
            </div>
          )}

          {activeMediaTab === 'audio' && (
            <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Audio Introduction & Accent Preview</h4>
                    <p className="text-[11px] text-emerald-300">Recorded by {tutor.name}</p>
                  </div>
                </div>

                <button
                  onClick={toggleAudio}
                  className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl transition shadow-md flex items-center gap-2 text-xs"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlayingAudio ? 'Pause Audio' : 'Play Audio Clip'}</span>
                </button>
              </div>

              {/* Waveform Visualizer simulation */}
              <div className="flex items-center gap-1 h-8 px-2 bg-emerald-900/60 rounded-xl overflow-hidden">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio ? 'bg-amber-400 animate-pulse' : 'bg-emerald-700'
                    }`}
                    style={{
                      height: `${isPlayingAudio ? Math.max(15, Math.sin(i + Date.now()) * 100)%90 : 20}%`
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Transcript / Philosophy */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Educator Methodology Transcript</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "{tutor.introTranscript || tutor.bio}"
            </p>
          </div>

          {/* Educator Credentials & Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 text-xs">
            <span className="font-bold text-slate-800">Verified Badges:</span>
            <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              {tutor.verificationBadge}
            </span>
            <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 text-[11px]">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              {tutor.curricula.join(' & ')} Certified
            </span>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-extrabold">Hourly Booking Rate</div>
              <div className="text-lg font-mono font-extrabold text-amber-900">
                GH₵{tutor.hourlyRateGHS} <span className="text-xs text-slate-500 font-sans font-normal">/ hr (${tutor.hourlyRateUSD})</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookTutor(tutor);
              }}
              className="py-3 px-6 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-xl shadow-2xs transition text-xs flex items-center gap-2"
            >
              <span>Book Online Session with {tutor.name.split(' ')[0]}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
