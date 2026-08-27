import React from 'react';
import type { PartnerData } from '@/data/partners';

export default function PartnersHandoff({ partner }: { partner: PartnerData }) {
  const [nodeA, nodeB, nodeC] = partner.flowNodes;
  const [colA, colB] = partner.vsCols;

  return (
    <section id="como" className="w-full py-20 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[36px] bg-[#4F3A96] text-white px-6 py-10 md:px-14 md:py-16 shadow-xl">
          <div className="pointer-events-none absolute -top-28 -right-16 w-[340px] h-[340px] rounded-full bg-white/10 blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <span className="inline-block text-[#8ff0d0] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
              {partner.hoKicker}
            </span>
            <h2 className="mt-4 text-white font-bold text-3xl md:text-5xl leading-tight">
              {partner.hoTitle} <span className="text-[#8ff0d0]">{partner.hoTitleHighlight}</span>
            </h2>
            <p className="mt-4 text-[#ddd6f7] text-base md:text-lg">{partner.hoLead}</p>
          </div>

          {/* Flow */}
          <div className="relative mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
            <FlowNode node={nodeA} accent={partner.color} highlight={false} />
            <Arrow />
            <FlowNode node={nodeB} accent={partner.color} highlight />
            <Arrow />
            <FlowNode node={nodeC} accent={partner.color} highlight={false} />
          </div>

          {/* Vs */}
          <div className="relative mt-9 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-6">
              <div className="text-[12.5px] uppercase tracking-wide font-semibold text-[#c4bcee]">{colA.role}</div>
              <div className="text-[23px] font-black mt-1 mb-1.5 text-white">{colA.big}</div>
              <p className="text-[#ddd6f7] text-[14.5px]">{colA.desc}</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="text-[12.5px] uppercase tracking-wide font-semibold text-[#c4bcee]">{colB.role}</div>
              <div className="text-[23px] font-black mt-1 mb-1.5 text-[#c3b1ff]">{colB.big}</div>
              <p className="text-[#ddd6f7] text-[14.5px]">{colB.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-[#a99ce8] text-2xl font-bold rotate-90 md:rotate-0" aria-hidden="true">
      →
    </div>
  );
}

function FlowNode({
  node,
  highlight,
}: {
  node: PartnerData['flowNodes'][number];
  accent: string;
  highlight: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 text-center backdrop-blur-sm ${
        highlight ? 'bg-[#8C6EFF]/25 border border-[#A082FF]/55' : 'bg-white/[0.09] border border-white/20'
      }`}
    >
      <div className="text-[11.5px] uppercase tracking-wide font-semibold text-[#c4bcee]">{node.cap}</div>
      <div className="text-lg font-black text-white mt-1.5 mb-2 tracking-tight">{node.title}</div>
      {node.desc && <p className="text-[#d6cff2] text-[12.5px] leading-relaxed">{node.desc}</p>}
      {node.chips && (
        <div className="flex flex-wrap gap-1.5 justify-center mt-1.5">
          {node.chips.map((c) => (
            <b key={c} className="bg-white/15 rounded-lg px-2 py-1 text-[11px] font-semibold">{c}</b>
          ))}
        </div>
      )}
    </div>
  );
}
