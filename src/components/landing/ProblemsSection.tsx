export default function ProblemsSection() {
    const problems = [
        {
            icon: "💬",
            title: "Perderte entre 100+ chats etiquetados",
            description: "Perderse entre conversaciones y olvidar pedidos importantes",
            color: "bg-red-50",
            iconBg: "bg-red-100",
        },
        {
            icon: "📋",
            title: "Copiar pedidos 1x1 a Excel",
            description: "(2 horas/día perdidas)",
            color: "bg-orange-50",
            iconBg: "bg-orange-100",
        },
        {
            icon: "📦",
            title: "No saber qué enviaste y qué no",
            description: "Confusión en el estado de los envíos y entregas",
            color: "bg-yellow-50",
            iconBg: "bg-yellow-100",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--powip-teal-light)]/30 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--powip-gray-dark)]">
                        ¿Solías <span className="text-[var(--powip-teal)]">perder dinero</span> por estos problemas?
                    </h2>
                </div>

                {/* Problems grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className={`${problem.color} rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                        >
                            {/* Icon */}
                            <div className={`${problem.iconBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                                <span className="text-4xl">{problem.icon}</span>
                            </div>

                            {/* X mark */}
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                <span className="font-bold text-[var(--powip-gray-dark)]">{problem.title}</span>
                            </div>

                            {/* Description */}
                            <p className="text-[var(--powip-gray)] text-sm">{problem.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
