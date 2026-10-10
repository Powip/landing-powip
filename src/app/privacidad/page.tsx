import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalHeader from '@/components/legal/LegalHeader';
import LegalToc from '@/components/legal/LegalToc';
import LegalSection from '@/components/legal/LegalSection';
import LegalTable from '@/components/legal/LegalTable';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de Privacidad y Protección de Datos Personales de POWIP. Versión 2.2, vigente desde el 9 de octubre de 2026: qué datos tratamos, para qué los usamos, con quién los compartimos y cómo ejercer tus derechos conforme a la Ley N.° 29733.',
  alternates: { canonical: '/privacidad' },
};

const TOC = [
  { id: '1', label: '1. Quién es responsable de los datos' },
  { id: '2', label: '2. Qué datos tratamos' },
  { id: '3', label: '3. Para qué los usamos' },
  { id: '4', label: '4. Base legal' },
  { id: '5', label: '5. Con quién compartimos datos' },
  { id: '6', label: '6. Seguridad' },
  { id: '7', label: '7. Cuánto tiempo conservamos los datos' },
  { id: '8', label: '8. Tus derechos' },
  { id: '9', label: '9. Cookies' },
  { id: '10', label: '10. Cambios a esta política' },
  { id: '11', label: '11. Contacto' },
];

const PROVIDERS = [
  ['Supabase (sobre Amazon Web Services)', 'Base de datos y copias de seguridad', 'Estados Unidos'],
  ['Vercel', 'Alojamiento de la aplicación web', 'Estados Unidos'],
  ['Railway', 'Alojamiento de los servicios de la plataforma', 'Estados Unidos'],
  ['Shalom, Olva Courier, DHL y otros operadores elegidos por el Merchant', 'Despacho y entrega', 'Perú'],
  [
    'Meta Platforms (WhatsApp Business), si el Merchant activa notificaciones',
    'Avisos de estado del pedido',
    'Estados Unidos',
  ],
  ['Flow', 'Cobro de la suscripción al Merchant', 'Chile'],
  ['Personal técnico de POWIP', 'Soporte y mantenimiento con acceso remoto', 'Argentina'],
];

const EMAIL_LINK = (
  <a href="mailto:hola@powip.lat" className="text-[#4F3A96] font-semibold hover:underline">
    hola@powip.lat
  </a>
);

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full">
      <Navbar />

      <LegalHeader
        eyebrow="Marco legal"
        title="POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES"
        version="2.2"
        date="Vigente desde el 9 de octubre de 2026"
        intro={
          <>
            POWIP TECHNOLOGY SAC, con RUC 20616141971 y domicilio en Av. Venezuela 625, Oficina 918, Breña, Lima,
            Perú (en adelante, &quot;POWIP&quot;), describe en esta política cómo trata los datos personales en
            powip.lat y en la plataforma powip.tech, conforme a la Ley N.° 29733, Ley de Protección de Datos
            Personales, y su Reglamento aprobado por Decreto Supremo N.° 016-2024-JUS.
          </>
        }
      />

      <div className="px-6 md:px-20 pb-20">
        <LegalToc items={TOC} />

        <article className="max-w-3xl mx-auto flex flex-col gap-2 mt-8">
          <LegalSection id="1" title="1. Quién es responsable de los datos">
            <p>
              <b>1.1</b> POWIP es responsable del tratamiento de los datos de los Merchants (negocios que contratan
              POWIP), de sus usuarios internos y de los visitantes de powip.lat.
            </p>
            <p>
              <b>1.2</b> Para los datos de los clientes finales (compradores) de cada Merchant, el Merchant es el
              titular del banco de datos y responsable del tratamiento. POWIP actúa como encargado del tratamiento:
              trata esos datos solo por cuenta del Merchant, según sus instrucciones y únicamente para prestar el
              servicio contratado. El Merchant es responsable de informar a sus compradores y de contar con una base
              legal para el tratamiento.
            </p>
          </LegalSection>

          <LegalSection id="2" title="2. Qué datos tratamos">
            <p>
              <b>2.1</b> Del Merchant y sus usuarios: nombre, razón social, RUC, correo, teléfono, dirección
              comercial, usuarios internos y sus roles.
            </p>
            <p>
              <b>2.2</b> De los canales y la logística: nombre y configuración de las tiendas conectadas (Shopify,
              WooCommerce, TikTok Shop, Mercado Libre y otras) y de los couriers.
            </p>
            <p>
              <b>2.3</b> De los compradores del Merchant: datos del pedido, nombre, teléfono, correo, dirección de
              envío y facturación, y estado de entrega.
            </p>
            <p>
              <b>2.4</b> Datos técnicos y de facturación: registros de uso de la plataforma y datos de cobro de la
              suscripción.
            </p>
            <p>
              <b>2.5</b> No tratamos: números completos de tarjeta, contraseñas de las plataformas conectadas (solo
              guardamos tokens revocables), datos sensibles ni datos de menores de edad a sabiendas.
            </p>
          </LegalSection>

          <LegalSection id="3" title="3. Para qué los usamos">
            <p>
              Centralizar y gestionar pedidos; sincronizar inventario y catálogo; generar guías y coordinar el
              despacho con couriers; enviar avisos de estado del pedido cuando el Merchant los activa; emitir
              comprobantes electrónicos ante SUNAT por cuenta del Merchant; elaborar reportes para el Merchant; dar
              soporte; prevenir fraude y proteger la seguridad; y cumplir obligaciones legales. No usamos los datos
              de los compradores para fines propios, publicidad ni para entrenar modelos de inteligencia artificial,
              y no los vendemos.
            </p>
          </LegalSection>

          <LegalSection id="4" title="4. Base legal">
            <p>
              Ejecución del contrato con el Merchant; consentimiento, cuando corresponde; cumplimiento de
              obligaciones legales; e interés legítimo en la seguridad y prevención del fraude.
            </p>
          </LegalSection>

          <LegalSection id="5" title="5. Con quién compartimos datos">
            <p>
              <b>5.1</b> Con las plataformas de venta que el Merchant conecta, para sincronizar pedidos y estados.
            </p>
            <p>
              <b>5.2</b> Con los couriers que el Merchant elige, solo los datos necesarios para entregar el pedido.
            </p>
            <p>
              <b>5.3</b> Con autoridades, solo cuando la ley o una orden judicial lo exige.
            </p>
            <p>
              <b>5.4</b> Con estos proveedores (subencargados), que tratan los datos solo para la finalidad indicada
              y bajo obligaciones de confidencialidad y seguridad:
            </p>
            <LegalTable
              caption="Proveedores (subencargados) de POWIP"
              columns={['Proveedor', 'Finalidad', 'País']}
              rows={PROVIDERS}
            />
            <p>
              POWIP avisará a los Merchants con al menos 15 días de anticipación antes de incorporar un nuevo
              subencargado.
            </p>
            <p>
              <b>5.5</b> Transferencias internacionales: algunos proveedores están fuera del Perú. POWIP solo
              transfiere datos a países con un nivel adecuado de protección o con garantías contractuales
              equivalentes a las de la Ley N.° 29733, y limita los datos a lo necesario para prestar el servicio.
            </p>
          </LegalSection>

          <LegalSection id="6" title="6. Seguridad">
            <p>
              <b>6.1</b> Toda la comunicación con la plataforma viaja cifrada por HTTPS. Las bases de datos y sus
              copias de seguridad están cifradas en reposo con AES-256.
            </p>
            <p>
              <b>6.2</b> El acceso a la plataforma se controla por roles definidos por el Merchant. El acceso de
              nuestro equipo a los datos de producción está restringido al personal técnico autorizado.
            </p>
            <p>
              <b>6.3</b> Ante un incidente de seguridad, POWIP notificará al Merchant afectado en un máximo de 24
              horas desde que tome conocimiento. Cuando POWIP sea responsable de los datos afectados, notificará a la
              Autoridad Nacional de Protección de Datos Personales y a los titulares en un máximo de 48 horas,
              conforme al Reglamento.
            </p>
          </LegalSection>

          <LegalSection id="7" title="7. Cuánto tiempo conservamos los datos">
            <p>
              <b>7.1</b> Solo el tiempo necesario para prestar el servicio y cumplir obligaciones legales.
            </p>
            <p>
              <b>7.2</b> POWIP elimina de forma segura los datos del Merchant y de sus compradores dentro de los 30
              días calendario siguientes a la cancelación de la cuenta, la desconexión de la plataforma o una
              solicitud válida de eliminación, salvo que la ley exija conservarlos. A pedido, entregamos
              confirmación escrita del borrado.
            </p>
            <p>
              <b>7.3</b> Tiendas Shopify: al desinstalar la app POWIP, dejamos de sincronizar datos de inmediato y
              eliminamos los datos de la tienda al recibir la solicitud de eliminación de Shopify. Las solicitudes
              de acceso o eliminación de datos de un comprador que Shopify nos envía se atienden en un máximo de 30
              días calendario.
            </p>
          </LegalSection>

          <LegalSection id="8" title="8. Tus derechos">
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, cancelación, oposición, portabilidad y
              revocación del consentimiento escribiendo a {EMAIL_LINK}. Responderemos dentro de los plazos
              establecidos por la Ley N.° 29733 y su Reglamento. Si eres comprador de un Merchant, también puedes
              dirigirte directamente al Merchant; POWIP lo ayudará a responder. Si no estás conforme con la
              respuesta, puedes acudir a la Autoridad Nacional de Protección de Datos Personales.
            </p>
          </LegalSection>

          <LegalSection id="9" title="9. Cookies">
            <p>
              En powip.lat usamos cookies de sesión y de analítica (Google Analytics) para entender el uso del
              sitio. En el panel powip.tech solo usamos cookies esenciales de sesión y preferencias. No usamos
              cookies de publicidad sin tu consentimiento.
            </p>
          </LegalSection>

          <LegalSection id="10" title="10. Cambios a esta política">
            <p>
              Podemos actualizar esta política. Avisaremos a los Merchants por correo o con un aviso en la
              plataforma antes de que los cambios entren en vigor.
            </p>
          </LegalSection>

          <LegalSection id="11" title="11. Contacto">
            <p>
              POWIP TECHNOLOGY SAC · RUC 20616141971 · Av. Venezuela 625, Oficina 918, Breña, Lima, Perú ·{' '}
              {EMAIL_LINK}
            </p>
          </LegalSection>

          <p className="pt-10 text-[12.5px] text-[#9895ad] border-t border-gray-100 mt-4">
            POWIP TECHNOLOGY SAC · Política de Privacidad · 9 de octubre de 2026
          </p>
        </article>
      </div>

      <Footer />
    </main>
  );
}
