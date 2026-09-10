# Hito 1 — Requisitos de backend (link de rastreo + portal del repartidor)

Este documento lista **todo lo que el frontend de este repo necesita de la
API de ventas** (`NEXT_PUBLIC_API_VENTAS`) para que el cobro digital, la
elección de agencia, Yape directo, el código de entrega, el upsell, la
recompra y el portal del repartidor funcionen de verdad. Cubre dos
superficies del Hito 1 (spec §1):

1. **Link del cliente** (`/rastreo/:orderNumber`) — Segmentos 1-8, ver
   `src/app/rastreo/[orderNumber]/page.tsx` y `src/components/rastreo/`.
2. **Portal del repartidor** (`/rep/:token`) — ver
   `src/app/rep/[token]/page.tsx` y `src/components/repartidor/`.

El **Panel del negocio** y el **Super Admin** (spec §1, ítems 3 y 4) no
tienen ningún archivo en este repo — no están cubiertos acá.

Todo lo construido ya está contra los contratos que se describen abajo,
**pero ninguno está confirmado con backend todavía** — son mi mejor intento
de adaptar la especificación de Hito 1 (`POWIP_Hito1_Especificacion.md`) a
la convención que ya usa esta app (`/tracking/:orderNumber`, no
`/api/link/:token`).

**Antes de dar por buena la integración, alguien de backend tiene que leer
esto y confirmar o corregir cada endpoint, cada campo y cada nombre.**

---

## 0. Discrepancia de fondo: token vs. número de orden

La especificación (§3, §7, §8, §11) diseña **todo** el link del cliente
alrededor de un `link_token` tipo UUID, no adivinable, y dice explícitamente:

> PII en links públicos: mínima y por token no adivinable (UUID).

La implementación actual de este repo usa el **número de orden**
(`ORD-012247`) como identificador en la URL pública
(`/rastreo/ORD-012247` → `GET /tracking/ORD-012247`). Si los números de
orden son correlativos o adivinables, **esto no cumple esa regla de
seguridad** — cualquiera podría iterar números de orden y ver pedidos
ajenos (nombre, dirección, montos).

**Esto no lo introduje yo: ya existía antes de este trabajo.** Lo señalo acá
porque a partir de ahora la misma URL también sirve para pagar, subir
comprobantes y crear pedidos nuevos (recompra) — el costo de un identificador
adivinable sube mucho. Recomiendo decidir con el equipo (Marco/Mau/Joel) si:
- (a) se migra el link público a un `link_token` UUID real (alineado a spec), o
- (b) se acepta el número de orden pero se lo hace no-secuencial/no-adivinable.

Todos los endpoints de abajo asumen que se sigue usando `:orderNumber` en la
URL (opción de menor cambio), pero si backend prefiere migrar a `:token`,
avisar — es un cambio de una sola línea en el frontend (la base de la URL).

---

## 1. Campos nuevos en `GET /tracking/:orderNumber` (ya existe)

El frontend ya consume este endpoint. Necesita que la respuesta agregue
estos campos (todos opcionales del lado del tipo TS, pero deben llegar
reales para que la UI tenga sentido):

```jsonc
{
  // ... todo lo que ya devuelve hoy (orderNumber, status, deliveryType,
  // customer, items, totals, timeline, shippingInfo, courier, etc.) ...

  // Estado del pago — reemplaza la inferencia actual basada solo en
  // totals.pendingAmount. Necesario para distinguir "yape en revisión" de
  // "deuda simple", y para futuros estados (devuelto, en_disputa).
  "paymentStatus": "pendiente", // "pendiente" | "parcial" | "yape_revision" | "pagado" | "devuelto" | "en_disputa"
  "paymentMethod": "mp",        // "mp" | "yape_mp" | "yape_directo" | "transferencia" | null

  // Código de entrega — null/ausente si el pedido no está pagado.
  // Reemplaza al actual `shippingInfo.shippingKey` (que el frontend sigue
  // leyendo como fallback si `deliveryCode` no llega, pero no debería vivir
  // en dos lugares a la vez a mediano plazo).
  "deliveryCode": {
    "code": "7284",
    "status": "activo",   // "activo" | "validado" | "expirado"
    "expiresAt": "2026-09-16T00:00:00Z"
  },

  // Elección de agencia / domicilio. Si el courier es Shalom, "mode" debería
  // venir precargado en "agencia" (Shalom no entrega a domicilio) y
  // "confirmed": false hasta que el cliente confirme.
  "deliveryChoice": {
    "mode": "agencia",       // "agencia" | "domicilio"
    "agencyId": null,
    "confirmed": false
  },

  // Yape directo — feature flag por negocio (Super Admin lo prende/apaga,
  // ver especificación §7.2 y §10.2). Si no llega o es false, el frontend
  // no muestra la opción de Yape directo en absoluto.
  "yapeDirectoEnabled": true,
  "yapeDirectNumber": "987654321",
  // Opcional: si backend puede generar un QR real de Yape (con el payload
  // de cobro), mandar la URL de la imagen. Si no llega, el frontend NO
  // dibuja ningún QR — solo muestra el número para yapear manualmente. No
  // se debe pedir al frontend que genere un QR falso/decorativo.
  "yapeQrImageUrl": null
}
```

**Pregunta abierta para backend:** ¿se puede agregar todo esto al mismo
`GET /tracking/:orderNumber`, o preferirían un endpoint separado tipo
`GET /tracking/:orderNumber/estado-pago` más liviano para el polling de 30s
(como sugiere la especificación §8)? Hoy el frontend pollea el mismo
endpoint completo cada 30s por simplicidad — si el payload es pesado o caro
de armar, avisar para separar.

---

## 2. Endpoints nuevos necesarios

Todos con el mismo prefijo base: `${NEXT_PUBLIC_API_VENTAS}/tracking/:orderNumber/...`
salvo el catálogo de agencias, que es transversal a un pedido.

### 2.1 Crear preferencia de pago Mercado Pago

```
POST /tracking/:orderNumber/mp/preferencia
```
- **Request:** sin body (el backend ya sabe el saldo pendiente del pedido).
- **Response esperada:**
  ```json
  { "initPoint": "https://www.mercadopago.com.pe/checkout/v1/redirect?..." }
  ```
- El frontend hace `window.location.href = initPoint`.
- **Confirmar:** nombre exacto del campo (`initPoint` vs `init_point` vs
  `url`) y si el backend maneja el split 99.5/0.5 (§7.1, §9 de la spec) o
  si eso queda para una fase posterior.
- **Falta decidir:** a qué URL debe volver Mercado Pago tras el pago
  (`back_url`). Recomendado: `https://<dominio>/rastreo/:orderNumber` (la
  misma página), y que el webhook de MP sea la fuente de verdad del estado
  (el polling de 30s ya lo recoge solo, no depende del back_url).

### 2.2 Confirmar agencia de recojo

```
POST /tracking/:orderNumber/entrega
Body: { "mode": "agencia", "agencyId": "<id de agencias_courier>" }
```
- **Response:** 200 sin body específico (el frontend refetch el tracking
  completo después). Si backend quiere devolver algo, usar el mismo shape
  de `deliveryChoice`.
- **Regla de negocio a implementar en backend (no en frontend):** el
  pedido no debe pasar a `despachado` hasta que `deliveryChoice.confirmed`
  sea `true` **y** el pago esté `pagado` (gate pre-despacho, spec §6.2 y
  §7.3). El frontend solo muestra el selector; el gate real lo hace backend.

### 2.3 Catálogo de agencias Shalom

```
GET /couriers/shalom/agencias?provincia=<texto>&distrito=<texto>
```
- **Response esperada:**
  ```json
  [
    { "id": "shl-cercado", "nombre": "Agencia Cercado", "direccion": "Av. Ejército 210", "horario": "Lun-Sáb 9am-7pm", "distanciaKm": 1.2 }
  ]
  ```
  (o `{ "agencias": [...] }` — el frontend acepta ambos shapes).
- El frontend manda `provincia`/`distrito` con lo que tenga en
  `customer.province`/`customer.city` del pedido — **confirmar que esos
  nombres coincidan con los que usa el catálogo real de Shalom** (mayúsculas,
  tildes, nomenclatura INEI, etc. — es la fuente más probable de bugs acá).

### 2.4 Subir comprobante de Yape directo

```
POST /tracking/:orderNumber/yape/comprobante
Content-Type: multipart/form-data
Campo: "comprobante" (archivo de imagen)
```
- **Response:** 200 si se aceptó (pasa a `paymentStatus: "yape_revision"`).
- **Backend debe:** guardar hash del comprobante para anti-reuso (spec §5.2,
  `yape_comprobante_hash`) y notificar al negocio (Finanzas → Pagos
  Pendientes, spec §7.2). Nada de esto lo hace el frontend.
- **Confirmar:** límite de tamaño/formato de archivo, y si se necesita algún
  campo adicional en el form-data (ej. `orderId` explícito, aunque ya va en
  la URL).

### 2.5 Descargas PDF

```
GET /tracking/:orderNumber/constancia.pdf
GET /tracking/:orderNumber/guia.pdf
```
- El frontend los renderiza como `<a href=... target="_blank">`, sin lógica
  extra. Deben responder `Content-Type: application/pdf` directamente (no
  JSON con una URL adentro).
- **Confirmar:** disponibilidad — ¿`constancia.pdf` existe apenas se paga, y
  `guia.pdf` recién cuando se despacha? El frontend los muestra juntos sin
  distinguir esos dos momentos; si hace falta, avisar para condicionar cada
  botón por separado.

### 2.6 Confirmar recepción

```
POST /tracking/:orderNumber/confirmar-recepcion
```
- Sin body. Response 200.
- **Confirmar regla de negocio:** ¿esto por sí solo marca `orders.estado_pedido = 'entregado'`,
  o es solo una señal informativa mientras se espera la confirmación real
  del courier? La especificación (§7.10) trata "entregado" como el estado
  que habilita la recompra, así que como mínimo debe destrabar eso.

### 2.7 Upsell

```
GET  /tracking/:orderNumber/upsell
POST /tracking/:orderNumber/upsell   Body: { "offerId": "<id>" }
```
- **GET response esperada:**
  ```json
  [
    {
      "id": "centella",
      "name": "Crema Hidratante Centella",
      "description": "Centella asiática · 50 ml",
      "badge": "-15%",
      "originalPrice": 84.50,
      "upsellPrice": 71.80,
      "showWhen": "ambos" // "antes" | "despues" | "ambos"
    }
  ]
  ```
  (o `{ "ofertas": [...] }`).
- **POST:** agrega el producto a la orden existente y recalcula
  `totals.grandTotal`/`pendingAmount`. Si el cliente ya pagó por MP, backend
  debe cobrar el delta automáticamente (spec §7.8) — el frontend no maneja
  ningún segundo pago para el upsell, asume que el POST ya lo resuelve todo.
- **Confirmar:** ¿qué pasa si el pedido ya se despachó/está en camino? La
  spec dice que el upsell debe cerrarse antes del despacho (regla de negocio
  §10.6) — hoy el frontend solo lo oculta en los estados "camino"/"cobrado",
  pero **backend debe rechazar el POST igual** si por algún motivo llega
  tarde (el frontend no es una barrera de seguridad).

### 2.8 Recompra

```
GET  /tracking/:orderNumber/recompra/catalogo
POST /tracking/:orderNumber/recompra
```
- **Este catálogo GET no está en la especificación** — la spec (§7.10, §8)
  solo define el POST final asumiendo que el cliente "elige productos" sin
  decir de dónde salen. Lo agregué porque el mockup sí muestra una lista de
  productos para recomprar (`repoProducts` en el HTML). **Confirmar con
  backend/PM si este catálogo existe, de dónde sale (¿productos más
  vendidos del negocio? ¿los mismos del pedido original? ¿un campo
  editable en el panel del negocio?), y el shape real.**
- **GET response asumida:**
  ```json
  [
    { "id": "pilar", "name": "Pantalón Pilar", "description": "Talla M", "price": 99, "badge": null }
  ]
  ```
- **POST body:**
  ```json
  {
    "productIds": ["pilar", "centella"],
    "addressChoice": "same",       // "same" | "new"
    "newAddress": "Av. ... (solo si addressChoice = 'new')"
  }
  ```
- **POST response esperada:** `{ "initPoint": "https://..." }` (igual patrón
  que 2.1 — el pago del pedido de recompra también es vía Mercado Pago). El
  nuevo pedido debe generar su propio `orderNumber`/`link_token`, y el
  `back_url` de esa preferencia debería apuntar a
  `/rastreo/:nuevoOrderNumber` para que el cliente aterrice en el tracking
  del pedido nuevo tras pagar.
- **Costo de envío hardcodeado:** `RecompraFlow.tsx` tiene
  `SHIPPING_COST = 6` fijo en el frontend — **esto es un placeholder, no un
  valor real.** Debe venir del backend (¿en el catálogo? ¿en la respuesta
  del POST antes de redirigir a pagar, para mostrar el total real?). Hoy el
  total que ve el cliente antes de pagar puede no coincidir con lo que
  Mercado Pago le cobra si el envío real es distinto a S/ 6.

---

## 3. Portal del repartidor (`/rep/:token`)

Página nueva en `src/app/rep/[token]/page.tsx` + `src/components/repartidor/`.
Es pública por token de guía, sin login, y **nunca debe mostrar montos**
(spec §3, §7.5, §10.3) — ningún campo de este contrato lleva precios ni
totales, a propósito.

### 3.1 `GET /rep/:token` — pedidos de la guía

```jsonc
{
  "guiaCodigo": "GE-202609-01647",
  "businessName": "Jook Business",
  "active": true, // false = guía cerrada, ver 3.3
  "orders": [
    {
      "orderId": "ord-1",
      "orderNumber": "ORD-012247",
      "itemsSummary": "Pantalón Pilar Talla M x1",
      "customerName": "Joel García",
      "dniMasked": "••••3916",   // ver nota de seguridad abajo
      "phone": "987567890",
      "address": "Av. Salaverry 432, Arequipa",
      "note": "Bolsa de regalo por favor", // o null
      "mapsUrl": "https://maps.google.com/?q=...", // o null si no hay lat/lng
      "paid": true,       // true = prepago; false = saldo_pendiente (spec §7.5)
      "delivered": false
    }
  ]
}
```

**Nota de seguridad importante:** `dniMasked` **tiene que llegar ya
enmascarado desde el backend** (ej. `••••3916`). El frontend no enmascara
nada del lado del cliente — para cuando el DNI llegara al navegador ya
habría viajado completo por la red, lo que anula el propósito de
enmascarar (spec §11: "DNI enmascarado siempre en el portal del
repartidor"). Si backend manda el DNI completo "por si acaso", este
requisito de privacidad queda incumplido aunque la UI se vea bien.

**Confirmar con backend:**
- ¿El token es el mismo `repartidor_links.token` de la spec (§5.6, ej.
  `SHL-7B29X-01647`), y vence solo (`vence_al_cerrar`) cuando se cierra la
  guía? El frontend no hace nada especial con el token — lo pasa tal cual
  en la URL.
- ¿`mapsUrl` lo arma backend con lat/lng reales, o el frontend debería
  armarlo con la dirección en texto (`https://maps.google.com/?q=<direccion
  URL-encoded>`) cuando no haya coordenadas? Hoy el frontend simplemente no
  muestra el botón de Maps si `mapsUrl` es null — no arma ningún link por su
  cuenta.
- ¿Cada cuánto conviene pollear? El frontend hoy usa 20s (mismo intervalo
  que sugiere la spec §7.7 para el ping de GPS, aunque acá no hay GPS) —
  ajustar si el pago del cliente tarda en reflejarse o si el endpoint es
  costoso.

### 3.2 `POST /rep/:token/validar` — validar código de entrega

```json
{ "orderId": "ord-1", "codigo": "7284" }
```

- **200** si el código coincide y está `activo` → backend debe hacer
  `delivery_codes.estado = 'validado'` y `orders.estado_pedido = 'entregado'`
  (spec §7.5). El frontend después vuelve a pedir `GET /rep/:token` y
  espera ver ese pedido con `delivered: true`.
- **4xx** si no coincide, ya fue validado, o expiró — el frontend solo
  muestra "Código incorrecto o vencido." sin distinguir el motivo; avisar
  si conviene diferenciar el mensaje.
- **Regla de negocio en backend, no en frontend:** el botón "Confirmar
  entrega" está deshabilitado en la UI mientras `paid: false`, pero eso es
  cosmético — backend debe rechazar igual un `validar` sobre un pedido sin
  pagar, por si alguien pega el POST directo.

### 3.3 Guía cerrada / token inválido

- Si el token no existe o ya venció: `GET /rep/:token` → **404**. El
  frontend muestra "Link no disponible".
- Si el token es válido pero la guía ya se cerró (todos los pedidos
  entregados): el frontend espera `"active": false` en el body (no un
  404), para poder mostrar un mensaje distinto ("Guía cerrada" en vez de
  "link no disponible"). Confirmar que backend distinga estos dos casos.

### 3.4 Fuera de este entregable: GPS / mapa de flota

La especificación (§7.7) menciona que el repartidor con motorizado propio
manda su ubicación (`POST /rep/:token/ubicacion` cada ~20s) para que el
negocio la vea en un mapa de flota. **No lo construí:** ese mapa vive en el
Panel del negocio (spec §1, ítem 3), que no existe en este repo, así que
capturar y mandar GPS sin nadie del otro lado consumiéndolo no aporta nada
todavía. Cuando el panel del negocio exista, esto es un agregado pequeño
sobre esta misma página (pedir permiso de geolocalización + un
`setInterval` con `POST`).

---

## 4. Reglas de negocio que debe aplicar backend (no el frontend)

El frontend solo pinta UI y llama endpoints — no puede ni debe ser la
barrera de seguridad de ninguna de estas reglas (spec §10). Backend debe
validarlas server-side sin importar lo que mande el cliente:

1. El código de entrega solo se genera/activa cuando `paymentStatus = 'pagado'`.
2. Comisión 0.5% solo sobre pagos MP (tarjeta y Yape dentro de MP); Yape
   directo no genera comisión.
3. Gate pre-despacho: sin pago + agencia confirmada, no se despacha.
4. Upsell: rechazar el POST si el pedido ya se despachó.
5. Reversar comisión / anular código si hay refund o contracargo.
6. Aislamiento por `empresa_id` en cualquier endpoint que no sea
   explícitamente público por token/orderNumber.
7. `dniMasked` (§3.1) se enmascara **en backend**, nunca se manda el DNI
   completo al portal del repartidor.
8. `POST /rep/:token/validar` (§3.2) rechaza igual un pedido sin pagar,
   aunque la UI ya lo bloquee.

---

## 5. Resumen para priorizar la conversación con backend

Orden sugerido para no bloquear frontend innecesariamente:

1. **Campos en `GET /tracking/:orderNumber`** (§1) — sin esto, ningún
   estado nuevo se activa nunca (todo sigue viéndose como antes).
2. **`POST .../mp/preferencia`** (§2.1) — es lo que monetiza, ya tiene la UI
   lista desde el Segmento 2.
3. **`GET /couriers/shalom/agencias` + `POST .../entrega`** (§2.2, §2.3).
4. **`GET /rep/:token` + `POST /rep/:token/validar`** (§3) — sin esto el
   portal del repartidor no tiene ningún dato real; hoy solo corre contra
   el mock.
5. El resto del link del cliente (Yape directo, PDFs, confirmar recepción,
   upsell, recompra) puede ir después — la UI ya está pero son
   incrementales y no bloquean el cobro principal.

Y la decisión de fondo antes de todo: **§0 (token vs. número de orden)** —
no es bloqueante para seguir desarrollando, pero si se decide migrar a
`link_token`, mejor hacerlo temprano para no reescribir rutas después. Esa
misma decisión también aplica al token del repartidor (§3.1): confirmar que
ya es un token temporal no-adivinable y no, por ejemplo, el código de guía
a secas.
