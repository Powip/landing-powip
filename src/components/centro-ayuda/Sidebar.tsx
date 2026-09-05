'use client';

import { useEffect } from 'react';
import { Compass } from 'lucide-react';
import { HELP_DATA, QUICK_PAGES, moduleSearchText } from './data';

interface SidebarProps {
  open: boolean;
  activeKey: string;
  query: string;
  onClose: () => void;
}

export default function Sidebar({ open, activeKey, query, onClose }: SidebarProps) {
  const q = query.trim().toLowerCase();

  const quickMatches = Object.keys(QUICK_PAGES).filter(
    (key) => !q || QUICK_PAGES[key].toLowerCase().includes(q)
  );

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <aside id="hc-sidebar" className={`sidebar${open ? ' open' : ''}`}>
      <nav className="nav" aria-label="Secciones del Centro de Ayuda">
        {quickMatches.length > 0 && (
          <div className="nav-group">
            <div className="nav-cap">
              <span className="n">
                <Compass size={11} aria-hidden="true" />
              </span>
              Guías rápidas
            </div>
            {quickMatches.map((key) => (
              <a
                key={key}
                href={`#/${key}`}
                className={activeKey === key ? 'active' : undefined}
                aria-current={activeKey === key ? 'page' : undefined}
              >
                {QUICK_PAGES[key]}
              </a>
            ))}
          </div>
        )}

        {HELP_DATA.chapters.map((chapter) => {
          const mods = chapter.mods.filter((id) => !q || moduleSearchText(id).includes(q));
          if (mods.length === 0) return null;
          return (
            <div className="nav-group" key={chapter.id}>
              <div className="nav-cap">
                <span className="n" aria-hidden="true">
                  {chapter.n}
                </span>
                {chapter.name}
              </div>
              {mods.map((id) => (
                <a
                  key={id}
                  href={`#/${id}`}
                  className={activeKey === id ? 'active' : undefined}
                  aria-current={activeKey === id ? 'page' : undefined}
                >
                  {HELP_DATA.modules[id].title}
                </a>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
