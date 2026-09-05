import { ChevronRight } from 'lucide-react';
import { HELP_DATA, chapterName } from '../data';
import { Crumb, EndCta, Foot } from '../CtaBlock';

export default function FlowPage() {
  const flow = HELP_DATA.flow;

  return (
    <div className="wrap wide">
      <Crumb name="Mapa del flujo" />
      <h1 className="title">Mapa del flujo del pedido</h1>
      <p className="intro">
        Así viaja un pedido dentro de POWIP, de punta a punta. Toca cualquier etapa para ir a su módulo.
      </p>

      <div className="flow">
        {flow.map(([title, desc, moduleId, chapterId], i) => (
          <div key={moduleId + i}>
            <a className="fstage" href={`#/${moduleId}`}>
              <span className="fnum">{i + 1}</span>
              <div className="fbody">
                <div className="ft">
                  {title}
                  <span className="ftag">{chapterName(chapterId)}</span>
                </div>
                <p>{desc}</p>
              </div>
              <span className="farrow">
                <ChevronRight size={22} aria-hidden="true" />
              </span>
            </a>
            {i < flow.length - 1 && <div className="fline" />}
          </div>
        ))}
      </div>

      <EndCta title="¿Dudas sobre alguna etapa?" desc="Escríbenos por WhatsApp o agenda una llamada." />
      <Foot />
    </div>
  );
}
