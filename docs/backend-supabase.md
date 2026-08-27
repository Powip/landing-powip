# Backend (Supabase) — esquema requerido

Este documento describe las tablas que el frontend de `landing-powip` necesita en Supabase
para que los formularios de la landing funcionen. El cliente se inicializa en
[`src/lib/supabase.ts`](../src/lib/supabase.ts) usando las variables de entorno
`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ver `CLAUDE.md`).

El cliente usado en el navegador es el **anon key**, así que cada tabla necesita
Row Level Security (RLS) habilitado con una política que permita `INSERT` público
pero **no** `SELECT`/`UPDATE`/`DELETE` — así cualquier visitante puede enviar un
formulario, pero nadie puede leer o alterar los datos de otros desde el navegador.

---

## 1. Tabla `landing_leads` — ya en uso

Recibe los leads de "Agenda una demo". Se usa en dos lugares del código con el
mismo shape:

- [`src/app/demo/page.tsx`](../src/app/demo/page.tsx) — página `/demo`.
- [`src/components/landing/LandingDemoTeaser.tsx`](../src/components/landing/LandingDemoTeaser.tsx) — formulario embebido en la sección `#demo` del home.

Ambos hacen:

```ts
supabase.from('landing_leads').insert([{
  full_name: string,   // `${firstName} ${lastName}`.trim()
  email: string,
  phone: string,       // puede venir vacío, no es required en el form
  company: string,     // puede venir vacío
  message: string,     // puede venir vacío
}]);
```

Esta tabla ya existía antes de estos cambios — se documenta aquí solo como
referencia del shape exacto que el código espera. Si en algún momento se
renombra una columna en Supabase, hay que actualizar ambos call sites.

Si necesitas recrearla desde cero:

```sql
create table if not exists public.landing_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  message text
);

alter table public.landing_leads enable row level security;

create policy "landing_leads: anon puede insertar"
  on public.landing_leads
  for insert
  to anon
  with check (true);
```

---

## 2. Tabla `reclamos` — nueva, necesaria para `/reclamaciones`

El Libro de Reclamaciones (`src/components/legal/ReclamacionesForm.tsx`) inserta
en una tabla `reclamos` que **hoy no existe** — sin ella, el formulario muestra
el mensaje de error "Hubo un error al enviar tu reclamo" a cualquiera que lo
use.

### SQL para crearla

```sql
create table if not exists public.reclamos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  numero_reclamo text not null unique,       -- generado en el cliente: RC-AAAAMMDD-####
  tipo text not null check (tipo in ('reclamo', 'queja')),

  -- 1. Identificación del consumidor reclamante
  nombre_completo text not null,
  tipo_documento text not null check (tipo_documento in ('DNI', 'Carné de Extranjería', 'Pasaporte')),
  numero_documento text not null,
  domicilio text not null,
  telefono text,
  email text not null,
  es_menor_edad boolean not null default false,
  apoderado_nombre text,
  apoderado_documento text,

  -- 2. Identificación del bien contratado
  fecha_consumo date,
  descripcion_bien text not null,
  monto_reclamado numeric(10, 2),

  -- 3. Detalle de la reclamación
  detalle text not null,
  pedido text not null,

  -- Para uso interno del equipo (no lo llena el consumidor)
  observaciones text,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'en_proceso', 'resuelto'))
);

alter table public.reclamos enable row level security;

-- El formulario público solo necesita poder insertar, nunca leer.
create policy "reclamos: anon puede insertar"
  on public.reclamos
  for insert
  to anon
  with check (true);
```

`observaciones` y `estado` no los usa el frontend todavía — quedan ahí para que
el equipo los complete manualmente desde el panel de Supabase (o desde un panel
interno futuro) al atender cada caso, tal como exige el formato oficial del
Libro de Reclamaciones ("Observaciones y acciones adoptadas por el proveedor").

### Cómo ver y responder los reclamos

Como la política de RLS solo permite `insert` para `anon`, el equipo debe
revisar los reclamos entrando a Supabase con el **service role key** (Table
Editor del dashboard, o un panel interno autenticado) — nunca exponiendo esa
key en el frontend.

### Retención de datos

La Política de Privacidad (`/privacidad`) promete borrar datos operativos del
Merchant a los 30 días de ciertos eventos, pero un reclamo es un registro
distinto, regulado por el Código de Protección y Defensa del Consumidor. Antes
de aplicar cualquier borrado automático a esta tabla, confirma con el equipo
legal el plazo de conservación que corresponde — no lo asumas igual al de
`landing_leads`.

---

## 3. Variables de entorno requeridas

Ya documentadas en `CLAUDE.md`, se repiten aquí por contexto:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Si faltan en el entorno de despliegue, `src/lib/supabase.ts` deja el cliente en
`null` y todos los formularios muestran su mensaje de error en vez de fallar
silenciosamente o romper el build.
