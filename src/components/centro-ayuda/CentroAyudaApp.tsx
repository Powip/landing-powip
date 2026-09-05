'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import HomePage from './pages/HomePage';
import ModulePage from './pages/ModulePage';
import StartPage from './pages/StartPage';
import FlowPage from './pages/FlowPage';
import StatesPage from './pages/StatesPage';
import GlossaryPage from './pages/GlossaryPage';
import NewsPage from './pages/NewsPage';
import { HELP_DATA } from './data';
import { WhatsAppModalProvider } from './WhatsAppModalContext';
import './centro-ayuda.css';

const SPECIAL_PAGES = new Set(['empieza', 'flujo', 'estados', 'glosario', 'novedades']);

function readHashRoute(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#\/?/, '');
}

export default function CentroAyudaApp() {
  const [route, setRoute] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(null);
  const [systemDark, setSystemDark] = useState(false);
  const [query, setQuery] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function syncRoute() {
      const h = readHashRoute();
      if (h && !SPECIAL_PAGES.has(h) && !HELP_DATA.modules[h]) {
        window.location.hash = '#/';
        return;
      }
      setRoute(h);
      setSidebarOpen(false);
      window.scrollTo(0, 0);
    }
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isDark = themeOverride ? themeOverride === 'dark' : systemDark;

  const toggleTheme = useCallback(() => {
    setThemeOverride(isDark ? 'light' : 'dark');
  }, [isDark]);

  const closeSidebarAndReturnFocus = useCallback(() => {
    setSidebarOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  let content;
  if (!route) {
    content = <HomePage />;
  } else if (route === 'empieza') {
    content = <StartPage />;
  } else if (route === 'flujo') {
    content = <FlowPage />;
  } else if (route === 'estados') {
    content = <StatesPage />;
  } else if (route === 'glosario') {
    content = <GlossaryPage />;
  } else if (route === 'novedades') {
    content = <NewsPage />;
  } else if (HELP_DATA.modules[route]) {
    content = <ModulePage moduleId={route} />;
  } else {
    content = <HomePage />;
  }

  return (
    <div className="hc" data-theme={themeOverride ?? undefined}>
      <a href="#hc-main" className="skip-link">
        Saltar al contenido
      </a>
      <WhatsAppModalProvider>
        <Topbar
          query={query}
          onQueryChange={setQuery}
          onMenuClick={() => setSidebarOpen((v) => !v)}
          menuOpen={sidebarOpen}
          menuButtonRef={menuButtonRef}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />
        <div className="shell">
          <Sidebar open={sidebarOpen} activeKey={route || ''} query={query} onClose={closeSidebarAndReturnFocus} />
          <main id="hc-main" tabIndex={-1}>
            {content}
          </main>
        </div>
      </WhatsAppModalProvider>
    </div>
  );
}
