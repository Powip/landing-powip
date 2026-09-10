import { NextResponse } from "next/server";

// Solo para preview local. El código de prueba es "7284" (el mismo que
// usa el mock de /tracking) — cualquier otro valor responde "incorrecto"
// para poder ver también el estado de error. No disponible en producción.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (body?.codigo === "7284") {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Código incorrecto" }, { status: 400 });
}
