export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "María Delgado",
            location: "Lima",
            rating: 5,
            text: "POWIP transformó mi negocio. Lo manejo al hombro en la gestión de pedidos y no estreso, han crecido bastante!",
            avatar: "👩‍💼",
        },
        {
            name: "Alejandra Rosas",
            location: "Trujillo",
            rating: 5,
            text: "Con POWIP automaticé rutas, plasmas, envíos y mis ventas, ya es básico recomendarlo al 100%!",
            avatar: "👩‍🦰",
        },
        {
            name: "Sandra Rodriguez",
            location: "Quito",
            rating: 5,
            text: "Esta plataforma ha simplificado el negocio. Procesos muy prácticos, recomiendo, siempre puntual.",
            avatar: "👩‍💻",
        },
        {
            name: "Mónica Puentes",
            location: "Arequipa",
            rating: 5,
            text: "Ahora puedo atender más clientes y mis finanzas POWIP es, son lo mejor y muy potente!",
            avatar: "👩‍🔧",
        },
    ];

    return (
        <section id="casos-exito" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--powip-gray-dark)]">
                        La solución <span className="text-[var(--powip-teal)]">sencilla</span> y{" "}
                        <span className="text-[var(--powip-purple)]">potente</span>
                    </h2>
                    {/* Decorative line */}
                    <div className="mt-4 flex justify-center">
                        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" className="text-[var(--powip-purple)]">
                            <path d="M0 10 Q30 0, 60 10 T120 10" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </div>

                {/* Testimonials grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-[var(--powip-gray-light)] rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            {/* Header - Avatar and info */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--powip-teal-light)] flex items-center justify-center text-2xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[var(--powip-gray-dark)]">{testimonial.name}</h4>
                                    <p className="text-sm text-[var(--powip-gray)]">{testimonial.location}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-[var(--powip-gray)] text-sm leading-relaxed">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
