import { ChevronRight } from 'lucide-react';
import { HELP_DATA, HOME_VIDEO_ID, QUICK_PAGES } from '../data';
import { EndCta } from '../CtaBlock';
import YouTubeEmbed from '../YouTubeEmbed';

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <div className="kick">Centro de Ayuda</div>
        <h1>Aprende a usar POWIP, módulo por módulo</h1>
        <p>
          Todo lo que cada rol necesita saber para vender, despachar, administrar y cobrar con POWIP.
          Empieza por tu rol, mira el flujo completo o busca lo que necesitas.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <YouTubeEmbed videoId={HOME_VIDEO_ID} title="Conoce el panel principal de POWIP" />
      </div>

      <div className="quick">
        {Object.keys(QUICK_PAGES).map((key) => (
          <a key={key} href={`#/${key}`}>
            <span className="qd" />
            {QUICK_PAGES[key]}
          </a>
        ))}
      </div>

      <div className="secttl">Capítulos</div>
      <div className="cards">
        {HELP_DATA.chapters.map((chapter) => (
          <a key={chapter.id} className="card" href={`#/${chapter.mods[0]}`}>
            <span className="cn">{chapter.n}</span>
            <h3>{chapter.name}</h3>
            <p>{chapter.desc}</p>
            <span className="cc">
              {chapter.mods.length} {chapter.mods.length === 1 ? 'módulo' : 'módulos'}
              <ChevronRight size={13} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: '40px auto 0' }}>
        <EndCta
          title="¿No encuentras lo que buscas?"
          desc="Escríbenos por WhatsApp o agenda una llamada corta y te ayudamos a configurar tu operación."
        />
      </div>
    </>
  );
}
