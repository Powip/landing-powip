import { NextResponse } from "next/server";
import {
  MOCK_RECOMPRA_PRODUCTS,
  MOCK_UPSELL_OFFERS,
  stripStateSuffix,
} from "@/app/api/mock/_mockData";

// Mock genérico para todas las sub-rutas de un pedido (mp/preferencia,
// entrega, yape/comprobante, confirmar-recepcion, upsell, recompra,
// constancia.pdf, guia.pdf). Solo para preview local — ver
// docs/hito1-backend-requirements.md. No disponible en producción.

function pdfResponse(label: string) {
  const body = `%PDF-1.4\n% Mock de "${label}" solo para preview local\n%%EOF`;
  return new NextResponse(body, { headers: { "Content-Type": "application/pdf" } });
}

type Params = { orderNumber: string; rest: string[] };

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }

  const { rest } = await params;
  const path = rest.join("/");

  if (path === "upsell") return NextResponse.json(MOCK_UPSELL_OFFERS);
  if (path === "recompra/catalogo") return NextResponse.json(MOCK_RECOMPRA_PRODUCTS);
  if (path === "constancia.pdf") return pdfResponse("constancia de pago");
  if (path === "guia.pdf") return pdfResponse("guía de envío");

  return NextResponse.json({ error: `mock GET no manejado: ${path}` }, { status: 404 });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }

  const { orderNumber, rest } = await params;
  const path = rest.join("/");
  const base = stripStateSuffix(orderNumber);

  // Simula la redirección post-pago: "vuelve" a la misma página en estado
  // "pagado" en vez de ir a un checkout real de Mercado Pago.
  if (path === "mp/preferencia" || path === "recompra") {
    return NextResponse.json({ initPoint: `/rastreo/${base}-pagado` });
  }

  if (
    path === "entrega" ||
    path === "yape/comprobante" ||
    path === "confirmar-recepcion" ||
    path === "upsell"
  ) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: `mock POST no manejado: ${path}` }, { status: 404 });
}
