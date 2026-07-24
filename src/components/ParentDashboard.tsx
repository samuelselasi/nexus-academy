import React, { useState } from 'react';
import { WardReport, Session } from '../types';
import { mockWardReports } from '../data/mockData';
import { KenteWatermark } from './KentePattern';
import { Users, Calendar, CheckCircle2, Award, Download, MessageSquare, TrendingUp, DollarSign, Star, FileText } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

interface ParentDashboardProps {
  sessions: Session[];
  currency: 'GHS' | 'USD';
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  sessions,
  currency,
}) => {
  const [selectedWard, setSelectedWard] = useState<WardReport>(mockWardReports[0]);

  const handleDownloadStatement = () => {
    soundEngine.playPaymentSuccessChime();
    alert(`Downloading Monthly Academic & Billing Statement for ${selectedWard.studentName}...`);
  };

  return (
    <div className="space-y-6 pb-12 text-slate-900 bg-white">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3 relative overflow-hidden">
        <KenteWatermark opacity={0.03} />
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider relative z-10">
          <Users className="w-4 h-4 text-amber-700" /> Parent & Guardian Academic Portal
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Guardian Control Dashboard
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Monitor live class attendance, tutor progress notes, grade trajectories, and billing receipts.
            </p>
          </div>

          <button
            onClick={handleDownloadStatement}
            className="flex items-center gap-2 bg-stone-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-2xs shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download Monthly Academic Statement</span>
          </button>
        </div>
      </div>

      {/* Ward Switcher Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-700 shrink-0">Select Ward / Child:</span>
        {mockWardReports.map(ward => (
          <button
            key={ward.id}
            onClick={() => {
              soundEngine.playWhiteboardSound();
              setSelectedWard(ward);
            }}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition shrink-0 ${
              selectedWard.id === ward.id
                ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${selectedWard.id === ward.id ? 'bg-amber-300 animate-ping' : 'bg-stone-400'}`} />
            <span>{ward.studentName}</span>
            <span className="opacity-80 text-[10px]">({ward.gradeLevel.split('(')[0]})</span>
          </button>
        ))}
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Attendance */}
        <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-2xs space-y-2 relative overflow-hidden">
          <KenteWatermark opacity={0.02} />
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Class Attendance Rate</span>
            <Calendar className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{selectedWard.attendanceRate}%</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{selectedWard.completedClasses} Sessions Completed</span>
          </div>
        </div>

        {/* Stat 2: GPA Grade Progress */}
        <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-2xs space-y-2 relative overflow-hidden">
          <KenteWatermark opacity={0.02} />
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Predicted Examination Standing</span>
            <Award className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{selectedWard.gpaProgress}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
            <span>On Track for Top Distinction</span>
          </div>
        </div>

        {/* Stat 3: School Affiliation */}
        <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-2xs space-y-2 relative overflow-hidden">
          <KenteWatermark opacity={0.02} />
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Academic Track</span>
            <FileText className="w-4 h-4 text-sky-700" />
          </div>
          <div className="text-sm font-bold text-slate-900 line-clamp-1">{selectedWard.schoolName}</div>
          <p className="text-[11px] text-slate-600 font-medium">{selectedWard.gradeLevel}</p>
        </div>

        {/* Stat 4: Billing Summary */}
        <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-2xs space-y-2 relative overflow-hidden">
          <KenteWatermark opacity={0.02} />
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Monthly Tutoring Investment</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-emerald-900">
            {currency === 'GHS' ? `GH₵${selectedWard.monthlyBillingGHS}` : `$${Math.round(selectedWard.monthlyBillingGHS / 12)}`}
          </div>
          <p className="text-[11px] text-emerald-800 font-bold">Verified via MTN MoMo / Paystack</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tutor Feedback Log */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 relative overflow-hidden">
            <KenteWatermark opacity={0.02} />
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 relative z-10">
              <h3 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider">
                Certified Tutor Feedback & Progress Log
              </h3>
              <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Verified Reports
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              {selectedWard.recentTutorFeedback.map((fb, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{fb.tutorName}</h4>
                      <p className="text-[11px] text-amber-800 font-extrabold">{fb.subject} • {fb.date}</p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>{fb.rating}.0 / 5.0</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                    "{fb.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Billing & Class History */}
        <div className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 relative overflow-hidden">
            <KenteWatermark opacity={0.02} />
            <div className="border-b border-stone-200 pb-3 relative z-10">
              <h3 className="text-sm font-extrabold uppercase text-slate-900 tracking-wider">
                Recent Billing Receipts
              </h3>
            </div>

            <div className="space-y-3 relative z-10">
              {sessions.map(s => (
                <div key={s.id} className="p-3 bg-stone-50 border border-stone-200 rounded-2xl space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{s.subject}</span>
                    <span className="text-emerald-800 font-mono">
                      {currency === 'GHS' ? `GH₵${s.amountPaidGHS}` : `$${Math.round(s.amountPaidGHS / 12)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{s.tutorName}</span>
                    <span className="font-mono text-amber-800">{s.paymentMethod.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 relative z-10">
              <button
                onClick={() => alert(`Direct inquiry message sent to Nexus Academic Guardian Support.`)}
                className="w-full py-3 bg-stone-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-2xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Message Academic Coordinator</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
