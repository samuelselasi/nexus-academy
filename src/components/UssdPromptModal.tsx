import React, { useState } from 'react';
import { Smartphone, ShieldCheck, X, CheckCircle2, Delete, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

interface UssdPromptModalProps {
  amountGHS: number;
  tutorName: string;
  momoNumber: string;
  transactionRef: string;
  onClose: () => void;
  onPaymentApproved: () => void;
}

export const UssdPromptModal: React.FC<UssdPromptModalProps> = ({
  amountGHS,
  tutorName,
  momoNumber,
  transactionRef,
  onClose,
  onPaymentApproved,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      soundEngine.playUssdKeyClick();
      setPin(prev => prev + num);
      setErrorMessage('');
    }
  };

  const handleBackspace = () => {
    soundEngine.playUssdKeyClick();
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    soundEngine.playUssdKeyClick();
    setPin('');
  };

  const handleSubmitPin = () => {
    if (pin.length < 4) {
      setErrorMessage('Please enter your 4-digit MoMo PIN.');
      return;
    }

    setIsAuthorizing(true);
    soundEngine.playUssdKeyClick();

    setTimeout(() => {
      setIsAuthorizing(false);
      setIsSuccess(true);
      soundEngine.playPaymentSuccessChime();

      setTimeout(() => {
        onPaymentApproved();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      
      {/* Smartphone Casing Simulator */}
      <div className="w-[340px] bg-slate-900 border-4 border-slate-700 rounded-[38px] p-5 shadow-2xl relative text-white font-sans flex flex-col justify-between min-h-[580px] overflow-hidden">
        
        {/* Phone Notch & Speaker */}
        <div className="flex justify-center mb-3">
          <div className="w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-slate-950 rounded-full border border-slate-700"></div>
            <div className="w-8 h-1.5 bg-slate-700 rounded-full"></div>
          </div>
        </div>

        {/* Top Status Bar */}
        <div className="flex justify-between items-center text-[10px] text-amber-400 font-mono tracking-wider pb-2 border-b border-slate-800">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-amber-400" />
            MTN MoMo (*170#)
          </span>
          <span>GH 4G+ LTE</span>
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Success Receipt Screen */
          <div className="my-auto text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white">Payment Authorized!</h3>
              <p className="text-xs text-emerald-400 font-mono font-bold">GH₵{amountGHS}.00 Approved</p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-2xl text-left text-[11px] font-mono space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant:</span>
                <span className="text-amber-400 font-bold">Nexus Academy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ref:</span>
                <span className="text-slate-200">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">MoMo Phone:</span>
                <span className="text-slate-200">{momoNumber}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">Generating Google Meet classroom link...</p>
          </div>
        ) : (
          /* USSD Input Screen */
          <div className="my-auto space-y-4 py-2">
            
            {/* USSD Prompt Banner Box */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Mobile Money Prompt
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                Authorize payment of <strong className="text-amber-300">GH₵{amountGHS}.00</strong> to <strong className="text-white">Nexus Academy</strong> for tutoring with <span className="text-emerald-300">{tutorName}</span>?
              </p>
            </div>

            {/* PIN Display Field */}
            <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">
                Enter 4-Digit MoMo PIN
              </span>
              <div className="flex justify-center gap-3 py-1">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-10 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all ${
                      pin.length > idx
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300 scale-105'
                        : 'border-slate-800 bg-slate-900 text-slate-600'
                    }`}
                  >
                    {pin.length > idx ? '•' : ''}
                  </div>
                ))}
              </div>
              {errorMessage && (
                <p className="text-[10px] text-red-400 font-medium">{errorMessage}</p>
              )}
            </div>

            {/* Interactive Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  disabled={isAuthorizing}
                  className="py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 text-white font-mono font-bold text-base rounded-2xl transition border border-slate-700/60 shadow-xs"
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={handleClear}
                disabled={isAuthorizing}
                className="py-2.5 bg-slate-800/60 hover:bg-red-950/80 text-red-400 font-mono font-bold text-xs rounded-2xl transition border border-slate-700/60"
              >
                CLR
              </button>

              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                disabled={isAuthorizing}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-amber-600 text-white font-mono font-bold text-base rounded-2xl transition border border-slate-700/60"
              >
                0
              </button>

              <button
                type="button"
                onClick={handleBackspace}
                disabled={isAuthorizing}
                className="py-2.5 bg-slate-800/60 hover:bg-slate-700 text-slate-300 font-mono font-bold text-xs rounded-2xl transition border border-slate-700/60 flex items-center justify-center"
              >
                <Delete className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isAuthorizing}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-2xl transition border border-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmitPin}
                disabled={isAuthorizing || pin.length < 4}
                className="py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-extrabold rounded-2xl transition shadow-md flex items-center justify-center gap-1.5"
              >
                {isAuthorizing ? (
                  <span>Authorizing...</span>
                ) : (
                  <>
                    <span>SEND PIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* Phone Bottom Home Bar */}
        <div className="flex justify-center pt-2">
          <div className="w-28 h-1 bg-slate-700 rounded-full"></div>
        </div>

      </div>

    </div>
  );
};
