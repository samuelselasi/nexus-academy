import React from 'react';
import { TutorProfile, Session } from '../types';
import { KenteWatermark } from './KentePattern';
import { SmsWhatsAppDispatcher } from './SmsWhatsAppDispatcher';
import { ShieldCheck, CheckCircle2, DollarSign, Smartphone, Video, Users } from 'lucide-react';

interface AdminDashboardProps {
  tutors: TutorProfile[];
  sessions: Session[];
  currency: 'GHS' | 'USD';
  onVerifyTutor: (tutorId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tutors,
  sessions,
  currency,
  onVerifyTutor,
}) => {
  const totalRevenueGHS = sessions.reduce((acc, s) => acc + s.amountPaidGHS, 0);
  const momoPercentage = Math.round(
    (sessions.filter(s => s.paymentMethod.includes('MOMO')).length / Math.max(sessions.length, 1)) * 100
  );

  return (
    <div className="space-y-8 pb-12 text-slate-900 bg-white">
      {/* Admin Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1 relative overflow-hidden">
          <KenteWatermark opacity={0.03} />
          <div className="flex items-center justify-between text-slate-500 text-xs relative z-10 font-medium">
            <span>Total Revenue Processed</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-amber-900 font-mono relative z-10">
            {currency === 'GHS' ? `GH₵${totalRevenueGHS.toLocaleString()}` : `$${Math.round(totalRevenueGHS/12).toLocaleString()}`}
          </div>
          <p className="text-[10px] text-emerald-800 font-bold relative z-10">Paystack / MoMo Connected</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1 relative overflow-hidden">
          <KenteWatermark opacity={0.03} />
          <div className="flex items-center justify-between text-slate-500 text-xs relative z-10 font-medium">
            <span>Ghana MoMo Ratio</span>
            <Smartphone className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono relative z-10">
            {momoPercentage}%
          </div>
          <p className="text-[10px] text-slate-500 relative z-10">MTN & Vodafone Cash</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1 relative overflow-hidden">
          <KenteWatermark opacity={0.03} />
          <div className="flex items-center justify-between text-slate-500 text-xs relative z-10 font-medium">
            <span>Active Tutors</span>
            <Users className="w-4 h-4 text-sky-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono relative z-10">
            {tutors.length}
          </div>
          <p className="text-[10px] text-sky-800 font-bold relative z-10">GES, Cambridge, Montessori</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1 relative overflow-hidden">
          <KenteWatermark opacity={0.03} />
          <div className="flex items-center justify-between text-slate-500 text-xs relative z-10 font-medium">
            <span>Google Workspace Status</span>
            <Video className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-800 font-mono relative z-10">
            100% Active
          </div>
          <p className="text-[10px] text-slate-500 relative z-10">Calendar & Meet OAuth v2</p>
        </div>

      </div>

      {/* SMS & WhatsApp Dispatcher Control Panel */}
      <SmsWhatsAppDispatcher />

      {/* Tutor Verification Queue */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden relative">
        <KenteWatermark opacity={0.02} />
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between relative z-10">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            Curriculum Certification & Accreditation Verification Queue
          </h2>
          <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full border border-amber-300">
            GES • Cambridge • Montessori
          </span>
        </div>

        <div className="divide-y divide-stone-200 relative z-10">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50 transition">
              <div className="flex items-start gap-4">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-2xs"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base">{tutor.name}</h4>
                    {tutor.isVerified ? (
                      <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Verified
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                        Pending Verification
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-mono font-medium">
                    Badge: {tutor.verificationBadge}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {tutor.curricula.map(c => (
                      <span key={c} className="text-[10px] bg-stone-100 text-slate-700 px-2 py-0.5 rounded font-bold border border-stone-200">
                        {c} Certified
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                {!tutor.isVerified && (
                  <button
                    onClick={() => onVerifyTutor(tutor.id)}
                    className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-2xs transition"
                  >
                    Approve Accreditation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

