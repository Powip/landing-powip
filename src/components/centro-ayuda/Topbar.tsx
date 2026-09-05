'use client';

import type { RefObject } from 'react';
import { Menu, Search, MessageCircle, CalendarDays, Sun, Moon } from 'lucide-react';
import { CAL_LINK } from './data';
import { useWhatsAppModal } from './WhatsAppModalContext';

interface TopbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onMenuClick: () => void;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Topbar({
  query,
  onQueryChange,
  onMenuClick,
  menuOpen,
  menuButtonRef,
  isDark,
  onThemeToggle,
}: TopbarProps) {
  const { openWhatsAppModal } = useWhatsAppModal();
  return (
    <header className="topbar">
      <button
        ref={menuButtonRef}
        className="menu-btn"
        onClick={onMenuClick}
        aria-label="Menú"
        aria-controls="hc-sidebar"
        aria-expanded={menuOpen}
      >
        <Menu size={17} aria-hidden="true" />
      </button>
      <a className="brand" href="#/">
        <span className="mark">
          <img src="/icon.jpeg" alt="" aria-hidden="true" />
        </span>
        POWIP
      </a>
      <label className="search">
        <Search size={16} aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar en la ayuda…"
          aria-label="Buscar en la ayuda"
        />
      </label>
      <div className="tb-actions">
        <button type="button" className="top-cta wa" onClick={openWhatsAppModal} aria-label="WhatsApp">
          <MessageCircle size={16} aria-hidden="true" />
          <span>WhatsApp</span>
        </button>
        <a
          className="top-cta cal"
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agenda una llamada"
        >
          <CalendarDays size={16} aria-hidden="true" />
          <span>Agenda una llamada</span>
        </a>
        <button
          className="theme-btn"
          onClick={onThemeToggle}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-pressed={isDark}
        >
          {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
