import React from 'react';
import type { PartnerData } from '@/data/partners';

export default function PartnersRibbon({ partner }: { partner: PartnerData }) {
  return (
    <div className="bg-[#2E2168] text-white text-center text-[13.5px] font-medium py-2.5 px-4">
      <span>{partner.ribbon}</span>
      <span className="bg-[#22D3A6] text-[#04352a] font-bold rounded-full px-3 py-0.5 ml-2 inline-block">
        50% en tu 2da mensualidad 🎉
      </span>
    </div>
  );
}
