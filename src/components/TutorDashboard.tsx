import React, { useState } from 'react';
import { TutorProfile, Session } from '../types';
import { formatToUserTimezone } from '../utils/dateTimeUtils';
import { KenteWatermark } from './KentePattern';
import { TutorPayoutWallet } from './TutorPayoutWallet';
import { soundEngine } from '../utils/audioEffects';
import { Video, Calendar, CheckCircle2, Clock, DollarSign, Plus, Wallet, Layout } from 'lucide-react';

interface TutorDashboardProps {
  tutorProfile: TutorProfile;
  sessions: Session[];
  timezone: string;
  currency: 'GHS' | 'USD';
  onUpdateProfile: (updated: TutorProfile) => void;
}

export const TutorDashboard: React.FC<TutorDashboardProps> = ({
  tutorProfile,
  sessions,
  timezone,
  currency,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'wallet'>('roster');
  const [googleConnected, setGoogleConnected] = useState<boolean>(tutorProfile.googleCalendarConnected);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const [hourlyRateGHS, setHourlyRateGHS] = useState<number>(tutorProfile.hourlyRateGHS);
  const [hourlyRateUSD, setHourlyRateUSD] = useState<number>(tutorProfile.hourlyRateUSD);
  const [slots, setSlots] = useState<string[]>(tutorProfile.availableSlots);
  const [newSlotInput, setNewSlotInput] = useState<string>('');

  const handleToggleGoogleOAuth = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setGoogleConnected(!googleConnected);
      setIsConnecting(false);
      onUpdateProfile({
        ...tutorProfile,
        googleCalendarConnected: !googleConnected
      });
    }, 1200);
  };

  const handleAddSlot = () => {
    if (!newSlotInput) return;
    const isoString = new Date(newSlotInput).toISOString();
    const updated = [...slots, isoString];
    setSlots(updated);
    setNewSlotInput('');
    onUpdateProfile({
      ...tutorProfile,
      availableSlots: updated
    });
  };

  const tutorSessions = sessions.filter(s => s.tutorId === tutorProfile.id || s.tutorId === 'tut_01');

  return (
    <div className="space-y-8 pb-12 text-slate-900 bg-white">
      {/* Tutor Profile Header */}
      <div className="bg-white text-slate-900 p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <KenteWatermark opacity={0.03} />
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={tutorProfile.avatar}
            alt={tutorProfile.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-2xs"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                Verified Educator
              </span>
              <span className="text-xs text-amber-800 font-mono font-bold">
                {tutorProfile.verificationBadge}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{tutorProfile.name}</h1>
            <p className="text-xs text-slate-600 max-w-xl font-medium">{tutorProfile.headline}</p>

            {/* View Switcher Tabs */}
            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playWhiteboardSound();
                  setActiveTab('roster');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'roster'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Class Roster & Rates</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playWhiteboardSound();
                  setActiveTab('wallet');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'wallet'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                <Wallet className="w-3.5 h-3.5 text-amber-400" />
                <span>Payout Wallet & Tax Statements</span>
              </button>
            </div>
          </div>
        </div>

        {/* Google Workspace Connection Panel */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 shrink-0 w-full md:w-80 relative z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-emerald-700" />
              Google Meet Integration
            </span>
            {googleConnected ? (
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Connected
              </span>
            ) : (
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold border border-amber-300">
                Disconnected
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-600">
            Allows backend to generate Google Meet virtual links on your behalf when students book slots.
          </p>

          <button
            onClick={handleToggleGoogleOAuth}
            disabled={isConnecting}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              googleConnected
                ? 'bg-stone-200 hover:bg-stone-300 text-slate-800'
                : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-2xs'
            }`}
          >
            {isConnecting ? (
              <span>Authorizing Google Workspace...</span>
            ) : googleConnected ? (
              <span>Disconnect Google Account</span>
            ) : (
              <span>Authorize Google Calendar & Meet</span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'wallet' ? (
        <TutorPayoutWallet tutorProfile={tutorProfile} currency={currency} />
      ) : (
        /* Main Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Scheduled Sessions Roster (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden relative">
              <KenteWatermark opacity={0.02} />
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between relative z-10">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  Your Upcoming Tutoring Sessions
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Timezone: {timezone}
                </span>
              </div>

              <div className="divide-y divide-stone-200 relative z-10">
                {tutorSessions.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No upcoming sessions assigned yet.
                  </div>
                ) : (
                  tutorSessions.map((sess) => (
                    <div key={sess.id} className="p-5 hover:bg-stone-50 transition flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                            {sess.curriculum}
                          </span>
                          <span className="text-xs text-slate-600 font-medium">
                            Student: <strong>{sess.studentName}</strong>
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">
                          {sess.subject} — {sess.topic}
                        </h4>

                        <p className="text-xs text-slate-500 flex items-center gap-2 font-mono">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          {formatToUserTimezone(sess.startTime, timezone)}
                        </p>
                      </div>

                      <div className="text-right space-y-1 shrink-0">
                        <a
                          href={sess.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-2xs transition"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Launch Meet</span>
                        </a>
                        <span className="text-[10px] text-slate-500 block font-mono font-bold">
                          Payout: GH₵{sess.amountPaidGHS}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Availability & Rate Management (1 col) */}
          <div className="space-y-6">
            
            {/* Rate Settings */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 relative z-10">
                <DollarSign className="w-5 h-5 text-amber-700" />
                Rate Settings (Ghana MoMo / International)
              </h3>

              <div className="space-y-3 relative z-10">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">
                    Hourly Rate (Ghanaian Cedi GH₵)
                  </label>
                  <input
                    type="number"
                    value={hourlyRateGHS}
                    onChange={(e) => setHourlyRateGHS(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block">
                    Hourly Rate (USD $)
                  </label>
                  <input
                    type="number"
                    value={hourlyRateUSD}
                    onChange={(e) => setHourlyRateUSD(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 mt-1"
                  />
                </div>

                <button
                  onClick={() => onUpdateProfile({ ...tutorProfile, hourlyRateGHS, hourlyRateUSD })}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-2xs"
                >
                  Save Rate Settings
                </button>
              </div>
            </div>

            {/* Availability Slot Adder */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 relative overflow-hidden">
              <KenteWatermark opacity={0.03} />
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 relative z-10">
                <Clock className="w-5 h-5 text-emerald-700" />
                Manage Available Slots
              </h3>

              <div className="space-y-2 relative z-10">
                <label className="text-xs text-slate-600 font-medium">Add New Session Slot:</label>
                <input
                  type="datetime-local"
                  value={newSlotInput}
                  onChange={(e) => setNewSlotInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
                <button
                  onClick={handleAddSlot}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Plus className="w-4 h-4" /> Add Slot
                </button>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-200 relative z-10">
                <span className="text-xs font-bold text-slate-700">Active Slots:</span>
                {slots.map((s, idx) => (
                  <div key={idx} className="text-[11px] p-2 bg-stone-50 rounded-xl border border-stone-200 font-mono text-slate-700">
                    {formatToUserTimezone(s, timezone)}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

