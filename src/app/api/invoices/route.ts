import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_SUBS?.trim();
  const { searchParams } = new URL(req.url);
  const subscriptionId = searchParams.get('subscriptionId');

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Falta el parámetro subscriptionId' }, { status: 400 });
  }

  try {
    const res = await fetch(`${base}/subscriptions/${subscriptionId}/invoices`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Error al obtener las facturas' }, { status: res.status });
    }
    const data: unknown = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Error al conectar con el servidor' }, { status: 500 });
  }
}
