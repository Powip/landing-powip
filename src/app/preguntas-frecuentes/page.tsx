import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalHeader from '@/components/legal/LegalHeader';
import LegalNote from '@/components/legal/LegalNote';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description:
    'Guía de referencia de POWIP para Merchants y equipo comercial: planes y precios, integraciones, legal y privacidad, soporte y operaciones.',
  alternates: { canonical: '/preguntas-frecuentes' },
};

const DEMO_LINK = 'https://calendar.app.google/vZCCwwygCZFvAd5f6';

type FaqItem = { q: string; a: ReactNode };
type FaqCategory = { id: string; title: string; items: FaqItem[] };

const CATEGORIES: FaqCategory[] = [
  {
    id: 'planes',
    title: '1. Planes y Precios',
    items: [
      {
        q: '¿Qué planes ofrece POWIP?',
        a: (
          <>
            <p>POWIP ofrece cuatro planes según el volumen mensual de pedidos que gestiona tu negocio:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-[#1E8C86]">
              <li><b>BASIC:</b> hasta 999 pedidos/mes.</li>
              <li><b>STANDARD:</b> hasta 1,999 pedidos/mes.</li>
              <li><b>FULL:</b> entre 2,000 y 6,000 pedidos/mes.</li>
              <li><b>ENTERPRISE:</b> más de 6,000 pedidos/mes — precio acordado con el equipo comercial según volumen y necesidades específicas.</li>
            </ul>
            <LegalNote>Todos los planes incluyen usuarios ilimitados. No cobramos por asiento ni por cantidad de usuarios.</LegalNote>
          </>
        ),
      },
      {
        q: '¿Cómo se contabilizan los pedidos?',
        a: (
          <>
            <p>
              Se cuenta cada pedido procesado o sincronizado a través de POWIP durante el mes calendario,
              independientemente del canal de origen (Shopify, WooCommerce, TikTok Shop, Mercado Libre, etc.).
            </p>
            <p>Los pedidos cancelados antes de ser procesados por la plataforma no se contabilizan.</p>
          </>
        ),
      },
      {
        q: '¿Cuántos usuarios puede tener mi equipo?',
        a: (
          <p>
            Todos los planes incluyen usuarios ilimitados. Puedes crear cuentas para todo tu equipo —
            logística, atención al cliente, administración, ventas— sin costo adicional por usuario.
          </p>
        ),
      },
      {
        q: '¿Qué pasa si supero el límite de pedidos de mi plan?',
        a: (
          <>
            <p>
              Si tu volumen supera el límite de tu plan actual, POWIP te notificará para que actualices tu
              suscripción al plan correspondiente. La plataforma no se interrumpe mientras el proceso de
              actualización está en curso.
            </p>
            <p>
              Si estás en temporada alta (campaña de ventas, Black Friday, etc.), puedes contactarnos en
              hola@powip.lat para coordinar un ajuste temporal.
            </p>
          </>
        ),
      },
      {
        q: '¿Hay período de prueba gratuito?',
        a: (
          <>
            <p>
              No. POWIP no ofrece período de prueba gratuita, y lo hacemos de manera consciente: nuestra
              promesa es acompañarte de manera personalizada desde el primer momento. En una prueba sin
              acompañamiento real, no podemos garantizar que experimentes el valor que POWIP entrega a tu
              operación.
            </p>
            <p>
              En cambio, ofrecemos una demo virtual guiada con nuestro equipo comercial, donde respondemos
              todas las dudas de tu negocio en el momento y te mostramos cómo POWIP se adapta a tu operación
              específica.
            </p>
            <LegalNote>
              Agenda tu demo aquí:{' '}
              <a href={DEMO_LINK} target="_blank" rel="noopener noreferrer" className="not-italic font-semibold underline">
                {DEMO_LINK}
              </a>
            </LegalNote>
          </>
        ),
      },
      {
        q: '¿Puedo agendar una demostración antes de contratar?',
        a: (
          <>
            <p>
              Sí. Puedes agendar una demo virtual guiada con nuestro equipo comercial en el siguiente enlace:{' '}
              <a href={DEMO_LINK} target="_blank" rel="noopener noreferrer" className="text-[#4F3A96] font-semibold hover:underline">
                {DEMO_LINK}
              </a>
            </p>
            <p>
              En la demo te mostramos la plataforma en funcionamiento, respondemos todas las preguntas sobre tu
              operación y evaluamos juntos qué plan se ajusta mejor a tu negocio.
            </p>
          </>
        ),
      },
      {
        q: '¿Puedo cambiar de plan en cualquier momento?',
        a: (
          <p>
            Sí. Puedes hacer upgrade a un plan superior en cualquier momento desde tu panel en www.powip.tech.
            El cambio se aplicará a partir del siguiente ciclo de facturación o de forma inmediata si así lo
            solicitas.
          </p>
        ),
      },
      {
        q: '¿Cómo funciona la facturación mensual vs. anual?',
        a: (
          <>
            <p>
              POWIP ofrece suscripción mensual y anual. La suscripción anual incluye un descuento sobre el
              precio mensual. El cobro se realiza al inicio de cada período.
            </p>
            <p>Para el plan Enterprise, las condiciones de pago se acuerdan de forma personalizada con nuestro equipo comercial.</p>
          </>
        ),
      },
      {
        q: '¿Tienen política de reembolsos o devoluciones?',
        a: (
          <>
            <LegalNote tone="warning">
              POWIP no realiza reembolsos ni devoluciones una vez efectuado el pago, ya sea en suscripciones
              mensuales o anuales. Al contratar el servicio, el Merchant acepta expresamente esta política
              conforme a los{' '}
              <a href="/terminos" className="underline">
                Términos y Condiciones
              </a>{' '}
              y el Contrato de Servicio.
            </LegalNote>
            <p>
              En caso de dudas antes de contratar, escríbenos a hola@powip.lat. Estamos para resolver todas tus
              consultas previo al pago.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'integraciones',
    title: '2. Integraciones y Plataformas',
    items: [
      {
        q: '¿Con qué canales de venta se integra POWIP?',
        a: (
          <>
            <p>Canales actualmente activos — puedes operar en menos de 1 hora desde que activas tu cuenta:</p>
            <p className="font-bold text-[#1B1730]">Shopify · Google Sheets · Yavendió · Flujos Inteligentes</p>
            <p>Canales en proceso de integración (próximamente disponibles):</p>
            <p className="font-bold text-[#1B1730]">WooCommerce · Magento · Falabella · Ripley · Mercado Libre</p>
            <p>Seguimos sumando canales. Siempre buscamos las mejores opciones para que tu negocio opere desde donde vende.</p>
          </>
        ),
      },
      {
        q: '¿Con qué operadores logísticos trabaja POWIP?',
        a: (
          <>
            <p>POWIP integra los principales operadores de envío y fulfillment del mercado:</p>
            <p className="font-bold text-[#1B1730]">Shalom · Olva Courier · Urbano · Aliclick</p>
            <p>
              Siempre buscamos las mejores opciones con cada courier y sumamos nuevos operadores de forma
              continua. La integración logística permite generar guías, hacer seguimiento de envíos y gestionar
              el estado de entrega directamente desde tu panel POWIP.
            </p>
          </>
        ),
      },
      {
        q: '¿Cuánto tarda configurar las integraciones?',
        a: (
          <>
            <p>
              Con los canales actualmente integrados (Shopify, Google Sheets, Yavendió, Flujos Inteligentes), tu
              negocio puede estar operando en POWIP en menos de 1 hora desde que activas tu cuenta.
            </p>
            <p>
              Nuestro equipo de onboarding te acompaña en todo momento durante la activación, configuración de
              integraciones y primeros pasos en la plataforma.
            </p>
          </>
        ),
      },
      {
        q: '¿Qué pasa si una plataforma integrada falla o cambia su API?',
        a: (
          <>
            <p>
              POWIP actúa como integrador tecnológico neutral. Si una plataforma de terceros presenta fallas en
              su propio servicio o realiza cambios en su API, POWIP no se hace responsable por la interrupción
              del servicio del tercero.
            </p>
            <p>
              Sin embargo, cuando una plataforma anuncia cambios en su API, nuestro equipo técnico trabaja para
              adaptar la integración antes de que impacte tu operación, y te notificará oportunamente.
            </p>
            <LegalNote>
              POWIP monitorea continuamente el estado de todas las integraciones activas y notifica al Merchant
              ante cualquier incidencia detectada.
            </LegalNote>
          </>
        ),
      },
      {
        q: '¿La sincronización de pedidos es en tiempo real?',
        a: (
          <>
            <p>
              Sí. POWIP sincroniza pedidos, inventario y estados de despacho en tiempo real o en intervalos muy
              cortos, dependiendo de las capacidades de la API de cada plataforma integrada.
            </p>
            <p>
              Algunas plataformas ofrecen webhooks (actualización instantánea) y otras solo permiten consulta
              periódica. En ambos casos, el tiempo de sincronización está optimizado al máximo posible.
            </p>
          </>
        ),
      },
      {
        q: '¿Puedo conectar mis propios sistemas internos o ERP?',
        a: (
          <>
            <p>
              POWIP ofrece opciones de integración vía API para negocios que requieran conectar sistemas
              propios, ERPs internos u otras herramientas de gestión. Esta funcionalidad está disponible
              principalmente en los planes FULL y ENTERPRISE.
            </p>
            <p>Escríbenos a hola@powip.lat para evaluar tu caso específico.</p>
          </>
        ),
      },
    ],
  },
  {
    id: 'legal',
    title: '3. Legal y Privacidad',
    items: [
      {
        q: '¿Mis datos y los de mis clientes están seguros en POWIP?',
        a: (
          <>
            <p>Sí. POWIP implementa medidas de seguridad robustas para proteger la información:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-[#1E8C86]">
              <li>Cifrado TLS 1.2+ en todas las comunicaciones (en tránsito).</li>
              <li>Cifrado en reposo para bases de datos con información personal y financiera.</li>
              <li>Control de accesos por roles con autenticación multifactor para accesos administrativos.</li>
              <li>Monitoreo continuo y sistemas de detección de intrusiones.</li>
            </ul>
            <p>
              En caso de un incidente de seguridad, notificamos al Merchant en un máximo de 24 horas desde que
              tomamos conocimiento.
            </p>
          </>
        ),
      },
      {
        q: '¿POWIP vende o comparte mis datos con terceros?',
        a: (
          <>
            <p>
              No. POWIP nunca vende, alquila ni cede datos del Merchant o sus clientes a terceros con fines
              comerciales propios o ajenos al servicio contratado.
            </p>
            <p>Los datos solo se comparten cuando es estrictamente necesario para prestar el servicio:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-[#1E8C86]">
              <li>Con las plataformas de venta integradas (en ejecución del servicio).</li>
              <li>Con los operadores logísticos (solo los datos necesarios para el despacho).</li>
              <li>Con proveedores de infraestructura tecnológica bajo acuerdos de confidencialidad.</li>
              <li>Con autoridades competentes cuando sea exigido por ley.</li>
            </ul>
          </>
        ),
      },
      {
        q: '¿POWIP es responsable por lo que ocurra en mis canales de venta o con mis clientes?',
        a: (
          <>
            <p>
              No. POWIP actúa como integrador tecnológico neutral. Su rol es centralizar y sincronizar la
              información operativa entre los sistemas del Merchant y las plataformas conectadas.
            </p>
            <p>
              POWIP no interviene en las relaciones comerciales entre el Merchant y sus clientes, ni en las
              políticas, disputas o incidentes propios de las plataformas de venta integradas ni de los
              operadores logísticos.
            </p>
            <LegalNote>
              Cada plataforma integrada tiene sus propios términos de servicio y políticas. El Merchant es
              responsable de cumplirlas directamente con cada proveedor.
            </LegalNote>
          </>
        ),
      },
      {
        q: '¿Qué documentos legales firmo al contratar POWIP?',
        a: (
          <>
            <p>Al contratar POWIP, el Merchant acepta y suscribe el siguiente marco legal:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-[#1E8C86]">
              <li>
                <b>Términos y Condiciones v2.1:</b> define las reglas de uso de la plataforma, responsabilidades
                y condiciones generales del servicio.
              </li>
              <li>
                <b>Política de Privacidad v2.1:</b> regula el tratamiento de datos personales conforme a la Ley
                N.° 29733 (Perú).
              </li>
              <li>
                <b>Contrato de Servicio v1.1:</b> contrato específico según el plan contratado, enviado después
                de realizado el pago.
              </li>
            </ul>
            <p>
              Todos los documentos están disponibles en www.powip.lat —{' '}
              <a href="/terminos" className="text-[#4F3A96] font-semibold hover:underline">
                Términos y Condiciones
              </a>{' '}
              ·{' '}
              <a href="/privacidad" className="text-[#4F3A96] font-semibold hover:underline">
                Política de Privacidad
              </a>
              .
            </p>
          </>
        ),
      },
      {
        q: '¿Puedo cancelar mi suscripción en cualquier momento?',
        a: (
          <>
            <p>
              Sí. Puedes solicitar la cancelación de tu cuenta en cualquier momento escribiendo a
              hola@powip.lat. La cancelación se hará efectiva al término del período de facturación vigente.
            </p>
            <LegalNote tone="warning">
              Recuerda que POWIP no realiza reembolsos por el tiempo no utilizado en el período pagado. Una vez
              realizado el pago, no aplican devoluciones.
            </LegalNote>
            <p>Tras la cancelación, tus datos serán eliminados de forma segura dentro de los 30 días calendario siguientes.</p>
          </>
        ),
      },
      {
        q: '¿POWIP cumple con la normativa peruana de protección de datos?',
        a: (
          <>
            <p>
              Sí. POWIP TECHNOLOGY SAC con RUC 20616141971 opera en cumplimiento de la Ley N.° 29733 — Ley de
              Protección de Datos Personales y su reglamento, así como de las normativas aplicables en las
              jurisdicciones donde opera el Merchant.
            </p>
            <p>
              Si deseas ejercer tus derechos de acceso, rectificación, cancelación o portabilidad sobre tus
              datos, escríbenos a hola@powip.lat. Respondemos en el plazo legal máximo de 20 días hábiles.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'soporte',
    title: '4. Soporte y Operaciones',
    items: [
      {
        q: '¿Cómo obtengo soporte técnico?',
        a: (
          <>
            <p>
              El soporte en POWIP es uno a uno. Una vez que el Merchant se da de alta, nuestro equipo de
              onboarding lo contacta directamente para la activación, integración y soporte necesario.
            </p>
            <p>
              Como parte de nuestra promesa de acompañamiento personalizado, creamos un grupo de WhatsApp
              exclusivo para cada Merchant, donde recibes soporte e incidencias en tiempo real con nuestro
              equipo.
            </p>
            <p className="font-bold text-[#1B1730]">Canales de contacto:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-[#1E8C86]">
              <li><b>WhatsApp oficial:</b> +51 923 101 193</li>
              <li><b>Email:</b> hola@powip.lat</li>
              <li><b>Panel de soporte:</b> desde tu cuenta en www.powip.tech</li>
            </ul>
            <LegalNote>
              Nuestra promesa es el uno a uno: cada Merchant tiene acompañamiento directo de nuestro equipo, no
              un sistema de tickets anónimo.
            </LegalNote>
          </>
        ),
      },
      {
        q: '¿Qué pasa si hay un incidente o caída en la plataforma POWIP?',
        a: (
          <>
            <p>En caso de un incidente que afecte la disponibilidad de la plataforma, POWIP:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-[#1E8C86]">
              <li>Notifica a los Merchants afectados en el menor tiempo posible a través del correo registrado y/o en www.powip.tech.</li>
              <li>Publica actualizaciones sobre el estado del incidente y el tiempo estimado de resolución.</li>
              <li>Trabaja de inmediato en la restauración del servicio y en mitigar el impacto operativo.</li>
            </ul>
            <LegalNote>
              POWIP trabaja con infraestructura en la nube con alta disponibilidad y redundancia para minimizar
              la probabilidad y duración de incidentes.
            </LegalNote>
          </>
        ),
      },
      {
        q: '¿POWIP ofrece capacitación o onboarding para mi equipo?',
        a: (
          <>
            <p>
              Sí. Al activar tu cuenta, nuestro equipo se pone en contacto contigo para la activación completa:
              configuración de la plataforma, conexión de canales de venta, integración logística y capacitación
              de tu equipo.
            </p>
            <p>
              Desde el primer día cuentas con un grupo de WhatsApp de soporte exclusivo para tu negocio, donde
              nuestro equipo resuelve dudas y acompaña cualquier incidencia en tiempo real.
            </p>
            <p>Para negocios con operaciones más complejas (planes FULL y ENTERPRISE), el acompañamiento es aún más personalizado y continuo.</p>
          </>
        ),
      },
      {
        q: '¿Puedo agregar o eliminar usuarios de mi equipo?',
        a: (
          <>
            <p>
              Sí. Como titular de la cuenta, puedes crear, modificar y eliminar usuarios internos desde el panel
              de administración en www.powip.tech, asignando roles y permisos específicos a cada uno.
            </p>
            <p>
              Recuerda que, al crear usuarios, eres responsable de informarles que sus datos serán tratados por
              POWIP conforme a la Política de Privacidad vigente.
            </p>
          </>
        ),
      },
      {
        q: '¿Cómo actualizo mis datos de facturación o información de cuenta?',
        a: (
          <p>
            Puedes actualizar tus datos directamente desde la sección de configuración en www.powip.tech. Si
            necesitas ayuda con cambios en datos tributarios (RUC, razón social) o de facturación, escríbenos a
            hola@powip.lat.
          </p>
        ),
      },
      {
        q: '¿Cómo contacto al equipo comercial para el plan Enterprise?',
        a: (
          <>
            <p>
              El plan Enterprise está diseñado para negocios con más de 6,000 pedidos mensuales y requiere una
              propuesta personalizada según el volumen, las integraciones necesarias y el nivel de soporte
              requerido.
            </p>
            <p>
              Para iniciar la conversación, escríbenos a hola@powip.lat con el asunto &apos;Plan Enterprise&apos; o
              completa el formulario de contacto en www.powip.lat. Nuestro equipo comercial te responderá en
              menos de 24 horas hábiles.
            </p>
          </>
        ),
      },
    ],
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full">
      <Navbar />

      <LegalHeader
        eyebrow="Guía de referencia"
        title="Preguntas Frecuentes"
        subtitle="Para Merchants y equipo comercial de POWIP"
        version="1.1"
        date="24 de mayo de 2026"
        intro={
          <>
            Este documento reúne las preguntas más frecuentes de Merchants y del equipo comercial de POWIP. Para
            consultas adicionales, escríbenos a{' '}
            <a href="mailto:hola@powip.lat" className="font-semibold hover:underline">
              hola@powip.lat
            </a>
            .
          </>
        }
      />

      <div className="px-6 md:px-20 pb-20">
        <nav aria-label="Categorías" className="max-w-3xl mx-auto flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="bg-[#FAFAFA] border border-gray-200 rounded-full px-4 py-2 text-[13px] font-semibold text-[#4F3A96] hover:bg-[#F0EEFB] transition-colors"
            >
              {cat.title}
            </a>
          ))}
        </nav>

        <div className="max-w-3xl mx-auto flex flex-col gap-14">
          {CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <h2 className="text-[#4F3A96] font-bold text-2xl md:text-3xl tracking-tight mb-5">{cat.title}</h2>
              <div className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-white border border-gray-100 rounded-2xl shadow-[0_4px_18px_rgba(46,33,104,0.08)] overflow-hidden"
                  >
                    <summary className="cursor-pointer list-none px-6 py-[18px] font-bold text-[15px] md:text-base text-[#1B1730] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="text-[#4F3A96] text-2xl font-normal shrink-0 group-open:hidden" aria-hidden="true">+</span>
                      <span className="text-[#4F3A96] text-2xl font-normal shrink-0 hidden group-open:inline" aria-hidden="true">−</span>
                    </summary>
                    <div className="px-6 pb-5 text-[14px] text-[#4a4864] leading-relaxed flex flex-col gap-3">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="max-w-3xl mx-auto pt-14 mt-4 border-t border-gray-100 text-center text-[14px] text-[#4a4664]">
          ¿No encontraste tu respuesta?{' '}
          <a href="mailto:hola@powip.lat" className="text-[#4F3A96] font-semibold hover:underline">
            Escríbenos a hola@powip.lat
          </a>{' '}
          — respondemos en menos de 24 horas hábiles.
        </p>
        <p className="max-w-3xl mx-auto pt-3 text-center text-[12.5px] text-[#9895ad]">
          Corporación Aranni S.A.C. · Preguntas Frecuentes · 24 de mayo de 2026
        </p>
      </div>

      <Footer />
    </main>
  );
}
