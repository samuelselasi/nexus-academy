import React from 'react';

export const KentePattern: React.FC<{ className?: string }> = ({ className = 'h-3 w-full' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Authentic Ghanaian Kente Weave Pattern Ribbon */}
      <svg className="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1200 24" fill="none">
        <defs>
          <pattern id="kente-weave" width="120" height="24" patternUnits="userSpaceOnUse">
            {/* Dark foundation strip */}
            <rect width="120" height="24" fill="#0f172a" />
            {/* Gold / Amber blocks */}
            <rect x="0" y="0" width="30" height="24" fill="#d97706" />
            <path d="M0 0L30 24M30 0L0 24" stroke="#b45309" strokeWidth="2" />
            {/* Crimson Red Block */}
            <rect x="30" y="0" width="30" height="24" fill="#b91c1c" />
            <polygon points="30,0 60,12 30,24" fill="#991b1b" />
            <polygon points="60,0 30,12 60,24" fill="#7f1d1d" />
            {/* Emerald Green Block */}
            <rect x="60" y="0" width="30" height="24" fill="#047857" />
            <circle cx="75" cy="12" r="7" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            {/* Royal Gold / Diamond Block */}
            <rect x="90" y="0" width="30" height="24" fill="#0f172a" />
            <polygon points="105,2 118,12 105,22 92,12" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="1200" height="24" fill="url(#kente-weave)" />
      </svg>
    </div>
  );
};

export const KenteWatermark: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.04,
  className = 'absolute inset-0 pointer-events-none',
}) => {
  return (
    <div className={`${className} overflow-hidden`} style={{ opacity }}>
      <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kente-watermark-tessellation" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Geometric Kente Diamond & Stool Overlays */}
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <path d="M40 10 L70 40 L40 70 L10 40 Z" fill="none" stroke="#047857" strokeWidth="1" />
            <path d="M40 20 L60 40 L40 60 L20 40 Z" fill="none" stroke="#b91c1c" strokeWidth="1" />
            <circle cx="40" cy="40" r="4" fill="#d97706" />
            {/* Corner Cross Hashing */}
            <path d="M0 0 L15 15 M80 0 L65 15 M0 80 L15 65 M80 80 L65 65" stroke="#475569" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kente-watermark-tessellation)" />
      </svg>
    </div>
  );
};

export const KenteBorderCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative rounded-3xl p-[2px] bg-gradient-to-r from-amber-500/80 via-red-600/70 to-emerald-600/80 shadow-lg overflow-hidden group ${className}`}>
      <div className="bg-white rounded-[22px] h-full w-full p-6 sm:p-8 text-slate-900 relative z-10">
        <KenteWatermark opacity={0.03} />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
