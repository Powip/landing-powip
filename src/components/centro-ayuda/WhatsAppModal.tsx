'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { WA_PHONE, WA_NEED_OPTIONS } from './data';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function buildMessage({
  nombre,
  empresa,
  necesita,
  mensaje,
  correo,
}: {
  nombre: string;
  empresa: string;
  necesita: string;
  mensaje: string;
  correo: string;
}) {
  const lines = [`Hola 👋, soy *${nombre}*${empresa ? ` de *${empresa}*` : ''}.`, ''];
  lines.push(`📌 Necesito ayuda con: *${necesita}*`);
  if (mensaje.trim()) lines.push(`📝 Detalle: ${mensaje.trim()}`);
  lines.push(`📧 Correo registrado en POWIP: ${correo}`);
  return lines.join('\n');
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [necesita, setNecesita] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [correo, setCorreo] = useState('');
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleTabTrap(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = buildMessage({ nombre, empresa, necesita, mensaje, correo });
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    onClose();
    setNombre('');
    setEmpresa('');
    setNecesita('');
    setMensaje('');
    setCorreo('');
  }

  return (
    <div className="wa-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="wa-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-modal-title"
        aria-describedby="wa-modal-desc"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleTabTrap}
      >
        <button className="wa-modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={16} aria-hidden="true" />
        </button>

        <h3 id="wa-modal-title">
          <MessageCircle size={20} aria-hidden="true" /> ¿Necesitas ayuda?
        </h3>
        <p id="wa-modal-desc" className="wa-sub">
          Cuéntanos un poco sobre tu consulta para que podamos ayudarte más rápido.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="wa-field">
            <label htmlFor="wa-nombre">Nombre</label>
            <input
              id="wa-nombre"
              ref={firstFieldRef}
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="wa-field">
            <label htmlFor="wa-empresa">Empresa o tienda</label>
            <input
              id="wa-empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nombre de tu negocio"
            />
          </div>

          <div className="wa-field">
            <label htmlFor="wa-necesita">¿Qué necesitas?</label>
            <select id="wa-necesita" required value={necesita} onChange={(e) => setNecesita(e.target.value)}>
              <option value="" disabled>
                Selecciona una opción
              </option>
              {WA_NEED_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="wa-field">
            <label htmlFor="wa-mensaje">Cuéntanos más</label>
            <textarea
              id="wa-mensaje"
              rows={3}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Danos más detalles (opcional)"
            />
          </div>

          <div className="wa-field">
            <label htmlFor="wa-correo">📧 ¿Cuál es tu correo registrado en Powip?</label>
            <input
              id="wa-correo"
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tucorreo@empresa.com"
            />
          </div>

          <button type="submit" className="wa-submit">
            <MessageCircle size={18} aria-hidden="true" /> Continuar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
