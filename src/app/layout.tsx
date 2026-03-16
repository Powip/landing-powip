import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title:
    "POWIP - ERP para negocios que venden por WhatsApp, Instagram, TikTok y Web",

  description:
    "Centraliza tus pedidos en un solo lugar reduciendo operaciones manuales al gestionar tus entregas a tu cliente final.",
  keywords: [
    "ERP",
    "WhatsApp",
    "Instagram",
    "TikTok",
    "ventas",
    "pedidos",
    "inventario",
    "cobranzas",
  ],
  openGraph: {
    title: "POWIP - ERP para negocios digitales",
    description:
      "Centraliza tus pedidos, gestiona tu inventario y haz seguimiento a tus cobranzas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
