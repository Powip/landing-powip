import { HELP_DATA } from '../data';
import { Crumb, EndCta, Foot } from '../CtaBlock';
import type { NewsTone } from '../types';

const LABELS: Record<NewsTone, string> = {
  beta: 'Beta',
  pronto: 'Próximamente',
  info: 'Info',
};

export default function NewsPage() {
  return (
    <div className="wrap wide">
      <Crumb name="Novedades" />
      <h1 className="title">Novedades y próximamente</h1>
      <p className="intro">Lo nuevo en POWIP y lo que viene en camino.</p>

      <div className="news">
        {HELP_DATA.news.map(([tone, title, desc], i) => (
          <div className="nitem" key={i}>
            <span className={`nbadge ${tone}`}>{LABELS[tone]}</span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <EndCta title="¿Quieres proponer una mejora?" desc="Escríbenos por WhatsApp; nos encanta el feedback." />
      <Foot />
    </div>
  );
}
