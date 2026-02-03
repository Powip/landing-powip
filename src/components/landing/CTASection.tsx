import Link from "next/link";

export default function CTASection() {
    return (
        <section id="contacto" className="py-16 md:py-20 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--powip-purple)] via-[var(--powip-purple)] to-[var(--powip-teal-dark)]" />

            {/* Decorative waves at top */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full h-16 -mt-1">
                    <path
                        d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 36.7 768 43.3 864 45C960 46.7 1056 43.3 1152 38.3C1248 33.3 1344 26.7 1392 23.3L1440 20V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    Deja que POWIP trabaje por ti:
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                    optimiza tu negocio y <span className="font-bold">aumenten tus ventas</span>
                </p>

                {/* CTA Button */}
                <Link
                    href="https://wa.me/51947424006?text=Hola,%20quiero%20una%20demo%20de%20POWIP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--powip-teal)] text-white font-bold text-lg rounded-xl hover:bg-[var(--powip-teal-dark)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    Reserva una demo gratuita
                </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full h-12">
                    <path
                        d="M0 0L48 5C96 10 192 20 288 25C384 30 480 30 576 26.7C672 23.3 768 16.7 864 15C960 13.3 1056 16.7 1152 21.7C1248 26.7 1344 33.3 1392 36.7L1440 40V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V0Z"
                        fill="white"
                        fillOpacity="0.1"
                    />
                </svg>
            </div>
        </section>
    );
}
