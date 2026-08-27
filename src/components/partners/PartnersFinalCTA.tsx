import React from 'react';
import Link from 'next/link';
import type { PartnerData } from '@/data/partners';

export default function PartnersFinalCTA({ partner, signupHref }: { partner: PartnerData; signupHref: string }) {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-white">
      <div className="max-w-4xl mx-auto text-center rounded-[36px] bg-[#4F3A96] text-white px-6 py-14 md:px-16 md:py-20 shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-40 -left-24 w-[400px] h-[400px] rounded-full bg-[#22B8A6]/30 blur-[70px]" />

        <img
          src="/mascota-saludando.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute -bottom-8 -right-8 w-52 lg:w-64 h-auto opacity-95 drop-shadow-2xl"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 bg-[#22D3A6] text-[#04352a] font-extrabold text-sm px-[18px] py-2.5 rounded-full mb-[18px]">
            🎁 {partner.finalBadge}
          </span>
          <h2 className="text-white font-bold text-3xl md:text-5xl leading-tight">
            {partner.finalTitle}
            <br />
            <span className="bg-white/25 px-2 rounded box-decoration-clone">{partner.finalTitleHighlight}</span>
          </h2>
          <p className="mt-[18px] mb-7 text-[#e2ddf6] max-w-xl mx-auto text-[17px]">{partner.finalLead}</p>
          <Link
            href={signupHref}
            className="inline-flex items-center gap-2 bg-white text-[#4F3A96] font-bold text-lg px-9 py-[18px] rounded-2xl shadow-[0_4px_18px_rgba(46,33,104,0.08)]"
          >
            Crea tu cuenta gratis →
          </Link>
          <div className="mt-4 text-[13.5px] text-[#c3b9e6]">{partner.finalMini}</div>
        </div>
      </div>
    </section>
  );
}
