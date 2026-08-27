import React from 'react';

export default function LegalNote({ children, tone = 'info' }: { children: React.ReactNode; tone?: 'info' | 'warning' }) {
  if (tone === 'warning') {
    return (
      <div className="border border-[#ffd9d9] bg-[#FFF1F1] rounded-xl px-4 py-3.5 text-[14px] text-[#7a1f1f] font-semibold leading-relaxed">
        {children}
      </div>
    );
  }
  return (
    <div className="border-l-2 border-[#CFF3EC] bg-[#EAF8F5] rounded-r-xl px-4 py-3.5 text-[13.5px] text-[#1B1730] italic leading-relaxed">
      {children}
    </div>
  );
}
