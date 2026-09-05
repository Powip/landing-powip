import { User, Truck, Settings } from 'lucide-react';
import { HELP_DATA } from '../data';
import { Crumb, EndCta, Foot } from '../CtaBlock';
import type { StartIcon } from '../types';

const ICONS: Record<StartIcon, typeof User> = {
  user: User,
  truck: Truck,
  gear: Settings,
};

export default function StartPage() {
  return (
    <div className="wrap wide">
      <Crumb name="Empieza aquí" />
      <h1 className="title">Empieza aquí</h1>
      <p className="intro">
        Elige tu rol y sigue los pasos en orden. En pocos minutos sabrás lo esencial para trabajar en POWIP.
      </p>

      <div className="paths">
        {HELP_DATA.start.map((path) => {
          const Icon = ICONS[path.icon];
          return (
            <div className="path" key={path.role}>
              <div className="phead">
                <span className="pic">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <div className="prole">{path.role}</div>
                  <div className="pdesc">{path.desc}</div>
                </div>
              </div>
              <ol className="plist">
                {path.steps.map(([moduleId, label]) => (
                  <li key={moduleId}>
                    <a href={`#/${moduleId}`}>{label}</a>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      <EndCta
        title="¿Recién empiezas?"
        desc="Escríbenos por WhatsApp o agenda una llamada y te acompañamos en la puesta en marcha."
      />
      <Foot />
    </div>
  );
}
