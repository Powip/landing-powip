import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const base = process.env.NEXT_PUBLIC_API_GATEWAY?.trim();
  try {
    const res = await fetch(`${base}/subscription-flow/api/v1/plans`);
    if (!res.ok) {
      return NextResponse.json({ error: 'No se pudieron obtener los planes' }, { status: res.status });
    }
    const data: unknown = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Error al conectar con el servidor' }, { status: 500 });
  }
}
