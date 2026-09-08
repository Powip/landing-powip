import { HELP_DATA } from '../data';
import { Crumb, EndCta, Foot } from '../CtaBlock';

export default function GlossaryPage() {
  return (
    <div className="wrap wide">
      <Crumb name="Glosario" />
      <h1 className="title">Glosario POWIP</h1>
      <p className="intro">Los términos que más vas a escuchar, en simple.</p>

      <dl className="gloss">
        {HELP_DATA.glossary.map(([term, definition]) => (
          <div className="grow" key={term}>
            <dt>{term}</dt>
            <dd>{definition}</dd>
          </div>
        ))}
      </dl>

      <EndCta title="¿Un término que no está?" desc="Escríbenos por WhatsApp y lo agregamos." />
      <Foot />
    </div>
  );
}
