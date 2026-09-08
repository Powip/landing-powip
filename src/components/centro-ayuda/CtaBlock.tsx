import { MessageCircle, CalendarDays } from 'lucide-react';
import { CAL_LINK } from './data';
import { useWhatsAppModal } from './WhatsAppModalContext';

export function CtaRow() {
  const { openWhatsAppModal } = useWhatsAppModal();
  return (
    <div className="cta-row">
      <a className="cal" href={CAL_LINK} target="_blank" rel="noopener noreferrer">
        <CalendarDays size={18} aria-hidden="true" /> Agenda una llamada
      </a>
      <button type="button" className="wa" onClick={openWhatsAppModal}>
        <MessageCircle size={18} aria-hidden="true" /> Escríbenos por WhatsApp
      </button>
    </div>
  );
}

interface EndCtaProps {
  title: string;
  desc: string;
}

export function EndCta({ title, desc }: EndCtaProps) {
  return (
    <div className="endcta">
      <h3>{title}</h3>
      <p>{desc}</p>
      <CtaRow />
    </div>
  );
}

export function Foot() {
  return <footer className="foot">Centro de Ayuda POWIP · Hecho para los negocios que venden con POWIP</footer>;
}

export function Crumb({ name }: { name: string }) {
  return (
    <nav aria-label="Ruta de navegación" className="crumb">
      <ol>
        <li>
          <a href="#/">Inicio</a>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  );
}
