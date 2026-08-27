import React from 'react';

export default function LegalSection({
  id,
  title,
  level = 2,
  children,
}: {
  id?: string;
  title: string;
  level?: 2 | 3;
  children: React.ReactNode;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <section id={id} className={level === 2 ? 'pt-10 first:pt-0' : 'pt-6'}>
      <Heading
        className={
          level === 2
            ? 'text-[#4F3A96] font-bold text-xl md:text-2xl tracking-tight scroll-mt-24'
            : 'text-[#1B1730] font-bold text-base md:text-lg tracking-tight scroll-mt-24'
        }
      >
        {title}
      </Heading>
      <div className="mt-3 flex flex-col gap-3 text-[#3a3852] text-[14.5px] md:text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
