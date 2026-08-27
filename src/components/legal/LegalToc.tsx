import React from 'react';

export default function LegalToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="Índice de contenidos" className="max-w-3xl mx-auto px-6 md:px-0 mb-2">
      <div className="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-5">
        <p className="text-[12px] font-bold uppercase tracking-wide text-[#67637E] mb-3">Índice</p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13.5px]">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-[#4F3A96] font-medium hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
