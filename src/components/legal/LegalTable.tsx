import React from 'react';

export default function LegalTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <>
      <div className="hidden md:block overflow-hidden border border-gray-100 rounded-2xl">
        <table className="w-full border-collapse text-left text-[14px]">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[#F4F1FD]">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-4 py-3 font-bold text-[#4F3A96]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-gray-100 align-top">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-4 py-3 font-semibold text-[#1B1730]">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-4 py-3">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul aria-label={caption} className="md:hidden flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row[0]} className="border border-gray-100 rounded-2xl px-4 py-3.5 bg-[#FAFAFA]">
            <dl className="flex flex-col gap-1.5 text-[14px]">
              {row.map((cell, i) => (
                <div key={i}>
                  <dt className="text-[11.5px] font-bold uppercase tracking-wide text-[#67637E]">{columns[i]}</dt>
                  <dd className={i === 0 ? 'font-semibold text-[#1B1730]' : ''}>{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
