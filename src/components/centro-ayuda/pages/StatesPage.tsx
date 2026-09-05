import { HELP_DATA } from '../data';
import { Crumb, EndCta, Foot } from '../CtaBlock';

export default function StatesPage() {
  return (
    <div className="wrap wide">
      <Crumb name="Estados" />
      <h1 className="title">Estados y qué hacer</h1>
      <p className="intro">
        Qué significa cada estado que verás en POWIP y la acción que corresponde en cada uno.
      </p>

      {HELP_DATA.states.map((group) => (
        <div className="stategrp" key={group.grupo}>
          <h2 className="h">{group.grupo}</h2>
          <div className="tablewrap">
            <table className="stable">
              <caption className="sr-only">{group.grupo}</caption>
              <thead>
                <tr>
                  <th scope="col">Estado</th>
                  <th scope="col">Qué significa</th>
                  <th scope="col">Qué hacer</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map(([estado, significa, hacer, tone]) => (
                  <tr key={estado}>
                    <td>
                      <span className={`pill ${tone}`}>{estado}</span>
                    </td>
                    <td>{significa}</td>
                    <td>{hacer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <EndCta title="¿Un estado no cuadra?" desc="Escríbenos por WhatsApp y lo revisamos contigo." />
      <Foot />
    </div>
  );
}
