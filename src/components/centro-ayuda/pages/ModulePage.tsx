import { User, Film, Lightbulb, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { HELP_DATA, MODULE_ORDER, MODULE_VIDEOS, SCREENSHOTS, chapterOf } from '../data';
import { EndCta, Foot } from '../CtaBlock';
import YouTubeEmbed from '../YouTubeEmbed';

interface ModulePageProps {
  moduleId: string;
}

export default function ModulePage({ moduleId }: ModulePageProps) {
  const mod = HELP_DATA.modules[moduleId];
  if (!mod) return null;

  const chapter = chapterOf(moduleId);
  const role = HELP_DATA.role[mod.ch];
  const idx = MODULE_ORDER.indexOf(moduleId);
  const prevId = idx > 0 ? MODULE_ORDER[idx - 1] : null;
  const nextId = idx < MODULE_ORDER.length - 1 ? MODULE_ORDER[idx + 1] : null;
  const prevMod = prevId ? HELP_DATA.modules[prevId] : null;
  const nextMod = nextId ? HELP_DATA.modules[nextId] : null;

  return (
    <div className="wrap">
      <nav aria-label="Ruta de navegación" className="crumb">
        <ol>
          <li>
            <a href="#/">Inicio</a>
          </li>
          {chapter && (
            <>
              <li aria-hidden="true">›</li>
              <li>
                <a href={`#/${chapter.mods[0]}`}>{chapter.name}</a>
              </li>
            </>
          )}
          <li aria-hidden="true">›</li>
          <li aria-current="page">{mod.title}</li>
        </ol>
      </nav>

      <div className="role">
        <span className="dot">
          <User size={13} aria-hidden="true" />
        </span>{' '}
        Para el rol · {role}
      </div>

      <h1 className="title">{mod.title}</h1>
      <p className="lede">{mod.one}</p>

      {MODULE_VIDEOS[mod.id] ? (
        <YouTubeEmbed videoId={MODULE_VIDEOS[mod.id]} title={`Video: ${mod.title}`} />
      ) : (
        <div className="video">
          <div>
            <div className="film">
              <Film size={26} aria-hidden="true" />
            </div>
            <div className="vlabel">
              Video del capítulo {chapter?.n} · {chapter?.name}
            </div>
            <div className="vsub">En edición — aquí irá el tutorial en video de este capítulo.</div>
          </div>
        </div>
      )}

      {mod.para && (
        <section className="blk">
          <div className="eyebrow">Para qué te sirve</div>
          <p style={{ marginTop: 0, fontSize: 16.5, color: 'var(--ink-2)' }}>{mod.para}</p>
        </section>
      )}

      <section className="blk">
        <div className="eyebrow">Paso a paso</div>
        <h2 className="h">Cómo se usa</h2>
        <ol className="steps">
          {mod.steps.map((step, i) => (
            <li className="step" key={i}>
              <span className="num">{i + 1}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
              {step.img && (
                <figure className="shot">
                  <img src={SCREENSHOTS[step.img] ?? undefined} alt={step.t} loading="lazy" />
                  {step.cap && <figcaption>{step.cap}</figcaption>}
                </figure>
              )}
            </li>
          ))}
        </ol>
      </section>

      {mod.tips && mod.tips.length > 0 && (
        <div className="tips">
          <h3>
            <Lightbulb size={17} aria-hidden="true" /> Tips
          </h3>
          <ul>
            {mod.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {mod.faq && mod.faq.length > 0 && (
        <section className="blk">
          <div className="eyebrow">Preguntas frecuentes</div>
          <h2 className="h">Dudas comunes</h2>
          <div className="faq">
            {mod.faq.map((item, i) => (
              <details key={i} open={i === 0}>
                <summary>
                  {item.q} <ChevronDown className="chev" size={20} aria-hidden="true" />
                </summary>
                <div className="fa">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="pager">
        {prevMod ? (
          <a href={`#/${prevMod.id}`}>
            <div className="lbl">
              <ChevronLeft size={12} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }} /> Anterior
            </div>
            <div className="tt">{prevMod.title}</div>
          </a>
        ) : (
          <a className="empty" />
        )}
        {nextMod ? (
          <a className="next" href={`#/${nextMod.id}`}>
            <div className="lbl">
              Siguiente <ChevronRight size={12} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }} />
            </div>
            <div className="tt">{nextMod.title}</div>
          </a>
        ) : (
          <a className="next empty" />
        )}
      </div>

      <EndCta
        title="¿Te quedaste con una duda?"
        desc="Escríbenos por WhatsApp o agenda una llamada y te ayudamos con este módulo."
      />
      <Foot />
    </div>
  );
}
