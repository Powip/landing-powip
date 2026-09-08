'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import WhatsAppModal from './WhatsAppModal';

interface WhatsAppModalContextValue {
  openWhatsAppModal: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextValue | null>(null);

export function WhatsAppModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsAppModal = useCallback(() => setIsOpen(true), []);
  const closeWhatsAppModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openWhatsAppModal }), [openWhatsAppModal]);

  return (
    <WhatsAppModalContext.Provider value={value}>
      {children}
      <WhatsAppModal isOpen={isOpen} onClose={closeWhatsAppModal} />
    </WhatsAppModalContext.Provider>
  );
}

export function useWhatsAppModal() {
  const ctx = useContext(WhatsAppModalContext);
  if (!ctx) throw new Error('useWhatsAppModal debe usarse dentro de WhatsAppModalProvider');
  return ctx;
}
