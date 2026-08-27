import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalHeader from '@/components/legal/LegalHeader';
import LegalToc from '@/components/legal/LegalToc';
import LegalSection from '@/components/legal/LegalSection';
import LegalNote from '@/components/legal/LegalNote';
import LegalList from '@/components/legal/LegalList';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y Condiciones de uso de la plataforma POWIP, operada por POWIP Technology SAC. Versión 2.1, vigente desde el 24 de mayo de 2026.',
  alternates: { canonical: '/terminos' },
};

const TOC = [
  { id: '1', label: '1. Identificación del Proveedor' },
  { id: '2', label: '2. Definiciones' },
  { id: '3', label: '3. Objeto del Servicio' },
  { id: '4', label: '4. Condiciones de Uso' },
  { id: '5', label: '5. Planes, Pagos y No Reembolso' },
  { id: '6', label: '6. Disponibilidad del Servicio' },
  { id: '7', label: '7. Plataformas de Terceros' },
  { id: '8', label: '8. Seguridad y Protección de Datos' },
  { id: '9', label: '9. Privacidad y Datos Personales' },
  { id: '10', label: '10. Términos de Plataformas Integradas' },
  { id: '11', label: '11. Propiedad Intelectual' },
  { id: '12', label: '12. Responsabilidades y Limitaciones' },
  { id: '13', label: '13. Comunicaciones Oficiales' },
  { id: '14', label: '14. Terminación' },
  { id: '15', label: '15. Disposiciones Generales' },
  { id: '16', label: '16. Contacto' },
];

export default function TerminosPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full">
      <Navbar />

      <LegalHeader
        eyebrow="Marco legal"
        title="Términos y Condiciones de Uso"
        subtitle="Plataforma POWIP — Gestión Integral de Pedidos, Logística y Operaciones"
        version="2.1"
        date="24 de mayo de 2026"
      />

      <div className="px-6 md:px-20 pb-20">
        <LegalToc items={TOC} />

        <article className="max-w-3xl mx-auto flex flex-col gap-2 mt-8">
          <LegalSection id="1" title="1. Identificación del Proveedor">
            <p>
              Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma POWIP, operada por{' '}
              <b>POWIP TECHNOLOGY SAC</b>, empresa debidamente constituida bajo las leyes de la República del
              Perú, con RUC 20616141971, con domicilio fiscal en Av. Venezuela 625 - Oficina 918, Breña, Lima,
              Perú.
            </p>
            <p>
              POWIP es una plataforma ERP multicanal que centraliza pedidos, operaciones de venta, logística y
              gestión empresarial provenientes de múltiples canales y plataformas tecnológicas. POWIP opera
              exclusivamente como integrador tecnológico independiente y no como representante, agente ni
              empleado de ninguna plataforma de terceros.
            </p>
            <LegalNote>
              Los servicios de POWIP son distintos e independientes de los servicios de cada plataforma
              conectada. Ninguna plataforma integrada asume responsabilidad por los servicios de POWIP.
            </LegalNote>
          </LegalSection>

          <LegalSection id="2" title="2. Definiciones">
            <p>Para efectos de los presentes Términos, los siguientes términos tendrán el significado indicado:</p>
            <LegalList
              items={[
                <>
                  <b>Merchant:</b> el comerciante, empresa o persona natural que contrata y usa la plataforma
                  POWIP.
                </>,
                <>
                  <b>Plataformas de Venta Integradas:</b> canales de venta electrónica compatibles con POWIP,
                  incluyendo entre otros: Shopify, WooCommerce, Magento, TikTok Shop, Mercado Libre, Wix, VTEX y
                  otros habilitados por POWIP.
                </>,
                <>
                  <b>Plataformas de Logística Integradas:</b> proveedores de envío, fulfillment y transporte
                  integrados a POWIP, incluyendo: Olva Courier, Shalom, Urbano Express, DHL, operadores 3PL y
                  otros habilitados por POWIP.
                </>,
                <>
                  <b>Plataformas Integradas:</b> denominación conjunta de todas las plataformas de venta,
                  logística y cualquier otro servicio de terceros conectado a través de POWIP.
                </>,
                <>
                  <b>Merchant Data:</b> todos los datos, contenidos e información comercial del Merchant
                  gestionados a través de POWIP.
                </>,
                <>
                  <b>Customer Data:</b> datos de los compradores finales del Merchant procesados a través de la
                  plataforma.
                </>,
                <>
                  <b>Credenciales de API:</b> llaves, tokens OAuth y credenciales de autenticación para las APIs
                  de las Plataformas Integradas.
                </>,
                <>
                  <b>Incidente de Seguridad:</b> cualquier acceso, uso, divulgación o alteración no autorizada de
                  Merchant Data o Customer Data.
                </>,
                <>
                  <b>Plan de Suscripción:</b> el nivel de servicio contratado por el Merchant (Basic, Standard,
                  Full o Enterprise) con su capacidad y precio correspondiente.
                </>,
                <>
                  <b>Período de Facturación:</b> el ciclo de pago del Merchant: mensual (30 días) o anual (365
                  días) según el plan contratado.
                </>,
              ]}
            />
          </LegalSection>

          <LegalSection id="3" title="3. Objeto del Servicio">
            <p>
              POWIP ofrece al Merchant acceso a una plataforma ERP tecnológica disponible en www.powip.tech, que
              centraliza, sincroniza y gestiona pedidos, operaciones de venta, logística y crecimiento
              empresarial desde múltiples canales. Los servicios incluyen:
            </p>

            <LegalSection level={3} title="3.1 Gestión de Pedidos y Ventas">
              <LegalList
                items={[
                  'Recepción y centralización de pedidos de todos los Canales de Venta configurados por el Merchant.',
                  'Sincronización bidireccional de inventario, pedidos y datos entre los canales y la tienda central del Merchant.',
                  'Gestión unificada de catálogos de productos en todos los canales conectados.',
                  'Acceso a reportería, analítica y dashboards operativos del negocio del Merchant.',
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="3.2 Gestión Logística">
              <LegalList
                items={[
                  'Integración con Plataformas de Logística para cotización, generación y seguimiento de guías de envío.',
                  'Gestión de flujos de despacho, fulfillment y trazabilidad de pedidos en tiempo real.',
                  'Gestión de devoluciones y logística inversa.',
                  'Conexión con operadores 3PL, almacenes propios y proveedores de última milla.',
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="3.3 Herramientas de Crecimiento">
              <LegalList
                items={[
                  'Integraciones con plataformas de marketing, CRM, herramientas de automatización y otros servicios habilitados por POWIP.',
                  'Acceso a nuevos canales de venta, marketplaces y plataformas comerciales incorporadas progresivamente.',
                  'Módulos de gestión empresarial para finanzas, clientes, reportes avanzados y toma de decisiones.',
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="3.4 Usuarios">
              <p>
                Todos los planes de POWIP incluyen usuarios ilimitados. El Merchant puede crear, gestionar y
                eliminar los usuarios internos de su organización dentro de su cuenta en www.powip.tech sin costo
                adicional.
              </p>
              <p>
                El Merchant, como titular de la cuenta, es el único responsable de las acciones realizadas por
                todos sus usuarios dentro de la plataforma y deberá garantizar que cumplan los presentes
                Términos.
              </p>
            </LegalSection>
          </LegalSection>

          <LegalSection id="4" title="4. Condiciones de Uso">
            <LegalSection level={3} title="4.1 Usos Permitidos">
              <p>El Merchant está autorizado a usar la plataforma POWIP exclusivamente para:</p>
              <LegalList
                items={[
                  'La gestión centralizada de sus pedidos, canales de venta y operaciones logísticas.',
                  'La sincronización de su operación comercial con las Plataformas Integradas.',
                  'La administración de su inventario, despachos, devoluciones y datos de clientes en el marco de su actividad comercial habitual.',
                  'El crecimiento de su negocio mediante las herramientas y módulos habilitados por POWIP.',
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="4.2 Usos Prohibidos">
              <p>Queda expresamente prohibido al Merchant:</p>
              <LegalList
                items={[
                  'Usar la plataforma para actividades ilegales, fraudulentas o contrarias a las políticas de uso aceptable de las Plataformas Integradas.',
                  'Copiar, reproducir, realizar scraping o extracción masiva de datos de las APIs de las Plataformas Integradas o de POWIP.',
                  'Compartir, vender o transferir a terceros datos de Merchant Data o Customer Data obtenidos a través de POWIP.',
                  'Usar los datos gestionados por POWIP para entrenar, desarrollar o mejorar sistemas de inteligencia artificial o machine learning, sin autorización escrita previa de POWIP.',
                  'Compartir, ceder o revender las Credenciales de API o el acceso a la plataforma a terceros no autorizados.',
                  'Usar POWIP para fines distintos a la gestión legítima del negocio del Merchant.',
                ]}
              />
            </LegalSection>
          </LegalSection>

          <LegalSection id="5" title="5. Planes de Suscripción, Pagos y Política de No Reembolso">
            <LegalSection level={3} title="5.1 Planes Disponibles">
              <p>POWIP ofrece los siguientes planes de suscripción, cuyos precios vigentes se publican en www.powip.lat:</p>
              <LegalList
                items={[
                  <><b>BASIC:</b> hasta 999 pedidos por mes.</>,
                  <><b>STANDARD:</b> hasta 1,999 pedidos por mes.</>,
                  <><b>FULL:</b> de 2,000 a 6,000 pedidos por mes.</>,
                  <><b>ENTERPRISE:</b> más de 6,000 pedidos por mes y/o necesidades de desarrollo a medida. Precio a convenir con POWIP.</>,
                ]}
              />
              <p>Todos los planes incluyen usuarios ilimitados y acceso completo a las funcionalidades correspondientes al nivel contratado.</p>
            </LegalSection>

            <LegalSection level={3} title="5.2 Modalidades de Facturación">
              <LegalList
                items={[
                  <><b>Mensual:</b> pago adelantado por período de 30 días, renovable automáticamente.</>,
                  <><b>Anual:</b> pago único adelantado por 365 días con descuento especial. Vigente desde la fecha de activación.</>,
                ]}
              />
              <p>
                El servicio se activa únicamente tras la confirmación del pago. POWIP emitirá el comprobante de
                pago (boleta o factura electrónica) al correo registrado del Merchant.
              </p>
            </LegalSection>

            <LegalSection level={3} title="5.3 Cambio de Plan">
              <p>
                El Merchant puede solicitar un cambio de plan en cualquier momento comunicándose con POWIP a
                través de hola@powip.lat.
              </p>
              <LegalList
                items={[
                  <><b>Mejora de plan (upgrade):</b> aplica de inmediato o al inicio del siguiente período, según lo acordado. Si aplica en el período en curso, se cobrará la diferencia proporcional.</>,
                  <><b>Reducción de plan (downgrade):</b> aplica a partir del inicio del siguiente período de facturación. El período en curso se mantiene con el plan ya pagado.</>,
                  <><b>De anual a mensual:</b> aplica a partir de la renovación. No genera reembolso del diferencial ya pagado.</>,
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="5.4 Suspensión por Falta de Pago">
              <p>Si el pago de renovación no se procesa exitosamente, POWIP aplicará el siguiente procedimiento:</p>
              <LegalList
                items={[
                  <><b>Días 1–3 (período de gracia):</b> POWIP notificará al correo registrado del Merchant. El acceso a la plataforma se mantiene activo.</>,
                  <><b>Día 4 (suspensión temporal):</b> El acceso a la plataforma será suspendido. Los datos del Merchant se conservan íntegros.</>,
                  <><b>Día 30 (terminación):</b> Si el pago no se regulariza en 30 días desde la suspensión, el contrato se da por terminado y POWIP procederá a la eliminación de datos conforme a la Política de Privacidad.</>,
                ]}
              />
            </LegalSection>

            <LegalSection level={3} title="5.5 Política de No Reembolso">
              <LegalNote tone="warning">
                IMPORTANTE: Todos los pagos realizados a POWIP son finales y no están sujetos a reembolso ni
                devolución, bajo ningún concepto.
              </LegalNote>
              <p>El Merchant declara conocer y aceptar expresamente que:</p>
              <LegalList
                items={[
                  'Una vez realizado el pago y activado el servicio, POWIP no efectuará reembolsos parciales ni totales, incluyendo —de forma enunciativa y no limitativa— cambio de opinión, falta de uso, cierre del negocio o migración a otro proveedor.',
                  'Los pagos de planes anuales no son prorrateables ni reembolsables si el Merchant decide cancelar antes del vencimiento del período.',
                  'Los pagos de add-ons activados no son reembolsables, independientemente de su uso efectivo.',
                  'Esta política aplica también a pagos únicos de integraciones especiales.',
                ]}
              />
              <LegalNote>
                Si la plataforma presenta una interrupción no programada superior a 72 horas continuas por causas
                exclusivamente imputables a POWIP, el Merchant tendrá derecho a una extensión del servicio
                equivalente al tiempo de interrupción, como único remedio disponible.
              </LegalNote>
            </LegalSection>
          </LegalSection>

          <LegalSection id="6" title="6. Disponibilidad del Servicio">
            <LegalSection level={3} title="6.1 Compromiso de Disponibilidad">
              <p>
                POWIP se compromete a mantener la plataforma www.powip.tech disponible con un objetivo del 99%
                mensual, medido sobre el total de horas del mes, excluyendo ventanas de mantenimiento programado.
              </p>
            </LegalSection>
            <LegalSection level={3} title="6.2 Mantenimiento Programado">
              <p>
                POWIP podrá realizar mantenimientos programados con interrupciones temporales del servicio,
                notificando al Merchant con al menos 24 horas de anticipación por correo electrónico. Los
                mantenimientos se realizarán preferentemente entre las 23:00 y las 06:00 hrs (hora de Lima).
              </p>
            </LegalSection>
            <LegalSection level={3} title="6.3 Exclusiones">
              <p>La disponibilidad comprometida no aplica ante interrupciones causadas por:</p>
              <LegalList
                items={[
                  'Fuerza mayor o eventos fuera del control razonable de POWIP.',
                  'Fallas de proveedores de infraestructura de terceros (AWS, Google Cloud, u otros).',
                  'Cortes de internet o energía externos a la infraestructura de POWIP.',
                  'Interrupciones originadas por las propias Plataformas Integradas (APIs, cambios de política, etc.).',
                  'Acciones u omisiones del Merchant o sus usuarios.',
                ]}
              />
            </LegalSection>
          </LegalSection>

          <LegalSection id="7" title="7. Exoneración de Responsabilidad por Plataformas de Terceros">
            <p>
              POWIP actúa exclusivamente como integrador tecnológico neutral. En tal condición, POWIP no asume
              responsabilidad alguna respecto a:
            </p>
            <LegalList
              items={[
                'La información, datos, acuerdos comerciales, contratos o relaciones que el Merchant mantenga con otras plataformas, marketplaces, operadores logísticos o cualquier tercero con quien opere.',
                'Las políticas, términos de uso, comisiones, restricciones o cambios unilaterales que las Plataformas Integradas impongan al Merchant.',
                'Las interrupciones, cambios en la API, suspensiones de cuenta o cualquier decisión que tome una plataforma de terceros sobre la cuenta del Merchant.',
                'Las disputas, reclamaciones, penalidades o sanciones que se originen entre el Merchant y sus propios clientes, o entre el Merchant y cualquier Plataforma Integrada.',
                'La exactitud, veracidad o integridad de la información que el Merchant cargue o sincronice a través de las plataformas integradas.',
                'Los resultados comerciales, ventas, niveles de pedidos o el desempeño del negocio del Merchant en cualquier canal o plataforma.',
              ]}
            />
            <p>
              POWIP se limita a transmitir, sincronizar y centralizar la información entre los sistemas del
              Merchant y las Plataformas Integradas, conforme a las APIs y permisos otorgados por el propio
              Merchant. La responsabilidad por el contenido, veracidad y legalidad de dicha información recae
              íntegramente en el Merchant.
            </p>
            <LegalNote>
              El Merchant deberá resolver directamente con cada plataforma de terceros cualquier incidencia,
              bloqueo, suspensión o disputa relacionada con sus cuentas. POWIP podrá colaborar como facilitador
              técnico cuando sea razonablemente posible, pero no como parte ni representante del Merchant ante
              terceros.
            </LegalNote>
          </LegalSection>

          <LegalSection id="8" title="8. Seguridad y Protección de Datos">
            <LegalSection level={3} title="8.1 Arquitectura de Seguridad">
              <p>POWIP implementa estándares de seguridad de la industria en toda su infraestructura técnica, incluyendo:</p>
              <LegalList
                items={[
                  'Cifrado en tránsito (TLS 1.2 o superior) y en reposo para todos los datos gestionados.',
                  'Autenticación segura mediante OAuth 2.0 y mecanismos equivalentes para todas las integraciones.',
                  'Controles de acceso basados en roles, con principio de mínimo privilegio.',
                  'Monitoreo continuo de sistemas para detección de accesos no autorizados o anomalías.',
                  'Revisiones periódicas de seguridad y corrección de vulnerabilidades identificadas.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="8.2 Manejo de Incidentes de Seguridad">
              <p>Ante cualquier Incidente de Seguridad real o sospechado, POWIP se compromete a:</p>
              <LegalList
                items={[
                  'Notificar al Merchant afectado en un plazo máximo de 24 horas desde que tome conocimiento del incidente.',
                  'Iniciar de forma inmediata la investigación del incidente y las acciones de contención.',
                  'Remediar la causa del incidente para prevenir pérdida adicional de datos.',
                  'Implementar medidas correctivas para prevenir la recurrencia del incidente.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="8.3 Obligaciones de Seguridad del Merchant">
              <p>El Merchant es responsable de:</p>
              <LegalList
                items={[
                  'Mantener la seguridad y confidencialidad de sus credenciales de acceso a www.powip.tech y a las Plataformas Integradas.',
                  'Notificar a POWIP de forma inmediata ante cualquier uso no autorizado sospechado de sus credenciales.',
                  'Administrar los permisos y accesos de todos sus usuarios dentro de la plataforma.',
                  'Revocar el acceso de usuarios que dejen de pertenecer a su organización.',
                ]}
              />
            </LegalSection>
          </LegalSection>

          <LegalSection id="9" title="9. Privacidad y Protección de Datos Personales">
            <LegalSection level={3} title="9.1 Marco Legal Aplicable">
              <p>El tratamiento de datos personales por parte de POWIP se rige por:</p>
              <LegalList
                items={[
                  'Ley N.° 29733 — Ley de Protección de Datos Personales del Perú y su Reglamento (D.S. N.° 003-2013-JUS).',
                  'Reglamento General de Protección de Datos (RGPD) de la Unión Europea, cuando aplique.',
                  'Políticas de privacidad y protección de datos exigidas por cada Plataforma Integrada.',
                ]}
              />
              <p>
                Para el detalle completo del tratamiento de datos, consultar la{' '}
                <a href="/privacidad" className="text-[#4F3A96] font-semibold hover:underline">
                  Política de Privacidad
                </a>{' '}
                vigente en www.powip.lat.
              </p>
            </LegalSection>
            <LegalSection level={3} title="9.2 Principios de Tratamiento">
              <LegalList
                items={[
                  <><b>Finalidad:</b> los datos se recopilan y usan exclusivamente para proveer los servicios contratados.</>,
                  <><b>Minimización:</b> POWIP solo accede a los datos estrictamente necesarios para operar el servicio.</>,
                  <><b>Confidencialidad:</b> los datos no se comparten, venden ni divulgan a terceros no autorizados.</>,
                  <><b>Limitación temporal:</b> los datos se conservan únicamente durante el tiempo necesario para la prestación del servicio.</>,
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="9.3 Prohibición de Uso para Inteligencia Artificial">
              <p>POWIP se compromete expresamente a no usar el Merchant Data ni el Customer Data para:</p>
              <LegalList
                items={[
                  'Entrenar, ajustar o mejorar modelos de inteligencia artificial, machine learning o sistemas similares.',
                  'Desarrollar productos o servicios derivados basados en los datos del Merchant o sus clientes.',
                  'Realizar benchmarking o perfilado comercial no autorizado con fines ajenos al servicio contratado.',
                ]}
              />
              <p>Esta prohibición aplica tanto a POWIP directamente como a cualquier proveedor o subcontratista.</p>
            </LegalSection>
            <LegalSection level={3} title="9.4 Eliminación de Datos">
              <p>
                POWIP eliminará de forma segura todos los datos del Merchant dentro de los treinta (30) días
                calendarios siguientes a la terminación del servicio, desconexión de la plataforma o recepción de
                una solicitud válida de eliminación.
              </p>
            </LegalSection>
            <LegalSection level={3} title="9.5 Derechos del Merchant y sus Clientes">
              <p>
                El Merchant y sus clientes pueden solicitar en cualquier momento: acceso, rectificación,
                cancelación, oposición y portabilidad de sus datos. Solicitudes a: hola@powip.lat. POWIP
                responderá en el plazo legal (máximo 20 días hábiles).
              </p>
            </LegalSection>
          </LegalSection>

          <LegalSection id="10" title="10. Cumplimiento con los Términos de las Plataformas Integradas">
            <p>Al usar los servicios de POWIP, el Merchant reconoce y acepta que:</p>
            <LegalList
              items={[
                'Debe cumplir con los términos de servicio, políticas de uso aceptable y normativas propias de cada Plataforma Integrada activa en su cuenta POWIP.',
                'El incumplimiento de los términos de una Plataforma Integrada por parte del Merchant puede resultar en la suspensión del servicio específico de esa plataforma o de la cuenta POWIP completa.',
                'POWIP no asume responsabilidad por suspensiones o restricciones impuestas al Merchant por las Plataformas Integradas.',
              ]}
            />
            <p>
              POWIP notificará al Merchant con antelación razonable cuando una Plataforma Integrada actualice su
              API, políticas o términos de uso que afecten el funcionamiento de POWIP.
            </p>
          </LegalSection>

          <LegalSection id="11" title="11. Propiedad Intelectual">
            <p>
              Todos los derechos de propiedad intelectual sobre la plataforma POWIP, su código fuente,
              metodologías, interfaces, documentación técnica y desarrollos pertenecen exclusivamente a POWIP
              TECHNOLOGY SAC. El Merchant recibe únicamente una licencia de uso limitada, no exclusiva,
              intransferible y revocable durante la vigencia del contrato.
            </p>
            <p>
              Las marcas, logotipos, APIs y demás propiedad intelectual de las Plataformas Integradas pertenecen
              exclusivamente a sus respectivos titulares. POWIP no transfiere al Merchant ningún derecho sobre
              dicha propiedad intelectual.
            </p>
            <p>
              El Merchant no podrá copiar, reproducir, modificar, adaptar, sublicenciar ni realizar ingeniería
              inversa sobre la plataforma POWIP.
            </p>
          </LegalSection>

          <LegalSection id="12" title="12. Responsabilidades y Limitaciones">
            <LegalSection level={3} title="12.1 Responsabilidad de POWIP">
              <p>
                POWIP es el único responsable ante el Merchant por el funcionamiento, calidad y soporte de su
                plataforma. POWIP no garantiza resultados comerciales específicos. La plataforma es una
                herramienta de gestión operativa; el éxito del negocio del Merchant depende de factores externos
                fuera del control de POWIP.
              </p>
            </LegalSection>
            <LegalSection level={3} title="12.2 Limitación de Responsabilidad">
              <p>
                En la máxima medida permitida por la ley peruana aplicable, POWIP no será responsable por daños
                indirectos, incidentales, consecuentes, punitivos, pérdida de ganancias ni pérdida de datos. La
                responsabilidad total de POWIP frente al Merchant estará limitada a los montos efectivamente
                pagados por el Merchant durante los seis (6) meses anteriores al evento que originó el reclamo.
              </p>
              <p>
                POWIP no será responsable por interrupciones, cambios o discontinuación de las APIs de las
                Plataformas Integradas, ni por eventos de fuerza mayor fuera de su control razonable.
              </p>
            </LegalSection>
            <LegalSection level={3} title="12.3 Indemnización por el Merchant">
              <p>
                El Merchant indemnizará y mantendrá indemne a POWIP ante cualquier reclamación derivada del
                incumplimiento de estos Términos, del uso indebido del servicio, de la violación de derechos de
                terceros o de actividades ilegales o fraudulentas realizadas a través de la plataforma.
              </p>
            </LegalSection>
          </LegalSection>

          <LegalSection id="13" title="13. Comunicaciones Oficiales">
            <p>
              El correo electrónico registrado por el Merchant al momento de la contratación es el canal oficial
              de comunicación para todos los efectos legales y contractuales derivados de estos Términos.
            </p>
            <p>
              Cualquier notificación, aviso o comunicación enviada por POWIP al correo registrado del Merchant se
              tendrá por recibida y válida desde el momento del envío.
            </p>
            <p>
              Es responsabilidad del Merchant mantener actualizado su correo de contacto. El Merchant puede
              actualizarlo desde www.powip.tech o escribiendo a hola@powip.lat.
            </p>
          </LegalSection>

          <LegalSection id="14" title="14. Terminación">
            <LegalSection level={3} title="14.1 Por el Merchant">
              <p>
                El Merchant puede terminar el servicio en cualquier momento solicitándolo a hola@powip.lat. La
                cancelación aplica a partir del siguiente período de facturación. Dado que los pagos no son
                reembolsables (Sección 5.5), el acceso a la plataforma se mantendrá activo hasta el vencimiento
                del período pagado.
              </p>
            </LegalSection>
            <LegalSection level={3} title="14.2 Por POWIP">
              <p>POWIP puede suspender o terminar el servicio de forma inmediata, sin derecho a reembolso, si el Merchant:</p>
              <LegalList
                items={[
                  'Incumple estos Términos o los de alguna Plataforma Integrada.',
                  'Realiza actividades ilegales, fraudulentas o contrarias a las políticas de uso aceptable.',
                  'Comparte o revende el acceso a la plataforma a terceros no autorizados.',
                  'No regulariza el pago dentro del período de gracia establecido en la Sección 5.4.',
                ]}
              />
            </LegalSection>
            <LegalSection level={3} title="14.3 Efectos de la Terminación">
              <p>
                Tras la terminación: POWIP eliminará los datos del Merchant conforme a la Sección 9.4; las
                obligaciones de confidencialidad, no reembolso e indemnización permanecerán vigentes; POWIP
                cooperará razonablemente para facilitar la transición del Merchant.
              </p>
            </LegalSection>
          </LegalSection>

          <LegalSection id="15" title="15. Disposiciones Generales">
            <LegalSection level={3} title="15.1 Legislación Aplicable y Jurisdicción">
              <p>
                Estos Términos se rigen por las leyes de la República del Perú. Para cualquier controversia, las
                partes se someten a la jurisdicción de los juzgados y tribunales de Lima, Perú. Antes de
                cualquier acción judicial, las partes intentarán resolver la controversia de forma amistosa
                dentro de quince (15) días hábiles.
              </p>
            </LegalSection>
            <LegalSection level={3} title="15.2 Modificaciones">
              <p>
                POWIP podrá modificar estos Términos con notificación previa razonable al Merchant por correo
                electrónico y/o mediante aviso en www.powip.tech. El uso continuado del servicio tras la
                publicación de los cambios constituirá aceptación de los nuevos Términos. La versión vigente
                estará siempre disponible en www.powip.lat.
              </p>
            </LegalSection>
            <LegalSection level={3} title="15.3 Independencia de Cláusulas">
              <p>Si alguna disposición fuera declarada inválida o inaplicable, el resto de los Términos permanecerá en plena vigencia.</p>
            </LegalSection>
            <LegalSection level={3} title="15.4 Acuerdo Completo">
              <p>
                Estos Términos, junto con el Contrato de Servicio y la Política de Privacidad de POWIP,
                constituyen el acuerdo completo entre las partes y reemplazan cualquier acuerdo previo sobre el
                mismo objeto.
              </p>
            </LegalSection>
            <LegalSection level={3} title="15.5 Uso de Marca">
              <p>
                POWIP podrá mencionar el nombre comercial o marca del Merchant como cliente de la plataforma en
                sus materiales de marketing y comunicaciones, salvo que el Merchant comunique expresamente su
                oposición por escrito a hola@powip.lat.
              </p>
            </LegalSection>
          </LegalSection>

          <LegalSection id="16" title="16. Contacto">
            <p>
              Para consultas sobre estos Términos, reportes de incidentes o ejercicio de derechos sobre datos
              personales:
            </p>
            <LegalList
              items={[
                <><b>POWIP TECHNOLOGY SAC</b></>,
                <>RUC: 20616141971</>,
                <>Dirección: Calle Portugal 129, Breña, Lima, Perú</>,
                <>Email: <a href="mailto:hola@powip.lat" className="text-[#4F3A96] font-semibold hover:underline">hola@powip.lat</a></>,
                <>Teléfono / WhatsApp: 923 101 193</>,
                <>Sitio web: www.powip.lat</>,
                <>Plataforma: www.powip.tech</>,
              ]}
            />
          </LegalSection>

          <p className="pt-10 text-[12.5px] text-[#9895ad] border-t border-gray-100 mt-4">
            Corporación Aranni S.A.C. · Todos los derechos reservados · 24 de mayo de 2026
          </p>
        </article>
      </div>

      <Footer />
    </main>
  );
}
