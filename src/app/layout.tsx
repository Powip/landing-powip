import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.powip.lat";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "POWIP",
  url: siteUrl,
  logo: `${siteUrl}/logo-powip.svg`,
  description:
    "Plataforma que centraliza canales de venta y couriers para ecommerce contraentrega en Perú.",
  sameAs: [
    "https://www.facebook.com/POwip.pe",
    "https://www.instagram.com/powip.pe",
    "https://www.linkedin.com/company/powip/",
    "https://www.tiktok.com/@powip.lat",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51-923-101-193",
    contactType: "customer service",
    email: "hola@powip.lat",
    areaServed: "PE",
    availableLanguage: "Spanish",
  },
};

const HOME_TITLE = "POWIP - Centraliza tus canales de venta y tus couriers";
const HOME_DESCRIPTION =
  "POWIP es la plataforma que centraliza tus pedidos de WhatsApp, Instagram, TikTok y marketplaces, y los conecta con tus couriers para despachar en 1 clic. Cobranza contraentrega, facturación SUNAT y tu rentabilidad real, todo en un solo lugar.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: HOME_TITLE,
    template: "%s | POWIP",
  },
  description: HOME_DESCRIPTION,
  keywords: [
    "ERP ecommerce",
    "WhatsApp",
    "Instagram",
    "TikTok",
    "ventas",
    "pedidos",
    "inventario",
    "cobranzas",
    "ecommerce Peru",
    "courier",
    "Shalom",
    "contraentrega",
    "COD",
    "facturación electrónica SUNAT",
  ],
  authors: [{ name: "POWIP" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "POWIP",
    locale: "es_PE",
    images: [
      {
        url: "/hero-image.jpeg",
        width: 1250,
        height: 770,
        alt: "Panel de operaciones de POWIP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/hero-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XRJ1Q6BCLP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XRJ1Q6BCLP');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M83R94SC');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} ${poppins.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M83R94SC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
