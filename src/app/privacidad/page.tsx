import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalHeader from '@/components/legal/LegalHeader';
import LegalToc from '@/components/legal/LegalToc';
import LegalSection from '@/components/legal/LegalSection';
import LegalNote from '@/components/legal/LegalNote';
import LegalList from '@/components/legal/LegalList';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de Privacidad de POWIP: qué datos recopilamos, para qué los usamos, con quién los compartimos y cómo ejercer tus derechos conforme a la Ley N.° 29733.',
  alternates: { canonical: '/privacidad' },
};

const TOC = [
  { id: '1', label: '1. Responsable del Tratamiento' },
  { id: '2', label: '2. Datos que Recopilamos' },
  { id: '3', label: '3. Finalidad del Tratamiento' },
  { id: '4', label: '4. Base Legal del Tratamiento' },
  { id: '5', label: '5. Transferencia de Datos a Terceros' },
  { id: '6', label: '6. Seguridad de los Datos' },
  { id: '7', label: '7. Conservación de Datos' },
  { id: '8', label: '8. Derechos del Titular de los Datos' },
  { id: '9', label: '9. Cookies y Tecnologías de Seguimiento' },
  { id: '10', label: '10. Cambios a esta Política' },
  { id: '11', label: '11. Contacto' },
];

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full">
      <Navbar />

      <LegalHeader
        eyebrow="Marco legal"
        title="Política de Privacidad"
        subtitle="Tratamiento de Datos Personales — Plataforma POWIP"
        version="2.1"
        date="24 de mayo de 2026"
        intro={
          <>
            Esta Política de Privacidad forma parte del marco legal de POWIP junto con los{' '}
            <a href="/terminos" className="font-semibold hover:underline">
              Términos y Condiciones v2.1
            </a>{' '}
            y el Contrato de Servicio. En caso de conflicto entre documentos, prevalecerá el Contrato de
            Servicio.
          </>
        }
      />

      <div className="px-6 md:px-20 pb-20">
        <LegalToc items={TOC} />

        <article className="max-w-3xl mx-auto flex flex-col gap-2 mt-8">
          <LegalSection id="1" title="1. Responsable del Tratamiento">
            <p>
              <b>POWIP TECHNOLOGY SAC</b> (RUC 20616141971), con domicilio fiscal en Calle Portugal 129, Breña,
              Lima, Perú, es la empresa responsable del tratamiento de los datos personales recopilados y
              gestionados a través de la plataforma POWIP.
            </p>
            <p className="font-semibold text-[#1B1730]">Dominios de la plataforma:</p>
            <LegalList
              items={[
                <><b>Sitio web institucional:</b> www.powip.lat — información, planes y contacto comercial.</>,
                <><b>Plataforma de gestión (merchants):</b> www.powip.tech — acceso al panel de operaciones del Merchant.</>,
              ]}
            />
            <p>
              Para contactar al Responsable de Privacidad:{' '}
              <a href="mailto:hola@powip.lat" className="text-[#4F3A96] font-semibold hover:underline">
                hola@powip.lat
              </a>
            </p>
          </LegalSection>

          <LegalSection id="2" title="2. Datos que Recopilamos">
            <LegalSection level={3} title="2.1 Datos del Merchant y sus Usuarios Internos">
              <p>
                Al contratar y usar la plataforma POWIP, recopilamos los siguientes datos del Merchant titular y
                de cada usuario interno que el Merchant cree dentro de su cuenta:
              </p>
              <LegalList
                items={[
                  <><b>Datos del titular de la cuenta:</b> nombre, razón social, RUC o identificación tributaria equivalente, correo electrónico, número de teléfono y dirección comercial.</>,
                  <><b>Datos de usuarios internos:</b> nombre completo, correo electrónico corporativo, rol y permisos asignados dentro de la plataforma. Cada usuario interno constituye un titular de datos cuyos datos son tratados bajo la responsabilidad del Merchant.</>,
                  <><b>Datos de canales de venta:</b> nombre del negocio, URL, configuración de canales conectados (Shopify, WooCommerce, Magento, TikTok Shop, Mercado Libre, entre otros).</>,
                  <><b>Datos de operadores logísticos:</b> integraciones configuradas con proveedores de envío y fulfillment.</>,
                  <><b>Datos financieros y de facturación:</b> necesarios para la prestación y cobro del servicio.</>,
                  <><b>Datos técnicos de uso:</b> logs de acceso a www.powip.tech por usuario, métricas de rendimiento, configuraciones de integración y registros de actividad dentro de la plataforma.</>,
                ]}
              />
              <LegalNote>
                El Merchant, como responsable de la creación de usuarios internos, deberá informar a dichas
                personas que sus datos serán tratados por POWIP conforme a la presente Política, y obtener el
                consentimiento necesario según la legislación aplicable.
              </LegalNote>
            </LegalSection>

            <LegalSection level={3} title="2.2 Datos de los Clientes del Merchant (Customer Data)">
              <p>
                A través de la integración con las plataformas de venta y logística, POWIP accede y procesa
                datos de los clientes del Merchant exclusivamente para ejecutar los servicios contratados:
              </p>
              <LegalList
                items={[
                  <><b>Datos de pedidos:</b> número de pedido, productos, cantidades, montos, estado del pedido, canal de origen.</>,
                  <><b>Datos de contacto del cliente:</b> nombre, correo electrónico, teléfono, dirección de envío y facturación.</>,
                  <><b>Datos de entrega:</b> información de guías de envío, operador logístico, tracking, estado de entrega.</>,
                  <><b>Datos de pago:</b> información procesada conforme a los estándares PCI-DSS. POWIP no almacena números completos de tarjetas de crédito ni datos bancarios sensibles.</>,
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="2.3 Datos que NO Recopilamos">
              <p>POWIP NO recopila ni almacena los siguientes tipos de datos:</p>
              <LegalList
                items={[
                  'Números completos de tarjetas de crédito, débito ni datos bancarios directos de los clientes del Merchant.',
                  'Contraseñas de acceso a las cuentas del Merchant en las Plataformas Integradas (solo se almacenan tokens OAuth seguros y revocables).',
                  'Datos sensibles de carácter racial, étnico, político, religioso, de salud, orientación sexual u otros categorías especiales conforme a la Ley N.° 29733.',
                  'Datos de menores de edad de forma directa ni intencional.',
                  'Comunicaciones privadas entre el Merchant y sus clientes fuera del contexto de la gestión de pedidos.',
                ]}
              />
              <LegalNote>
                Si POWIP detecta accidentalmente algún dato de las categorías anteriores, procederá a su
                eliminación inmediata y notificará al Merchant.
              </LegalNote>
            </LegalSection>
          </LegalSection>

          <LegalSection id="3" title="3. Finalidad del Tratamiento">
            <p>POWIP utiliza los datos exclusivamente para las siguientes finalidades:</p>

            <LegalSection level={3} title="3.1 Prestación del Servicio Contratado">
              <LegalList
                items={[
                  'Centralizar y gestionar pedidos provenientes de múltiples canales de venta del Merchant.',
                  'Sincronizar inventario, catálogos y datos operativos entre las Plataformas Integradas.',
                  'Gestionar la logística de despacho, seguimiento de envíos y devoluciones.',
                  'Generar reportes, dashboards y analítica operativa para el Merchant.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="3.2 Comunicación con el Merchant">
              <LegalList
                items={[
                  'Enviar notificaciones operativas relevantes sobre el servicio a través del correo y la plataforma www.powip.tech.',
                  'Comunicar actualizaciones importantes de la plataforma, cambios de términos o incidentes de seguridad.',
                  'Responder consultas, soporte técnico y solicitudes del Merchant.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="3.3 Seguridad y Prevención de Fraudes">
              <LegalList
                items={[
                  'Detectar, investigar y prevenir actividades fraudulentas, accesos no autorizados o uso indebido de la plataforma.',
                  'Monitorear la integridad operativa de los datos y conexiones con Plataformas Integradas.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="3.4 Mejora del Servicio">
              <LegalList
                items={[
                  'Analizar de forma agregada y anonimizada el uso de la plataforma para mejorar funcionalidades existentes y desarrollar nuevas.',
                  'Evaluar el rendimiento técnico de las integraciones con Plataformas Integradas.',
                ]}
              />
              <LegalNote>
                POWIP NO usa datos individuales del Merchant ni de sus clientes para desarrollo de productos sin
                autorización. Cualquier análisis de mejora se realiza sobre datos anonimizados y agregados.
              </LegalNote>
            </LegalSection>
            <LegalSection level={3} title="3.5 Cumplimiento Legal">
              <LegalList
                items={[
                  'Cumplir con las obligaciones impuestas por la legislación peruana y las normativas aplicables en las jurisdicciones donde opera el Merchant.',
                  'Responder a requerimientos de autoridades competentes conforme a lo establecido en la Sección 5.',
                ]}
              />
            </LegalSection>
          </LegalSection>

          <LegalSection id="4" title="4. Base Legal del Tratamiento">
            <p>El tratamiento de datos por POWIP se fundamenta en:</p>
            <LegalList
              items={[
                <><b>Ejecución contractual:</b> el tratamiento es necesario para prestar los servicios contratados por el Merchant a través de www.powip.tech.</>,
                <><b>Consentimiento:</b> obtenido mediante la aceptación de esta Política y del Merchant Agreement al momento del registro.</>,
                <><b>Cumplimiento legal:</b> cuando el tratamiento sea exigido por la legislación peruana u otras normativas aplicables.</>,
                <><b>Interés legítimo:</b> para proteger la seguridad de la plataforma, prevenir fraudes y garantizar la calidad del servicio.</>,
              ]}
            />
          </LegalSection>

          <LegalSection id="5" title="5. Transferencia de Datos a Terceros">
            <p>Los únicos casos en que POWIP puede compartir datos con terceros son:</p>
            <LegalList
              items={[
                <><b>Plataformas de Venta Integradas:</b> sincronización de datos al panel del Merchant en cada plataforma (Shopify, WooCommerce, Magento, TikTok Shop, Mercado Libre, entre otras), en ejecución del servicio contratado y conforme a los acuerdos de cada plataforma.</>,
                <><b>Plataformas de Logística Integradas:</b> transmisión de datos de pedidos y destinatarios a los operadores de envío (Olva Courier, Shalom, DHL, operadores 3PL, etc.) estrictamente necesarios para la gestión del despacho.</>,
                <><b>Proveedores de infraestructura tecnológica:</b> exclusivamente para operar la plataforma, bajo acuerdos contractuales de confidencialidad y protección de datos equivalentes a esta Política.</>,
                <><b>Autoridades competentes:</b> cuando sea exigido por ley o resolución judicial firme, y solo en la medida estrictamente necesaria.</>,
              ]}
            />
            <LegalNote>
              En ningún caso POWIP venderá, alquilará ni cederá datos del Merchant o sus clientes a terceros con
              fines comerciales propios o ajenos al servicio contratado.
            </LegalNote>
          </LegalSection>

          <LegalSection id="6" title="6. Seguridad de los Datos">
            <p>POWIP implementa medidas técnicas y organizativas robustas para proteger los datos bajo su responsabilidad:</p>
            <LegalList
              items={[
                'Cifrado TLS 1.2 o superior para todas las comunicaciones en tránsito, tanto en www.powip.lat como en www.powip.tech.',
                'Cifrado en reposo para bases de datos que contienen datos personales y financieros.',
                'Control de accesos basado en roles, con autenticación multifactor para accesos administrativos.',
                'Monitoreo continuo de seguridad y sistemas de detección de intrusiones.',
                'Revisiones y auditorías de seguridad periódicas.',
                'Planes de respuesta a incidentes documentados y probados.',
                'Capacitación continua del personal en materia de seguridad y privacidad de datos.',
              ]}
            />
            <p>
              En caso de un Incidente de Seguridad, POWIP notificará al Merchant en un plazo máximo de 24 horas
              desde que tome conocimiento, e iniciará de inmediato las acciones de contención, investigación y
              remediación.
            </p>
          </LegalSection>

          <LegalSection id="7" title="7. Conservación de Datos">
            <p>
              POWIP conserva los datos del Merchant y sus clientes únicamente durante el tiempo necesario para
              prestar el servicio contratado y cumplir con las obligaciones legales aplicables.
            </p>
            <p>
              POWIP eliminará de forma segura y definitiva todos los datos dentro de los treinta (30) días
              calendarios siguientes a:
            </p>
            <LegalList
              items={[
                'La cancelación de la cuenta o desconexión de la plataforma por el Merchant.',
                'La terminación del acuerdo de servicio por cualquier causa.',
                'La recepción de una solicitud de eliminación válida del Merchant, un Customer o una Plataforma Integrada.',
              ]}
            />
            <p>Se entregará confirmación escrita de la eliminación al Merchant cuando así sea solicitado.</p>
          </LegalSection>

          <LegalSection id="8" title="8. Derechos del Titular de los Datos">
            <p>
              Conforme a la Ley N.° 29733 y normativa aplicable, el Merchant y sus clientes tienen los siguientes
              derechos sobre sus datos personales en posesión de POWIP:
            </p>
            <LegalList
              items={[
                <><b>Acceso:</b> conocer qué datos posee POWIP y cómo los usa.</>,
                <><b>Rectificación:</b> corregir datos inexactos o incompletos.</>,
                <><b>Cancelación / Eliminación:</b> solicitar la supresión de datos cuando ya no sean necesarios.</>,
                <><b>Oposición:</b> oponerse al tratamiento de datos en los casos previstos por ley.</>,
                <><b>Portabilidad:</b> recibir sus datos en formato estructurado y legible por máquina.</>,
                <><b>Revocación del consentimiento:</b> en cualquier momento, sin efecto retroactivo.</>,
              ]}
            />
            <p>
              Para ejercer cualquiera de estos derechos, escríbenos a hola@powip.lat indicando tu identidad y el
              derecho que deseas ejercer. POWIP responderá en el plazo establecido por la ley peruana (máximo 20
              días hábiles).
            </p>
          </LegalSection>

          <LegalSection id="9" title="9. Cookies y Tecnologías de Seguimiento">
            <p>POWIP utiliza tecnologías de seguimiento propias y autorizadas únicamente en los siguientes contextos:</p>
            <LegalSection level={3} title="9.1 Sitio Web Institucional (www.powip.lat)">
              <LegalList
                items={[
                  'Cookies de sesión y analítica para entender el comportamiento de los visitantes y mejorar la experiencia del sitio.',
                  'Herramientas de analítica web (como Google Analytics u equivalentes) con datos anonimizados.',
                  'No se implementan rastreadores publicitarios de terceros sin consentimiento explícito del usuario.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="9.2 Plataforma de Gestión (www.powip.tech)">
              <LegalList
                items={[
                  'Cookies de autenticación y sesión necesarias para el funcionamiento de la plataforma (esenciales, no opcionales).',
                  'Cookies de preferencias del Merchant para recordar configuraciones del panel.',
                  'No se usan cookies publicitarias ni de seguimiento de comportamiento dentro del panel de gestión.',
                ]}
              />
            </LegalSection>
            <p>
              El Merchant puede gestionar las preferencias de cookies desde la configuración de su navegador. La
              desactivación de cookies esenciales puede afectar el funcionamiento de www.powip.tech.
            </p>
          </LegalSection>

          <LegalSection id="10" title="10. Cambios a esta Política">
            <p>
              POWIP podrá actualizar esta Política de Privacidad cuando sea necesario para reflejar cambios en
              la normativa, en los servicios ofrecidos, en las Plataformas Integradas o en las exigencias de sus
              partners tecnológicos.
            </p>
            <p>
              Notificaremos al Merchant con antelación razonable a través del correo registrado y/o mediante
              aviso visible en www.powip.tech. La versión vigente estará siempre disponible en www.powip.lat.
            </p>
          </LegalSection>

          <LegalSection id="11" title="11. Contacto — Responsable de Privacidad">
            <p>
              Para cualquier consulta, solicitud de derechos o reporte relacionado con el tratamiento de datos
              personales:
            </p>
            <LegalList
              items={[
                <><b>POWIP TECHNOLOGY SAC</b></>,
                <>RUC: 20616141971</>,
                <>Dirección: Calle Portugal 129, Breña, Lima, Perú</>,
                <>Email de privacidad: <a href="mailto:hola@powip.lat" className="text-[#4F3A96] font-semibold hover:underline">hola@powip.lat</a></>,
                <>Sitio web: www.powip.lat</>,
                <>Plataforma de gestión: www.powip.tech</>,
              ]}
            />
          </LegalSection>

          <p className="pt-10 text-[12.5px] text-[#9895ad] border-t border-gray-100 mt-4">
            POWIP TECHNOLOGY SAC · Política de Privacidad · 24 de mayo de 2026
          </p>
        </article>
      </div>

      <Footer />
    </main>
  );
}
