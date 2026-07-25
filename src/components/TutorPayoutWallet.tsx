import React, { useState } from 'react';
import { TutorPayoutRecord } from '../types';
import { mockTutorPayouts } from '../data/mockData';
import { KenteWatermark } from './KentePattern';
import { soundEngine } from '../utils/audioEffects';
import { DollarSign, Wallet, ArrowUpRight, Download, CheckCircle2, ShieldCheck, Building2, Smartphone } from 'lucide-react';

interface TutorPayoutWalletProps {
  tutorName?: string;
  tutorProfile?: any;
  currency: 'GHS' | 'USD';
}

export const TutorPayoutWallet: React.FC<TutorPayoutWalletProps> = ({
  tutorName = 'Dr. Abena Osei-Mensah',
  tutorProfile,
  currency,
}) => {
  const [payouts, setPayouts] = useState<TutorPayoutRecord[]>(mockTutorPayouts);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1200);
  const [payoutMethod, setPayoutMethod] = useState<'MTN_MOMO' | 'BANK_TRANSFER_GCB' | 'BANK_TRANSFER_ECOBANK'>('MTN_MOMO');
  const [accountNumber, setAccountNumber] = useState<string>('020 987 6543');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) return;

    soundEngine.playUssdKeyClick();
    setIsProcessing(true);

    try {
      const res = await fetch('/api/tutors/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: 'tut_01',
          amountGHS: withdrawAmount,
          momoNumber: accountNumber,
          provider: payoutMethod,
        }),
      });

      const data = await res.json();
      soundEngine.playPaymentSuccessChime();

      const taxDeduction = data.graWithholdingTaxGHS ?? Math.round(withdrawAmount * 0.05);
      const netAmount = data.netPayoutGHS ?? (withdrawAmount - taxDeduction);

      const newRecord: TutorPayoutRecord = {
        id: data.payoutReference || ('po_' + Math.floor(100 + Math.random() * 900)),
        date: new Date().toISOString().split('T')[0],
        amountGHS: withdrawAmount,
        payoutMethod: payoutMethod,
        accountDetails: `${payoutMethod.replace('_', ' ')} (${accountNumber})`,
        status: 'COMPLETED',
        taxDeductionsGHS: taxDeduction,
        netPayoutGHS: netAmount
      };

      setPayouts([newRecord, ...payouts]);
    } catch (err) {
      console.warn("Backend payout call failed, using client fallback:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadTaxStatement = () => {
    soundEngine.playPaymentSuccessChime();
    alert(`Downloading Ghana Revenue Authority (GRA) Tax Withholding Statement for ${tutorName}...`);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6 relative overflow-hidden text-slate-900">
      <KenteWatermark opacity={0.03} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
            <Wallet className="w-4 h-4 text-amber-700" />
            Tutor Financial Payout & Tax Management
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Earnings Wallet & Instant Cashout Portal
          </h2>
        </div>

        <button
          onClick={handleDownloadTaxStatement}
          className="flex items-center gap-2 bg-stone-900 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shadow-2xs shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Download GRA Tax Statement</span>
        </button>
      </div>

      {/* Stats Balance Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        
        <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Available Wallet Balance
          </span>
          <div className="text-2xl font-mono font-extrabold text-emerald-900">
            {currency === 'GHS' ? 'GH₵2,480.00' : '$198.00'}
          </div>
          <span className="text-[10px] text-emerald-800 font-bold">Ready for instant cashout</span>
        </div>

        <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Total Monthly Earnings
          </span>
          <div className="text-2xl font-mono font-extrabold text-slate-900">
            {currency === 'GHS' ? 'GH₵6,730.00' : '$538.00'}
          </div>
          <span className="text-[10px] text-amber-800 font-bold">24 Completed Tutoring Sessions</span>
        </div>

        <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Cumulative Tax Remitted (5% GRA)
          </span>
          <div className="text-2xl font-mono font-extrabold text-slate-700">
            {currency === 'GHS' ? 'GH₵336.50' : '$26.90'}
          </div>
          <span className="text-[10px] text-slate-600 font-medium">Auto-remitted withholding tax</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        
        {/* Cashout Request Form */}
        <form onSubmit={handleWithdrawalSubmit} className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-emerald-700" />
            Request Instant Payout
          </h3>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Cashout Amount (GHS):</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              min={50}
              max={2480}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-600"
            />
            <p className="text-[10px] text-slate-500">Max available: GH₵2,480.00</p>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">Payout Destination:</label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-slate-800 outline-none"
            >
              <option value="MTN_MOMO">MTN Mobile Money (*170#)</option>
              <option value="BANK_TRANSFER_GCB">GCB Bank Transfer</option>
              <option value="BANK_TRANSFER_ECOBANK">Ecobank Ghana Transfer</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 block">MoMo / Bank Account Details:</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="020 XXX XXXX or Bank Account Number"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-600"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold rounded-xl transition shadow-2xs flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Processing Paystack / MoMo Cashout...</span>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span>Withdraw GH₵{withdrawAmount}.00 Now</span>
              </>
            )}
          </button>
        </form>

        {/* Withdrawal History Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
            Recent Cashout Receipts ({payouts.length})
          </h3>

          <div className="space-y-2.5">
            {payouts.map(po => (
              <div key={po.id} className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-slate-800">{po.payoutMethod.replace('_', ' ')}</span>
                  <span className="font-mono text-emerald-900 font-extrabold">GH₵{po.netPayoutGHS}.00</span>
                </div>
                <p className="text-[11px] text-slate-600 font-mono">{po.accountDetails}</p>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Gross: GH₵{po.amountGHS} (Tax: -GH₵{po.taxDeductionsGHS})</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {po.status} • {po.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
