import type { NextConfig } from "next";
import { ONBOARDING_URL } from "./src/lib/constants";

const nextConfig: NextConfig = {
  // El alta manual por WhatsApp (/crear-cuenta) se reemplazó por el onboarding de la app.
  async redirects() {
    return [{ source: "/crear-cuenta", destination: ONBOARDING_URL, permanent: true }];
  },
};

export default nextConfig;
