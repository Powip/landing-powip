import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    const benefits = [
        "Arma tu ruta de tus pedidos",
        "Gestiona tu inventario",
        "Seguimiento a tus cobranzas de pedidos contraentrega",
    ];

    return (
        <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/landing/hero-bg.png"
                    alt="POWIP Dashboard"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 -z-10" />

            {/* Decorative elements */}
            <div className="absolute top-32 right-10 w-4 h-4 text-[var(--powip-purple)] animate-pulse">✦</div>
            <div className="absolute top-48 right-32 w-3 h-3 text-[var(--powip-teal)] animate-pulse delay-100">✦</div>
            <div className="absolute bottom-32 left-20 w-6 h-6 rounded-full bg-[var(--powip-teal-light)]/50" />
            <div className="absolute top-40 left-10 w-4 h-4 rounded-full bg-[var(--powip-purple)]/20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-24 w-full">
                <div className="max-w-2xl">
                    {/* Left content */}
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            <span className="text-[var(--powip-gray-dark)]">ERP para negocios que venden por </span>
                            <span className="text-[var(--powip-teal)]">Whatsapp, instagram, tiktok y web</span>
                            <span className="text-[var(--powip-gray-dark)]">.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--powip-gray)] leading-relaxed">
                            Centraliza <span className="font-semibold text-[var(--powip-gray-dark)]">tus pedidos en un solo lugar</span>{" "}
                            reduciendo operaciones manuales al gestionar tus{" "}
                            <span className="font-semibold text-[var(--powip-gray-dark)]">entregas a tu cliente final</span>.
                        </p>

                        {/* Benefits list */}
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--powip-teal)] flex items-center justify-center mt-0.5 shadow-md">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-[var(--powip-gray-dark)]">
                                        {benefit.split(" ").map((word, i) => {
                                            const boldWords = ["ruta", "pedidos", "inventario", "cobranzas", "contraentrega"];
                                            const isBold = boldWords.some((b) => word.toLowerCase().includes(b));
                                            return isBold ? (
                                                <span key={i} className="font-bold">{word} </span>
                                            ) : (
                                                <span key={i}>{word} </span>
                                            );
                                        })}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link
                                href="#funcionalidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--powip-teal)] text-white font-bold text-lg rounded-xl hover:bg-[var(--powip-teal-dark)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Descubre cómo funciona
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
