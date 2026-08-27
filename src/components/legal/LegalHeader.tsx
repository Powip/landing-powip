import React from 'react';

export default function LegalHeader({
  eyebrow,
  title,
  subtitle,
  version,
  date,
  intro,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  version: string;
  date: string;
  intro?: React.ReactNode;
}) {
  return (
    <header className="w-full bg-gradient-to-b from-white to-[#F4F1FD] pt-14 pb-10 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-[44px] leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-[#4a4664] text-base md:text-lg">{subtitle}</p>
        <p className="mt-3 text-[#67637E] text-[13.5px] font-medium">
          Versión {version} · {date}
        </p>
        {intro && (
          <div className="mt-6 border-l-2 border-[#CFF3EC] bg-[#EAF8F5] rounded-r-xl px-4 py-3.5 text-[14px] text-[#1B1730] leading-relaxed">
            {intro}
          </div>
        )}
      </div>
    </header>
  );
}
