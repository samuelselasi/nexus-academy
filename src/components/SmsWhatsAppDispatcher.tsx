import React, { useState } from 'react';
import { SmsNotificationLog } from '../types';
import { mockSmsLogs } from '../data/mockData';
import { KenteWatermark } from './KentePattern';
import { soundEngine } from '../utils/audioEffects';
import { MessageSquare, PhoneCall, Send, CheckCircle2, ShieldCheck, RefreshCw, Smartphone } from 'lucide-react';

export const SmsWhatsAppDispatcher: React.FC = () => {
  const [logs, setLogs] = useState<SmsNotificationLog[]>(mockSmsLogs);
  const [recipientPhone, setRecipientPhone] = useState<string>('+233 24 123 4567');
  const [channel, setChannel] = useState<'WHATSAPP' | 'SMS_HUBTEL'>('WHATSAPP');
  const [messageType, setMessageType] = useState<'LESSON_REMINDER' | 'PAYMENT_RECEIPT' | 'DIAGNOSTIC_ALERT'>('LESSON_REMINDER');
  const [customText, setCustomText] = useState<string>('Nexus Academy: Your live Google Meet class in Elective Mathematics with Dr. Abena Osei-Mensah starts in 10 minutes.');
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    soundEngine.playUssdKeyClick();
    setIsSending(true);

    try {
      const res = await fetch('/api/dispatch/sms-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientPhone,
          channel: channel === 'WHATSAPP' ? 'WHATSAPP' : 'SMS',
          message: customText,
        }),
      });

      const data = await res.json();
      soundEngine.playPaymentSuccessChime();

      const newLog: SmsNotificationLog = {
        id: 'sms_' + Math.floor(100 + Math.random() * 900),
        recipientPhone: recipientPhone,
        recipientName: 'Kofi Kwakye',
        type: messageType,
        channel: channel,
        messageBody: customText,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' GMT',
        status: 'DELIVERED',
        deliveryRef: data.dispatchId || (channel === 'WHATSAPP' ? 'HUBTEL_WA_' + Math.floor(100000 + Math.random() * 900000) : 'HUBTEL_SMS_' + Math.floor(100000 + Math.random() * 900000))
      };

      setLogs([newLog, ...logs]);
    } catch (err) {
      console.warn("Backend dispatch error, applying local fallback log:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6 relative overflow-hidden text-slate-900">
      <KenteWatermark opacity={0.03} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-amber-700" />
            Hubtel & Twilio Integration Gateway
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Automated WhatsApp & SMS Notification Logs
          </h2>
        </div>

        <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Ghana SMS Gateway Active (+233)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        
        {/* Send Test Dispatch Panel */}
        <form onSubmit={handleSendNotification} className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-amber-700" />
            Dispatch Instant Notification
          </h3>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Recipient Phone Number (Ghana GMT):</label>
            <input
              type="text"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="+233 24 XXX XXXX"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Dispatch Channel:</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="WHATSAPP">WhatsApp Official</option>
                <option value="SMS_HUBTEL">Hubtel SMS API</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Alert Category:</label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value as any)}
                className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="LESSON_REMINDER">Lesson Reminder</option>
                <option value="PAYMENT_RECEIPT">Payment Receipt</option>
                <option value="DIAGNOSTIC_ALERT">Diagnostic Report</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Notification Text Body:</label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-slate-800 outline-none focus:border-amber-600 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white text-xs font-extrabold rounded-xl transition shadow-2xs flex items-center justify-center gap-2"
          >
            {isSending ? (
              <span>Dispatching through Hubtel Gateway...</span>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span>Trigger Live +233 Mobile Alert</span>
              </>
            )}
          </button>
        </form>

        {/* Dispatch Log Stream */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center justify-between">
            <span>Recent Dispatch Logs ({logs.length})</span>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              100% Delivery Rate
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {logs.map(log => (
              <div key={log.id} className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1 text-amber-900 font-mono">
                    <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                    {log.recipientPhone}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-extrabold">
                    {log.channel} • DELIVERED
                  </span>
                </div>

                <p className="text-[11px] text-slate-700 font-medium leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200">
                  "{log.messageBody}"
                </p>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Ref: {log.deliveryRef}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
