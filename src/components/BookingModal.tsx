import React, { useState } from 'react';
import { TutorProfile, CurriculumType, PaymentMethodType, Session } from '../types';
import { formatToUserTimezone } from '../utils/dateTimeUtils';
import { KenteWatermark } from './KentePattern';
import { UssdPromptModal } from './UssdPromptModal';
import { soundEngine } from '../utils/audioEffects';
import { X, Calendar, Clock, Video, Smartphone, CreditCard, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

interface BookingModalProps {
  tutor: TutorProfile | null;
  timezone: string;
  currency: 'GHS' | 'USD';
  onClose: () => void;
  onBookingSuccess: (newSession: Session) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tutor,
  timezone,
  currency,
  onClose,
  onBookingSuccess,
}) => {
  if (!tutor) return null;

  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>(tutor.curricula[0] || 'GES');
  const [selectedSubject, setSelectedSubject] = useState<string>(tutor.subjects[0] || '');
  const [selectedSlot, setSelectedSlot] = useState<string>(tutor.availableSlots[0] || new Date().toISOString());
  const [topic, setTopic] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('MTN_MOMO');
  const [momoNumber, setMomoNumber] = useState<string>('024 123 4567');
  
  const [showUssdPrompt, setShowUssdPrompt] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [generatedMeetLink, setGeneratedMeetLink] = useState<string>('');

  const randomTxRef = 'GH_PAYSTACK_' + Math.floor(1000000 + Math.random() * 9000000);

  const handleConfirmBooking = async () => {
    try {
      await fetch('/api/payments/paystack/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountGHS: tutor.hourlyRateGHS,
          phone: momoNumber,
          provider: paymentMethod,
          subject: selectedSubject,
        }),
      });
    } catch (e) {
      console.warn("Paystack initiate API warning:", e);
    }

    if (paymentMethod === 'MTN_MOMO') {
      soundEngine.playUssdKeyClick();
      setShowUssdPrompt(true);
      return;
    }

    executeSessionCreation();
  };

  const executeSessionCreation = () => {
    setIsProcessing(true);
    setShowUssdPrompt(false);

    // Simulate Paystack/MoMo API processing + Google Calendar Meet API generation
    setTimeout(() => {
      const meetCode = Math.random().toString(36).substring(2, 5) + '-' + Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 5);
      const newMeetUrl = `https://meet.google.com/${meetCode}`;

      const endTime = new Date(new Date(selectedSlot).getTime() + 60 * 60 * 1000).toISOString();

      const newSession: Session = {
        id: 'sess_' + Date.now(),
        studentId: 'user_std_01',
        studentName: 'Kofi Kwakye',
        tutorId: tutor.id,
        tutorName: tutor.name,
        tutorAvatar: tutor.avatar,
        curriculum: selectedCurriculum,
        subject: selectedSubject,
        startTime: selectedSlot,
        endTime: endTime,
        status: 'SCHEDULED',
        meetLink: newMeetUrl,
        googleEventId: 'cal_event_' + Math.floor(Math.random() * 1000000),
        amountPaidGHS: tutor.hourlyRateGHS,
        paymentMethod: paymentMethod,
        transactionRef: randomTxRef,
        topic: topic || `${selectedSubject} Personalized Session`,
        notes: 'Session created via Nexus Academy Google Calendar API Integration.'
      };

      setGeneratedMeetLink(newMeetUrl);
      setIsProcessing(false);
      setBookingComplete(true);

      setTimeout(() => {
        onBookingSuccess(newSession);
      }, 2500);

    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-xl border border-stone-200 relative">
        <KenteWatermark opacity={0.03} />
        
        {/* Modal Header */}
        <div className="bg-white text-slate-900 p-6 relative flex items-center justify-between border-b border-stone-200 z-10">
          <div className="flex items-center gap-3">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-2xs"
            />
            <div>
              <div className="text-xs text-amber-800 font-extrabold uppercase tracking-wider">Book Online Class</div>
              <h3 className="text-base font-bold text-slate-900">{tutor.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-slate-500 hover:text-slate-900 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingComplete ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6 relative z-10">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-2xs border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Classroom Scheduled & Paid!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                Payment verified via <strong className="text-emerald-800">{paymentMethod.replace('_', ' ')}</strong>. A Google Calendar event with Google Meet link has been dispatched to your email.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-2 text-left font-mono text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Google Meet Link:</span>
                <span className="text-emerald-800 font-bold">Auto-Generated</span>
              </div>
              <div className="p-2 bg-white border border-stone-200 rounded text-emerald-900 font-bold truncate">
                {generatedMeetLink}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              Redirecting back to your Student Dashboard...
            </p>
          </div>
        ) : (
          /* Form Screen */
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto relative z-10">
            
            {/* 1. Select Curriculum & Subject */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                1. Select Curriculum & Subject
              </label>

              <div className="grid grid-cols-3 gap-2">
                {tutor.curricula.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCurriculum(c)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                      selectedCurriculum === c
                        ? 'bg-amber-700 text-white border-amber-700 shadow-2xs'
                        : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-600"
              >
                {tutor.subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* 2. Select Date & Slot */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center justify-between">
                <span>2. Available Time Slots ({timezone})</span>
                <Clock className="w-3.5 h-3.5 text-amber-700" />
              </label>

              <div className="space-y-2">
                {tutor.availableSlots.map(slotIso => (
                  <button
                    key={slotIso}
                    type="button"
                    onClick={() => setSelectedSlot(slotIso)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-medium transition ${
                      selectedSlot === slotIso
                        ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-500'
                        : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      {formatToUserTimezone(slotIso, timezone)}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                      1 Hour
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Session Focus / Specific Questions (Optional)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. WASSCE Calculus differentiation or Cambridge Macbeth essay review"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-600"
              />
            </div>

            {/* 3. Payment Method */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  3. Payment Gateway (Paystack)
                </label>
                <div className="text-right font-mono font-bold text-base text-amber-900">
                  {currency === 'GHS' ? `GH₵${tutor.hourlyRateGHS}` : `$${tutor.hourlyRateUSD}`}
                </div>
              </div>

              {/* Payment selector buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('MTN_MOMO')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition ${
                    paymentMethod === 'MTN_MOMO'
                      ? 'bg-amber-100 border-amber-400 text-amber-950 ring-1 ring-amber-500'
                      : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>MTN MoMo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition ${
                    paymentMethod === 'CARD'
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-1 ring-emerald-500'
                      : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Card / Visa</span>
                </button>
              </div>

              {paymentMethod === 'MTN_MOMO' && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-300 space-y-1.5">
                  <label className="text-[11px] font-bold text-amber-900 block">
                    MTN Mobile Money Phone Number
                  </label>
                  <input
                    type="text"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="e.g. 024 123 4567"
                    className="w-full bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-slate-900 outline-none"
                  />
                  <span className="text-[10px] text-amber-800 block">
                    You will receive a USSD prompt on your phone to authorize payment.
                  </span>
                </div>
              )}
            </div>

            {/* Google Workspace Integration Notice */}
            <div className="bg-stone-100 border border-stone-200 text-slate-800 p-3 rounded-xl flex items-center gap-2.5 text-[11px] font-medium">
              <Video className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Backend auto-generates <strong>Google Meet</strong> classroom link & syncs to Google Calendar upon payment.
              </span>
            </div>

            {/* Submit CTA */}
            <button
              onClick={handleConfirmBooking}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-amber-700 hover:bg-amber-800 text-white font-extrabold rounded-xl shadow-2xs transition flex items-center justify-center gap-2 text-sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Generating Google Meet & Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Booking & Pay {currency === 'GHS' ? `GH₵${tutor.hourlyRateGHS}` : `$${tutor.hourlyRateUSD}`}</span>
                </>
              )}
            </button>

          </div>
        )}

      </div>

      {showUssdPrompt && (
        <UssdPromptModal
          amountGHS={tutor.hourlyRateGHS}
          tutorName={tutor.name}
          momoNumber={momoNumber}
          transactionRef={randomTxRef}
          onClose={() => setShowUssdPrompt(false)}
          onPaymentApproved={executeSessionCreation}
        />
      )}
    </div>
  );
};
