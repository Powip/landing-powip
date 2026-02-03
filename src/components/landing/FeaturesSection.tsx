import Image from "next/image";

export default function FeaturesSection() {
    const features = [
        {
            icon: "📊",
            title: "Dashboard Administrativo",
            description: "Panel centralizado para monitorear métricas clave, KPIs y estado general del negocio en tiempo real. Visualiza tus ventas, pedidos y rendimiento desde un solo lugar.",
            gradient: "from-[var(--powip-purple)]/10 to-[var(--powip-purple)]/5",
            iconBg: "bg-[var(--powip-purple)]",
            borderColor: "border-[var(--powip-purple)]/20",
            image: "/landing/features/dashboard.jpg",
        },
        {
            icon: "💰",
            title: "Contabilidad",
            description: "Gestión completa de gastos, ingresos, reportes financieros y control de flujo de caja. Mantén tus finanzas organizadas y toma decisiones informadas.",
            gradient: "from-[var(--powip-teal)]/10 to-[var(--powip-teal)]/5",
            iconBg: "bg-[var(--powip-teal)]",
            borderColor: "border-[var(--powip-teal)]/20",
            image: "/landing/features/contabilidad.png",
        },
        {
            icon: "🛒",
            title: "Gestión de Ventas",
            description: "Registro y seguimiento de ventas, cotizaciones y cierre de negocios desde WhatsApp, Instagram, TikTok y tu web. Centraliza todos tus canales de venta.",
            gradient: "from-[var(--powip-purple)]/10 to-[var(--powip-teal)]/5",
            iconBg: "bg-[var(--powip-purple)]",
            borderColor: "border-[var(--powip-purple)]/20",
            image: "/landing/features/ventas.jpg",
        },
        {
            icon: "📦",
            title: "Gestión de Pedidos",
            description: "Control total del ciclo de pedidos: desde la creación hasta la entrega al cliente final. Organiza rutas, trackea envíos y gestiona cobranzas contraentrega.",
            gradient: "from-[var(--powip-teal)]/10 to-[var(--powip-purple)]/5",
            iconBg: "bg-[var(--powip-teal)]",
            borderColor: "border-[var(--powip-teal)]/20",
            image: "/landing/features/pedidos.png",
        },
    ];

    return (
        <section id="funcionalidades" className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--powip-teal-light)]/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--powip-purple)]/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[var(--powip-teal-light)]/20 to-[var(--powip-purple)]/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--powip-teal-light)]/50 text-[var(--powip-teal-dark)] text-sm font-medium mb-4">
                        ✨ Todo lo que necesitas
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--powip-gray-dark)] mb-4">
                        Funcionalidades que <span className="text-[var(--powip-teal)]">impulsan</span> tu negocio
                    </h2>
                    <p className="text-lg text-[var(--powip-gray)] max-w-2xl mx-auto">
                        Herramientas diseñadas para automatizar tu operación y hacerte la vida más fácil
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 border ${feature.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                        >
                            {/* Card Content */}
                            <div className="flex flex-col h-full">
                                {/* Header with icon and title */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`${feature.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-2xl">{feature.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-[var(--powip-gray-dark)] group-hover:text-[var(--powip-purple)] transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-[var(--powip-gray)] leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                {/* Image area */}
                                <div className="relative mt-auto rounded-2xl overflow-hidden border border-gray-100 group-hover:border-[var(--powip-teal-light)] transition-colors duration-300 shadow-lg">
                                    <div className="aspect-video relative">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Feature badge */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-[var(--powip-teal)] text-xs font-semibold shadow-sm">
                                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Incluido
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-[var(--powip-gray)]">¿Quieres ver más?</span>
                        <a
                            href="#contacto"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--powip-purple)] text-white font-semibold rounded-xl hover:bg-[var(--powip-purple-dark)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Solicita una demo
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
