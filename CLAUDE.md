# landing-powip — Contexto Local

## Stack
- Lenguaje: TypeScript 5
- Framework: Next.js 16.1.6 (App Router) + React 19.2.3
- Estilos: Tailwind CSS 4
- Backend: Supabase JS SDK (leads/contactos)
- Agentes: nextjs-logic-writer, nextjs-test-writer

## Responsabilidad
Landing page de marketing de Powip. Presenta características del producto, planes de suscripción y captura leads. Sitio estático con contenido dinámico mínimo (Supabase).

## Estructura de directorios
```
src/
├── app/        ← Página principal y rutas de la landing
└── components/ ← Componentes de marketing (Hero, Features, Pricing, CTA)
```

## Contratos con otros servicios
Llama via HTTP:
- Supabase — almacenamiento de leads/contactos del formulario
Independiente del resto de microservicios.

## Puertos expuestos
- HTTP: desarrollo local
- Producción: Vercel (dominio propio)

## Variables de entorno requeridas
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_VENTAS
NEXT_PUBLIC_FRONTEND_URL
```

## Normas aplicables
`docs/normas/nextjs-normas.md`
